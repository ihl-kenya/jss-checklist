import React from "react";
import type { SectionSummaryField } from "../../types/form";

interface Props {
 field: SectionSummaryField;
 value: Record<string, any>[];
 onChange: (rows: Record<string, any>[]) => void;
}

const SectionSummaryTable: React.FC<Props> = ({ field, value = [], onChange }) => {
 const rows =
   value.length > 0
     ? value
     : Array.from({ length: field.minRows || 3 }, () =>
         Object.fromEntries(field.columns.map((col) => [col.key, ""]))
       );

 const handleCellChange = (rowIndex: number, key: string, cellValue: any) => {
   const updatedRows = [...rows];
   updatedRows[rowIndex] = { ...updatedRows[rowIndex], [key]: cellValue };
   onChange(updatedRows);
 };

 const addRow = () => {
   onChange([...rows, Object.fromEntries(field.columns.map((col) => [col.key, ""]))]);
 };

 return (
   <div style={{ marginTop: 24 }}>
     <h3>{field.label}</h3>
     <p>{field.thematicArea}</p>

     <div style={{ overflowX: "auto" }}>
       <table style={{ width: "100%", borderCollapse: "collapse" }}>
         <thead>
           <tr>
             {field.columns.map((col) => (
               <th key={col.key} style={{ border: "1px solid #ccc", padding: 8 }}>
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
                   <textarea
                     value={row[col.key] || ""}
                     onChange={(e) => handleCellChange(rowIndex, col.key, e.target.value)}
                     style={{ width: "100%", minHeight: 80 }}
                   />
                 </td>
               ))}
             </tr>
           ))}
         </tbody>
       </table>
     </div>

     <button type="button" onClick={addRow} style={{ marginTop: 10 }}>
       Add Summary Row
     </button>
   </div>
 );
};

export default SectionSummaryTable;
