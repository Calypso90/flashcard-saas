"use client";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Make sure this path is correct

export default function Navbar() {
  const { isLoaded, user } = useUser();
  const [planType, setPlanType] = useState(null);

  useEffect(() => {
    async function fetchUserPlan() {
      if (isLoaded && user) {
        try {
          const userRef = doc(db, "users", user.id);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setPlanType(userSnap.data().planType);
          }
        } catch (error) {
          console.error("Error fetching user plan:", error);
        }
      }
    }
    fetchUserPlan();
  }, [isLoaded, user]);

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between py-4 px-8">
      <div className="flex mb-4 sm:mb-0">
        <Link
          href="/"
          className="text-2xl tracking-wider hover:transform hover:scale-110 "
        >
          <span className="typing-text">
            {Array.from("Flash\u00A0Wave").map((char, index) => (
              <span key={index} className="typing-letter">
                {char}
              </span>
            ))}
          </span>
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 gap-4">
        <SignedIn>
          <Link href={`/flashcards`} className="startBtn">
            Flashcards
          </Link>
          {isLoaded && planType && (
            <span className="text-sm font-medium">Plan: {planType}</span>
          )}
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in" className="startBtn">
            Sign In
          </Link>
          <Link href="/sign-up" className="otherBtn">
            Sign Up
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
}
