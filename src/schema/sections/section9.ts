import type { FormSection } from "../../types/form";

export const section9: FormSection = {
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
          columns: [
            { key: "thematicArea", label: "Thematic Area", type: "text" },
            { key: "bestPractice", label: "Best Practices", type: "textarea" },
            { key: "mainIssues", label: "Main Issues/Gaps Identified", type: "textarea" },
            { key: "underlyingCauses", label: "Underlying Causes", type: "textarea" },
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
          columns: [
            { key: "thematicArea", label: "Thematic Area", type: "text" },
            { key: "issueGap", label: "Issue/Gap Identified", type: "textarea" },
            { key: "desiredResult", label: "Desired result", type: "textarea" },
            { key: "actionRequired", label: "Action required", type: "textarea" },
            { key: "responsiblePerson", label: "Responsible person / office", type: "text" },
            { key: "resourcesNeeded", label: "Resources Needed", type: "textarea" },
            { key: "completionDate", label: "Completion Date", type: "date" },
          ],
          minRows: 8,
        },
      ],
    },
  ],
};
