import React from "react";
import Layout from "../components/Layout";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";

const MyApp = ({ Component, pageProps }: AppProps<{
  session: Session;
}>) => {
  const pathname = usePathname();
  const showHeader = pathname === "/login" ? false : true;

  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout || ((page) => <Layout>{page}</Layout>);
  return (
    <SessionProvider session={pageProps.session}>
      {getLayout(<Component {...pageProps} />)}/
    </SessionProvider>
  );
};

export default MyApp;
