import type { FormSection } from "../../types/form";
import { makeSectionSummary, yesNoOptions } from "../../utils/helpers";

export const section7: FormSection = {
  id: "section7",
  title: "7. Stock Movement Management and Record Keeping",
  groups: [
    {
      title: "Fact Finding",
      fields: [
        { name: "unitSizeDefinition", label: "Define unit size", type: "text" },
        { name: "costReferenceSource", label: "Cost reference source", type: "text" },
        {
          name: "requiredDocuments",
          label: "Required documents",
          type: "textarea",
          helperText: "Example: Bin cards, S-11, delivery notes, DARs",
        },
      ],
    },
    {
      title: "Table: Stock Movement",
      fields: [
        {
          name: "stockMovementTable",
          label: "Stock Movement",
          type: "table",
          columns: [
            { key: "product", label: "Tracer Product", type: "text" },
            { key: "physicalCount", label: "Physical count", type: "number" },
            { key: "stockCardCount", label: "Stock card count", type: "number" },
            { key: "variance", label: "Variance", type: "number" },
            { key: "unitCost", label: "Unit cost", type: "number" },
            { key: "varianceValue", label: "Value of variance", type: "number" },
            { key: "stockOut3Months", label: "Stock-out in last 3 months", type: "select", options: yesNoOptions },
            { key: "stockOutDays", label: "Total days stocked out", type: "number" },
            { key: "deliveryNoteNo", label: "Latest delivery note no", type: "text" },
            { key: "deliveryEndorsed", label: "Delivery note endorsed", type: "select", options: yesNoOptions },
            { key: "qtyIssuedSupplier", label: "Qty issued by KEMSA/MEDS", type: "number" },
            { key: "qtyReceivedFacility", label: "Qty received by HF", type: "number" },
            { key: "deliveryDiscrepancy", label: "Discrepancy", type: "number" },
            { key: "discrepancyReason", label: "Reason for discrepancy", type: "textarea" },
            { key: "discrepancyValue", label: "Discrepancy value", type: "number" },
            { key: "resolutionAssessment", label: "How discrepancy is documented/resolved", type: "textarea" },
            { key: "electronicBinCard", label: "Electronic bin cards?", type: "select", options: yesNoOptions },
          ],
          minRows: 10,
        },
        {
          name: "issuesToLowerFacilities",
          label: "Issues to Other/Lower Health Facilities",
          type: "table",
          columns: [
            { key: "product", label: "Tracer Product", type: "text" },
            { key: "issuedToOtherHfs", label: "Issued to other HFs?", type: "select", options: yesNoOptions },
            { key: "qtyBinCard", label: "Qty as per bin card", type: "number" },
            { key: "qtyS11", label: "Qty as per S11", type: "number" },
            { key: "variance", label: "Variance", type: "number" },
            { key: "varianceValue", label: "Value of variance", type: "number" },
          ],
          minRows: 10,
        },
        {
          name: "storeToDispensingUnit",
          label: "From HF Store to Dispensing Unit",
          type: "table",
          columns: [
            { key: "product", label: "Tracer Product", type: "text" },
            { key: "recordsKept", label: "Records kept?", type: "select", options: yesNoOptions },
            { key: "qtyIssuedStore", label: "Qty issued from store", type: "number" },
            { key: "qtyReceivedDispensing", label: "Qty received by dispensing unit", type: "number" },
            { key: "difference", label: "Difference", type: "number" },
            { key: "reasonVariance", label: "Reason for variance", type: "textarea" },
            { key: "varianceValue", label: "Value of variance", type: "number" },
          ],
          minRows: 10,
        },
        {
          name: "stockMovementAnalysis",
          label: "Stock Movement Analysis (Past Calendar Year)",
          type: "table",
          columns: [
            { key: "product", label: "Tracer Product", type: "text" },
            { key: "openingStock", label: "Opening stock (A)", type: "number" },
            { key: "qtyReceived", label: "Qty received (B)", type: "number" },
            { key: "closingBalance", label: "Closing balance (C)", type: "number" },
            { key: "reconciliation", label: "Reconciliation (D=A+B-C)", type: "number" },
            { key: "qtyActuallyIssued", label: "Qty actually issued (E)", type: "number" },
            { key: "difference", label: "Difference (F=D-E)", type: "number" },
            { key: "reasons", label: "Reasons for differences", type: "textarea" },
            { key: "varianceValue", label: "Value of variance", type: "number" },
          ],
          minRows: 10,
        },
        makeSectionSummary("Stock Movement Management & Record Keeping"),
      ],
    },
  ],
};
