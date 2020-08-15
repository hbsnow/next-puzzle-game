import React, { FC } from "react";

import { Auth0ContextInterface } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

import {
  Layout,
  LayoutHeader,
  LayoutBody,
  LayoutFooter,
} from "../components/layout/Layout";
import { RootState } from "../store";

type Props = {
  logout: Auth0ContextInterface["logout"];
};

export const AppTemplate: FC<Props> = ({ logout, children }) => {
  const user = useSelector((state: RootState) => state.user.payload);
  console.log(user);

  return (
    <Layout>
      <LayoutHeader>
        <h1>キラポケモンをシェアするやつ</h1>
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          logout
        </button>
      </LayoutHeader>
      <LayoutBody>{children}</LayoutBody>
      <LayoutFooter></LayoutFooter>
    </Layout>
  );
};
