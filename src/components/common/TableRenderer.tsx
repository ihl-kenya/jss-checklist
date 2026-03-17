import React, { useEffect } from "react";
import type { TableField } from "../../types/form";
import { calculateTableRows } from "../../utils/FormEngine";

interface Props {
  field: TableField;
  value: Record<string, any>[];
  formData?: Record<string, any>; // ADDED: Needed for cross-table math
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
    updatedRows[rowIndex] = { ...updatedRows[rowIndex], [key]: cellValue };

    // --- NEW PIVOT & CROSS-TABLE CALCULATION LOGIC ---
    // We only calculate down the column if a product data cell changes
    if (key !== "parameter") {
      // 1. Gather all numbers in this column from the CURRENT table
      const colData: Record<string, number> = {};
      updatedRows.forEach((r) => {
        if (r.id) colData[r.id] = Number(r[key]) || 0;
      });

      // 2. Loop through rows to see if any have a formula
      updatedRows.forEach((r, i) => {
        if (r.calculate) {
          let formula = r.calculate;
          let contextData = { ...colData };

          // 3. Pull in data from OTHER tables if needed (e.g., getting unitCost)
          if (r.calculateTable && formData[r.calculateTable]) {
            const externalTable = formData[r.calculateTable];
            externalTable.forEach((extRow: any) => {
              if (extRow.id) contextData[extRow.id] = Number(extRow[key]) || 0;
            });
          }

          // 4. Replace variables in the string with actual numbers
          // Sort keys by length so things like "A1" replace before "A"
          const sortedKeys = Object.keys(contextData).sort((a, b) => b.length - a.length);
          sortedKeys.forEach((k) => {
            const regex = new RegExp(`\\b${k}\\b`, "g");
            formula = formula.replace(regex, contextData[k].toString());
          });

          // 5. Safely execute the math
          try {
            // eslint-disable-next-line no-new-func
            const result = new Function(`return ${formula}`)();
            updatedRows[i][key] = isNaN(result) || !isFinite(result) ? "" : Number(result.toFixed(2));
            // Update colData so rows further down can use this new result
            colData[r.id] = updatedRows[i][key];
          } catch (e) {
            console.error(`Calculation error in row ${r.id}:`, e);
          }
        }
      });
    }

    // --- OLD HORIZONTAL CALCULATION (Kept so your other standard tables don't break) ---
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

  const isFixedTable = field.defaultValue && field.defaultValue.length > 0;

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
                <th key={col.key} style={{ width: col.width || "auto", padding: 8, border: "1px solid #ddd", textAlign: "left" }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => {
              if (row.isHeader) {
                return (
                  <tr key={rowIndex} className="table-category-header">
                    <td colSpan={field.columns.length} style={{ backgroundColor: "#e9ecef", fontWeight: "bold", padding: "10px", border: "1px solid #ccc" }}>
                      {row.tool}
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={rowIndex}>
                  {field.columns.map((col) => {
                    // --- NEW DYNAMIC CELL RENDER LOGIC ---
                    const isParam = col.key === "parameter";
                    // Parameters are always text. Other cells look at the Row, then Column, then default to text.
                    const cellType = isParam ? "text" : (row.inputType || col.type || "text");
                    // Parameters are always read-only.
                    const cellReadOnly = isParam ? true : (row.readOnly || col.readOnly);
                    const cellOptions = row.options || col.options;
                    const cellMax = row.max;

                    return (
                      <td key={col.key} style={{ width: col.width || "auto", padding: 4, border: "1px solid #ddd" }}>
                        {cellReadOnly ? (
                          <div style={{ padding: "8px", backgroundColor: "#f9f9f9", minHeight: "36px" }}>
                            {row[col.key] || ""}
                          </div>
                        ) : cellType === "textarea" ? (
                          <textarea
                            value={row[col.key] || ""}
                            onChange={(e) => handleCellChange(rowIndex, col.key, e.target.value)}
                            style={{ width: "100%", padding: 6 }}
                          />
                        ) : cellType === "select" ? (
                          <select
                            value={row[col.key] || ""}
                            onChange={(e) => handleCellChange(rowIndex, col.key, e.target.value)}
                            style={{ width: "100%", padding: 6 }}
                          >
                            <option value="">Select...</option>
                            {cellOptions?.map((option: any) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={cellType}
                            max={cellMax}
                            value={row[col.key] || ""}
                            onChange={(e) => {
                              // If there's a max limit, block them from typing a higher number
                              if (cellMax !== undefined && Number(e.target.value) > cellMax) return;
                              handleCellChange(rowIndex, col.key, e.target.value);
                            }}
                            style={{ width: "100%", padding: 6 }}
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
        <button type="button" onClick={addRow} style={{ marginTop: 10, padding: "8px 16px", cursor: "pointer" }}>
          + Add Row
        </button>
      )}
    </div>
  );
};

export default TableRenderer;