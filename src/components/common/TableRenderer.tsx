import React, { useEffect } from "react";
import type { TableField } from "../../types/form";
import { calculateTableRows } from "../../utils/FormEngine";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  field: TableField;
  value: Record<string, any>[];
  formData?: Record<string, any>;
  onChange: (rows: Record<string, any>[]) => void;
}

const TableRenderer: React.FC<Props> = ({ field, value = [], formData = {}, onChange }) => {
  const rows =
    value && value.length > 0
      ? value
      : field.defaultValue && field.defaultValue.length > 0
      ? field.defaultValue
      : Array.from({ length: field.minRows || 1 }, () =>
          Object.fromEntries(field.columns.map((col) => [col.key, ""]))
        );

  useEffect(() => {
    if ((!value || value.length === 0) && field.defaultValue && field.defaultValue.length > 0) {
      onChange(field.defaultValue);
    }
  }, []);

  const handleCellChange = (rowIndex: number, key: string, cellValue: any) => {
    const updatedRows = [...rows];
    let newRow = { ...updatedRows[rowIndex], [key]: cellValue };

    // --- MUTUALLY EXCLUSIVE CHECKBOX LOGIC ---
    if (key === "isYes" && cellValue === true) newRow.isNo = false;
    if (key === "isNo" && cellValue === true) newRow.isYes = false;

    // --- OTHER SPECIFICATION CLEANUP ---
    if (key === "position" && cellValue !== "other") {
      newRow.positionOther = "";
    }

    const normalizedValue = String(cellValue || "").toLowerCase();

    // Clear out 'reasonNotDone' if the status changes to 'Done' or 'yes'
    if (key === "status" && (normalizedValue === "done" || normalizedValue === "yes")) {
      newRow.reasonNotDone = "";
    }

    // Clear out 'year' if 'available' is set to 'no'
    if (key === "available" && normalizedValue === "no") {
      newRow.year = "";
    }

    // Clear out 'completeness' and 'remarks' if 'availability' is set to 'no'
    if (key === "availability" && normalizedValue === "no") {
      newRow.completeness = "";
      newRow.remarks = "";
    }

    // --- SECTION 7: STOCK-OUT CLEANUP ---
    if (newRow.id === "stockOut3Months" && normalizedValue === "no") {
      const daysRowIndex = updatedRows.findIndex(r => r.id === "daysStockedOut");
      if (daysRowIndex !== -1) {
        updatedRows[daysRowIndex] = { ...updatedRows[daysRowIndex], [key]: "" };
      }
    }

    updatedRows[rowIndex] = newRow;

    // --- PIVOT & CROSS-TABLE CALCULATION LOGIC ---
    if (key !== "parameter") {
      const colData: Record<string, number> = {};
      updatedRows.forEach((r) => {
        if (r.id) colData[r.id] = Number(r[key]) || 0;
      });

      updatedRows.forEach((r, i) => {
        if (r.calculate) {
          let formula = r.calculate;
          let contextData = { ...colData };

          if (r.calculateTable && formData[r.calculateTable]) {
            const externalTable = formData[r.calculateTable];
            externalTable.forEach((extRow: any) => {
              if (extRow.id) contextData[extRow.id] = Number(extRow[key]) || 0;
            });
          }

          const sortedKeys = Object.keys(contextData).sort((a, b) => b.length - a.length);
          sortedKeys.forEach((k) => {
            const regex = new RegExp(`\\b${k}\\b`, "g");
            formula = formula.replace(regex, contextData[k].toString());
          });

          try {
            const result = new Function(`return ${formula}`)();
            updatedRows[i][key] = isNaN(result) || !isFinite(result) ? "" : Number(result.toFixed(2));
            colData[r.id] = updatedRows[i][key];
          } catch (e) {
            console.error(`Calculation error:`, e);
          }
        }
      });
    }

    field.columns.forEach((col) => {
      if (col.calculate) {
        updatedRows[rowIndex][col.key] = col.calculate(updatedRows[rowIndex]);
      }
    });

    onChange(calculateTableRows(field.name, updatedRows));
  };

  const addRow = () => {
    const updated = [
      ...rows,
      Object.fromEntries(field.columns.map((col) => [col.key, ""])),
    ];
    onChange(calculateTableRows(field.name, updated));
  };

  const isFixedTable = field.isFixed === true;

  return (
    <div style={{ marginBottom: 24 }}>
      {field.label && (
        <label style={{ display: "block", fontWeight: 600, marginBottom: 10 }}>
          {field.label}
        </label>
      )}

      <div className="table-container" style={{ overflowX: "auto" }}>
        <table style={{ minWidth: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {field.columns.map((col) => (
                <th key={col.key} style={{ width: col.width || "auto", padding: 8, border: "1px solid #ddd", textAlign: "left", backgroundColor: "#f8f9fa", textTransform: "none" }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => {
              if (row.isHeader) {
                return (
                  <tr key={rowIndex}>
                    <td colSpan={field.columns.length} style={{ backgroundColor: "#e9ecef", fontWeight: "bold", padding: "10px", border: "1px solid #ccc" }}>
                      {row.tool}
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={rowIndex}>
                  {field.columns.map((col) => {
                    const isParam = col.key === "parameter";
                    const cellType = isParam ? "text" : (row.inputType || col.type || "text");
                    
                    let isReadOnly = isParam || row.readOnly || col.readOnly;
                    
                    if (col.key === "positionOther" && row.position !== "other") {
                      isReadOnly = true;
                    }

                    if (col.key === "reasonNotDone") {
                      const statusValue = String(row.status || "").toLowerCase();
                      if (statusValue === "done" || statusValue === "yes") {
                        isReadOnly = true;
                      }
                    }

                    if (col.key === "year") {
                      const isAvailable = String(row.available || "").toLowerCase();
                      if (isAvailable === "no") {
                        isReadOnly = true;
                      }
                    }

                    if (col.key === "completeness" || col.key === "remarks") {
                      const toolAvailability = String(row.availability || "").toLowerCase();
                      if (toolAvailability === "no") {
                        isReadOnly = true;
                      }
                    }

                    if (row.id === "daysStockedOut") {
                      const stockOutRow = rows.find(r => r.id === "stockOut3Months");
                      if (stockOutRow && String(stockOutRow[col.key]).toLowerCase() === "no") {
                        isReadOnly = true;
                      }
                    }

                    const cellMax = col.max !== undefined ? col.max : row.max;
                    const cellMin = col.min !== undefined ? col.min : row.min;
                    const cellOptions = row.options || col.options;

                    const isGreyedOut = 
                      col.key === "positionOther" || 
                      row.id === "daysStockedOut" || 
                      (col.key === "reasonNotDone" && (String(row.status || "").toLowerCase() === "done" || String(row.status || "").toLowerCase() === "yes")) ||
                      (col.key === "year" && String(row.available || "").toLowerCase() === "no") ||
                      ((col.key === "completeness" || col.key === "remarks") && String(row.availability || "").toLowerCase() === "no");

                    return (
                      <td key={col.key} style={{ width: col.width || "auto", padding: 4, border: "1px solid #ddd" }}>
                        {isReadOnly ? (
                          <div style={{ 
                            padding: "8px", 
                            backgroundColor: isGreyedOut ? "#eee" : "#f9f9f9", 
                            color: isGreyedOut ? "#bbb" : "#333",
                            minHeight: "36px",
                            fontSize: "14px",
                            borderRadius: "4px"
                          }}>
                            {row[col.key] || (col.key === "positionOther" ? "N/A" : row.id === "daysStockedOut" ? "N/A" : "")}
                          </div>
                        ) : cellType === "select" ? (
                          <select
                            value={row[col.key] || ""}
                            onChange={(e) => handleCellChange(rowIndex, col.key, e.target.value)}
                            style={{ width: "100%", padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
                          >
                            <option value="">Select...</option>
                            {cellOptions?.map((option: any) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : cellType === "checkbox" ? (
                          <div style={{ textAlign: "center", padding: "4px" }}>
                            <input
                              type="checkbox"
                              checked={!!row[col.key]}
                              onChange={(e) => handleCellChange(rowIndex, col.key, e.target.checked)}
                              style={{ 
                                width: "20px", 
                                height: "20px", 
                                cursor: "pointer",
                                accentColor: col.key === "isYes" ? "#2846a7" : col.key === "isNo" ? "#2846a7" : "auto"
                              }}
                            />
                          </div>
                        ) : cellType === "textarea" ? (
                          <textarea
                            value={row[col.key] || ""}
                            placeholder={col.key === "positionOther" ? "Specify..." : ""}
                            onChange={(e) => handleCellChange(rowIndex, col.key, e.target.value)}
                            style={{ 
                              width: "100%", 
                              padding: 6, 
                              borderRadius: 4, 
                              border: "1px solid #ccc",
                              minHeight: "40px",
                              resize: "vertical"
                            }}
                          />
                        ) : cellType === "date" ? (
                          <DatePicker
                            selected={row[col.key] ? new Date(row[col.key]) : null}
                            onChange={(date: Date | null) => {
                              if (!date) {
                                handleCellChange(rowIndex, col.key, "");
                                return;
                              }
                              const year = date.getFullYear();
                              const month = String(date.getMonth() + 1).padStart(2, '0');
                              const day = String(date.getDate()).padStart(2, '0');
                              handleCellChange(rowIndex, col.key, `${year}-${month}-${day}`);
                            }}
                            minDate={cellMin ? new Date(cellMin) : undefined}
                            maxDate={cellMax ? new Date(cellMax) : undefined}
                            dateFormat={(col as any).dateFormat || "dd/MM/yyyy"}
                            placeholderText={(col as any).placeholderText || "dd/mm/yyyy"}
                            disabled={isReadOnly}
                            
                            // --- NEW SETTINGS ADDED HERE ---
                            //showMonthDropdown // Adds a month dropdown to the header
                            //showYearDropdown  // Adds a year dropdown to the header
                            //dropdownMode="select" 
                            portalId="root-portal" // This teleports the calendar outside the table to prevent clipping!
                            // -------------------------------
                            
                            customInput={
                              <input 
                                style={{ 
                                  padding: 6, 
                                  borderRadius: 4, 
                                  border: "1px solid #ccc",
                                }} 
                              />
                            }
                          />
                        ) : (
                          <input
                            type={cellType}
                            max={cellMax}
                            min={cellMax}
                            value={row[col.key] || ""}
                            placeholder={col.key === "positionOther" ? "Specify..." : ""}
                            onChange={(e) => {
                              if (cellType === "number") {
                                const val = Number(e.target.value);
                                if (cellMax !== undefined && val > cellMax) return; 
                                if (cellMin !== undefined && val < cellMin) return; 
                              }
                              handleCellChange(rowIndex, col.key, e.target.value);
                            }}
                            style={{ 
                              width: "100%", 
                              padding: 6, 
                              borderRadius: 4, 
                              border: col.key === "positionOther" ? "1px solid #28a745" : "1px solid #ccc" 
                            }}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {!isFixedTable && (
        <button type="button" onClick={addRow} style={{ marginTop: 10, padding: "8px 16px", borderRadius: 4, border: "none", background: "#3746d1", color: "#fff", fontWeight: 600, cursor: "pointer" }}>
          + Add Row
        </button>
      )}
    </div>
  );
};

export default TableRenderer;