import React from "react";
import type { FormSection } from "../../types/form";
import SectionWrapper from "./SectionWrapper";
import GroupRenderer from "./GroupRenderer";

interface Props {
  section: FormSection;
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const SectionTemplate: React.FC<Props> = ({
  section,
  formData,
  onChange,
}) => {
  return (
    <SectionWrapper title={section.title}>
      {section.groups.map((group, index) => (
        <GroupRenderer
          key={index}
          group={group}
          formData={formData}
          onChange={onChange}
        />
      ))}
    </SectionWrapper>
  );
};

export default SectionTemplate;
