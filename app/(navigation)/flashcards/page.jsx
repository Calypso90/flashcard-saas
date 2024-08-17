import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import Link from "next/link";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    getFlashcards();
  }, [user]);

    if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="container mx-auto max-w-3xl">
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {flashcards.map((flashcard, index) => (
          <Link href={`/flashcard/${flashcard.name}`} key={index}>
            <div className="cursor-pointer rounded-lg border border-gray-200 shadow-md transition-shadow hover:shadow-lg">
              <div className="p-4">
                <h2 className="text-xl font-semibold">{flashcard.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
