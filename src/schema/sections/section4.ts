import type { FormSection } from "../../types/form";
import { makeSectionSummary, yesNoOptions } from "../../utils/helpers";

export const section4: FormSection = {
  id: "section4",
  title: "4. Availability and Use of Commodity Data Collection and Reporting Tools",
  groups: [
    {
      title: "Key Recording and Reporting Tools",
      fields: [
        {
          name: "recordingReportingTools",
          label: "Recording and Reporting Tools",
          type: "table",
          columns: [
            { key: "serviceArea", label: "Service Area", type: "text" },
            { key: "tool", label: "Tool", type: "text" },
            { key: "availability", label: "Availability for use", type: "select", options: yesNoOptions },
            { key: "completeness", label: "Completeness of current/last exemplar", type: "select", options: yesNoOptions },
            { key: "remarks", label: "Remarks", type: "textarea" },
          ],
          minRows: 22,
        },
        makeSectionSummary("Availability and Use of Records & Reporting Forms"),
      ],
    },
  ],
};
