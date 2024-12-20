import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script
          src="/js/jquery-3.6.0.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/js/main.f923fa5a.js"
          strategy="afterInteractive"
        />
        
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
