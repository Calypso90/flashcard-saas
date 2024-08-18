// app/result/page.js
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function Result() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const session_id = searchParams.get("session_id");
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!session_id) {
      router.push("/");
      return;
    }

    fetch(`/api/checkout_sessions?session_id=${session_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSession(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [session_id, router]);

  const handleReturnToPayment = () => {
    if (session && session.url) {
      window.location.href = session.url;
    } else {
      router.push("/pricing");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="max-w-lg mx-auto mt-10 p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-xl"
        role="alert"
      >
        <p className="font-bold">Error</p>
        <p>{error}</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Return to Home
        </button>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-lg mx-auto mt-10 p-6 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg shadow-xl">
        <p className="mb-4">No session found. Redirecting to home...</p>
        <div className="animate-pulse bg-yellow-500 h-2 w-32 mx-auto rounded"></div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout Result</h1>
      <div className="mb-6">
        <p className="text-lg mb-2 text-center">
          Status:
          <span
            className={`font-semibold ${
              session.payment_status === "paid"
                ? "text-green-600"
                : session.payment_status === "unpaid"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {" "}
            {session.payment_status.charAt(0).toUpperCase() +
              session.payment_status.slice(1)}
          </span>
        </p>
        {session.payment_status === "paid" && (
          <p className="text-green-600 text-center">
            Thank you for your payment!
          </p>
        )}
        {session.payment_status === "unpaid" && (
          <p className="text-red-600 text-center">
            Your payment was not successful. Please try again.
          </p>
        )}
      </div>
      <div className="flex justify-between">
        <button onClick={() => router.push("/")} className="startBtn">
          Return to Home
        </button>
        <Link href="/generate" className="otherBtn">
          Generate Flashcards
        </Link>

        {session.payment_status !== "paid" && (
          <button onClick={handleReturnToPayment} className="otherBtn">
            Try Payment Again
          </button>
        )}
      </div>
    </div>
  );
}
