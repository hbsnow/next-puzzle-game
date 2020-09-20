import "normalize.css";

import React from "react";

import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";

import store from "../store";

const GlobalStyle = createGlobalStyle`
  *, ::after, ::before {
    box-sizing: border-box;
  }

  body {
    background-color: #ddd;
    margin: 0;
    padding: 0;

    /* ログインページ用で必要 */
    width: 100%;
    overflow-x: hidden;
  }
`;

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
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
