import Footer from "./components/Footer";
import getStripe from "./utils/get-stripe";
import Link from "next/link";

export default function Home() {
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
        <button className="border mt-2 border-blue-500 text-blue-500 font-bold py-2 px-4 rounded w-fit shadow-gray-900 shadow-md hover:bg-blue-100">
          Learn More
        </button>
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
      <section className="grid grid-cols-1 gap-4 my-4 justify-items-center">
        <h2 className="text-3xl font-bold mb-4">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
          <div>
            <h1>Free</h1>
            <p>$0/Month</p>
            <p>text</p>
            <Link href="/sign-up">Sign Up</Link>
          </div>
          <div>
            <h1>Pro</h1>
            <p>$10/Month</p>
            <p>text</p>
            <Link href="/sign-up">Sign Up</Link>
          </div>
        </div>
      </section>
      <div className="flex items-center justify-center fixed bottom-0 w-full py-4">
        <Footer />
      </div>
    </>
  );
}
