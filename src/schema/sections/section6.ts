import type { FormSection } from "../../types/form";
import { makeSectionSummary, yesNoOptions } from "../../utils/helpers";

export const section6: FormSection = {
  id: "section6",
  title: "6. Pharmacovigilance",
  groups: [
    {
      title: "Observations",
      fields: [
        {
          name: "pvFormsAvailable",
          label: "Are there pharmacovigilance reporting forms/PVERS in the facility?",
          type: "radio",
          options: yesNoOptions,
        },
        {
          name: "pvEventsReported",
          label: "Any pharmacovigilance events reported from facility to PPB?",
          type: "radio",
          options: yesNoOptions,
        },
        {
          name: "suspectedPoorQualityProducts",
          label: "In last 6 months, have you had suspected poor quality products?",
          type: "radio",
          options: yesNoOptions,
        },
        {
          name: "poorQualityProductsTable",
          label: "List poor quality products",
          type: "table",
          columns: [
            { key: "category", label: "Category", type: "text" },
            { key: "genericName", label: "Generic Name", type: "text" },
            { key: "poorQualityAspect", label: "Aspect of poor quality", type: "textarea" },
          ],
          minRows: 3,
        },
        {
          name: "reportsSubmittedToPpb",
          label: "Have reports for suspected poor quality products been submitted to PPB?",
          type: "radio",
          options: yesNoOptions,
        },
        {
          name: "pvTrainingSessions",
          label: "How many training events/sessions for pharmacovigilance in previous 1 year?",
          type: "number",
        },
        {
          name: "adverseEventsReported",
          label: "Has the facility reported any adverse events in the last 1 year?",
          type: "radio",
          options: yesNoOptions,
        },
        { name: "adverseEventsCount", label: "If yes, how many?", type: "number" },
        {
          name: "challengeSubmittingReports",
          label: "If no report was submitted, was there a challenge in submitting to PPB?",
          type: "radio",
          options: yesNoOptions,
        },
        {
          name: "mtcPvActivities",
          label: "Within previous 3 months, has MTC carried out pharmacovigilance activities?",
          type: "radio",
          options: yesNoOptions,
        },
        makeSectionSummary("Pharmacovigilance"),
      ],
    },
  ],
};
