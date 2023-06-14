"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
// import Spinner from "@/components/Spinner";

const HomePage  = () => {
  const { push } = useRouter();

  useEffect(() => {
    // push("/login");
  }, []);
  return (
    <p>
      Main page
    </p>
  );
};

export default HomePage ;
