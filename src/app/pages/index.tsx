import React, { useEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { NextPage } from "next";

import { AuthGuardTemplate } from "../templates/AuthGuardTemplate";

const Page: NextPage = () => {
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log(token);
        const response = await fetch("/firebase", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const hoge = await response.json();
        console.log(hoge);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);

  return (
    <AuthGuardTemplate>
      <pre>[{JSON.stringify(user, null, 2)}]</pre>
    </AuthGuardTemplate>
  );
};

export default Page;
