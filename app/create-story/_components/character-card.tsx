"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { validateCharacterData } from '@/lib/utils'
import { toast } from 'react-toastify'

export interface CharacterData {
  name: string
  age?: string
  traits?: string
  outfit?: string
  primaryColor?: string
  mood?: string
  backstory?: string
  refImages?: string[]
}

interface CharacterCardProps {
  onCharacterChange: (character: CharacterData) => void
  initialCharacter?: CharacterData
}

const CharacterCard = ({ onCharacterChange, initialCharacter }: CharacterCardProps) => {
  const [character, setCharacter] = useState<CharacterData>(initialCharacter || {
    name: '',
    age: '',
    traits: '',
    outfit: '',
    primaryColor: '',
    mood: '',
    backstory: '',
    refImages: []
  })

  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleInputChange = (field: keyof CharacterData, value: string) => {
    const updatedCharacter = { ...character, [field]: value }
    setCharacter(updatedCharacter)
    
    if (validateCharacterData(updatedCharacter)) {
      onCharacterChange(updatedCharacter)
    }
  }

  const handleColorChange = (color: string) => {
    handleInputChange('primaryColor', color)
  }

  const handleMoodChange = (mood: string) => {
    handleInputChange('mood', mood)
  }

  const handleAgeChange = (age: string) => {
    handleInputChange('age', age)
  }

  const handleTraitsChange = (traits: string) => {
    handleInputChange('traits', traits)
  }

  const handleOutfitChange = (outfit: string) => {
    handleInputChange('outfit', outfit)
  }

  const handleBackstoryChange = (backstory: string) => {
    handleInputChange('backstory', backstory)
  }

  const validateAndSave = () => {
    if (!validateCharacterData(character)) {
      toast.error("Please provide a character name (max 50 characters)")
      return false
    }
    return true
  }

  return (
    <Card className="w-full bg-white shadow-lg border-2 border-purple-200 hover:border-purple-300 transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardTitle className="text-2xl font-bold text-purple-800 flex items-center gap-2">
          🎭 Character Card
        </CardTitle>
        <CardDescription className="text-purple-600">
          Define your main character to maintain consistency across all story pages
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Basic Character Info */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="characterName" className="text-purple-700 font-semibold">
              Character Name *
            </Label>
            <Input
              id="characterName"
              placeholder="e.g., Luna, Max, Sparkle"
              value={character.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="mt-2 border-purple-200 focus:border-purple-500"
              maxLength={50}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="characterAge" className="text-purple-700 font-semibold">
                Age
              </Label>
              <Select value={character.age} onValueChange={handleAgeChange}>
                <SelectTrigger className="mt-2 border-purple-200">
                  <SelectValue placeholder="Select age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="6-8">6-8 years</SelectItem>
                  <SelectItem value="9-12">9-12 years</SelectItem>
                  <SelectItem value="teen">Teen</SelectItem>
                  <SelectItem value="adult">Adult</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="characterColor" className="text-purple-700 font-semibold">
                Primary Color
              </Label>
              <Select value={character.primaryColor} onValueChange={handleColorChange}>
                <SelectTrigger className="mt-2 border-purple-200">
                  <SelectValue placeholder="Choose color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="red">Red</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="pink">Pink</SelectItem>
                  <SelectItem value="yellow">Yellow</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                  <SelectItem value="brown">Brown</SelectItem>
                  <SelectItem value="black">Black</SelectItem>
                  <SelectItem value="white">White</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="characterTraits" className="text-purple-700 font-semibold">
              Personality Traits
            </Label>
            <Input
              id="characterTraits"
              placeholder="e.g., brave, curious, friendly, shy"
              value={character.traits}
              onChange={(e) => handleTraitsChange(e.target.value)}
              className="mt-2 border-purple-200 focus:border-purple-500"
            />
          </div>

          <div>
            <Label htmlFor="characterOutfit" className="text-purple-700 font-semibold">
              Outfit/Clothing
            </Label>
            <Input
              id="characterOutfit"
              placeholder="e.g., superhero cape, princess dress, explorer hat"
              value={character.outfit}
              onChange={(e) => handleOutfitChange(e.target.value)}
              className="mt-2 border-purple-200 focus:border-purple-500"
            />
          </div>

          <div>
            <Label htmlFor="characterMood" className="text-purple-700 font-semibold">
              Default Mood
            </Label>
            <Select value={character.mood} onValueChange={handleMoodChange}>
              <SelectTrigger className="mt-2 border-purple-200">
                <SelectValue placeholder="Select mood" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="happy">Happy</SelectItem>
                <SelectItem value="excited">Excited</SelectItem>
                <SelectItem value="curious">Curious</SelectItem>
                <SelectItem value="brave">Brave</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="determined">Determined</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Options */}
        <div className="space-y-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
          >
            {showAdvanced ? 'Hide' : 'Show'} Advanced Options
          </Button>

          {showAdvanced && (
            <div className="space-y-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div>
                <Label htmlFor="characterBackstory" className="text-purple-700 font-semibold">
                  Character Backstory
                </Label>
                <Textarea
                  id="characterBackstory"
                  placeholder="Brief background story for your character..."
                  value={character.backstory}
                  onChange={(e) => handleBackstoryChange(e.target.value)}
                  className="mt-2 border-purple-200 focus:border-purple-500"
                  rows={3}
                />
              </div>
            </div>
          )}
        </div>

        {/* Validation Status */}
        <div className={`p-3 rounded-lg text-sm ${
          validateCharacterData(character) 
            ? 'bg-green-100 text-green-700 border border-green-200' 
            : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
        }`}>
          {validateCharacterData(character) 
            ? '✅ Character card is ready!' 
            : '⚠️ Please provide a character name to continue'
          }
        </div>
      </CardContent>
    </Card>
  )
}

export default CharacterCard
