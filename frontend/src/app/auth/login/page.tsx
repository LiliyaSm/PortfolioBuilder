"use client";
import React from "react";
import { Box, CssBaseline } from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import LoginContainer from "../../../../components/LoginContainer";
import { signOut, signIn, useSession, getSession } from "next-auth/react";
// import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function googleSignIn() {}

  const handleLogin = async () => {
    const userData = {
      email,
      password,
      redirect:true,
      callbackUrl: "/portfolios"
    };

    console.log(userData)

    const result = await signIn("credentials", userData);
  };

  return (
    <Box
      style={{
        display: "flex",
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      <CssBaseline />

      <LoginContainer
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        handleLogin={handleLogin}
      />
    </Box>
  );
}
