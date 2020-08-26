import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/loader/Loader";
import { firebase } from "../services/firebase/client";
import { RootState } from "../store";
import { setUser, clearUser } from "../store/userSlice";
import { AppTemplate } from "./AppTemplate";
import { SignInTemplate } from "./SignInTemplate";

export const AuthContext = React.createContext<undefined>(undefined);

export const AuthGuard: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsLoading(false);
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
      }
    });
  }, [dispatch]);

  return (
    <>
      {userInfo ? <AppTemplate>{children}</AppTemplate> : <SignInTemplate />}
      <Loader isLoading={isLoading} />
    </>
  );
};
