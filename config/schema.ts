import { integer, json, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

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