'use client';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { doc, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcardSets, setFlashcardSets] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcardSets() {
      if (!user) return;
      const userDocRef = doc(collection(db, "users"), user.id);
      const flashcardSetsCollectionRef = collection(userDocRef, "flashcardSets");
      const flashcardSetsSnapshot = await getDocs(flashcardSetsCollectionRef);
      const sets = flashcardSetsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFlashcardSets(sets);
    }
    getFlashcardSets();
  }, [user]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="container mx-auto max-w-3xl">
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {flashcardSets.map((set, index) => (
          <Link href={`/flashcard/${set.id}`} key={index}>
            <div className="cursor-pointer rounded-lg border border-gray-200 shadow-md transition-shadow hover:shadow-lg">
              <div className="p-4 bg-white">
                <h2 className="text-xl font-semibold text-black capitalize text-center">{set.id}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}