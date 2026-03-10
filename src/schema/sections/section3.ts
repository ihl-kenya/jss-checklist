import type { FormSection } from "../../types/form";
import { makeSectionSummary, yesNoOptions } from "../../utils/helpers";

export const section3: FormSection = {
  id: "section3",
  title: "3. Availability of Guidelines, Algorithms, Job Aids and SOPs",
  groups: [
    {
      title: "Key Guidance Documents",
      fields: [
        {
          name: "guidanceDocuments",
          label: "Guidance Documents",
          type: "table",
          columns: [
            { key: "guideline", label: "Guideline", type: "text" },
            { key: "year", label: "Year of Publication", type: "text" },
            { key: "available", label: "Available Yes/No", type: "select", options: yesNoOptions },
          ],
          minRows: 8,
        },
        {
          name: "diagnosticAlgorithms",
          label: "Diagnostic Algorithms / SOPs / Job Aids",
          type: "table",
          columns: [
            { key: "category", label: "Category", type: "text" },
            { key: "available", label: "Available Yes/No", type: "select", options: yesNoOptions },
            { key: "year", label: "If yes, specify year", type: "text" },
          ],
          minRows: 11,
        },
        makeSectionSummary("Availability & Use of Guidelines and SOPs"),
      ],
    },
  ],
};
