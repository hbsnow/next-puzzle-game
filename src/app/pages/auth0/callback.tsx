import React, { useEffect } from "react";

import { NextPage } from "next";
import { useAuth } from "react-use-auth";

const Page: NextPage = () => {
  const { handleAuthentication } = useAuth();

  useEffect(() => {
    handleAuthentication({ postLoginRoute: "/" });
  }, [handleAuthentication]);

  return <>loading ...</>;
};
export default Page;
