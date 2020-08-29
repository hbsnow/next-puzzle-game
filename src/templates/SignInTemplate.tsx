import React from "react";

import { SignInWithEmailAndPassword } from "../elements/auth/SignInWithEmailAndPassword";
import { SignInWithGoogle } from "../elements/auth/SignInWithGoogle";
import { SignUpWithEmailAndPassword } from "../elements/auth/SignUpWithEmailAndPassword";

export const SignInTemplate: React.FC = () => {
  return (
    <>
      <SignInWithEmailAndPassword></SignInWithEmailAndPassword>
      <SignInWithGoogle></SignInWithGoogle>
      <SignUpWithEmailAndPassword />
    </>
  );
};
