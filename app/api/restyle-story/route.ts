import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { StoryData, StoryCharacters, PageGenerations } from "@/config/schema";
import { eq, and } from "drizzle-orm";
import { generateDeterministicSeed, buildCharacterPrompt, buildNegativePrompt } from "@/lib/utils";
import Replicate from "replicate";
import axios from "axios";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { storyId, newStyle } = data;

    if (!storyId || !newStyle) {
        return NextResponse.json(
            { success: false, error: "Missing storyId or newStyle" },
            { status: 400 }
        );
    }

    try {
        // Get story data
        const storyResult = await db.select().from(StoryData)
            .where(eq(StoryData.storyId, storyId));

        if (storyResult.length === 0) {
            return NextResponse.json(
                { success: false, error: "Story not found" },
                { status: 404 }
            );
        }

        const story = storyResult[0];
        const storyOutput = typeof story.output === 'string' ? JSON.parse(story.output) : story.output;

        // Get character data for this story
        const characterResult = await db.select().from(StoryCharacters)
            .where(eq(StoryCharacters.storyId, storyId));

        if (characterResult.length === 0) {
            return NextResponse.json(
                { success: false, error: "No character data found for this story" },
                { status: 400 }
            );
        }

        const characterData = characterResult[0];

        // Get existing page generations
        const existingGenerations = await db.select().from(PageGenerations)
            .where(eq(PageGenerations.storyId, storyId))
            .orderBy(PageGenerations.pageIndex);

        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN!,
        });

        const restyledPages = [];
        const updatedGenerations = [];

        // Process cover page
        if (story.coverImage) {
            const coverPrompt = `${storyOutput.coverImage} in ${newStyle} style. Text: "${storyOutput.title}" in bold, centered at the top like a storybook cover. Clean background, well-lit, high-quality illustration.`;
            
            // Add character consistency if available
            let finalCoverPrompt = coverPrompt;
            let negativePrompt = "";
            
            if (characterData) {
                const characterPrompt = buildCharacterPrompt(
                    { name: characterData.role || "main character" }, 
                    newStyle, 
                    true
                );
                finalCoverPrompt = `${characterPrompt}, ${coverPrompt}`;
                negativePrompt = buildNegativePrompt({ name: characterData.role || "main character" });
            }

            const coverPrediction = await replicate.predictions.create({
                model: "black-forest-labs/flux-schnell",
                input: {
                    prompt: finalCoverPrompt,
                    negative_prompt: negativePrompt || undefined,
                    output_format: "png",
                    output_quality: 80,
                    aspect_ratio: "1:1"
                }
            });

            // Wait for completion
            while (
                coverPrediction.status !== "succeeded" &&
                coverPrediction.status !== "failed" &&
                coverPrediction.status !== "canceled"
            ) {
                await new Promise((r) => setTimeout(r, 1000));
                const newPrediction = await replicate.predictions.get(coverPrediction.id);
                coverPrediction.status = newPrediction.status;
                coverPrediction.output = newPrediction.output;
            }

            if (coverPrediction.status === "succeeded" && Array.isArray(coverPrediction.output)) {
                const newCoverUrl = coverPrediction.output[0];
                
                // Save to Firebase storage
                const imageResult = await axios.post("/api/save-image", {
                    url: newCoverUrl
                });

                const firebaseUrl = imageResult.data.imageUrl;

                // Update story cover image
                await db.update(StoryData)
                    .set({ coverImage: firebaseUrl })
                    .where(eq(StoryData.storyId, storyId));

                restyledPages.push({
                    pageIndex: 0,
                    oldImage: story.coverImage,
                    newImage: firebaseUrl
                });

                // Update page generation record
                const newSeed = generateDeterministicSeed(storyId, characterData.characterId, 0);
                await db.update(PageGenerations)
                    .set({
                        imageUrl: firebaseUrl,
                        style: newStyle,
                        seed: newSeed,
                        negativePrompt: negativePrompt || null
                    })
                    .where(and(
                        eq(PageGenerations.storyId, storyId),
                        eq(PageGenerations.pageIndex, 0)
                    ));

                updatedGenerations.push({
                    pageIndex: 0,
                    newImage: firebaseUrl,
                    newSeed
                });
            }
        }

        // Process chapter pages
        for (let i = 0; i < storyOutput.chapters.length; i++) {
            const chapter = storyOutput.chapters[i];
            const pageIndex = i + 1;

            if (chapter.imagePrompt) {
                const chapterPrompt = `${chapter.imagePrompt} in ${newStyle} style. High quality, detailed illustration.`;
                
                // Add character consistency if available
                let finalChapterPrompt = chapterPrompt;
                let negativePrompt = "";
                
                if (characterData) {
                    const characterPrompt = buildCharacterPrompt(
                        { name: characterData.role || "main character" }, 
                        newStyle, 
                        false
                    );
                    finalChapterPrompt = `${characterPrompt}, ${chapterPrompt}`;
                    negativePrompt = buildNegativePrompt({ name: characterData.role || "main character" });
                }

                const chapterPrediction = await replicate.predictions.create({
                    model: "black-forest-labs/flux-schnell",
                    input: {
                        prompt: finalChapterPrompt,
                        negative_prompt: negativePrompt || undefined,
                        output_format: "png",
                        output_quality: 80,
                        aspect_ratio: "1:1"
                    }
                });

                // Wait for completion
                while (
                    chapterPrediction.status !== "succeeded" &&
                    chapterPrediction.status !== "failed" &&
                    chapterPrediction.status !== "canceled"
                ) {
                    await new Promise((r) => setTimeout(r, 1000));
                    const newPrediction = await replicate.predictions.get(chapterPrediction.id);
                    chapterPrediction.status = newPrediction.status;
                    chapterPrediction.output = newPrediction.output;
                }

                if (chapterPrediction.status === "succeeded" && Array.isArray(chapterPrediction.output)) {
                    const newChapterUrl = chapterPrediction.output[0];
                    
                    // Save to Firebase storage
                    const imageResult = await axios.post("/api/save-image", {
                        url: newChapterUrl
                    });

                    const firebaseUrl = imageResult.data.imageUrl;

                    restyledPages.push({
                        pageIndex,
                        oldImage: chapter.imageUrl || null,
                        newImage: firebaseUrl
                    });

                    // Update or create page generation record
                    const newSeed = generateDeterministicSeed(storyId, characterData.characterId, pageIndex);
                    
                    const existingGeneration = existingGenerations.find(g => g.pageIndex === pageIndex);
                    if (existingGeneration) {
                        await db.update(PageGenerations)
                            .set({
                                imageUrl: firebaseUrl,
                                style: newStyle,
                                seed: newSeed,
                                negativePrompt: negativePrompt || null
                            })
                            .where(and(
                                eq(PageGenerations.storyId, storyId),
                                eq(PageGenerations.pageIndex, pageIndex)
                            ));
                    } else {
                        await db.insert(PageGenerations).values({
                            storyId,
                            pageIndex,
                            imageUrl: firebaseUrl,
                            seed: newSeed,
                            negativePrompt: negativePrompt || null,
                            style: newStyle,
                            characterPromptCtx: {
                                name: characterData.role || "main character",
                                style: newStyle
                            }
                        });
                    }

                    updatedGenerations.push({
                        pageIndex,
                        newImage: firebaseUrl,
                        newSeed
                    });
                }
            }
        }

        // Update story style in database
        await db.update(StoryData)
            .set({ imageStyle: newStyle })
            .where(eq(StoryData.storyId, storyId));

        return NextResponse.json({
            success: true,
            message: "Story successfully re-styled",
            restyledPages,
            updatedGenerations,
            newStyle
        });

    } catch (error) {
        console.error("❌ Error in re-styling story:", error);
        return NextResponse.json(
            { success: false, error: "Failed to re-style story" },
            { status: 500 }
        );
    }
}
