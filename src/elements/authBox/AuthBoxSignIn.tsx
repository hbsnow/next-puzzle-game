import React from "react";

import firebase from "firebase/app";
import styled from "styled-components";

import { Button } from "../../components/button/Button";
import { useSignInWithProvider } from "../../hooks/signInWithProvider";
import { auth } from "../../services/firebase/client";
import { SignInWithEmailAndPassword } from "../auth/SignInWithEmailAndPassword";

type ContainerProps = {
  switchSignUp: () => void;
};

type Props = {
  className?: string;
  isLoading: boolean;
  signIn: () => void;
} & ContainerProps;

const Component: React.FC<Props> = ({ className, signIn, switchSignUp }) => {
  return (
    <div className={className}>
      <Button onClick={signIn} fill>
        Googleでログイン
      </Button>

      <hr />

      <SignInWithEmailAndPassword></SignInWithEmailAndPassword>

      <hr />

      <Button onClick={switchSignUp} variant="link" fill>
        新規アカウント作成
      </Button>
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: block;
`;

export const AuthBoxSignIn: React.FC<ContainerProps> = (props) => {
  const { signInWithProvider, isLoading } = useSignInWithProvider(
    auth,
    new firebase.auth.GoogleAuthProvider()
  );

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <StyledComponent
      signIn={signInWithProvider}
      isLoading={isLoading}
      {...props}
    />
  );
};
