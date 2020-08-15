import React from "react";

import { NextPage } from "next";

import { AuthGuard } from "../templates/AuthGuard";

const Page: NextPage = () => {
  return (
    <AuthGuard>
      <p>ログインしてるよ</p>
      {/* <pre>[{JSON.stringify(user, null, 2)}]</pre>
      <p style={{ width: "400px", overflow: "auto" }}>{token}</p> */}
    </AuthGuard>
  );
};

export default Page;
