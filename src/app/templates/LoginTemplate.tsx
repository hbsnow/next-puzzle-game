import React, { FC } from "react";

import { Auth0ContextInterface } from "@auth0/auth0-react";

// todo: あとでuseContextに変える
type Props = Pick<Auth0ContextInterface, "loginWithRedirect">;

export const LoginTemplate: FC<Props> = ({ loginWithRedirect }) => {
  return (
    <>
      <button onClick={loginWithRedirect}>Login</button>
    </>
  );
};
