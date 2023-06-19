"use client";
import React, { ReactNode } from "react";
import "@/src/app/globals.css";
import Nav from "./Nav";
import { styled } from "@mui/material/styles";
import { darkGrey } from "@/constants";

const StyledComponent = styled("div")({
//   backgroundColor: darkGrey,
});

interface ILayoutProps {
  children: ReactNode;
}

const LandingLayout = ({ children }: ILayoutProps) => {
  return (
    <div>
      <Nav />
      <StyledComponent>
        <StyledComponent>{children}</StyledComponent>
      </StyledComponent>
    </div>
  );
};

export default LandingLayout;
