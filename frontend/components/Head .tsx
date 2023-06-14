import React from "react";
import NextHead from "next/head";

const Head = () => {
  return (
    <NextHead>
      <meta name="Description" content="Portfolio builder for free." />
      <meta property="og:type" content="article" />
      <meta property="og:url" content="/" />
      <meta
        property="og:image"
        content="/logo.jpg"
      />
      <meta property="og:description" content="Portfolio builder" />
      <link rel="shortcut icon" href="/icon.ico" />
      <title>Portfolio builder</title>
    </NextHead>
  );
};

export default Head;
