import * as React from "react";
import Box from "@mui/material/Box";
import Copyright from "@/components/Copyright";
import { Container, Paper, Typography } from "@mui/material";

export default function GuestFooter() {
  return (
    <Paper
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
      }}
      component="footer"
      square
      variant="outlined"
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            m: 2,
          }}
        >
          <Copyright />
        </Box>
      </Container>
    </Paper>
  );
}
