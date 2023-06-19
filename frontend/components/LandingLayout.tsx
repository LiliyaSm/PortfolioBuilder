"use client";
import React, { ReactNode } from "react";
import "@/src/app/globals.css";
import Nav from "./Nav";

interface ILayoutProps {
  children: ReactNode;
}

const LandingLayout = ({ children }: ILayoutProps) => {
  return (
    <div>
      <Nav />
      <div>{children}</div>
    </div>
  );
};

export default LandingLayout;
