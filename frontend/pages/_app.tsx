import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layouts/Layout";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import { dark } from "@/constants";
import Head from "next/head";
import { NextPageWithLayout } from "@/types";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);
const StyledContainer = styled(ToastContainer)`
  .Toastify__progress-bar {
    background-color: ${dark};
    icon: ${"⚡"};
  }
`;

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("globalLoader");
      if (loader) loader.remove();
    }
  }, []);

  // Use the layout defined at the page level, if available
  const getLayout =
    (Component as NextPageWithLayout).getLayout ||
    ((page: React.ReactElement) => <Layout>{page}</Layout>);
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Portfolio builder</title>
      </Head>
      <NextNProgress startPosition={0.5} color={dark} />
      {getLayout(<Component {...pageProps} />)}
      <StyledContainer
        style={{ zIndex: 100000 }}
        position="top-right"
        autoClose={5000}
      />
    </SessionProvider>
  );
};

export default MyApp;
