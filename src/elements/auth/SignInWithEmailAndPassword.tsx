import React from "react";

import { useForm } from "react-hook-form";

import { useSignInWithEmailAndPassword } from "../../hooks/auth/signInWithEmailAndPassword";

export const SignInWithEmailAndPassword: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();
  const { signInWithEmailAndPassword } = useSignInWithEmailAndPassword();

  const onSubmit = (data: { email: string; password: string }) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="email" type="email" ref={register({ required: true })} />
        {errors.email && <p>メールアドレスは必須です</p>}

        <input
          name="password"
          type="password"
          ref={register({ required: true })}
        />
        {errors.password && <p>パスワードは必須です</p>}

        <button type="submit">サインイン</button>
      </form>
    </>
  );
};
