"use client";
import React, { ReactNode } from "react";
import "@/src/app/globals.css";
import Nav from "./Nav";
import Container from "@mui/material/Container";
import { usePathname } from "next/navigation";
import Head from "@/components/Head ";

export const metadata = {
  title: "Portfolio builder",
  description: "Portfolio builder",
};

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const pathname = usePathname();
  const showHeader = pathname === "/login" ? false : true;
  return (
    <div>
      <Head />
      {showHeader && <Nav />}
      <Container component="main" maxWidth="lg">
        {children}
      </Container>
    </div>
  );
};

export default Layout;
