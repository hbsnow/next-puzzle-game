import React, { FC } from "react";

const Layout: FC = ({ children }) => {
  return <div>{children}</div>;
};

const LayoutHeader: FC = ({ children }) => {
  return <div>{children}</div>;
};

const LayoutBody: FC = ({ children }) => {
  return <div>{children}</div>;
};

const LayoutFooter: FC = ({ children }) => {
  return <div>{children}</div>;
};

export { Layout, LayoutHeader, LayoutBody, LayoutFooter };
