import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/loader/Loader";
import { auth } from "../services/firebase/client";
import { RootState } from "../store";
import { setUser, clearUser } from "../store/userSlice";
import { AppTemplate } from "./AppTemplate";
import { SignInTemplate } from "./SignInTemplate";

export const AuthContext = React.createContext<undefined>(undefined);

export const AuthGuard: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((nextUser) => {
      setIsLoading(false);
      if (nextUser) {
        dispatch(setUser(nextUser));
      } else {
        dispatch(clearUser());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <>
      {user ? <AppTemplate>{children}</AppTemplate> : <SignInTemplate />}
      <Loader isLoading={isLoading} />
    </>
  );
};
