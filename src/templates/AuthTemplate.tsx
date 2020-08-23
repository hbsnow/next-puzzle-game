import React, { FC, useState, useEffect } from "react";

import { SignInWithEmailAndPassword } from "../elements/auth/SignInWithEmailAndPassword";
import { SignInWithGoogle } from "../elements/auth/SignInWithGoogle";
import { SignUp } from "../elements/auth/SignUp";

export const AuthTemplate: FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
  });

  return (
    <>
      <SignInWithEmailAndPassword></SignInWithEmailAndPassword>
      <SignInWithGoogle></SignInWithGoogle>
      <SignUp />

      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    </>
  );
};
