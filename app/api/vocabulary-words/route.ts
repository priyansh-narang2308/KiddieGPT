import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { VocabularyWords } from "@/config/schema";
import { eq, and } from "drizzle-orm";

// GET → list all words for a user
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

    const words = await db
      .select()
      .from(VocabularyWords)
      .where(eq(VocabularyWords.userId, Number(userId)));

    // Deduplicate and normalize
    const uniqueWords = Array.from(
      new Map(words.map(w => [w.word.toLowerCase().trim(), w])).values()
    );

    return NextResponse.json(uniqueWords);
  } catch (err) {
    console.error("GET /vocabulary-words error:", err);
    return NextResponse.json({ error: "Failed to fetch words" }, { status: 500 });
  }
}

// POST → add a new word (no duplicates)
export async function POST(req: NextRequest) {
  try {
    const { userId, word, note } = await req.json();

    if (!userId || !word) {
      return NextResponse.json({ error: "Missing userId or word" }, { status: 400 });
    }

    const normalizedWord = word.trim().toLowerCase();

    // Insert
    const newWord = await db
      .insert(VocabularyWords)
      .values({
        userId: Number(userId),
        word: normalizedWord,
        note: note || null,
      })
      .returning();

    return NextResponse.json(newWord[0]);
  } catch (err) {
    console.error("POST /vocabulary-words error:", err);
    return NextResponse.json({ error: "Failed to add word" }, { status: 500 });
  }
}

// DELETE → remove a word by ID
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const wordId = searchParams.get("wordId");

    if (!wordId) {
      return NextResponse.json({ error: "Missing wordId" }, { status: 400 });
    }

    // Delete the word
    await db
      .delete(VocabularyWords)
      .where(eq(VocabularyWords.id, Number(wordId)));

    return NextResponse.json({ message: "Word deleted successfully" });
  } catch (err) {
    console.error("DELETE /vocabulary-words error:", err);
    return NextResponse.json({ error: "Failed to delete word" }, { status: 500 });
  }
}
