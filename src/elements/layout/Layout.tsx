import React from "react";

const Layout: React.FC = ({ children }) => {
  return <div>{children}</div>;
};

const LayoutHeader: React.FC = ({ children }) => {
  return <div>{children}</div>;
};

const LayoutBody: React.FC = ({ children }) => {
  return <div>{children}</div>;
};

const LayoutFooter: React.FC = ({ children }) => {
  return <div>{children}</div>;
};

export { Layout, LayoutHeader, LayoutBody, LayoutFooter };
