"use client"

import { db } from "@/config/db"
import { StoryData } from "@/config/schema"
import { eq } from "drizzle-orm"
import React, { useEffect, useState, useRef, use } from "react"
import HTMLFlipBook from "react-pageflip"
import BookCoverPage from "../_components/book-cover-page"
import StoryPages from "../_components/story-pages"
import LastPage from "../_components/last-page"
import RestyleButton from "../_components/restyle-button"
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";

interface Chapter {
  chapterNumber: number;
  title: string;
  story: string;
  imagePrompt?: string;
  imageUrl?: string;
}

interface StoryOutput {
  title: string;
  coverImage: string;
  chapters: Chapter[];
}

interface StoryRecord {
  storyId: string;
  output: StoryOutput;
  coverImage: string;
  imageStyle: string;
}

const ViewStory = ({ params: paramsPromise }: { params: Promise<{ storyId: string }> }) => {
  const { storyId } = use(paramsPromise) 

  const [storyData, setStoryData] = useState<StoryRecord | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const flipBookRef = useRef<any>(null)

  const getStoryFromDb = async () => {
    const result = await db.select().from(StoryData)
      .where(eq(StoryData.storyId, storyId)) as StoryRecord[]

    if (result.length > 0) {
      setStoryData(result[0])

      if (result[0].output && Array.isArray(result[0].output.chapters)) {
        setTotalPages(result[0].output.chapters.length + 2) // cover + chapters + last page
      } else {
        setTotalPages(2) // fallback
      }
    }
  }

  useEffect(() => {
    getStoryFromDb()
  }, [storyId])

  const handlePageChange = (e: any) => {
    setCurrentPage(e.data)
  }

  const goToPreviousPage = () => {
    if (flipBookRef.current && currentPage > 0) {
      flipBookRef.current.pageFlip().flipPrev()
    }
  }

  const goToNextPage = () => {
    if (flipBookRef.current && currentPage < totalPages - 1) {
      flipBookRef.current.pageFlip().flipNext()
    }
  }

  const handleRestyleComplete = () => {
    // Refresh story data after re-styling
    getStoryFromDb()
  }

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-100 p-6 md:px-20 lg:px-40">
      <div className="text-center mb-8">
        <h1 className="text-5xl bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-100 font-extrabold text-gray-800 mb-6 tracking-wide drop-shadow-2xl rounded-2xl p-3">
          {storyData?.output?.title || "Loading Story..."}
        </h1>
        
        {/* Re-style Button */}
        {storyData && (
          <div className="flex justify-center mb-6">
            <RestyleButton 
              storyId={storyId} 
              currentStyle={storyData.imageStyle || 'unknown'}
              onRestyleComplete={handleRestyleComplete}
            />
          </div>
        )}
      </div>

      <div className="relative">
        {storyData && (
          // @ts-ignore
          <HTMLFlipBook
            ref={flipBookRef}
            width={500}
            height={600}
            showCover={true}
            useMouseEvents={false}
            className="mx-auto shadow-2xl rounded-xl"
            style={{ borderRadius: "20px", overflow: "hidden" }}
            onFlip={handlePageChange}
            onChangeOrientation={handlePageChange}
          >
            <div className="bg-white h-full">
              <BookCoverPage imageUrl={storyData.coverImage} />
            </div>

            {storyData?.output?.chapters.map((chapter, index) => (
              <div key={index} className="bg-white h-full p-8">
                <StoryPages storyChapters={chapter} />
              </div>
            ))}

            <div className="bg-white h-full">
              <LastPage />
            </div>
          </HTMLFlipBook>
        )}

        {currentPage > 0 && (
          <div className="absolute left-15 top-[250px]">
            <IoIosArrowDropleftCircle
              className="text-[40px] cursor-pointer hover:text-purple-600 transition-colors"
              onClick={goToPreviousPage}
            />
          </div>
        )}

        {currentPage < totalPages - 1 && (
          <div className="absolute right-15 top-[250px]">
            <IoIosArrowDroprightCircle
              className="text-[40px] cursor-pointer hover:text-purple-600 transition-colors"
              onClick={goToNextPage}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewStory
