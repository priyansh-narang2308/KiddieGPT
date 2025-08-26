import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db"; 
import { VocabularyWords } from "@/config/schema"; 
import { eq } from "drizzle-orm";

// ✅ GET → List all words for a user
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const words = await db
      .select()
      .from(VocabularyWords)
      .where(eq(VocabularyWords.userId, Number(userId)));

    return NextResponse.json(words);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch words" }, { status: 500 });
  }
}

// ✅ POST → Add a new word
export async function POST(req: NextRequest) {
  try {
    const { userId, word, note } = await req.json();

    if (!userId || !word) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newWord = await db
      .insert(VocabularyWords)
      .values({
        userId,
        word,
        note: note || null,
      })
      .returning();

    return NextResponse.json(newWord[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add word" }, { status: 500 });
  }
}
