import React from "react";

import { useSelector } from "react-redux";

import {
  Layout,
  LayoutHeader,
  LayoutBody,
  LayoutFooter,
} from "../components/layout/Layout";
import { useSignOut } from "../hooks/signOut";
import { RootState } from "../store";

export const AppTemplate: React.FC = ({ children }) => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { signOut } = useSignOut();

  return (
    <Layout>
      <LayoutHeader>
        <h1>Lucky Pokemon Share</h1>
        {userInfo?.displayName}
        {userInfo && <img src={userInfo.photoURL} alt={userInfo.displayName} />}
        <button onClick={signOut}>Sign Out</button>
      </LayoutHeader>
      <LayoutBody>{children}</LayoutBody>
      <LayoutFooter>footer</LayoutFooter>
    </Layout>
  );
};
