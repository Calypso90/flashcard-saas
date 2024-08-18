"use client";
import Footer from "./components/Footer";
import getStripe from "./utils/get-stripe";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

// PricingSection as a separate client component
import dynamic from "next/dynamic";
const PricingSection = dynamic(() => import("./components/PricingSection"), {
  ssr: false,
});

export default function Home() {
  const { isAuthenticated, user } = useAuth(); // Use your auth hook or context
  return (
    <>
      <section className="text-center flex flex-col w-full items-center gap-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Flash Wave</h1>
        <p className="text-xl mb-8">
          The easiest way to make your own flashcards from your text to AI.
        </p>
        <Link href="/generate" className="startBtn w-fit">
          Get Started
        </Link>
      </section>
      <section className="grid grid-cols-1 my-4 justify-items-center">
        <div className="my-24">
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold">Easy to use</h3>
              <p>Just paste your text and get your flashcards.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Easy to use</h3>
              <p>Just paste your text and get your flashcards.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Easy to use</h3>
              <p>Just paste your text and get your flashcards.</p>
            </div>
          </div>
        </div>
      </section>
      <PricingSection />
      <div className="flex items-center justify-center fixed bottom-0 w-full py-4">
        <Footer />
      </div>
    </>
  );
}
