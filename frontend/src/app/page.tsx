"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const { push } = useRouter();

  useEffect(() => {
    push("/login");
  }, []);
  return <p></p>;
};

export default Home;
