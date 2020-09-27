import React, { useCallback, useState } from "react";

import { motion } from "framer-motion";
import styled from "styled-components";

import { AuthBox } from "../elements/authBox/AuthBox";
import { AuthBoxSignIn } from "../elements/authBox/AuthBoxSignIn";
import { AuthBoxSignUp } from "../elements/authBox/AuthBoxSignUp";
import { AuthBoxTitle } from "../elements/authBox/AuthBoxTitle";

type Props = {
  className?: string;
  showSignIn: boolean;
  showSignUp: boolean;
  handleClickSwitchSignUp: () => void;
  handleClickSwitchSignIn: () => void;
};

const Component: React.FC<Props> = ({
  className,
  showSignIn,
  showSignUp,
  handleClickSwitchSignUp,
  handleClickSwitchSignIn,
}) => {
  return (
    <div className={className}>
      <motion.div
        className={`${className}__content`}
        animate={showSignIn ? "showSignIn" : "hiddenSignIn"}
        variants={authLayoutContentVariants}
      >
        <AuthBox>
          <AuthBoxTitle title="ログイン" />
          <AuthBoxSignIn switchSignUp={handleClickSwitchSignUp} />
        </AuthBox>
      </motion.div>

      <motion.div
        className={`${className}__content`}
        animate={showSignUp ? "showSignUp" : "hiddenSignUp"}
        variants={authLayoutContentVariants}
      >
        <AuthBox>
          <AuthBoxTitle title="新規アカウント作成" />
          <AuthBoxSignUp switchSignIn={handleClickSwitchSignIn} />
        </AuthBox>
      </motion.div>
    </div>
  );
};

const authLayoutContentVariants = {
  showSignIn: {
    opacity: 1,
    x: 0,
    display: "grid",
  },
  showSignUp: {
    opacity: 1,
    x: 0,
    display: "grid",
  },
  hiddenSignIn: {
    opacity: 0,
    x: -100,
    transitionEnd: {
      display: "none",
    },
  },
  hiddenSignUp: {
    opacity: 0,
    x: 100,
    transitionEnd: {
      display: "none",
    },
  },
} as const;

const StyledComponent = styled(Component)`
  min-height: 100vh;
  place-items: center;

  & > &__content {
    position: absolute;
    display: none;
    min-height: 100vh;
    width: 100%;
    place-items: center;
    opacity: 0;
    padding: 1rem;
  }
`;

export const AuthTemplate: React.FC = () => {
  const [state, setState] = useState<"signIn" | "signUp">("signIn");

  const handleClickSwitchSignUp = useCallback(() => {
    setState("signUp");
  }, []);

  const handleClickSwitchSignIn = useCallback(() => {
    setState("signIn");
  }, []);

  return (
    <StyledComponent
      handleClickSwitchSignUp={handleClickSwitchSignUp}
      handleClickSwitchSignIn={handleClickSwitchSignIn}
      showSignIn={state === "signIn"}
      showSignUp={state === "signUp"}
    />
  );
};
