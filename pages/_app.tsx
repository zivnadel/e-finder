import React from "react";

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppContextProvider } from "../store/AppContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}
