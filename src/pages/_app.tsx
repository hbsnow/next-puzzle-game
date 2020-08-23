import "normalize.css";

import React from "react";

import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
// import { useRouter } from "next/router";
import { Provider } from "react-redux";

import store from "../store";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  // const router = useRouter();

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,minimum-scale=1,initial-scale=1"
        />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default App;
