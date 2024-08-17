"use client";
import React, { useState, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../firebase";
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text to generate flashcards.");
      return;
    }

    setIsGenerating(true);
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
    } finally {
      setIsGenerating(false);
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

  const saveFlashcards = useCallback(async () => {
    if (!isSignedIn || !user) {
      alert("You must be signed in to save flashcards.");
      return;
    }

    if (!name) {
      alert("Please enter a name for your flashcard collection.");
      return;
    }

    setIsSaving(true);
    try {
      const batch = writeBatch(db);
      const userDocRef = doc(db, "users", user.id);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // Create the user document if it doesn't exist
        batch.set(userDocRef, { email: user.primaryEmailAddress.emailAddress });
      }

      const flashcardsCollectionRef = collection(userDocRef, "flashcards");
      const flashcardDocRef = doc(flashcardsCollectionRef, name);

      // Check if a flashcard collection with this name already exists
      const flashcardDocSnap = await getDoc(flashcardDocRef);
      if (flashcardDocSnap.exists()) {
        alert(
          "A flashcard collection with this name already exists. Please choose a different name."
        );
        setIsSaving(false);
        return;
      }

      // Save the flashcard collection
      batch.set(flashcardDocRef, { name, createdAt: new Date() });

      // Save individual flashcards
      flashcards.forEach((flashcard, index) => {
        const cardDocRef = doc(flashcardDocRef, "cards", index.toString());
        batch.set(cardDocRef, flashcard);
      });

      await batch.commit();

      alert("Flashcards saved successfully!");
      handleClose();
      router.push("/flashcards");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      if (error.code === "permission-denied") {
        alert(
          "You don't have permission to save flashcards. Please check your account and try again."
        );
      } else {
        alert("An error occurred while saving flashcards. Please try again.");
      }
    } finally {
      setIsSaving(false);
    }
  }, [isSignedIn, user, name, flashcards, handleClose, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="container mx-auto px-4">
        <div className="mt-8 mb-12 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-6">Generate Flashcards</h1>
          <div className="w-full bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
            <p className="text-red-500">
              You must sign in first to make flashcards.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mt-8 mb-12 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Generate Flashcards</h1>
        <div className="w-full bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Text"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            rows={4}
          />
          <button
            onClick={handleSubmit}
            className="startBtn"
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Submit"}
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
                  className={`relative w-full h-48 transition-transform duration-600 transform-style-preserve-3d cursor-pointer ${
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
          <div className="mt-8 mb-8 flex justify-center">
            <button onClick={handleOpen} className="otherBtn">
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
            <div className="flex justify-end gap-4">
              <button
                onClick={handleClose}
                className="startBtn"
                disabled={isSaving}
              >
                Close
              </button>
              <button
                onClick={saveFlashcards}
                className="otherBtn"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
