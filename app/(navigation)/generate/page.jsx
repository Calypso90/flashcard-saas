"use client";
import { doc, collection, writeBatch, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function Generate() {
  const { user } = useUser();
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [setName, setSetName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const saveFlashcards = async () => {
    if (!user) {
      alert("Please sign in to save flashcards.");
      return;
    }

    if (!setName.trim()) {
      alert("Please enter a name for your flashcard set.");
      return;
    }

    try {
      const userDocRef = doc(collection(db, "users"), user.id);
      const userDocSnap = await getDoc(userDocRef);

      const batch = writeBatch(db);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedSets = [
          ...(userData.flashcardSets || []),
          { name: setName },
        ];
        batch.update(userDocRef, { flashcardSets: updatedSets });
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] });
      }

      const setDocRef = doc(collection(userDocRef, "flashcardSets"), setName);
      batch.set(setDocRef, { flashcards });

      await batch.commit();

      alert("Flashcards saved successfully!");
      handleCloseDialog();
      setSetName("");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("An error occurred while saving flashcards. Please try again.");
    }
  };

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
      setFlashcards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occurred while generating flashcards. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="my-8">
        <h1 className="text-3xl font-bold mb-4">Generate Flashcards</h1>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
          className="w-full p-2 border border-gray-300 rounded mb-4 h-32"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Generate Flashcards
        </button>
      </div>

      {flashcards.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Generated Flashcards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {flashcards.map((flashcard, index) => (
              <div key={index} className="border rounded p-4 shadow">
                <h3 className="font-bold">Front:</h3>
                <p>{flashcard.front}</p>
                <h3 className="font-bold mt-2">Back:</h3>
                <p>{flashcard.back}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {flashcards.length > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleOpenDialog}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Save Flashcards
          </button>
        </div>
      )}

      {dialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Save Flashcard Set</h2>
            <p className="mb-4">Please enter a name for your flashcard set.</p>
            <input
              type="text"
              value={setName}
              onChange={(e) => setSetName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Set Name"
            />
            <div className="flex justify-end">
              <button
                onClick={handleCloseDialog}
                className="mr-2 px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveFlashcards}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
