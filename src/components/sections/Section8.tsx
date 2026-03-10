import React from "react";
import SectionTemplate from "../common/SectionTemplate";
import type { FormSection } from "../../types/form";
import { makeSectionSummary } from "../../utils/helpers";

const section8: FormSection = {
  id: "section8",
  title: "8. Patient and Commodity Data Triangulation",
  groups: [
    {
      title: "Malaria: Screening vs mRDT Issues",
      fields: [
        {
          name: "malariaScreeningVsMrdt",
          label: "Malaria Screening vs mRDT Issues (past 3 months)",
          type: "table",
          columns: [
            { key: "month", label: "Month", type: "text" },
            { key: "peopleTested", label: "People tested for malaria", type: "number" },
            { key: "mrdtConsumed", label: "mRDT consumed", type: "number" },
            { key: "ratio", label: "% tested / mRDT issued", type: "number", computed: true },
            { key: "varianceReason", label: "Reason for variance", type: "textarea" },
          ],
          minRows: 3,
        },
      ],
    },
    {
      title: "Malaria: Positive Cases / Treated vs AL Supplied",
      fields: [
        {
          name: "malariaTreatmentTriangulation",
          label: "Malaria Positive Cases and AL Treatments",
          type: "table",
          columns: [
            { key: "month", label: "Month", type: "text" },
            { key: "positiveCases", label: "Positive cases", type: "number" },
            { key: "patientsTreated", label: "Patients treated", type: "number" },
            { key: "alIssued", label: "AL packs issued", type: "number" },
            { key: "ratio", label: "% AL issued / positive cases", type: "number", computed: true },
            { key: "varianceReason", label: "Reason for variance", type: "textarea" },
          ],
          minRows: 3,
        },
      ],
    },
    {
      title: "HIV: Screening vs HIV RDT Issues",
      fields: [
        {
          name: "hivScreeningVsRdt",
          label: "HIV Screening vs HIV RDT Issues",
          type: "table",
          columns: [
            { key: "month", label: "Month", type: "text" },
            { key: "peopleScreened", label: "People screened", type: "number" },
            { key: "trinscreenUsed", label: "Trinscreen consumed", type: "number" },
            { key: "ratio", label: "% screened / RDT issued", type: "number", computed: true },
            { key: "varianceReason", label: "Reason for variance", type: "textarea" },
          ],
          minRows: 3,
        },
      ],
    },
    {
      title: "HIV: Positive Cases / Put on Treatment vs ARVs Supplied",
      fields: [
        {
          name: "hivTreatmentTriangulation",
          label: "HIV Positive Cases and ARV Treatments",
          type: "table",
          columns: [
            { key: "month", label: "Month", type: "text" },
            { key: "positiveTests", label: "Positive HIV tests", type: "number" },
            { key: "putOnTreatment", label: "Patients put on treatment", type: "number" },
            { key: "arvsIssued", label: "ARV treatments issued", type: "number" },
            { key: "ratio", label: "% ARV issued / on treatment", type: "number", computed: true },
            { key: "varianceReason", label: "Reason for variance", type: "textarea" },
          ],
          minRows: 3,
        },
        makeSectionSummary(
          "Patient and Product Data Triangulation",
          "patientAndProductDataTriangulationConclusion"
        ),
      ],
    },
  ],
};

interface Props {
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const Section8: React.FC<Props> = ({ formData, onChange }) => {
  return <SectionTemplate section={section8} formData={formData} onChange={onChange} />;
};

export default Section8;