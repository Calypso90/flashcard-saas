// app/auth.js
import { getToken } from "@clerk/nextjs/server";
import { getAuth, signInWithCustomToken } from "firebase/auth";

export async function signInWithClerk(clerkUser) {
  if (!clerkUser) return;

  const auth = getAuth();
  const token = await getToken({ template: "firebase" });

  try {
    await signInWithCustomToken(auth, token);
    console.log("Successfully signed in with Clerk token");
  } catch (error) {
    console.error("Error signing in with Clerk token:", error);
  }
}