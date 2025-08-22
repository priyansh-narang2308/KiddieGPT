"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StoryItemCard from "@/app/dashboard/_components/story-item-card";
import CustomLoader from "@/app/create-story/_components/custom-loader";

type StoryItemType = {
  id: number;
  storyType: string;
  ageGroup: string;
  coverImage: string;
  imageStyle: string;
  userEmail: string;
  userName: string;
  output: {
    title: string;
    coverImage: string;
  };
  storyId: string;
  storySubject: string;
};

const ExploreStories: React.FC = () => {
  const [ageGroups, setAgeGroups] = useState<string[]>(["All"]);
  const [storyTypes, setStoryTypes] = useState<string[]>(["All"]);
  const [storyList, setStoryList] = useState<StoryItemType[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [ageGroup, setAgeGroup] = useState("All");
  const [storyType, setStoryType] = useState("All");
  const [likes, setLikes] = useState<{ [id: number]: boolean }>({});

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/stories");
        if (!response.ok) {
          throw new Error("Failed to fetch stories");
        }
        const stories = await response.json();
        setStoryList(stories);

        // Update age groups and story types from the data
        const uniqueAgeGroups = new Set(["All"]);
        const uniqueStoryTypes = new Set(["All"]);

        stories.forEach((story: any) => {
          if (story.ageGroup) uniqueAgeGroups.add(story.ageGroup);
          if (story.storyType) uniqueStoryTypes.add(story.storyType);
        });

        setAgeGroups(Array.from(uniqueAgeGroups) as string[]);
        setStoryTypes(Array.from(uniqueStoryTypes) as string[]);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const filtered = storyList.filter((story) => {
    const matchesSearch =
      story.output.title.toLowerCase().includes(search.toLowerCase()) ||
      story.userName.toLowerCase().includes(search.toLowerCase());
    const matchesAge = ageGroup === "All" || story.ageGroup === ageGroup;
    const matchesType = storyType === "All" || story.storyType === storyType;
    return matchesSearch && matchesAge && matchesType;
  });

  return (
    <div className="w-full h-full mt-6 bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 px-6 py-16 md:py-20">
      <h1 className="text-3xl md:text-4xl text-purple-800 font-bold mb-8 text-center">
        Explore Stories from the Community 🌍
      </h1>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg border-2 border-purple-700  focus:outline-none focus:ring-2 focus:ring-purple-400 w-full md:w-72"
        />
        <div className="flex gap-4">
          <Select value={ageGroup} onValueChange={setAgeGroup}>
            <SelectTrigger className="w-[180px] rounded-xl border-purple-700 border-2 focus:ring-2 focus:ring-purple-400">
              <SelectValue placeholder="Select age group" />
            </SelectTrigger>
            <SelectContent>
              {ageGroups.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={storyType} onValueChange={setStoryType}>
            <SelectTrigger className="w-[180px] rounded-xl border-purple-700 border-2 focus:ring-2 focus:ring-purple-400">
              <SelectValue placeholder="Select story type" />
            </SelectTrigger>
            <SelectContent>
              {storyTypes.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-xl text-purple-700 font-semibold">
            No stories found. Try a different search or filter!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {filtered.map((item) => (
            <div key={item.id} className="relative w-full flex justify-center">
  <StoryItemCard story={item} />
  
  <button
    className={`
      absolute top-4 right-4 z-10 p-2 rounded-full 
      bg-white/70 backdrop-blur-sm shadow-md
      transition-all duration-300 ease-in-out
      hover:scale-110
    `}
    onClick={(e) => {
      e.stopPropagation();
      setLikes((l) => ({ ...l, [item.id]: !l[item.id] }));
    }}
    aria-label={likes[item.id] ? "Unlike" : "Like"}
  >
    <Heart
      className={`w-6 h-6 cursor-pointe transition-colors duration-300 ${
        likes[item.id]
          ? "fill-pink-500 text-pink-500"
          : "text-gray-500"
      }`}
    />
  </button>
</div>
          ))}
          <CustomLoader isOpen={loading} />
        </div>
      )}
    </div>
  );
};

export default ExploreStories;
