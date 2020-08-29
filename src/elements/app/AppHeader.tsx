import React from "react";

import { useSelector } from "react-redux";

import { useSignOut } from "../../hooks/auth/signOut";
import { RootState } from "../../store";

export const AppHeader: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { signOut } = useSignOut();

  return (
    <>
      <h1>Lucky Pokemon Share</h1>
      {userInfo?.displayName}
      {userInfo && <img src={userInfo.photoURL} alt={userInfo.displayName} />}
      <button onClick={signOut}>Sign Out</button>
    </>
  );
};
