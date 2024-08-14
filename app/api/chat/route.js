import { google } from "@ai-sdk/google";
import { convertToCoreMessages, streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google("models/gemini-1.5-flash-latest"),
    system: `You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
    Both front and back should be one sentence long.
    You should return in the following JSON format:
    {
      "flashcards":[
        {
          "front": "Front of the card",
          "back": "Back of the card"
        }
      ]
    }`,
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}