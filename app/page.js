"use client";
import Footer from "./components/Footer";
import Link from "next/link";
import Image from "next/image";


// PricingSection as a separate client component
import dynamic from "next/dynamic";
const PricingSection = dynamic(() => import("./components/PricingSection"), {
  ssr: false,
});

export default function Home() {

  return (
    <>
      <section className="flex justify-center items-center gap-4 w-5/6 mx-auto text-center">
        <div className="mr-20">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">
            Effortless Flashcard Creation with Flash Wave
          </h1>
          <p className="text-xl text-slate-200 mb-8">
            Unlock your learning potential with our AI-powered flashcard tool.
            Automatically generate content and personalize your study
            experience.
          </p>
          <Link href="/generate" className="startBtn w-fit">
            Get Started
          </Link>
        </div>
        <div>
          <Image
            src="/example.png"
            width={1000}
            height={1000}
            alt="Example flashcard set"
          />
        </div>
      </section>
      <section className="grid grid-cols-1 my-20 justify-items-center text-black bg-[#E6E6FA] py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-5/6">
          <div>
            <h3 className="text-xl font-bold mb-4">Easy to use</h3>
            <p className="w-11/12">
              Our platform is designed with simplicity in mind. With an
              intuitive interface, you can easily navigate through the process
              of creating and saving your flashcards. Whether you&apos;re a student,
              teacher, or lifelong learner, you&rsquo;ll find our tools
              straightforward and user-friendly.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">AI-Generated Flashcard Sets</h3>
            <p className="w-11/12">
              Harness the power of artificial intelligence to create a
              comprehensive set of flashcards with just a few clicks. Our AI
              technology analyzes your input and generates relevant flashcards,
              saving you time and ensuring accuracy. Perfect for studying,
              teaching, or revising complex topics.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Save Your Flashcards</h3>
            <p className="w-11/12">
              Never lose your valuable flashcards again. Our platform allows you
              to securely save your flashcards for future access. Revisit them
              anytime, and pick up right where you left off, all within a secure
              and convenient space.
            </p>
          </div>
        </div>
      </section>
      <PricingSection />
      <Footer />
    </>
  );
}
