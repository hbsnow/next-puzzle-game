import "normalize.css";

import React from "react";

import { Auth0Provider } from "@auth0/auth0-react";
import { Global } from "@emotion/react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

import { globalStyles } from "../styles/globalStyles";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  const onRedirectCallback = (appState) => {
    router.replace(appState?.returnTo ?? "/");
  };

  return (
    <>
      <Auth0Provider
        domain={process.env.AUTH0_DOMAIN}
        clientId={process.env.AUTH0_CLIENT_ID}
        redirectUri={typeof window !== "undefined" && window.location.origin}
        audience={`https://${process.env.AUTH0_DOMAIN}/api/v2/`}
        onRedirectCallback={onRedirectCallback}
      >
        <Global styles={globalStyles} />
        <Component {...pageProps} />
      </Auth0Provider>
    </>
  );
};

export default App;
