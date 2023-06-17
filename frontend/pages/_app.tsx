import React from "react";
import Layout from "../components/Layout";
import type { AppProps } from "next/app";
import { wrapper } from "../store/store";

const MyApp = ({ Component, pageProps, ...appProps }: AppProps) => {
  const isLayoutNotNeeded = ["/login", "/register"].includes(
    appProps.router.pathname
  );
  const LayoutComponent = isLayoutNotNeeded ? React.Fragment : Layout;
  return (
    <LayoutComponent>
      <Component {...pageProps} />
    </LayoutComponent>
  );
}

export default wrapper.withRedux(MyApp);