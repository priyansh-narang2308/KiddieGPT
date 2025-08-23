import { NextResponse } from "next/server";
import { generateStory } from "@/create-story"; // your existing story function

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // generate story using existing function
    const story = await generateStory(prompt);

    // New Parent Mode additions
    const vocabulary = ["imagination", "friendship", "courage", "kindness"];
    const moral = "Be kind and always help others, even when it’s not easy.";

    return NextResponse.json({
      story,
      vocabulary,
      moral,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate story" },
      { status: 500 }
    );
  }
}
