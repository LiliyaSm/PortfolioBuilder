import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/Layout";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
// import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";

const progressBarColor = "#f7f402";

const StyledContainer = styled(ToastContainer)`
  .Toastify__progress-bar {
    background-color: ${progressBarColor};
    icon: ${"⚡"};
  }
  // .Toastify__toast-icon {
  //   color: purple;
  //   background-color: ${progressBarColor};

  // }
`;

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  return (
    <SessionProvider session={pageProps.session}>
      <NextNProgress startPosition={0.5} color="#f7f402" />
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
