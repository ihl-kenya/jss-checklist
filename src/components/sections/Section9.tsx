import React, { useEffect } from "react";
import SectionTemplate from "../common/SectionTemplate";
import { section9 } from "../../schema/sections/section9";

interface Props {
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const Section9: React.FC<Props> = ({ formData, onChange }) => {

  useEffect(() => {
    // 1. Map your keys to the actual Thematic Area names
    // Make sure these keys exactly match the customNames you passed to makeSectionSummary in sections 1-8!
    const summaryMappings = [
      { key: "section1Conclusion", title: "1. Health Facility Profile" },
      { key: "guidelinesConclusion", title: "3. Guidelines and SOPs" },
      { key: "availabilityAndUseOfRecordsAndReportingFormsConclusion", title: "4. Tools" },
      { key: "storageConditionsConclusion", title: "5. Storage Conditions" },
      { key: "stockMovementConclusion", title: "7. Stock Movement" },
      { key: "patientCommodityTriangulationConclusion", title: "8. Data Triangulation" }
      // Add any other sections you summarized!
    ];

    let aggregatedData: any[] = [];

    // 2. Loop through and gather the data
    summaryMappings.forEach(({ key, title }) => {
      const sectionData = formData[key];
      
      if (sectionData && Array.isArray(sectionData)) {
        // Filter out blank rows
        const filledRows = sectionData
          .filter((row) => row.bestPractice || row.mainIssues || row.underlyingCauses)
          .map((row) => ({
            ...row,
            thematicArea: title // <--- INJECT THE TITLE HERE
          }));
          
        aggregatedData = [...aggregatedData, ...filledRows];
      }
    });

    // 3. Push to Overview Table 1
    if (aggregatedData.length > 0) {
      onChange("overviewTable1", aggregatedData);
    }
  }, []); // Run once when component mounts

  return <SectionTemplate section={section9} formData={formData} onChange={onChange} />;
};

export default Section9;