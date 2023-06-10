import React from "react";
import layout from "../src/app/layout";
import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps, ...appProps }: AppProps) => {
  const isLayoutNotNeeded = ["/login", "/register"].includes(
    appProps.router.pathname
  );
  // const LayoutComponent = isLayoutNotNeeded ? React.Fragment : layout;
  return (
    // <LayoutComponent>
      <Component {...pageProps} />
    // </LayoutComponent>
  );
}

export default MyApp;
