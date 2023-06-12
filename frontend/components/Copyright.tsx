import React from "react"
import Typography from "@mui/material/Typography";
import Link from "./Link";

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright ©"}
      <Link color="inherit" href="https://github.com/LiliyaSm">
        LiliyaSm
      </Link>{" "}
      2023
    </Typography>
  );
};

export default Copyright
