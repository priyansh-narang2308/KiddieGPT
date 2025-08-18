"use client"

import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { useRouter } from "next/navigation"

type StoryItemType = {
  story: {
    id: number,
    storyType: string,
    ageGroup: string,
    coverImage: string,
    imageStyle: string,
    userEmail: string,
    userName: string,
    output: {
      title: string,
      coverImage: string
    },
    storyId: string,
    storySubject: string
  }
}

const StoryItemCard = ({ story }: StoryItemType) => {


  const router = useRouter()

  return (
     <Card
      onClick={() => router.push(`/view-story/${story?.storyId}`)}
      className="w-full max-w-sm h-[540px] flex flex-col gap-1 rounded-xl overflow-hidden shadow-xl border border-purple-300 bg-gradient-to-r from-purple-200 to-purple-300 hover:shadow-purple-400 transition duration-300 group cursor-pointer">
      <div className="overflow-hidden flex-shrink-0">
        <div className="overflow-hidden cursor-pointer">
          <Image
            onClick={e => { e.stopPropagation(); router.push(`/view-story/${story?.storyId}`); }}
            src={story?.coverImage}
            alt={story?.output?.title || "Story Cover"}
            width={400}
            height={240}
            className="w-full h-[240px] object-cover p-2 rounded-2xl transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      <CardContent className="flex flex-col flex-1 p-6 space-y-2 justify-between min-h-0">
        <CardTitle className="text-2xl font-bold text-purple-800 mb-1">
          {story?.output?.title}
        </CardTitle>
        <div className="text-sm text-purple-700 font-medium flex flex-wrap gap-2 mb-1">
          <span>By <span className="font-semibold">{story?.userName}</span></span>
          <span className="px-2 py-0.5 bg-purple-300/60 rounded text-xs">{story?.ageGroup}</span>
          <span className="px-2 py-0.5 bg-purple-200/60 rounded text-xs">{story?.storyType}</span>
        </div>
        <div className="text-gray-700 text-sm mb-2 truncate">
          {story?.storySubject}
        </div>
        <div className="flex-1" />
        <button
          onClick={e => { e.stopPropagation(); router.push(`/view-story/${story?.storyId}`); }}
          className="mt-2 px-4 py-2 cursor-pointer bg-purple-700 text-white rounded-lg shadow hover:bg-purple-900 transition text-sm font-semibold w-full"
        >
          View Story
        </button>
      </CardContent>
    </Card>
  )
}

export default StoryItemCard
