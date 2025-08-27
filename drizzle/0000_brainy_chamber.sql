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
	"userId" integer,
	"word" varchar(100) NOT NULL,
	"note" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "vocabulary_words" ADD CONSTRAINT "vocabulary_words_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;