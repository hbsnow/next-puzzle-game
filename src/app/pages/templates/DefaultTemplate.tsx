import React, { FC } from "react";

const DefaultTemplate: FC = ({ children }) => {
  return (
    <div className="root">
      <div className="header">header</div>
      <main>{children}</main>
      <div className="footer">footer</div>
    </div>
  );
};

export default DefaultTemplate;
