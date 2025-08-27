"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'react-toastify'
import { Palette, Sparkles, Loader2 } from 'lucide-react'
import axios from 'axios'

interface RestyleButtonProps {
  storyId: string
  currentStyle: string
  onRestyleComplete?: () => void
}

const RestyleButton = ({ storyId, currentStyle, onRestyleComplete }: RestyleButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState('')
  const [isRestyling, setIsRestyling] = useState(false)

  const artStyles = [
    { value: '3D', label: '3D', description: 'Three-dimensional, modern look' },
    { value: 'watercolor', label: 'Watercolor', description: 'Soft, artistic paintings' },
    { value: 'pixel', label: 'Pixel Art', description: 'Retro, blocky style' },
    { value: 'paperCut', label: 'Paper Cut', description: 'Layered paper art' },
    { value: 'educational', label: 'Educational', description: 'Clear, informative style' },
    { value: 'bedstory', label: 'Bedtime Story', description: 'Cozy, dreamy illustrations' }
  ]

  const handleRestyle = async () => {
    if (!selectedStyle || selectedStyle === currentStyle) {
      toast.error("Please select a different art style")
      return
    }

    setIsRestyling(true)

    try {
      const response = await axios.post('/api/restyle-story', {
        storyId,
        newStyle: selectedStyle
      })

      if (response.data.success) {
        toast.success(`🎨 Story successfully re-styled to ${selectedStyle}!`, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        })
        
        setIsOpen(false)
        setSelectedStyle('')
        
        // Notify parent component to refresh
        if (onRestyleComplete) {
          onRestyleComplete()
        }
      } else {
        throw new Error(response.data.error || 'Restyling failed')
      }
    } catch (error: any) {
      console.error('Restyling error:', error)
      toast.error(error.response?.data?.error || 'Failed to re-style story. Please try again.')
    } finally {
      setIsRestyling(false)
    }
  }

  const handleStyleSelect = (style: string) => {
    setSelectedStyle(style)
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
      >
        <Palette className="w-5 h-5" />
        Re-style Story
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="text-2xl font-bold text-purple-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Re-style Your Story
              </CardTitle>
              <CardDescription className="text-purple-600">
                Change the art style while keeping your characters consistent
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Current Style: <span className="text-purple-600 font-semibold">{currentStyle}</span>
                  </label>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    New Style *
                  </label>
                  <Select value={selectedStyle} onValueChange={handleStyleSelect}>
                    <SelectTrigger className="w-full border-purple-200">
                      <SelectValue placeholder="Choose new art style" />
                    </SelectTrigger>
                    <SelectContent>
                      {artStyles
                        .filter(style => style.value !== currentStyle)
                        .map(style => (
                          <SelectItem key={style.value} value={style.value}>
                            <div className="flex flex-col">
                              <span className="font-medium">{style.label}</span>
                              <span className="text-xs text-gray-500">{style.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedStyle && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-700">
                      <p className="font-medium">Character Consistency Preserved</p>
                      <p>Your characters will maintain their appearance, clothing, and features in the new {selectedStyle} style.</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false)
                    setSelectedStyle('')
                  }}
                  className="flex-1 border-purple-300 text-purple-700 hover:bg-purple-50"
                  disabled={isRestyling}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleRestyle}
                  disabled={!selectedStyle || isRestyling}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {isRestyling ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Re-styling...
                    </>
                  ) : (
                    <>
                      <Palette className="w-4 h-4 mr-2" />
                      Re-style Story
                    </>
                  )}
                </Button>
              </div>

              <div className="text-xs text-gray-500 text-center">
                This process may take a few minutes. All pages will be regenerated with the new style while maintaining character consistency.
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export default RestyleButton
