import React from "react";

import { SignInWithEmailAndPassword } from "../elements/auth/SignInWithEmailAndPassword";
import { SignInWithGoogle } from "../elements/auth/SignInWithGoogle";
import { SignUp } from "../elements/auth/SignUp";

export const SignInTemplate: React.FC = () => {
  return (
    <>
      <SignInWithEmailAndPassword></SignInWithEmailAndPassword>
      <SignInWithGoogle></SignInWithGoogle>
      <SignUp />
    </>
  );
};
