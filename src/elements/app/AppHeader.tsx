import React from "react";

import Link from "next/link";
import { useSelector } from "react-redux";

import { RootState } from "../../store";

export const AppHeader: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <>
      <h1>Lucky Pokemon Share</h1>
      <div>{user?.displayName}</div>
      <div>{user?.photoURL}</div>
      <Link href="/signout">
        <a>Sign Out</a>
      </Link>
    </>
  );
};
