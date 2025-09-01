CREATE TABLE "characters" (
	"id" serial PRIMARY KEY NOT NULL,
	"ownerId" varchar,
	"name" varchar NOT NULL,
	"descriptors" json,
	"primaryColor" varchar,
	"outfit" text,
	"refImages" json,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "pageGenerations" (
	"id" serial PRIMARY KEY NOT NULL,
	"storyId" varchar NOT NULL,
	"pageIndex" integer NOT NULL,
	"imageUrl" varchar,
	"seed" varchar,
	"negativePrompt" text,
	"characterPromptCtx" json,
	"style" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "storyCharacters" (
	"id" serial PRIMARY KEY NOT NULL,
	"storyId" varchar NOT NULL,
	"characterId" integer NOT NULL,
	"role" varchar,
	"styleToken" varchar,
	"seed" varchar,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "storyData" (
	"id" serial PRIMARY KEY NOT NULL,
	"storyId" varchar,
	"storySubject" text,
	"storyType" varchar,
	"ageGroup" varchar,
	"imageStyle" varchar,
	"output" json,
	"coverImage" varchar,
	"userEmail" varchar,
	"userName" varchar,
	"userImage" varchar
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"userName" varchar,
	"userEmail" varchar,
	"userImage" varchar,
	"credits" integer DEFAULT 3
);
--> statement-breakpoint
CREATE TABLE "vocabulary_words" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"word" varchar(100) NOT NULL,
	"note" text,
	"created_at" timestamp DEFAULT now()
);
