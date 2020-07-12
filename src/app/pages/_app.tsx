import "normalize.css";

import React from "react";

import { Global } from "@emotion/react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AuthProvider } from "react-use-auth";

import { globalStyles } from "../styles/globalStyles";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  // https://github.com/Swizec/useAuth/blob/v0.6.1/src/AuthProvider.tsx#L58
  const callbackDomain =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}`
      : "http://localhost:3000";

  const params = {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    redirectUri: `${callbackDomain}/auth0/callback`,
  };

  return (
    <>
      <AuthProvider
        navigate={router.push}
        auth0_domain={process.env.AUTH0_DOMAIN}
        auth0_client_id={process.env.AUTH0_CLIENT_ID}
        auth0_audience_domain={null}
        auth0_params={params}
        customPropertyNamespace={callbackDomain}
      >
        <Global styles={globalStyles} />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
};

export default App;
