import React, { FC, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { firebase } from "../services/firebase/client";
import { RootState } from "../store";
import { setUser, clearUser } from "../store/userSlice";
import { AppTemplate } from "./AppTemplate";
import { AuthTemplate } from "./AuthTemplate";

export const AuthContext = React.createContext<undefined>(undefined);

export const AuthGuard: FC = ({ children }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
      }
    });
  }, [dispatch]);

  return userInfo ? <AppTemplate>{children}</AppTemplate> : <AuthTemplate />;
};
