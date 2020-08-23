import React, { FC } from "react";

import { useSelector } from "react-redux";

import {
  Layout,
  LayoutHeader,
  LayoutBody,
  LayoutFooter,
} from "../components/layout/Layout";
import { useSignOut } from "../hooks/signOut";
import { RootState } from "../store";

export const AppTemplate: FC = ({ children }) => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { signOut } = useSignOut();

  return (
    <Layout>
      <LayoutHeader>
        <h1>キラポケモンをシェアするやつ</h1>
        {userInfo?.displayName}
        {userInfo && <img src={userInfo.photoURL} alt={userInfo.displayName} />}
        <button onClick={signOut}>logout</button>
      </LayoutHeader>
      <LayoutBody>{children}</LayoutBody>
      <LayoutFooter></LayoutFooter>
    </Layout>
  );
};
