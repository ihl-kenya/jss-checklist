import React from "react";
import SectionTemplate from "../common/SectionTemplate";
// IMPORT the schema we just built instead of hardcoding it here!
import { section7 } from "../../schema/sections/section7"; 

interface Props {
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const Section7: React.FC<Props> = ({ formData, onChange }) => {
  return <SectionTemplate section={section7} formData={formData} onChange={onChange} />;
};

export default Section7;