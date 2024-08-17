"use client";

import { useUser } from "@clerk/nextjs";
import { db } from "../../../firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  doc,
  collection,
  setDoc,
  getDoc,
  writeBatch,
} from "firebase/firestore";

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashCards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text to generate flashcards.");
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: text,
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      setFlashCards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occurred while generating flashcards. Please try again.");
    }
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const saveFlashcards = async () => {
    if (!name) {
      alert("please enter the name");
      return;
    }
    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSna = await getDoc(userDocRef);

    if (DocumentSnapshot.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert("Flashcard collection with same Name already exists");
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collection }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }
    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(carDocRef, flashcard);
    });
    await batch.commit();
    handleClose();
    router.push("/flashcards");
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mt-8 mb-12 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Generate Flashcards</h1>
        <div className="w-full bg-white shadow-md rounded-lg p-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Text"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            rows={4}
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </div>
      </div>

      {flashcards.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Flashcards Preview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {flashcards.map((flashcard, index) => (
              <div key={index} className="perspective-1000">
                <div
                  className={`relative w-full h-48 transition-transform duration-600 transform-style-3d cursor-pointer ${
                    flipped[index] ? "rotate-y-180" : ""
                  }`}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="absolute w-full h-full backface-hidden flex justify-center items-center p-4 bg-white shadow-lg rounded-lg">
                    <p className="text-xl">{flashcard.front}</p>
                  </div>
                  <div className="absolute w-full h-full backface-hidden flex justify-center items-start p-4 bg-white shadow-lg rounded-lg rotate-y-180 overflow-auto">
                    <p className="text-xl">{flashcard.back}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleOpen}
              className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Save Flashcards</h2>
            <p className="mb-4">
              Please enter a name for your flashcards collection
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Collection Name"
            />
            <div className="flex justify-end">
              <button
                onClick={handleClose}
                className="mr-2 bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
              <button
                onClick={saveFlashcards}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
