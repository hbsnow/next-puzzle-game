import React, { FC } from "react";

import { useAuth0 } from "@auth0/auth0-react";

import {
  Layout,
  LayoutHeader,
  LayoutBody,
  LayoutFooter,
} from "../components/layout/Layout";
import { LoginTemplate } from "./LoginTemplate";

const AuthGuardTemplate: FC = ({ children }) => {
  const { isAuthenticated, logout } = useAuth0();

  return isAuthenticated ? (
    <Layout>
      <LayoutHeader>
        <h1>Lucky Pokemon Share</h1>
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          logout
        </button>
      </LayoutHeader>
      <LayoutBody>{children}</LayoutBody>
      <LayoutFooter></LayoutFooter>
    </Layout>
  ) : (
    <LoginTemplate />
  );
};

export { AuthGuardTemplate };
