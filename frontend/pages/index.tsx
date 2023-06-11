"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

const HomePage  = () => {
  const { push } = useRouter();

  useEffect(() => {
    // push("/login");
  }, []);
  return (
    <p>
      <button className="text-green-600" onClick={() => signIn()}>
        Sign In
      </button>
        Sign In
      {/* Main page */}
    </p>
  );
};

export default HomePage ;
