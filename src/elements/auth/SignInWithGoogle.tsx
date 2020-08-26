import React from "react";

import { useSignIn } from "../../hooks/signIn";

export const SignInWithGoogle: React.FC = () => {
  const { signInWithGoogle } = useSignIn();

  return (
    <>
      <button onClick={signInWithGoogle}>Googleでサインイン</button>
    </>
  );
};
