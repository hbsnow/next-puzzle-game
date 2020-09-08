import React from "react";

import firebase from "firebase/app";

import { useSignInWithProvider } from "../../hooks/signInWithProvider";
import { auth } from "../../services/firebase/client";

export const SignInWithGoogle: React.FC = () => {
  const { signInWithProvider: signInWithGoogle } = useSignInWithProvider(
    auth,
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
