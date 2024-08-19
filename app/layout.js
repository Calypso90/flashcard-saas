// app/layout.js
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./components/Navbar";
import { Analytics } from "@vercel/analytics/react";

const metadata = {
  title: "Flash Wave",
  description: "Generate flashcards using AI",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </head>
        <body>
          <Navbar />
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}