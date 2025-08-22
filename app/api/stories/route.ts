import { NextResponse } from 'next/server';
import { db } from '@/config/db';
import { StoryData } from '@/config/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const stories = await db.select().from(StoryData).orderBy(desc(StoryData.id));
    return NextResponse.json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stories' },
      { status: 500 }
    );
  }
}
