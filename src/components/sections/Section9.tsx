import React from "react";
import SectionTemplate from "../common/SectionTemplate";
import type { FormSection } from "../../types/form";

const section9: FormSection = {
  id: "section9",
  title: "9. End-of-Visit Summary Overview",
  groups: [
    {
      title: "Overview Table 1: Best Practices / Gaps + Root Cause Analysis",
      fields: [
        {
          name: "overviewTable1",
          label: "Best Practices / Gaps / Root Causes",
          type: "table",
          readOnly: true,
          columns: [
            { key: "thematicArea", label: "Thematic Area", type: "text", readOnly: true },
            { key: "bestPractice", label: "Best Practices", type: "textarea", readOnly: true },
            { key: "mainIssues", label: "Main Issues/Gaps Identified", type: "textarea", readOnly: true },
            { key: "underlyingCauses", label: "Underlying Causes", type: "textarea", readOnly: true },
          ],
          minRows: 8,
        },
      ],
    },
    {
      title: "Overview Table 2: Action Plan",
      fields: [
        {
          name: "overviewTable2",
          label: "Action Plan",
          type: "table",
          readOnly: true,
          columns: [
            { key: "thematicArea", label: "Thematic Area", type: "text", readOnly: true },
            { key: "issueGap", label: "Issue/Gap Identified", type: "textarea", readOnly: true },
            { key: "desiredResult", label: "Desired result", type: "textarea", readOnly: true },
            { key: "actionRequired", label: "Action required", type: "textarea", readOnly: true },
            { key: "responsiblePerson", label: "Responsible person / office", type: "text", readOnly: true },
            { key: "resourcesNeeded", label: "Resources Needed", type: "textarea", readOnly: true },
            { key: "completionDate", label: "Completion Date", type: "date", readOnly: true },
          ],
          minRows: 8,
        },
      ],
    },
  ],
};

interface Props {
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const Section9: React.FC<Props> = ({ formData, onChange }) => {
  return <SectionTemplate section={section9} formData={formData} onChange={onChange} />;
};

export default Section9;