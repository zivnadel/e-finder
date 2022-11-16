import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="font-quicksand">
        <div id="modals"></div>
        <Main />
        <NextScript />
        <Script
          id="google-maps-api-script"
          type="text/javascript"
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&v=beta`}
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  );
}
