import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import Loader from "../components/loader/Loader";
import { auth } from "../services/firebase/client";
import { AppTemplate } from "./AppTemplate";
import { SignInTemplate } from "./SignInTemplate";

export const AuthContext = React.createContext<undefined>(undefined);

export const AuthGuard: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((nextOrObserver) => {
      setIsLoading(false);
      setIsSignIn(!!nextOrObserver);
    });
  }, [dispatch]);

  return (
    <>
      {isSignIn ? <AppTemplate>{children}</AppTemplate> : <SignInTemplate />}
      <Loader isLoading={isLoading} />
    </>
  );
};
