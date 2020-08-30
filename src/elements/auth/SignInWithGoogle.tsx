import React from "react";

import firebase from "firebase";
import { useDispatch } from "react-redux";

import { auth } from "../../services/firebase/client";

export const SignInWithGoogle: React.FC = () => {
  const dispatch = useDispatch();

  const handleClick = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithRedirect(provider);
    // await dispatch(signInWithGoogle());
  };

  return (
    <>
      <button onClick={handleClick}>Googleでサインイン</button>
    </>
  );
};
