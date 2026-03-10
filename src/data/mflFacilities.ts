export interface MflFacilityRecord {
  mflCode: string;
  facilityName: string;
  county: string;
  subCounty: string;
  facilityLevel?: string;
  ownership?: string;
}

export const mflFacilities: MflFacilityRecord[] = [
  { mflCode: "12345", facilityName: "Sample County Referral Hospital", county: "Nairobi", subCounty: "Westlands", facilityLevel: "Level 5", ownership: "moh" },
  { mflCode: "23456", facilityName: "Sample Sub-County Hospital", county: "Kiambu", subCounty: "Thika", facilityLevel: "Level 4", ownership: "moh" },
  { mflCode: "34567", facilityName: "Sample Health Centre", county: "Machakos", subCounty: "Kathiani", facilityLevel: "Level 3", ownership: "fbo" },
];