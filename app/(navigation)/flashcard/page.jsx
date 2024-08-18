// app/flashcard/page.jsx
'use client';
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useSearchParams } from "next/navigation";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function Flashcard() {
  const { user } = useAuth();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;

      const colRef = collection(doc(collection(db, "users"), user.uid), search);
      const docs = await getDocs(colRef);
      const flashcards = [];
      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });
      setFlashcards(flashcards);
    }
    getFlashcard();
  }, [search, user]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {flashcards.map((flashcard) => (
          <div key={flashcard.id} className="w-full">
            <div
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => handleCardClick(flashcard.id)}
            >
              <div className="p-4">
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <h2 className="text-xl font-bold">{flashcard.front}</h2>
                    </div>
                    <div className="flip-card-back">
                      <h2 className="text-xl font-bold">{flashcard.back}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
