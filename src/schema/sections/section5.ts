import type { FormSection } from "../../types/form";
import { makeSectionSummary, yesNoOptions } from "../../utils/helpers";

export const section5: FormSection = {
  id: "section5",
  title: "5. Storage Conditions",
  groups: [
    {
      title: "Observations",
      fields: [
        { name: "numberOfStores", label: "How many HPT stores does the facility have?", type: "number" },
        {
          name: "storeTypes",
          label: "If more than one, select store types",
          type: "multiselect",
          options: [
            { label: "Pharmaceuticals", value: "pharmaceuticals" },
            { label: "Medical supplies", value: "medical_supplies" },
            { label: "Laboratory", value: "laboratory" },
            { label: "Nutrition", value: "nutrition" },
          ],
        },
        {
          name: "storageObservations",
          label: "Storage Observations",
          type: "table",
          columns: [
            { key: "observation", label: "Observation", type: "text" },
            { key: "response", label: "Yes/No", type: "select", options: yesNoOptions },
            { key: "remarks", label: "Remarks", type: "textarea" },
          ],
          minRows: 18,
        },
        { name: "designatedStoreAccessPerson", label: "If yes, who accesses the store?", type: "text" },
        makeSectionSummary("Storage Conditions"),
      ],
    },
  ],
};
