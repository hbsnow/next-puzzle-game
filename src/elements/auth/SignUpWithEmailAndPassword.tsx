import React, { useCallback } from "react";

import { useForm } from "react-hook-form";

import { useSignUpWithEmailAndPassword } from "../../hooks/auth/signUpWithEmailAndPassword";

export const SignUpWithEmailAndPassword: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();
  const {
    isLoading,
    createUserWithEmailAndPassword,
  } = useSignUpWithEmailAndPassword();

  const onSubmit = useCallback(
    (data: { email: string; password: string }) => {
      createUserWithEmailAndPassword(data.email, data.password);
    },
    [createUserWithEmailAndPassword]
  );

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

        {!isLoading && <button type="submit">サインアップ</button>}
      </form>
    </>
  );
};
