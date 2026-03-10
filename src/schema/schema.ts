import type { FormSection } from "../types/form";
import { slugify } from "../utils/helpers";

const makeSectionSummary = (thematicArea: string) => ({
  type: "sectionSummary" as const,
  name: `${slugify(thematicArea)}Conclusion`,
  label: "IN CONCLUSION",
  thematicArea,
  columns: [
    { key: "bestPractice", label: "Best Practice, if any", type: "textarea" as const },
    { key: "keyIssueGap", label: "Key Issue/Gap Identified, if any", type: "textarea" as const },
    {
      key: "underlyingCause",
      label: "Underlying Cause for Issue/Gap Identified, if any",
      type: "textarea" as const,
    },
  ],
  minRows: 3,
});

export const formSections: FormSection[] = [
  {
    id: "section1",
    title: "1. Facility Governance and Services",
    groups: [
      {
        title: "A. General",
        fields: [
          { name: "facilityName", label: "Facility Name", type: "text" },
          { name: "dateOfVisit", label: "Date of Visit", type: "date" },
          { name: "facilityMflCode", label: "Facility MFL Code", type: "text" },
          { name: "supervisionTeamNo", label: "Supervision Team No", type: "text" },
          { name: "facilityLevel", label: "Facility Level", type: "text" },
          { name: "teamLeader", label: "Name of Supervision Team Leader", type: "text" },
          {
            name: "ownership",
            label: "Ownership",
            type: "select",
            options: [
              { label: "MoH", value: "moh" },
              { label: "FBO", value: "fbo" },
              { label: "Private", value: "private" },
              { label: "Others", value: "others" },
            ],
          },
        ],
      },
      {
        title: "B. Governance Findings",
        fields: [
          {
            name: "governanceTable",
            label: "Governance Assessment",
            type: "table",
            columns: [
              { key: "indicator", label: "Indicator", type: "text" },
              { key: "response", label: "Response", type: "select", options: [
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
                { label: "Partial", value: "partial" },
              ] },
              { key: "remarks", label: "Remarks", type: "textarea" },
            ],
            minRows: 5,
          },
          makeSectionSummary("Facility Governance and Services"),
        ],
      },
    ],
  },

  {
    id: "section2",
    title: "2. Leadership and Coordination",
    groups: [
      {
        title: "Assessment",
        fields: [
          {
            name: "leadershipTable",
            label: "Leadership Assessment",
            type: "table",
            columns: [
              { key: "indicator", label: "Indicator", type: "text" },
              { key: "score", label: "Score", type: "number" },
              { key: "comments", label: "Comments", type: "textarea" },
            ],
            minRows: 4,
          },
          makeSectionSummary("Leadership and Coordination"),
        ],
      },
    ],
  },

  {
    id: "section3",
    title: "3. Human Resources for Health Products Management",
    groups: [
      {
        title: "Assessment",
        fields: [
          {
            name: "hrTable",
            label: "HR Assessment",
            type: "table",
            columns: [
              { key: "item", label: "Item", type: "text" },
              { key: "status", label: "Status", type: "select", options: [
                { label: "Available", value: "available" },
                { label: "Not Available", value: "not_available" },
              ] },
              { key: "remarks", label: "Remarks", type: "textarea" },
            ],
            minRows: 4,
          },
          makeSectionSummary("Human Resources for Health Products Management"),
        ],
      },
    ],
  },

  {
    id: "section4",
    title: "4. Health Product Availability and Stock Management",
    groups: [
      {
        title: "Assessment",
        fields: [
          {
            name: "stockManagementTable",
            label: "Stock Management",
            type: "table",
            columns: [
              { key: "commodity", label: "Commodity", type: "text" },
              { key: "availability", label: "Availability", type: "select", options: [
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ] },
              { key: "notes", label: "Notes", type: "textarea" },
            ],
            minRows: 5,
          },
          makeSectionSummary("Health Product Availability and Stock Management"),
        ],
      },
    ],
  },

  {
    id: "section5",
    title: "5. Storage Management",
    groups: [
      {
        title: "Assessment",
        fields: [
          {
            name: "storageTable",
            label: "Storage Conditions",
            type: "table",
            columns: [
              { key: "condition", label: "Condition", type: "text" },
              { key: "compliance", label: "Compliance", type: "select", options: [
                { label: "Compliant", value: "compliant" },
                { label: "Non-Compliant", value: "non_compliant" },
              ] },
              { key: "remarks", label: "Remarks", type: "textarea" },
            ],
            minRows: 5,
          },
          makeSectionSummary("Storage Management"),
        ],
      },
    ],
  },

  {
    id: "section6",
    title: "6. Rational Use of Medicines",
    groups: [
      {
        title: "Assessment",
        fields: [
          {
            name: "rumTable",
            label: "Rational Use Assessment",
            type: "table",
            columns: [
              { key: "indicator", label: "Indicator", type: "text" },
              { key: "response", label: "Response", type: "select", options: [
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ] },
              { key: "comments", label: "Comments", type: "textarea" },
            ],
            minRows: 4,
          },
          makeSectionSummary("Rational Use of Medicines"),
        ],
      },
    ],
  },

  {
    id: "section7",
    title: "7. Laboratory Commodities Management",
    groups: [
      {
        title: "Assessment",
        fields: [
          {
            name: "labTable",
            label: "Laboratory Commodities",
            type: "table",
            columns: [
              { key: "item", label: "Item", type: "text" },
              { key: "status", label: "Status", type: "select", options: [
                { label: "Adequate", value: "adequate" },
                { label: "Inadequate", value: "inadequate" },
              ] },
              { key: "remarks", label: "Remarks", type: "textarea" },
            ],
            minRows: 4,
          },
          makeSectionSummary("Laboratory Commodities Management"),
        ],
      },
    ],
  },

  {
    id: "section8",
    title: "8. Health Information Systems and Reporting",
    groups: [
      {
        title: "Assessment",
        fields: [
          {
            name: "hisTable",
            label: "Reporting and HIS",
            type: "table",
            columns: [
              { key: "tool", label: "Tool/Report", type: "text" },
              { key: "available", label: "Available", type: "select", options: [
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ] },
              { key: "remarks", label: "Remarks", type: "textarea" },
            ],
            minRows: 4,
          },
          makeSectionSummary("Health Information Systems and Reporting"),
        ],
      },
    ],
  },

  {
    id: "section9",
    title: "9. Final Summary and Action Points",
    groups: [
      {
        title: "Final Recommendations",
        fields: [
          {
            name: "finalActionPoints",
            label: "Final Action Points",
            type: "table",
            columns: [
              { key: "issue", label: "Issue", type: "textarea" },
              { key: "action", label: "Recommended Action", type: "textarea" },
              { key: "responsible", label: "Responsible Person", type: "text" },
              { key: "timeline", label: "Timeline", type: "text" },
            ],
            minRows: 5,
          },
        ],
      },
    ],
  },
];
