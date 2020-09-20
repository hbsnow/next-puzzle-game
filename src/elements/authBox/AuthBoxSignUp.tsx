import React from "react";

import styled from "styled-components";

import { Button } from "../../components/button/Button";
import { SignUpWithEmailAndPassword } from "../auth/SignUpWithEmailAndPassword";

type ContainerProps = {
  switchSignIn: () => void;
};

type Props = {
  className?: string;
} & ContainerProps;

const Component: React.FC<Props> = ({ className, switchSignIn }) => {
  return (
    <div className={className}>
      <SignUpWithEmailAndPassword />

      <hr />

      <Button variant="link" fill onClick={switchSignIn}>
        すでにアカウントをお持ちの方
      </Button>
    </div>
  );
};

const StyledComponent = styled(Component)``;

export const AuthBoxSignUp: React.FC<ContainerProps> = (props) => {
  return <StyledComponent {...props} />;
};
