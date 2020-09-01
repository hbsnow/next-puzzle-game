import React from "react";

import firebase from "firebase/app";

import { useSignInWithProvider } from "../../hooks/auth/signInWithProvider";

export const SignInWithGoogle: React.FC = () => {
  const { signInWithProvider: signInWithGoogle } = useSignInWithProvider(
    new firebase.auth.GoogleAuthProvider()
  );

  return (
    <>
      <button
        onClick={async () => {
          await signInWithGoogle();
        }}
      >
        Googleでサインイン
      </button>
    </>
  );
};
