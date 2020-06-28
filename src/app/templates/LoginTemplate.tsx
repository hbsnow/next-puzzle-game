import React, { FC } from "react";

import { useAuth } from "react-use-auth";

const LoginTemplate: FC = ({ children }) => {
  const { isAuthenticated, login, logout } = useAuth();

  return isAuthenticated() ? (
    <div className="root">
      <div className="header">header</div>
      <main>
        {children}
        <button onClick={logout}>logout</button>
      </main>
      <div className="footer">footer</div>
    </div>
  ) : (
    <>
      <button onClick={login}>Login</button>
    </>
  );
};

export default LoginTemplate;
