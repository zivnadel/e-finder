import React from "react";

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppContextProvider } from "../store/AppContext";
import NavBar from "../components/ui/nav/NavBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <nav className="font-quicksand">
        <NavBar />
      </nav>
      <main className="font-quicksand">
        <Component {...pageProps} />
      </main>
      <footer></footer>
    </AppContextProvider>
  );
}
