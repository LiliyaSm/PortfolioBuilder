"use client";
import React, { ReactNode } from "react";
import Nav from "@/components/Nav";
import Container from "@mui/material/Container";
import { usePathname } from "next/navigation";
import GuestFooter from "@/components/GuestFooter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/src/themes/defaultTheme";
import { CssBaseline } from "@mui/material";

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
      <Container component="main" maxWidth="lg" sx={{ mt: 17 }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </Container>
      {showFooter && <GuestFooter />}
    </div>
  );
};

export default Layout;
