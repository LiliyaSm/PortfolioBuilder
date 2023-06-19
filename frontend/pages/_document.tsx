import React from "react";
import { Html, Main, NextScript, Head } from "next/document";

const Document = () => {
  return (
    <Html>
      <Head>
        <meta name="Description" content="Portfolio builder for free." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="/" />
        <meta property="og:image" content="/logo.jpg" />
        <meta property="og:description" content="Portfolio builder" />
        <link rel="shortcut icon" href="/icon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora&family=Playfair+Display&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      <div id="globalLoader">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          alt=""
        />
      </div>
    </Html>
  );
};

export default Document;
