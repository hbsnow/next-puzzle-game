import React from "react";

import { NextPage } from "next";

import { AuthGuard } from "../templates/AuthGuard";

const Page: NextPage = () => {
  return (
    <AuthGuard>
      <p>ログインしてるよ</p>
    </AuthGuard>
  );
};

export default Page;
