import React, { ReactElement } from "react";
import { Typography, Button, Stack, Container, Box } from "@mui/material";
import { useRouter } from "next/router";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/src/themes/defaultTheme";

const NotFoundPage = () => {
  const router = useRouter();

  const redirectToHomePage = () => {
    router.push("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md" sx={{ mt: 14 }}>
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              backgroundImage:
                "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
              height: "400px",
              backgroundPosition: "center",
            }}
          ></Box>
          <Stack direction="column" alignItems="center">
            <Typography align="center" variant="h5" sx={{ mb: 1.5 }}>
              Look like you are lost
            </Typography>
            <Typography align="center" sx={{ mb: 2 }}>
              the page you are looking for not available!
            </Typography>
            <Button
              variant="contained"
              sx={{ width: "170px" }}
              onClick={redirectToHomePage}
            >
              Go to home
            </Button>
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

NotFoundPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default NotFoundPage;
