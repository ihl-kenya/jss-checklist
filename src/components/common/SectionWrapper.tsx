import React from "react";

interface Props {
 title: string;
 children: React.ReactNode;
}

const SectionWrapper: React.FC<Props> = ({ title, children }) => {
 return (
   <div style={{ padding: 20, border: "1px solid #ddd", borderRadius: 12, marginBottom: 24 }}>
     <h2 style={{ marginBottom: 20 }}>{title}</h2>
     {children}
   </div>
 );
};

export default SectionWrapper;
