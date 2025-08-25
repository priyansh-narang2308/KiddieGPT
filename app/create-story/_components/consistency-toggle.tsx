"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Info, Sparkles, AlertTriangle } from 'lucide-react'

interface ConsistencyToggleProps {
  onConsistencyChange: (enabled: boolean) => void
  initialValue?: boolean
}

const ConsistencyToggle = ({ onConsistencyChange, initialValue = true }: ConsistencyToggleProps) => {
  const [enabled, setEnabled] = useState(initialValue)
  const [showInfo, setShowInfo] = useState(false)

  const handleToggle = (checked: boolean) => {
    setEnabled(checked)
    onConsistencyChange(checked)
  }

  return (
    <Card className="w-full bg-white shadow-lg border-2 border-purple-200 hover:border-purple-300 transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardTitle className="text-xl font-bold text-purple-800 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Character Consistency
        </CardTitle>
        <CardDescription className="text-purple-600">
          Maintain character appearance across all story pages
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="consistency-toggle" className="text-purple-700 font-semibold">
              Enforce Consistency
            </Label>
            <p className="text-sm text-purple-600">
              Keep characters looking the same throughout your story
            </p>
          </div>
          <Switch
            id="consistency-toggle"
            checked={enabled}
            onCheckedChange={handleToggle}
            className="data-[state=checked]:bg-purple-600"
          />
        </div>

        {enabled && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Sparkles className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-green-700">
                <p className="font-medium">Consistency Enabled</p>
                <p>Your characters will maintain their appearance, clothing, and features across all pages.</p>
              </div>
            </div>
          </div>
        )}

        {!enabled && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-700">
                <p className="font-medium">Consistency Disabled</p>
                <p>Character appearance may vary between pages. This can lead to creative variations but less predictable results.</p>
              </div>
            </div>
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowInfo(!showInfo)}
          className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
        >
          <Info className="w-4 h-4 mr-2" />
          {showInfo ? 'Hide' : 'Show'} How It Works
        </Button>

        {showInfo && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
            <h4 className="font-semibold text-blue-800">How Character Consistency Works:</h4>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• <strong>Character Cards:</strong> Define your character's appearance, clothing, and traits</li>
              <li>• <strong>Style Tokens:</strong> Generate unique identifiers for each character-style combination</li>
              <li>• <strong>Deterministic Seeds:</strong> Use consistent random seeds for reproducible generation</li>
              <li>• <strong>Negative Prompts:</strong> Prevent unwanted changes to character features</li>
              <li>• <strong>Cross-Page Reference:</strong> Maintain visual continuity throughout the story</li>
            </ul>
            <p className="text-xs text-blue-600 mt-2">
              Note: Consistency works best when you provide detailed character descriptions and enable this feature before generating your story.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ConsistencyToggle
