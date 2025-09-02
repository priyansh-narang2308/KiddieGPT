"use client"

import { db } from '@/config/db'
import { StoryData } from '@/config/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import StoryItemCard from './story-item-card'
import CustomLoader from '@/app/create-story/_components/custom-loader'
import { jsPDF } from "jspdf"

type StoryItemType = {
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

const UserStoryList = () => {
    const [storyList, setStoryList] = useState<StoryItemType[]>([])
    const { user } = useUser()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        user && getUserStory()
    }, [user])

    const getUserStory = async () => {
        setLoading(true)
        const result: any = await db.select().from(StoryData)
            .where(eq(StoryData.userEmail, user?.primaryEmailAddress?.emailAddress?.toLowerCase() ?? ""))
            .orderBy(desc(StoryData?.id))
        setStoryList(result)
        setLoading(false)
    }

    // --- Helper: Convert image URL to base64 ---
    const getBase64FromUrl = async (url: string): Promise<string> => {
        const response = await fetch(url)
        const blob = await response.blob()
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        })
    }

    // --- PDF download handler (storybook style) ---
    const handleDownloadPDF = async (item: StoryItemType) => {
        const doc = new jsPDF()
        const pageWidth = doc.internal.pageSize.getWidth()
        const pageHeight = doc.internal.pageSize.getHeight()

        // 1. Title Page
        doc.setFontSize(20)
        doc.text(item.output.title || "Untitled Story", pageWidth / 2, 40, { align: "center" })

        // Add cover image if available
        if (item.coverImage) {
            let imageData = item.coverImage
            // If not base64, convert from URL
            if (!imageData.startsWith("data:image")) {
                imageData = await getBase64FromUrl(imageData)
            }
            doc.addImage(imageData, "JPEG", 30, 60, pageWidth - 60, 100)
        }

        doc.setFontSize(14)
        doc.text(`By: ${item.userName || "Unknown Author"}`, pageWidth / 2, 180, { align: "center" })
        doc.addPage()

        // 2. Story Body
        doc.setFontSize(12)
        const storyText = item.storySubject || "No content available."
        const splitText = doc.splitTextToSize(storyText, pageWidth - 20)

        let y = 20
        splitText.forEach((line: string) => {
            if (y > pageHeight - 20) {
                doc.addPage()
                y = 20
            }
            doc.text(line, 10, y)
            y += 8
        })

        // Save PDF
        doc.save(`${item.output.title || "story"}.pdf`)
    }

    return (
        <div className="min-h-screen px-6 py-10">
            <h1 className="text-3xl md:text-4xl text-purple-800 font-bold mb-10 text-center">
                Your Magical Story Collection ✨
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {storyList?.map((item: StoryItemType) => (
                    <div key={item.id} className="flex flex-col items-center">
                        <StoryItemCard story={item} />
                        <button
                            className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                            onClick={() => handleDownloadPDF(item)}
                        >
                            Download Story
                        </button>
                    </div>
                ))}
                <CustomLoader isOpen={loading} />
            </div>
        </div>
    )
}

export default UserStoryList
