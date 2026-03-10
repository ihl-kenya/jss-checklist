import React from "react";
import SectionTemplate from "../common/SectionTemplate";
import { section3 } from "../../schema/sections/section3";

interface Props {
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const Section3: React.FC<Props> = ({ formData, onChange }) => {
  return <SectionTemplate section={section3} formData={formData} onChange={onChange} />;
};

export default Section3;
