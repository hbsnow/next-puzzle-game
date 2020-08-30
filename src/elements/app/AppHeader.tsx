import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../store";
import { signOut } from "../../store/userSlice";

export const AppHeader: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const clickHandler = async () => {
    await dispatch(signOut());
  };

  return (
    <>
      <h1>Lucky Pokemon Share</h1>[{user?.displayName}]
      {user && <img src={user.photoURL} alt={user.displayName} />}
      <button onClick={clickHandler}>Sign Out</button>
    </>
  );
};
