import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Character consistency utilities
export function generateDeterministicSeed(storyId: string, characterId: number, pageIndex: number): string {
  const combined = `${storyId}-${characterId}-${pageIndex}`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString();
}

export function generateStyleToken(descriptors: any, style: string): string {
  const descriptorString = JSON.stringify(descriptors) + style;
  let hash = 0;
  for (let i = 0; i < descriptorString.length; i++) {
    const char = descriptorString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString();
}

export function buildCharacterPrompt(character: any, style: string, isCover: boolean = false): string {
  const { name, descriptors, primaryColor, outfit } = character;
  
  let prompt = `${name}`;
  
  if (descriptors) {
    if (descriptors.age) prompt += `, ${descriptors.age} years old`;
    if (descriptors.traits) prompt += `, ${descriptors.traits}`;
    if (descriptors.mood) prompt += `, ${descriptors.mood} expression`;
  }
  
  if (primaryColor) prompt += `, ${primaryColor} clothing`;
  if (outfit) prompt += `, wearing ${outfit}`;
  
  if (isCover) {
    prompt += `, centered, storybook cover style`;
  }
  
  prompt += `, ${style} art style, high quality, detailed`;
  
  return prompt;
}

export function buildNegativePrompt(character: any): string {
  const negativePrompts = [
    "blurry", "low quality", "distorted", "ugly", "deformed"
  ];
  
  // Add character-specific negative prompts
  if (character.descriptors?.hairColor) {
    negativePrompts.push(`different hair color than ${character.descriptors.hairColor}`);
  }
  
  if (character.descriptors?.eyeColor) {
    negativePrompts.push(`different eye color than ${character.descriptors.eyeColor}`);
  }
  
  return negativePrompts.join(", ");
}

export function validateCharacterData(character: any): boolean {
  return character.name && 
         character.name.trim().length > 0 && 
         character.name.trim().length <= 50;
}
