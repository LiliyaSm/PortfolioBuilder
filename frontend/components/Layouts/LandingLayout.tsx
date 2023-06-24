"use client";
import React, { ReactNode } from "react";
import Nav from "@/components/Nav";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/src/themes/defaultDarkTheme";
import { CssBaseline } from "@mui/material";

interface ILayoutProps {
  children: ReactNode;
}

const LandingLayout = ({ children }: ILayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Nav />
        {children}
      </div>
    </ThemeProvider>
  );
};

export default LandingLayout;
