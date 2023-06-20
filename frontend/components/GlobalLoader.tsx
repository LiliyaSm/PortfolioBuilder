import React from "react";
import Image from "next/image";
import { styled } from "@mui/material/styles";

const StyledGlobalLoader = styled("div")({
  position: "fixed",
  zIndex: "9999",
  top: "50%",
  left: "50%",
  backgroundColor: " #fff",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
});

const GlobalLoader = () => {
  return (
    <StyledGlobalLoader id="globalLoader">
      <Image src="/spinner.gif" alt="spinner" width={100} height={100} />
    </StyledGlobalLoader>
  );
};

export default GlobalLoader;