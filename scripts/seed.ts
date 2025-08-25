import { db } from "@/config/db";
import { StoryData } from "@/config/schema";

async function seedStories() {
  await db.insert(StoryData).values([
    {
      storyId: "lion-mouse",
      storySubject: "The Lion and The Mouse",
      storyType: "Moral",
      ageGroup: "6-10",
      imageStyle: "Cartoon",
      output: { content: "Once upon a time, there was a lion and a mouse..." },
      coverImage: "/covers/lion-mouse.png",
      userEmail: "admin@example.com",
      userName: "Admin",
      userImage: "/users/admin.png"
    },
    {
      storyId: "space-adventure",
      storySubject: "Space Adventure",
      storyType: "Sci-Fi",
      ageGroup: "10-14",
      imageStyle: "Futuristic",
      output: { content: "In a galaxy far away, an adventure begins..." },
      coverImage: "/covers/space.png",
      userEmail: "admin@example.com",
      userName: "Admin",
      userImage: "/users/admin.png"
    }
  ]);

  console.log("Stories seeded!");
}

seedStories();
