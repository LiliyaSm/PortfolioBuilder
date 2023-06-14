import React, { useState } from "react";
import {
  Box,
  Grid,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import Link from "@/components/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider } from "@mui/material/styles";
import { server } from "@/config";
import { createErrors, warningOnError } from "@/utils";
import { ValidationErrors } from "@/types";
import theme from "@/src/themes/defaultTheme";
import { signIn } from "next-auth/react";

const SignUp = (): React.ReactElement => {
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const registerData: { [key: string]: FormDataEntryValue } = {};

    data.forEach(
      (value: FormDataEntryValue, key: string) => (registerData[key] = value)
    );

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    };

    try {
      setLoading(true);
      const response = await fetch(`${server}/api/register`, requestOptions);
      if (response.status === 200) {
        const userData = await response.json();
        await signIn("credentials", {
          ...registerData,
          callbackUrl: "/portfolios",
        });
      } else {
        const {
          error: { errors },
        } = await response.json();
        const errorsToDisplay = createErrors(errors);
        setValidationErrors(errorsToDisplay);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      warningOnError()
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: "white",
            p:2,
            pb: 4,
            borderRadius: "10px",
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Let's get started
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={Boolean(validationErrors.firstName)}
                  helperText={validationErrors.firstName ?? " "}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={Boolean(validationErrors.lastName)}
                  helperText={validationErrors.lastName ?? " "}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={Boolean(validationErrors.email)}
                  helperText={validationErrors.email ?? " "}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={Boolean(validationErrors.password)}
                  helperText={validationErrors.password ?? " "}
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? "loading..." : "Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="./login" variant="body2" color="secondary">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
