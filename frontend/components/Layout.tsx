"use client";
import React, { ReactNode } from "react";
import "@/src/app/globals.css";
import Nav from "./Nav";
import Container from "@mui/material/Container";
import { usePathname } from "next/navigation";
import GuestFooter from "@/components/GuestFooter";

export const metadata = {
  title: "Portfolio builder",
  description: "Portfolio builder",
};

const paths = ["/auth/login", "/auth/register"];

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const pathname = usePathname() || "";
  const showFooter = paths.includes(pathname);
  return (
    <div>
      <Nav />
      <Container component="main" maxWidth="lg" sx={{ mt: 18 }}>
        {children}
      </Container>
      {showFooter && <GuestFooter />}
    </div>
  );
};

export default Layout;
