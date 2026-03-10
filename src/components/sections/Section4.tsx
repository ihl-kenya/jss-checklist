import React from "react";
import SectionTemplate from "../common/SectionTemplate";
import { section4 } from "../../schema/sections/section4";

interface Props {
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const Section4: React.FC<Props> = ({ formData, onChange }) => {
  return <SectionTemplate section={section4} formData={formData} onChange={onChange} />;
};

export default Section4;
