import React, { useEffect } from "react";
import type { TableField } from "../../types/form";
import { calculateTableRows } from "../../utils/FormEngine";

interface Props {
  field: TableField;
  value: Record<string, any>[];
  onChange: (rows: Record<string, any>[]) => void;
}

const TableRenderer: React.FC<Props> = ({ field, value = [], onChange }) => {
  // 1. We determine the initial rows by checking for value, then defaultValue, then falling back to empty rows.
  const rows =
    value && value.length > 0
      ? value
      : field.defaultValue && field.defaultValue.length > 0
      ? field.defaultValue
      : Array.from({ length: field.minRows || 1 }, () =>
          Object.fromEntries(field.columns.map((col) => [col.key, ""]))
        );

  // 2. We use a useEffect to ensure that if we load the component and it uses default values,
  // we pass those up to the main form state immediately so the data isn't lost.
  useEffect(() => {
    if ((!value || value.length === 0) && field.defaultValue && field.defaultValue.length > 0) {
      onChange(field.defaultValue);
    }
  }, []); // Run only once on mount

  const handleCellChange = (rowIndex: number, key: string, cellValue: any) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex] = { ...updatedRows[rowIndex], [key]: cellValue };
    onChange(calculateTableRows(field.name, updatedRows));
  };

  const addRow = () => {
    const updated = [
      ...rows,
      Object.fromEntries(field.columns.map((col) => [col.key, ""])),
    ];
    onChange(calculateTableRows(field.name, updated));
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <label style={{ display: "block", fontWeight: 600, marginBottom: 10 }}>
        {field.label}
      </label>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {field.columns.map((col) => (
                <th
                  key={col.key}
                  style={{ border: "1px solid #ccc", padding: 8, textAlign: "left" }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {field.columns.map((col) => (
                  <td key={col.key} style={{ border: "1px solid #ccc", padding: 8 }}>
                    {col.type === "textarea" ? (
                      <textarea
                        value={row[col.key] || ""}
                        onChange={(e) => handleCellChange(rowIndex, col.key, e.target.value)}
                        style={{ width: "100%", minHeight: 70 }}
                        readOnly={col.readOnly || col.computed}
                      />
                    ) : col.type === "select" ? (
                      <select
                        value={row[col.key] || ""}
                        onChange={(e) => handleCellChange(rowIndex, col.key, e.target.value)}
                        style={{ width: "100%" }}
                        disabled={col.readOnly || col.computed}
                      >
                        <option value="">Select...</option>
                        {col.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={col.type}
                        value={row[col.key] || ""}
                        onChange={(e) => handleCellChange(rowIndex, col.key, e.target.value)}
                        style={{ width: "100%" }}
                        readOnly={col.readOnly || col.computed}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="button" onClick={addRow} style={{ marginTop: 10 }}>
        Add Row
      </button>
    </div>
  );
};

export default TableRenderer;