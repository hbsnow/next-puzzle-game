import React, { useCallback, useState } from "react";

import firebase from "firebase/app";
import { motion } from "framer-motion";

import { Button } from "../components/button/Button";
import { SignInWithEmailAndPassword } from "../elements/auth/SignInWithEmailAndPassword";
import { SignUpWithEmailAndPassword } from "../elements/auth/SignUpWithEmailAndPassword";
import { useSignInWithProvider } from "../hooks/signInWithProvider";
import { auth } from "../services/firebase/client";
import {
  authLayoutContentVariants,
  StyledAuthBox,
  StyledAuthLayout,
  StyledAuthLayoutContent,
} from "./AuthTemplate.styles";

export const AuthTemplate: React.FC = () => {
  const [state, setState] = useState<"signIn" | "signUp">("signIn");

  const {
    signInWithProvider: signInWithGoogle,
    isLoading,
  } = useSignInWithProvider(auth, new firebase.auth.GoogleAuthProvider());

  const handleClickSignUp = useCallback(() => {
    setState("signUp");
  }, []);

  const handleClickSignIn = useCallback(() => {
    setState("signIn");
  }, []);

  return (
    <StyledAuthLayout>
      <StyledAuthLayoutContent
        animate={state === "signIn" ? "signIn" : "hidden"}
        variants={authLayoutContentVariants}
      >
        <StyledAuthBox>
          <SignInWithEmailAndPassword></SignInWithEmailAndPassword>

          <div>
            <Button
              onClick={async () => {
                await signInWithGoogle();
              }}
              fill={true}
            >
              Googleでログイン
            </Button>
          </div>

          <div>
            <Button onClick={handleClickSignUp}>新規アカウント作成</Button>
          </div>

          {isLoading && <div>Loading</div>}
        </StyledAuthBox>
      </StyledAuthLayoutContent>

      <StyledAuthLayoutContent
        animate={state === "signUp" ? "signUp" : "hidden"}
        variants={authLayoutContentVariants}
      >
        <StyledAuthBox>
          <SignUpWithEmailAndPassword />

          <div>
            <Button onClick={handleClickSignIn}>ログイン</Button>
          </div>

          {isLoading && <div>Loading</div>}
        </StyledAuthBox>
      </StyledAuthLayoutContent>
    </StyledAuthLayout>
  );
};
