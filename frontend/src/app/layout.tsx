"use client";
import React, { ReactNode } from "react";
import "./globals.css";
import Nav from "../../components/Nav";
// import Meta from './Meta'
import Container from "@mui/material/Container";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "Portfolio builder",
  description: "Portfolio builder",
};

interface ILayoutProps {
  session: any;
  children: ReactNode;
}

const RootLayout = ({ children, session }: ILayoutProps) => {
  return (
    <html lang="en">
      {/* <Meta /> */}
      <body>
        <SessionProvider session={session}>
          <Nav />
          <Container  component="main" maxWidth="lg">
            {children}
          </Container>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
