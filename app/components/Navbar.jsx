import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <div className="flex">
        <Link href="/">Home</Link>
      </div>
      <div className="flex">
        <SignedIn>
          <Link href="/dashboard">Dashboard</Link>
          <SignOutButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </nav>
  );
}