import React, { ReactNode } from "react";
import Nav from "./Nav";
// import Meta from './Meta'
import Container from "@mui/material/Container";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* <Meta /> */}
      <Nav />
      <div>
        <Container sx={{ mt: 18 }} component="main" maxWidth="lg">
          {children}
        </Container>
      </div>
    </>
  );
};

export default Layout;
