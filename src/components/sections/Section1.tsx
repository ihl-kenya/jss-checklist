import React from "react";
import SectionTemplate from "../common/SectionTemplate";
import type { FormSection } from "../../types/form";
import { makeSectionSummary, yesNoOptions } from "../../utils/helpers";
import "../../App.css";

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

const section1: FormSection = {
  id: "section1",
  title: "1. Facility Governance and Services",
  groups: [
    {
      title: "A. General",
      fields: [
        { name: "facilityName", label: "Facility Name", type: "text", readOnly: true },
        { name: "dateOfVisit", label: "Date of Visit", type: "date" },
        {
          name: "facilityMflCode",
          label: "Facility MFL Code",
          type: "text",
          helperText: "Enter MFL Code (e.g., 12345) to auto-fill facility details.",
        },
        { name: "supervisionTeamNo", label: "Supervision Team No", type: "text" },
        { name: "facilityLevel", label: "Facility Level", type: "text", readOnly: true },
        { name: "teamLeader", label: "Name of Supervision Team Leader", type: "text" },
        {
          name: "ownership",
          label: "Ownership",
          type: "select",
          readOnly: true,
          options: [
            { label: "MoH", value: "moh" },
            { label: "FBO", value: "fbo" },
            { label: "Private", value: "private" },
            { label: "Others", value: "others" },
          ],
        },
        { name: "respondentName", label: "Name of Respondent", type: "text" },
        { name: "county", label: "County", type: "text", readOnly: true },
        {
          name: "respondentPosition",
          label: "Position/Designation of Respondent",
          type: "select",
          options: positionOptions,
        },
        { name: "subCounty", label: "Sub-county", type: "text", readOnly: true },
        { name: "respondentPhone", label: "Tel. Contact of Respondent", type: "text" },
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
          visibleWhen: [{ field: "hasLaboratory", equals: "yes" }],
          columns: [
            { key: "test", label: "Test", type: "text", readOnly: true },
            { key: "available", label: "Yes / No", type: "select", options: yesNoOptions },
          ],
          minRows: 10,
        },
        makeSectionSummary(
          "Facility Governance and Services",
          "facilityGovernanceAndServicesConclusion"
        ),
      ],
    },
  ],
};

interface Props {
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const Section1: React.FC<Props> = ({ formData, onChange }) => {
  return <SectionTemplate section={section1} formData={formData} onChange={onChange} />;
};

export default Section1;