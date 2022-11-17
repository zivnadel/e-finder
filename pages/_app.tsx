import React from "react";

import "../styles/globals.css";
import type { AppProps } from "next/app";

import { EventsContextProvider } from "../store/EventsContext";
import { FetchContextProvider } from "../store/FetchContext";

import NavBar from "../components/ui/nav/NavBar";
import Footer from "../components/ui/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FetchContextProvider>
      <EventsContextProvider>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </EventsContextProvider>{" "}
    </FetchContextProvider>
  );
}
