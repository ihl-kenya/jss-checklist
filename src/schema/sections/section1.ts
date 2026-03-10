import type { FormSection } from "../../types/form";
import {
  availableOptions,
  makeSectionSummary,
  yesNoOptions,
} from "../../utils/helpers";

const positionOptions = [
  "Facility in charge",
  "Pharmacist",
  "Pharmaceutical technologist",
  "Nursing manager",
  "Laboratory officer",
  "Nutritionist",
  "Public health officer",
  "Other",
].map((item) => ({ label: item, value: item.toLowerCase().replace(/\s+/g, "_") }));

export const section1: FormSection = {
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
        { name: "respondentName", label: "Name of Respondent", type: "text" },
        { name: "county", label: "County", type: "text" },
        {
          name: "respondentPosition",
          label: "Position/Designation of Respondent",
          type: "select",
          options: positionOptions,
        },
        { name: "subCounty", label: "Sub-county", type: "text" },
        { name: "respondentPhone", label: "Tel. Contact of Respondent", type: "text" },
      ],
    },
    {
      title: "B. Facility Management/Governance",
      fields: [
        {
          name: "facilityManagementTeam",
          label: "Facility Management Team",
          type: "select",
          options: availableOptions,
        },
        {
          name: "facilityManagementMembers",
          label: "Facility Management Team Members",
          type: "table",
          columns: [
            { key: "no", label: "No", type: "number" },
            {
              key: "position",
              label: "Position/Designation",
              type: "select",
              options: positionOptions,
            },
          ],
          minRows: 7,
        },
        {
          name: "facilityManagementMinutes",
          label: "Minutes of meetings",
          type: "select",
          options: availableOptions,
        },
        {
          name: "facilityManagementLastMeetingDate",
          label: "Date of last meeting",
          type: "date",
        },

        {
          name: "qualityImprovementTeam",
          label: "Facility Quality Improvement Team",
          type: "select",
          options: availableOptions,
        },
        {
          name: "qualityImprovementMembers",
          label: "Quality Improvement Team Members",
          type: "table",
          columns: [
            { key: "no", label: "No", type: "number" },
            {
              key: "position",
              label: "Position/Designation",
              type: "select",
              options: positionOptions,
            },
          ],
          minRows: 7,
        },
        {
          name: "qualityImprovementMinutes",
          label: "Minutes of meetings",
          type: "select",
          options: availableOptions,
        },
        {
          name: "qualityImprovementLastMeetingDate",
          label: "Date of last meeting",
          type: "date",
        },

        {
          name: "mtcAvailable",
          label: "Medicines and Therapeutics Committee (if Hospital)",
          type: "select",
          options: availableOptions,
        },
        {
          name: "mtcMembers",
          label: "MTC Core Members",
          type: "table",
          columns: [
            { key: "no", label: "No", type: "number" },
            {
              key: "position",
              label: "Position/Designation",
              type: "select",
              options: positionOptions,
            },
          ],
          minRows: 7,
        },
        {
          name: "mtcMinutes",
          label: "Minutes of meetings",
          type: "select",
          options: availableOptions,
        },
        { name: "mtcLastMeetingDate", label: "Date of last meeting", type: "date" },

        {
          name: "hptReceiptFocalPersons",
          label: "HPT Receipt Focal Person(s)",
          type: "multiselect",
          options: positionOptions,
        },
        { name: "hptReceiptOther", label: "Other focal person (specify)", type: "text" },
        {
          name: "advanceDeliveryAlert",
          label: "Facility received advance alert of dispatch/delivery time",
          type: "radio",
          options: yesNoOptions,
        },

        {
          name: "wasteDisposalCommitteeMembers",
          label: "Waste Management/Disposal Committee Members",
          type: "table",
          columns: [
            { key: "no", label: "No", type: "number" },
            {
              key: "position",
              label: "Position/Designation",
              type: "select",
              options: positionOptions,
            },
          ],
          minRows: 6,
        },
        {
          name: "wasteDisposalDocs",
          label: "Relevant documentation e.g. FO58, minutes",
          type: "select",
          options: availableOptions,
        },
        { name: "lastDisposalDate", label: "Date of last disposal activity", type: "date" },
      ],
    },
    {
      title: "C. Treatment Services Offered",
      fields: [
        {
          name: "treatmentServices",
          label: "Treatment Services Offered",
          type: "table",
          columns: [
            { key: "service", label: "Service", type: "text" },
            { key: "available", label: "Yes/No", type: "select", options: yesNoOptions },
          ],
          minRows: 8,
        },
      ],
    },
    {
      title: "D. Laboratory Tests Offered",
      fields: [
        {
          name: "hasLaboratory",
          label: "Is there a laboratory in the facility?",
          type: "radio",
          options: yesNoOptions,
        },
        {
          name: "laboratoryTests",
          label: "Laboratory Tests Offered",
          type: "table",
          columns: [
            { key: "test", label: "Test", type: "text" },
            { key: "available", label: "Yes/No", type: "select", options: yesNoOptions },
          ],
          minRows: 12,
        },
        makeSectionSummary("Facility Governance and Services"),
      ],
    },
  ],
};
