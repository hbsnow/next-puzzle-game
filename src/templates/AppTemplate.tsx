import React from "react";

import { AppFooter } from "../elements/app/AppFooter";
import { AppHeader } from "../elements/app/AppHeader";
import {
  Layout,
  LayoutHeader,
  LayoutBody,
  LayoutFooter,
} from "../elements/layout/Layout";

export const AppTemplate: React.FC = ({ children }) => {
  return (
    <Layout>
      <LayoutHeader>
        <header>
          <AppHeader />
        </header>
      </LayoutHeader>
      <LayoutBody>{children}</LayoutBody>
      <LayoutFooter>
        <footer>
          <AppFooter />
        </footer>
      </LayoutFooter>
    </Layout>
  );
};
