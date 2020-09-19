import React, { useCallback, useState } from "react";

import { Button } from "../components/button/Button";
import { SignUpWithEmailAndPassword } from "../elements/auth/SignUpWithEmailAndPassword";
import { AuthBox } from "../elements/authBox/AuthBox";
import { AuthBoxSignIn } from "../elements/authBox/AuthBoxSignIn";
import { AuthBoxTitle } from "../elements/authBox/authBoxTitle";
import {
  authLayoutContentVariants,
  StyledAuthLayout,
  StyledAuthLayoutContent,
} from "./AuthTemplate.styles";

export const AuthTemplate: React.FC = () => {
  const [state, setState] = useState<"signIn" | "signUp">("signIn");

  const handleClickSignUp = useCallback(() => {
    setState("signUp");
  }, []);

  const handleClickSignIn = useCallback(() => {
    setState("signIn");
  }, []);

  return (
    <StyledAuthLayout>
      <StyledAuthLayoutContent
        animate={state === "signIn" ? "showSignIn" : "hiddenSignIn"}
        variants={authLayoutContentVariants}
      >
        <AuthBox>
          <AuthBoxTitle title="ログイン" />
          <AuthBoxSignIn switchSignUp={handleClickSignUp} />
        </AuthBox>
      </StyledAuthLayoutContent>

      <StyledAuthLayoutContent
        animate={state === "signUp" ? "showSignUp" : "hiddenSignUp"}
        variants={authLayoutContentVariants}
      >
        <AuthBox>
          <AuthBoxTitle title="新規アカウント作成" />

          <SignUpWithEmailAndPassword />

          <hr />

          <div>
            <Button variant="link" fill onClick={handleClickSignIn}>
              すでにアカウントをお持ちの方
            </Button>
          </div>
        </AuthBox>
      </StyledAuthLayoutContent>
    </StyledAuthLayout>
  );
};
