import React from "react";

import { useSignInWithGoogle } from "../../hooks/auth/signInWithGoogle";

export const SignInWithGoogle: React.FC = () => {
  const { signInWithGoogle } = useSignInWithGoogle();

  return (
    <>
      <button onClick={signInWithGoogle}>Googleでサインイン</button>
    </>
  );
};
