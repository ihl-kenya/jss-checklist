
import React from "react";
import SectionTemplate from "../common/SectionTemplate";
import { section2 } from "../../schema/sections/section2";

interface Props {
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const Section2: React.FC<Props> = ({ formData, onChange }) => {
  return <SectionTemplate section={section2} formData={formData} onChange={onChange} />;
};

export default Section2;
