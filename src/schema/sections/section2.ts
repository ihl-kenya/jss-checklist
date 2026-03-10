import type { FormSection } from "../../types/form";
import { doneOptions, makeSectionSummary, yesNoOptions } from "../../utils/helpers";

export const section2: FormSection = {
  id: "section2",
  title: "2. Human Resource Capacity Building",
  groups: [
    {
      title: "Focus on Commodity Management Supervision",
      fields: [
        {
          name: "receivedCommoditySupervisionVisit",
          label: "Received commodity management supervisory visit in last 3 months",
          type: "radio",
          options: yesNoOptions,
        },
        {
          name: "commoditySupervisionBy",
          label: "If yes, by who?",
          type: "multiselect",
          options: [
            { label: "National", value: "national" },
            { label: "CHMT", value: "chmt" },
            { label: "SCHMT", value: "schmt" },
            { label: "Partners", value: "partners" },
          ],
        },
        {
          name: "capacityBuildingDone",
          label: "Did supervision team perform capacity building on commodity management?",
          type: "radio",
          options: yesNoOptions,
        },
        {
          name: "capacityBuildingTopics",
          label: "Capacity Building Topics Covered",
          type: "table",
          columns: [
            { key: "no", label: "No", type: "number" },
            { key: "topic", label: "Topic", type: "text" },
            { key: "covered", label: "Yes/No", type: "select", options: yesNoOptions },
          ],
          minRows: 7,
        },
        {
          name: "previousActionPoints",
          label: "Action points agreed upon at last supervision visit",
          type: "table",
          columns: [
            { key: "actionPoint", label: "Previous Action point", type: "textarea" },
            { key: "status", label: "Status", type: "select", options: doneOptions },
            { key: "reasonNotDone", label: "Reason for Not Done", type: "textarea" },
          ],
          minRows: 4,
        },
        {
          name: "staffTrainedCommodityManagement",
          label: "Any departmental staff attended commodity management training in last 1 year?",
          type: "radio",
          options: yesNoOptions,
        },
        { name: "numberTrained", label: "No. trained", type: "number" },
        { name: "trainingDuration", label: "Duration of training", type: "text" },
        { name: "trainingTopic", label: "Topic of training", type: "text" },
        {
          name: "hasCME",
          label: "Does the facility have a CME system/structure?",
          type: "radio",
          options: yesNoOptions,
        },
        {
          name: "cmeFrequency",
          label: "How often are CMEs done?",
          type: "select",
          options: [
            { label: "Weekly", value: "weekly" },
            { label: "Monthly", value: "monthly" },
            { label: "Quarterly", value: "quarterly" },
            { label: "Adhoc", value: "adhoc" },
          ],
        },
      ],
    },
    {
      title: "Focus on Commodity Data Quality Assurance (DQA)",
      fields: [
        {
          name: "receivedDqaVisit",
          label: "Received a DQA visit in the last 3 months",
          type: "radio",
          options: yesNoOptions,
        },
        {
          name: "dqaVisitBy",
          label: "If yes, by who?",
          type: "multiselect",
          options: [
            { label: "National", value: "national" },
            { label: "CHMT", value: "chmt" },
            { label: "SCHMT", value: "schmt" },
            { label: "Partners", value: "partners" },
          ],
        },
        {
          name: "dqaRecommendationsReceived",
          label: "Received recommendations/capacity building to improve DQA",
          type: "radio",
          options: yesNoOptions,
        },
        {
          name: "hasDqaReport",
          label: "Do you have a copy of DQA findings/recommendations report?",
          type: "radio",
          options: yesNoOptions,
        },
        { name: "dqaReportDate", label: "Date on evidence/report", type: "date" },
        makeSectionSummary("Human Resource Capacity Building"),
      ],
    },
  ],
};
