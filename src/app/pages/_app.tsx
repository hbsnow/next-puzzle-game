import "normalize.css";

import React from "react";

import { Auth0Provider } from "@auth0/auth0-react";
import { Global } from "@emotion/react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Provider } from "react-redux";

import store from "../store";
import { globalStyles } from "../styles/globalStyles";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  const onRedirectCallback = (appState) => {
    router.replace(appState?.returnTo ?? "/");
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,minimum-scale=1,initial-scale=1"
        />
        <script async src="https://www.googletagmanager.com/gtag/js"></script>
      </Head>
      <Auth0Provider
        domain={process.env.AUTH0_DOMAIN}
        clientId={process.env.AUTH0_CLIENT_ID}
        redirectUri={typeof window !== "undefined" && window.location.origin}
        audience={`https://${process.env.AUTH0_DOMAIN}/api/v2/`}
        onRedirectCallback={onRedirectCallback}
      >
        <Provider store={store}>
          <Global styles={globalStyles} />
          <Component {...pageProps} />
        </Provider>
      </Auth0Provider>
    </>
  );
};

export default App;
