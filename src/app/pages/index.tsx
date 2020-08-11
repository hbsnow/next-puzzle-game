import React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { NextPage } from "next";

import { useFirebase } from "../hooks/firebase";
import { AuthGuardTemplate } from "../templates/AuthGuardTemplate";

const Page: NextPage = () => {
  const { user } = useAuth0();
  const { token } = useFirebase();

  return (
    <AuthGuardTemplate>
      <pre>[{JSON.stringify(user, null, 2)}]</pre>
      <pre>[{JSON.stringify(token, null, 2)}]</pre>
    </AuthGuardTemplate>
  );
};

export default Page;
