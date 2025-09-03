"use client";

import { Button } from "@/components/ui/button";
import AgeGroup from "./_components/age-group";
import ImageStyle from "./_components/image-style";
import StorySubjectInput from "./_components/story-subject-input";
import StoryType from "./_components/story-type";
import CharacterCard from "./_components/character-card";
import ConsistencyToggle from "./_components/consistency-toggle";
import { useContext, useEffect, useState, useCallback } from "react";
import { generateKidsStoryAI } from "@/config/gemini-config";
import { toast } from "react-toastify";
import { db } from "@/config/db";
import {
  StoryData,
  Users,
  Characters,
  StoryCharacters,
  PageGenerations,
} from "@/config/schema";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import CustomLoader from "./_components/custom-loader";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "@/context/UserDetailContext";
import { eq } from "drizzle-orm";
import { CharacterData } from "./_components/character-card";
import {
  generateDeterministicSeed,
  generateStyleToken,
  buildCharacterPrompt,
  buildNegativePrompt,
} from "@/lib/utils";

export interface fieldData {
  fieldName: string;
  fieldValue: string;
}

export interface formDataType {
  storySubject: string;
  storyType: string;
  ageGroup: string;
  imageStyle: string;
}

//Random timely moral,parenting,kids Quotes
const magicalTips = {
  morning: [
    "☀️ Good morning, little dreamer! Start your day with a smile and an open heart.",
    "🌟 Morning magic: Sharing kindness grows faster than any magic bean.",
    "🍎 Bright Morining! Fuel your imagination today with curiosity and fun ideas!",
    "🦄 Patience is a magic power — water it with love this morning!",
    "✨ Parenting tip: Answer your child's questions with excitement — every ‘why’ is a spark.",
    "🌸 Chirpy Morning! Begin the day with gratitude, even for tiny things like a bird singing.",
    "🎨 Morning creativity: Draw something that makes you giggle!",
    "🍀 Moral of the morning: Helping even a little friend is a big adventure.",
    "💡 Fun tip: Smile at someone today and notice the magic it creates.",
    "📚 Story seed: Think of a character who loves mornings as much as you do!",
    "🛣️ Raise and shine! LIVE your way ,LEAVE the rest away",
    "🌟 Shine bright today — your imagination lights up the world!",
    "🚀 Blooming Morning ! Every small step is a giant leap in your adventure story.",
    "💡 Great ideas grow from tiny sparks — never stop wondering!",
    "🍀Sunny Greetings!  Believe in yourself: even magic beans start small!",
    "🏆 Courage isn’t roaring, it’s trying even when scared.",
    "🛁 Bath time is the perfect place for bubble-brain ideas!",
  ],
  afternoon: [
    "🌞 Afternoon adventure: Let your imagination soar like a kite in the sky.",
    "🍀 Moral: Small acts of kindness make afternoons sparkle!",
    "🎨 Creativity tip: Try a new color or shape in your drawing today.",
    "🦋 Parenting tip: Encourage mini missions — tidying toys or helping with snacks.",
    "💡 Fun fact: Every story you read adds a sprinkle of magic to your brain.",
    "👂 Listen closely — a child’s question is a treasure map to curiosity.",
    "🦄 Oops! Even magic beans need a nap sometimes — don’t forget yours!",
    "🍪 A cookie shared is a giggle doubled.",
    "🎨Creative afternoon! Let them paint outside the lines — creativity has no borders!",
    "🍭 Snack break tip: A little treat is better when shared with friends!",
    "🌱 Bright Afternoon! A tiny act of kindness can grow into a forest of smiles.",
    "🦖 Adventure tip: Pretend your toys come alive and explore the backyard.",
    "✨ Afternoon Delight! Encourage your child to teach you something — learning is magic for both!",
    "🎵 Musical tip: Hum a tune, dance a little, and make the afternoon magical.",
    "💖 Helping friends is the fastest way to make the world magical.",
    "🛡 Moral: Courage is doing the right thing even when it’s scary.",
    "🐸 Happy Day! Jump like a frog today, land like a superhero!",
    "🎩 Sunny afternoon! Hats off to little thinkers — you make magic happen!",
  ],
  night: [
    "🌙 Good night, dreamer! Let your dreams sparkle and dance.",
    "✨ Moral: Reflect on a kind act you did today — it’s like planting a magic seed.",
    "🛌 Bedtime tip: One story before sleep is a world of adventure before dreams.",
    "🦄 Parenting wisdom: Share a story tonight — it’s the ultimate magic bean!",
    "🌟 Fun fact: Stars are the universe’s way of saying, 'Dream big, little one!'",
    "💤 Sleep tip: Cozy blankets make dreams even more colorful.",
    "🌸 Evening reflection: Think of three happy moments from today.",
    "📚 Night imagination: Create a mini story in your mind before sleeping.",
    "🕯 Moral: Gratitude at night makes you stronger and happier tomorrow.",
    "🎨 Art tip: Draw your favorite part of the day before bed.",
    "🌈 DARE to DREAM, Live the dream , Sweet dreams!",
    "🌸 Gratitude is a superpower — use it daily.",
    "🕊 Peaceful night! Even the smallest promise kept is a giant heart win.",
    "📚 Read together, laugh together, grow together.",
    "🧩Night sparkle!  Every little problem solved is a confidence puzzle completed.",
    "💫 Twilight Greetings! Encourage questions — tiny ‘whys’ lead to big discoveries.",
  ],
};

const CreateStory = () => {
  const [formData, setFormData] = useState<formDataType>({
    storySubject: "",
    storyType: "",
    ageGroup: "",
    imageStyle: "",
  });

  const [characterData, setCharacterData] = useState<CharacterData>({
    name: "",
    age: "",
    traits: "",
    outfit: "",
    primaryColor: "",
    mood: "",
    backstory: "",
    refImages: [],
  });

  const [enforceConsistency, setEnforceConsistency] = useState(true);

  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const router = useRouter();

  //magicTip
  const [magicTip, setMagicTip] = useState<string>(magicalTips.morning[0]);
  const onHandleUserSelection = useCallback((data: fieldData) => {
    console.log("onHandleUserSelection called:", data);
    setFormData((prev) => ({
      ...prev,
      [data.fieldName]: data.fieldValue,
    }));
  }, []);

  const onCharacterChange = useCallback((character: CharacterData) => {
    console.log("onCharacterChange called:", character);
    setCharacterData(character);
  }, []);

  const onConsistencyChange = useCallback((enabled: boolean) => {
    console.log("onConsistencyChange called:", enabled);
    setEnforceConsistency(enabled);
  }, []);

  useEffect(() => {
    console.log("Updated formData:", formData);
    console.log("Updated characterData:", characterData);
    console.log("Enforce consistency:", enforceConsistency);
  }, [formData, characterData, enforceConsistency]);

  const saveCharacterToDatabase = async (): Promise<number | null> => {
    if (!characterData.name || !enforceConsistency) {
      return null;
    }

    try {
      const result = await db
        .insert(Characters)
        .values({
          ownerId: user?.primaryEmailAddress?.emailAddress || "",
          name: characterData.name,
          descriptors: characterData,
          primaryColor: characterData.primaryColor,
          outfit: characterData.outfit,
          refImages: characterData.refImages || [],
        })
        .returning({ id: Characters.id });

      return result[0]?.id || null;
    } catch (error) {
      console.error("Error saving character:", error);
      return null;
    }
  };

  const saveStoryCharacterRelationship = async (
    storyId: string,
    characterId: number
  ) => {
    try {
      const styleToken = generateStyleToken(characterData, formData.imageStyle);
      const seed = generateDeterministicSeed(storyId, characterId, 0); // 0 for cover

      await db.insert(StoryCharacters).values({
        storyId,
        characterId,
        role: "main",
        styleToken,
        seed,
      });
    } catch (error) {
      console.error("Error saving story character relationship:", error);
    }
  };

  const savePageGeneration = async (
    storyId: string,
    pageIndex: number,
    imageUrl: string,
    seed: string,
    negativePrompt: string,
    characterPromptCtx: any
  ) => {
    try {
      await db.insert(PageGenerations).values({
        storyId,
        pageIndex,
        imageUrl,
        seed,
        negativePrompt,
        characterPromptCtx,
        style: formData.imageStyle,
      });
    } catch (error) {
      console.error("Error saving page generation:", error);
    }
  };

  // New: Update magicTip every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Determine current time of day
      const hour = new Date().getHours();
      let tips: string[] = [];

      if (hour >= 5 && hour < 12) tips = magicalTips.morning;
      else if (hour >= 12 && hour < 18) tips = magicalTips.afternoon;
      else tips = magicalTips.night;

      // Pick a random tip from the correct time category
      const randomIndex = Math.floor(Math.random() * tips.length);
      setMagicTip(tips[randomIndex]);
    }, 10000); // every 5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const saveToDatabaseTheGeneratedStory = async (
    output: string,
    imageUrl: string
  ) => {
    const recordId = uuidv4();
    setLoading(true);
    try {
      const result = await db
        .insert(StoryData)
        .values({
          storyId: recordId,
          ageGroup: formData.ageGroup,
          storySubject: formData.storySubject,
          storyType: formData.storyType,
          imageStyle: formData.imageStyle,
          output: output,
          coverImage: imageUrl,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
          userImage: user?.imageUrl,
        })
        .returning({ storyId: StoryData.storyId });

      // Save character if consistency is enabled
      if (enforceConsistency && characterData.name) {
        const characterId = await saveCharacterToDatabase();
        if (characterId) {
          await saveStoryCharacterRelationship(recordId, characterId);
        }
      }

      setLoading(false);
      return result;
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Error in saving to db");
      throw error;
    }
  };

  const generateStoryFromAI = async () => {
    if (userDetail.credits <= 0) {
      toast.error("You don't have enough credits");
      return;
    }

    if (
      !formData.ageGroup ||
      !formData.storyType ||
      !formData.storySubject ||
      !formData.imageStyle
    ) {
      toast.error("Please fill all fields before generating a story");
      return;
    }

    if (enforceConsistency && !characterData.name) {
      toast.error(
        "Please provide a character name when consistency is enabled"
      );
      return;
    }

    setLoading(true);

    const CREATE_STORY_PROMPT = `
Create a 5-chapter kids story for children aged {ageGroup}.
The story should be {storyType}.
The main character is a {storySubject}.
${
  enforceConsistency && characterData.name
    ? `The main character is named ${characterData.name}${
        characterData.age ? `, who is ${characterData.age} years old` : ""
      }${characterData.traits ? `, and is ${characterData.traits}` : ""}${
        characterData.outfit ? `, wearing ${characterData.outfit}` : ""
      }${
        characterData.primaryColor
          ? `, with ${characterData.primaryColor} as their primary color`
          : ""
      }.`
    : ""
}
The language should be simple and child-friendly.

Include:
- A creative story title
- 5 chapters with little descriptive and long story, fun story text
- A {imageStyle}-style image prompt for each chapter
- A cover image prompt in {imageStyle} style with the story title

Format everything in clean JSON with keys: title, coverImage, chapters.`;

    const FINAL_PROMPT = CREATE_STORY_PROMPT.replace(
      "{ageGroup}",
      formData.ageGroup
    )
      .replace("{storyType}", formData.storyType)
      .replace("{storySubject}", formData.storySubject)
      .replace(/{imageStyle}/g, formData.imageStyle);

    try {
      const story = await generateKidsStoryAI(FINAL_PROMPT);
      const parsedStory = typeof story === "string" ? JSON.parse(story) : story;

      let imagePrompt = `${parsedStory.coverImage} in ${formData.imageStyle} style. Text: "${parsedStory.title}" in bold, centered at the top like a storybook cover. Clean background, well-lit, high-quality illustration.`;

      // Add character consistency to image prompt if enabled
      if (enforceConsistency && characterData.name) {
        const characterPrompt = buildCharacterPrompt(
          characterData,
          formData.imageStyle,
          true
        );
        imagePrompt = `${characterPrompt}, ${imagePrompt}`;
      }

      const imageResp = await axios.post("/api/generate-image", {
        prompt: imagePrompt,
        enforceConsistency: enforceConsistency,
        characterData: enforceConsistency ? characterData : null,
      });

      if (!imageResp.data.success || !imageResp.data.imageUrl) {
        throw new Error(imageResp.data.error || "Image generation failed");
      }

      const AIimageUrl = imageResp.data.imageUrl;
      console.log("Generated Image URL:", AIimageUrl);

      setCoverImageUrl(AIimageUrl);

      const imageResult = await axios.post("/api/save-image", {
        url: AIimageUrl,
      });

      const firebaseStorageImageurl = imageResult.data.imageUrl;

      // SAVE TO DATABASE
      const result = await saveToDatabaseTheGeneratedStory(
        JSON.stringify(parsedStory),
        firebaseStorageImageurl
      );

      // Save character if consistency is enabled
      if (enforceConsistency && characterData.name) {
        const characterId = await saveCharacterToDatabase();
        if (characterId) {
          await saveStoryCharacterRelationship(
            result[0]?.storyId || "",
            characterId
          );
        }
      }

      // Save page generation metadata if consistency is enabled
      if (enforceConsistency && characterData.name) {
        const seed = generateDeterministicSeed(result[0]?.storyId || "", 1, 0); // characterId 1 for now
        const negativePrompt = buildNegativePrompt(characterData);
        const characterPromptCtx = {
          name: characterData.name,
          descriptors: characterData,
          style: formData.imageStyle,
        };

        await savePageGeneration(
          result[0]?.storyId || "",
          0,
          firebaseStorageImageurl,
          seed,
          negativePrompt,
          characterPromptCtx
        );
      }

      toast.success("🦄 Story Generated Successfully!", {
        position: "top-right",
        autoClose: 4000,
        theme: "dark",
      });

      await updateUserCredits();
      router.replace(`/view-story/${result[0]?.storyId}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate story or image");
    } finally {
      setLoading(false);
    }
  };

  // NOTE: THE CREDIT THING

  const updateUserCredits = async () => {
    const result = await db
      .update(Users)
      .set({
        credits: Number(userDetail?.credits - 1),
      })
      .where(eq(Users.userEmail, user?.primaryEmailAddress?.emailAddress ?? ""))
      .returning({ id: Users.id });
  };

  return (
    <section className="w-full mt-6 bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 px-6 py-16 md:py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold text-purple-800 leading-tight mb-4">
          Create Your Magical Story
        </h2>
        <p className="text-purple-700 text-lg md:text-xl max-w-3xl mx-auto mb-6">
          ✨ Unlock your creativity with the power of AI! Craft personalized
          stories that spark imagination and wonder. Let our magical AI bring
          your ideas to life — one story at a time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-14">
          <StorySubjectInput userSelection={onHandleUserSelection} />
          <StoryType userSelection={onHandleUserSelection} />
          <AgeGroup userSelection={onHandleUserSelection} />
          <ImageStyle userSelection={onHandleUserSelection} />
        </div>

        {/* Character Consistency Section */}
        <div className="mt-10 space-y-6">
          <h3 className="text-2xl font-bold text-purple-800">
            🎭 Character Consistency
          </h3>
          <p className="text-purple-600 text-lg">
            Define your main character to maintain consistent appearance across
            all story pages
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <CharacterCard onCharacterChange={onCharacterChange} />
            <ConsistencyToggle onConsistencyChange={onConsistencyChange} />
          </div>
        </div>

        <div className="flex flex-col items-center mt-10 gap-3">
          <Button
            disabled={loading}
            onClick={generateStoryFromAI}
            className="px-10 py-5 text-xl cursor-pointer font-semibold rounded-full bg-gradient-to-r from-purple-600 to-purple-800 text-white 
     shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            ✨ Generate Story
          </Button>

          <span className="mt-2 text-xl text-black bg-yellow-600 px-4 py-2 rounded-md border border-yellow-500 shadow-sm">
            {magicTip ||
              "⚠️ 1 shiny magic bean will be used to grow your story 🌱✨ — spend it like a true bedtime hero! "}
          </span>

          <CustomLoader isOpen={loading} />
        </div>
      </div>
    </section>
  );
};

export default CreateStory;
