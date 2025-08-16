"use client";

import * as React from "react";
import { useEffect, useState } from "react";
// import { db } from "@/config/db";
// import { StoryData } from "@/config/schema";
// import { desc } from "drizzle-orm";
import StoryItemCard from "@/app/dashboard/_components/story-item-card";
import CustomLoader from "@/app/create-story/_components/custom-loader";

// Type for a story item
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


// TODO: Fetch real stories from the database and generate ageGroups and storyTypes dynamically
const ageGroups: string[] = ["All"];
const storyTypes: string[] = ["All"];

const ExploreStories: React.FC = () => {
    const [storyList, setStoryList] = useState<StoryItemType[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [ageGroup, setAgeGroup] = useState("All");
    const [storyType, setStoryType] = useState("All");
    const [likes, setLikes] = useState<{ [id: number]: boolean }>({});

    // TODO: Fetch stories from the database and setStoryList with real data

    const filtered = storyList.filter(story => {
        const matchesSearch =
            story.output.title.toLowerCase().includes(search.toLowerCase()) ||
            story.userName.toLowerCase().includes(search.toLowerCase());
        const matchesAge = ageGroup === "All" || story.ageGroup === ageGroup;
        const matchesType = storyType === "All" || story.storyType === storyType;
        return matchesSearch && matchesAge && matchesType;
    });

    return (
        <div className="min-h-screen px-6 py-10 mt-20">
            <h1 className="text-3xl md:text-4xl text-purple-800 font-bold mb-8 text-center">
                Explore Stories from the Community 🌍
            </h1>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
                <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full md:w-72"
                />
                <select
                    value={ageGroup}
                    onChange={e => setAgeGroup(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                    {ageGroups.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <select
                    value={storyType}
                    onChange={e => setStoryType(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                    {storyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>
            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <img src="/empty-state.svg" alt="No stories" className="w-40 h-40 mb-4 opacity-80" />
                    <p className="text-xl text-purple-700 font-semibold">No stories found. Try a different search or filter!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                    {filtered.map((item) => (
                        <div key={item.id} className="relative w-full flex justify-center">
                            <StoryItemCard story={item} />
                            <button
                                className={`absolute top-4 right-4 z-10 text-2xl transition ${likes[item.id] ? 'text-pink-500' : 'text-gray-400'} hover:text-pink-600`}
                                onClick={e => { e.stopPropagation(); setLikes(l => ({ ...l, [item.id]: !l[item.id] })); }}
                                aria-label={likes[item.id] ? 'Unlike' : 'Like'}
                            >
                                {likes[item.id] ? '♥' : '♡'}
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
