import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

const config = {
  responseMimeType: "application/json",
};

const model = "gemini-1.5-flash";

export const generateKidsStoryAI = async (prompt: string) => {
  const contents = [
    {
      role: "user",
      parts: [{ text: prompt }],
    },
  ];

  const result = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  const candidate = result?.candidates?.[0];
  const text = candidate?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini returned an empty or malformed response.");
  }

  const match = text.match(/```json([\s\S]*?)```/);
  const jsonString = match ? match[1].trim() : text.trim();

  try {
    return JSON.parse(jsonString);
  } catch (e: any) {
    throw new Error("Failed to parse JSON from Gemini response: " + e.message);
  }
};
