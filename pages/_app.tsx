import React from "react";

import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "../components/ui/nav/NavBar";
import { EventsContextProvider } from "../store/EventsContext";
import { FetchContextProvider } from "../store/FetchContext";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FetchContextProvider>
      <EventsContextProvider>
        <Head>
          <title>E-Finder</title>
        </Head>
        <nav>
          <NavBar />
        </nav>
        <main>
          <Component {...pageProps} />
        </main>
        <footer></footer>
      </EventsContextProvider>{" "}
    </FetchContextProvider>
  );
}
