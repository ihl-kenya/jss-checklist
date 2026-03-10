import type { TableField } from "../types/form";

export const slugify = (value: string) =>
 value
   .toLowerCase()
   .replace(/&/g, "and")
   .replace(/[^a-z0-9]+/g, "-")
   .replace(/(^-|-$)/g, "");

export const yesNoOptions = [
 { label: "Yes", value: "yes" },
 { label: "No", value: "no" },
];

export const availableOptions = [
 { label: "Available", value: "available" },
 { label: "Not available", value: "not_available" },
];

export const doneOptions = [
 { label: "Done", value: "done" },
 { label: "Not Done", value: "not_done" },
];

export const makeSectionSummary = (title: string, customName?: string) => ({
  name: customName || "sectionSummary", 
  label: `${title} Conclusion`,
  type: "sectionSummary" as const,
  thematicArea: title,
  columns: [
    { key: "bestPractice", label: "Best Practices", type: "textarea" as const },
    { key: "keyIssueGap", label: "Key Issue/Gap", type: "textarea" as const },
    { key: "underlyingCause", label: "Underlying Cause", type: "textarea" as const },
  ],
});

export const makeSimpleYesNoTable = (
 name: string,
 label: string,
 items: string[]
): TableField => ({
 type: "table",
 name,
 label,
 columns: [
   { key: "item", label: "Item", type: "text" },
   { key: "response", label: "Yes / No", type: "select", options: yesNoOptions },
   { key: "remarks", label: "Remarks", type: "textarea" },
 ],
 minRows: items.length,
});
