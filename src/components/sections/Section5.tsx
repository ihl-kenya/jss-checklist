import React from "react";
import SectionTemplate from "../common/SectionTemplate";
import { section5 } from "../../schema/sections/section5";

interface Props {
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const Section5: React.FC<Props> = ({ formData, onChange }) => {
  return <SectionTemplate section={section5} formData={formData} onChange={onChange} />;
};

export default Section5;
