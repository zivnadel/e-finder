import Head from "next/head";
import React from "react";

import Events from "../components/events/Events";
import Showcase from "../components/Showcase";

// Main page of the app
export default function Home() {
  return (
    <>
      <Head>
        <title>E-Finder</title>
      </Head>
      <Showcase />
      <Events />
    </>
  );
}
