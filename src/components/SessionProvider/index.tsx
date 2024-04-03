"use client";
import { SessionProvider } from "next-auth/react";
import { signIn, signOut, useSession } from "next-auth/react";
// import { auth } from "@/lib/auth";

export default async function Provider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
