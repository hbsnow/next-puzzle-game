import React from "react";

import { NextPage } from "next";
import { useAuth } from "react-use-auth";

import LoginTemplate from "../templates/LoginTemplate";

const Page: NextPage = () => {
  return (
    <LoginTemplate>
      <pre>{JSON.stringify(useAuth().user, null, 2)}</pre>
    </LoginTemplate>
  );
};

export default Page;
