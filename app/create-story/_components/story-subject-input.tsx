import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useDebounce from '@/lib/useDebounce'
import React, { useEffect, useState } from 'react'

interface StorySubjectInputProps {
    userSelection?: (data: { fieldName: string; fieldValue: string }) => void
}

const StorySubjectInput = ({ userSelection }: StorySubjectInputProps) => {
    const [inputValue, setInputValue] = useState<string>("")
    const debouncedValue = useDebounce(inputValue, 800)

    // Send debounced value to parent only after user pauses typing
    useEffect(() => {
        if (userSelection) {
            userSelection({
                fieldName: 'storySubject',
                fieldValue: debouncedValue,
            })
        }
    }, [debouncedValue, userSelection])

    return (
        <div className="w-full max-w-2xl mx-auto mt-10 px-4">
            <Label
                htmlFor="story-subject"
                className="block text-2xl font-semibold text-purple-800 mb-2"
            >
                Subject of the Story
            </Label>
            <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                id="story-subject"
                placeholder="Enter your story subject..."
                className="bg-white border-2 border-purple-300 focus:border-purple-500 focus:ring-purple-200 rounded-lg text-lg transition duration-200 min-h-[220px]"
            />
        </div>
    )
}

export default StorySubjectInput
