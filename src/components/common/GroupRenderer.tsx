import React from "react";
import type { FieldGroup } from "../../types/form";
import FieldRenderer from "./FieldRender"; 

interface Props {
  group: FieldGroup;
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const GroupRenderer: React.FC<Props> = ({ group, formData, onChange }) => {
  return (
    <div style={{ marginBottom: 28 }}>
      {group.title && <h3 style={{ marginBottom: 14 }}>{group.title}</h3>}

      {group.fields.map((field) => (
        <FieldRenderer
          key={field.name}
          field={field}
          value={formData[field.name]}
          formData={formData}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default GroupRenderer;