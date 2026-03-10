import React from "react";
import SectionTemplate from "../common/SectionTemplate";
import { section6 } from "../../schema/sections/section6";

interface Props {
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const Section6: React.FC<Props> = ({ formData, onChange }) => {
  return <SectionTemplate section={section6} formData={formData} onChange={onChange} />;
};

export default Section6;
