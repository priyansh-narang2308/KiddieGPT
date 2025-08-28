import { integer, json, pgTable, serial, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";

export const StoryData = pgTable("storyData", {
    id: serial("id").primaryKey(),
    storyId: varchar("storyId"),
    storySubject: text("storySubject"),
    storyType: varchar("storyType"),
    ageGroup: varchar("ageGroup"),
    imageStyle: varchar("imageStyle"),
    output: json("output"),
    coverImage: varchar("coverImage"),
    userEmail: varchar("userEmail"),
    userName: varchar("userName"),
    userImage: varchar("userImage")
})

export const Users = pgTable("users", {
    id: serial("id").primaryKey(),
    userName: varchar("userName"),
    userEmail: varchar("userEmail"),
    userImage: varchar("userImage"),
    credits: integer("credits").default(3)
})

export const VocabularyWords = pgTable("vocabulary_words", {
    id: serial("id").primaryKey(),
    userId: integer("userId").references(() => Users.id), 
    word: varchar("word", { length: 100 }).notNull(),
    note: text("note"), 
    createdAt: timestamp("created_at").defaultNow(),
})

// New tables for character consistency
export const Characters = pgTable("characters", {
    id: serial("id").primaryKey(),
    ownerId: varchar("ownerId"), // user email
    name: varchar("name").notNull(),
    descriptors: json("descriptors"), // { age, traits, outfit, colors, mood, backstory }
    primaryColor: varchar("primaryColor"),
    outfit: text("outfit"),
    refImages: json("refImages"), // array of image URLs
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow()
})

export const StoryCharacters = pgTable("storyCharacters", {
    id: serial("id").primaryKey(),
    storyId: varchar("storyId").notNull(),
    characterId: integer("characterId").notNull(),
    role: varchar("role"), // "main", "supporting", "antagonist"
    styleToken: varchar("styleToken"), // hash of descriptors + style
    seed: varchar("seed"), // deterministic seed for generation
    createdAt: timestamp("createdAt").defaultNow()
})

export const PageGenerations = pgTable("pageGenerations", {
    id: serial("id").primaryKey(),
    storyId: varchar("storyId").notNull(),
    pageIndex: integer("pageIndex").notNull(), // 0 = cover, 1+ = chapters
    imageUrl: varchar("imageUrl"),
    seed: varchar("seed"),
    negativePrompt: text("negativePrompt"),
    characterPromptCtx: json("characterPromptCtx"), // character context for this page
    style: varchar("style").notNull(),
    createdAt: timestamp("createdAt").defaultNow()

})