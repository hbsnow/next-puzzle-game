import React, { FC, useEffect, useState } from "react";

import { firebase } from "../firebase/clientApp";
import { useAuth } from "../hooks/auth";
import { AppTemplate } from "./AppTemplate";
import { LoginTemplate } from "./LoginTemplate";

export const AuthContext = React.createContext<undefined>(undefined);

export const AuthGuard: FC = ({ children }) => {
  const { logout, loginWithRedirect } = useAuth();
  const [login, isLogin] = useState<boolean>(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user, user.providerData);
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
      isLogin(true);
    });
  }, []);

  return login ? (
    <AppTemplate logout={logout}>{children}</AppTemplate>
  ) : (
    <LoginTemplate loginWithRedirect={loginWithRedirect} />
  );
};
