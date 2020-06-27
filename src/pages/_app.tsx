import "normalize.css";

import React from "react";

import { Global } from "@emotion/react";
import { NextPage } from "next";
import { AppProps } from "next/app";

import { globalStyles } from "../styles/globalStyles";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </>
  );
};

export default App;
