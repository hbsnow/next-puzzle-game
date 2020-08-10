import React, { FC } from "react";

import { useAuth0 } from "@auth0/auth0-react";

const LoginTemplate: FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <button onClick={loginWithRedirect}>Login</button>
    </>
  );
};

export { LoginTemplate };
