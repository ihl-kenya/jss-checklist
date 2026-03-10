import React from "react";
import SectionTemplate from "../common/SectionTemplate";
import type { FormSection } from "../../types/form";
import { makeSectionSummary, yesNoOptions } from "../../utils/helpers";

const section7: FormSection = {
  id: "section7",
  title: "7. Stock Movement Management and Record Keeping",
  groups: [
    {
      title: "Stock Movement",
      fields: [
        {
          name: "stockMovementTable",
          label: "Stock Movement",
          type: "table",
          columns: [
            { key: "product", label: "Tracer Product", type: "text" },
            { key: "physicalCount", label: "Physical count", type: "number" },
            { key: "stockCardCount", label: "Stock card count", type: "number" },
            { key: "variance", label: "Variance", type: "number", computed: true },
            { key: "unitCost", label: "Unit cost", type: "number" },
            { key: "varianceValue", label: "Value of variance", type: "number", computed: true },
            { key: "stockOut3Months", label: "Stock-out in last 3 months", type: "select", options: yesNoOptions },
            { key: "stockOutDays", label: "Total days stocked out", type: "number" },
            { key: "deliveryNoteNo", label: "Delivery Note number", type: "text" },
            { key: "deliveryEndorsed", label: "Delivery note endorsed", type: "select", options: yesNoOptions },
            { key: "qtyIssuedSupplier", label: "Qty issued by KEMSA/MEDS", type: "number" },
            { key: "qtyReceivedFacility", label: "Qty received by HF", type: "number" },
            { key: "deliveryDiscrepancy", label: "Delivery discrepancy", type: "number", computed: true },
            { key: "discrepancyReason", label: "Reason for discrepancy", type: "textarea" },
            { key: "deliveryDiscrepancyValue", label: "Delivery discrepancy value", type: "number", computed: true },
            { key: "qtyBinCard", label: "Qty to other HFs as per Bin Card", type: "number" },
            { key: "qtyS11", label: "Qty to other HFs as per S11", type: "number" },
            { key: "issueVariance", label: "Issue variance", type: "number", computed: true },
            { key: "issueVarianceValue", label: "Issue variance value", type: "number", computed: true },
            { key: "qtyIssuedStore", label: "Qty issued from HF store", type: "number" },
            { key: "qtyReceivedDispensing", label: "Qty received by dispensing unit", type: "number" },
            { key: "storeDispensingDifference", label: "Store vs dispensing difference", type: "number", computed: true },
            { key: "storeDispensingReason", label: "Reason for store/dispensing variance", type: "textarea" },
            { key: "storeDispensingVarianceValue", label: "Store/dispensing variance value", type: "number", computed: true },
            { key: "openingStock", label: "Opening stock (A)", type: "number" },
            { key: "qtyReceived", label: "Qty received (B)", type: "number" },
            { key: "closingBalance", label: "Closing balance (C)", type: "number" },
            { key: "reconciliation", label: "Reconciliation (D=A+B-C)", type: "number", computed: true },
            { key: "qtyActuallyIssued", label: "Qty actually issued (E)", type: "number" },
            { key: "analysisDifference", label: "Difference (F=D-E)", type: "number", computed: true },
            { key: "analysisReason", label: "Reasons for differences", type: "textarea" },
            { key: "analysisVarianceValue", label: "Analysis variance value", type: "number", computed: true },
          ],
          minRows: 5,
        },
        makeSectionSummary(
          "Stock Movement Management and Record Keeping",
          "stockMovementManagementAndRecordKeepingConclusion"
        ),
      ],
    },
  ],
};

interface Props {
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const Section7: React.FC<Props> = ({ formData, onChange }) => {
  return <SectionTemplate section={section7} formData={formData} onChange={onChange} />;
};

export default Section7;