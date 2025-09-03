"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

type StoryItemType = {
  story: {
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
};

const StoryItemCard = ({ story }: StoryItemType) => {
  const router = useRouter();

  const isValidImage =
    typeof story?.coverImage === "string" && story.coverImage.trim() !== "";

  return (
    <Card
      onClick={() => router.push(`/view-story/${story?.storyId}`)}
      className="w-full max-w-sm h-[580px] flex flex-col rounded-xl overflow-hidden shadow-xl border border-purple-300 bg-gradient-to-r from-purple-200 to-purple-300 hover:shadow-purple-400 transition duration-300 group cursor-pointer"
    >
      {/* Image */}
      <div className="h-[240px] flex-shrink-0 overflow-hidden">
        {isValidImage && (
          <Image
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/view-story/${story?.storyId}`);
            }}
            src={story.coverImage}
            alt={story?.output?.title || "Story Cover"}
            width={400}
            height={240}
            className="w-full h-full object-cover p-2 rounded-2xl transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      {/* Content */}
      <CardContent className="flex flex-col flex-1 p-4 justify-between">
        {/* Title */}
        <div className="h-[50px] mb-3 overflow-hidden">
          <CardTitle className="text-lg font-bold text-purple-800 line-clamp-2 leading-tight break-words">
            {story?.output?.title}
          </CardTitle>
        </div>

        {/* Author and Tags */}
        <div className="h-[50px] mb-3">
          <p className="text-sm text-purple-700 font-medium line-clamp-1">
            By <span className="font-semibold">{story?.userName}</span>
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            <div className="px-2 py-1 bg-purple-300/60 rounded-full text-xs font-medium line-clamp-1 max-w-[80px]">
              {story?.ageGroup}
            </div>
            <div className="px-2 py-1 bg-purple-200/60 rounded-full text-xs font-medium line-clamp-1 max-w-[80px]">
              {story?.storyType}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="h-[40px] mb-4">
          <p className="text-gray-700 text-sm line-clamp-2 leading-relaxed break-words">
            {story?.storySubject}
          </p>
        </div>

        {/* Button */}
        <div className="mt-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/view-story/${story?.storyId}`);
            }}
            className="w-full mb-2 px-4 py-3 bg-purple-700 text-white rounded-lg shadow-md hover:bg-purple-900 transition-all duration-200 text-sm font-semibold hover:shadow-lg transform hover:-translate-y-0.5"
          >
            View Story
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryItemCard;
