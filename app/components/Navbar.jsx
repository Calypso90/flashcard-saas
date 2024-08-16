import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import '../globals.css';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-4 px-8">
      <div className="flex">
        <Link href="/" className="text-2xl tracking-wider">
        <span className="typing-text">
            {Array.from("Flash\u00A0Wave").map((char, index) => (
              <span key={index} className="typing-letter">{char}</span>
            ))}
          </span>
        </Link>
      </div>
      <div className="flex items-center space-x-4 gap-4">
        <SignedIn>
          <Link href="/dashboard" className="text-gray-600 text-xl hover:text-blue-600">
            Dashboard
          </Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in" className="text-gray-600 hover:text-blue-600">
            Sign In
          </Link>
          <Link href="/sign-up" className="bg-blue-500  hover:bg-blue-600 text-white px-4 py-2 rounded">
            Sign Up
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
}