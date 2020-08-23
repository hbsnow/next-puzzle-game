import React, { FC } from "react";

import { SignInWithEmailAndPassword } from "../elements/auth/SignInWithEmailAndPassword";
import { SignInWithGoogle } from "../elements/auth/SignInWithGoogle";

export const SignInTemplate: FC = () => {
  return (
    <>
      <SignInWithEmailAndPassword></SignInWithEmailAndPassword>
      <SignInWithGoogle></SignInWithGoogle>
    </>
  );
};
