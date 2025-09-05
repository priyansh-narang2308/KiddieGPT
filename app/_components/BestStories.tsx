import React from 'react';
import { useRouter } from "next/navigation";

interface Story {
  id: string;
  title: string;
  likes: number;
}

const BestStories = () => {
  const router = useRouter();

  const bestStories: Story[] = [
    { id: '1', title: 'The Magic Dragon Adventure', likes: 125 },
    { id: '2', title: 'Princess and the Rainbow Castle', likes: 98 },
    { id: '3', title: 'Superhero Cat Saves the Day', likes: 87 },
    { id: '4', title: 'Robot Friends Save the Planet', likes: 76 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">⭐</span>
        <h3 className="text-xl font-bold text-purple-800">Best Stories</h3>
      </div>

      {/* Stories List */}
      <div className="space-y-3">
        {bestStories.map((story) => (
          <div 
            key={story.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors border border-gray-100"
            onClick={() => router.push(`/stories/${story.id}`)}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-white text-xl">
              📚
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-800 leading-tight">{story.title}</h4>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <span className="text-red-500">❤️</span>
                <span>{story.likes} likes</span>
              </div>
            </div>
            <div className="text-purple-600">
              <span className="text-lg">▶️</span>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <button 
        className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-sm font-medium shadow-md"
        onClick={() => router.push("/stories")}
      >
        📖 View All Stories
      </button>
    </div>
  );
};

export default BestStories;
