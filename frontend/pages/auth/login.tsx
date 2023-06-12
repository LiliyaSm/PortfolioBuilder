"use client";
import React, { useState } from "react";
import { Box, CssBaseline, Grid } from "@mui/material";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
// import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import Link from "@/components/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "@/components/Copyright";

const Login = (): React.ReactElement => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  if (session?.user) router.push("/portfolios");

  function googleSignIn() {}

  const handleLogin = async () => {
    const userData = {
      email,
      password,
      redirect: false,
    };

    try {
      setLoading(true);
      const result = await signIn("credentials", {
        ...userData,
        redirect: false,
      });
      setLoading(false);
      if (result?.error) {
        setError("Incorrect email or password");
      } else {
        router.push("/portfolios");
      }
    } catch (error: any) {
      setLoading(false);
      setError("Please, try later");
    }
  };

  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundColor: "white",
          // height: "100vh",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && (
            <Typography sx={{ m: 1 }} color="error">
              {error}
            </Typography>
          )}
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              {loading ? "loading..." : "Sign In"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/auth/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

// Login.getLayout = function getLayout(page: React.ReactElement) {
//   return <>{page}</>;
// };

export default Login;
