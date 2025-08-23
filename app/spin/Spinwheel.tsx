"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const prompts = [
  "A brave squirrel who saves the forest",
  "A talking kite who wants to fly to the moon",
  "A magical teapot that tells bedtime stories",
  "A penguin who dreams of becoming a chef",
  "A dragon who paints rainbows",
  "A time-traveling hamster",
];

const spinSound = typeof Audio !== "undefined" ? new Audio("/sounds/spin.mp3") : null;
const winSound = typeof Audio !== "undefined" ? new Audio("/sounds/win.mp3") : null;

export default function SpinWheel() {
  const [availablePrompts, setAvailablePrompts] = useState(prompts);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const router = useRouter();

  const spinWheel = () => {
    if (spinning || availablePrompts.length === 0) return;

    setSpinning(true);
    setSelectedPrompt(null);

    spinSound?.play();

    // Fake spinning duration
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * availablePrompts.length);
      const chosen = availablePrompts[randomIndex];

      setSelectedPrompt(chosen);

      // Remove chosen from available list (no repetition)
      const updated = availablePrompts.filter((_, i) => i !== randomIndex);
      setAvailablePrompts(updated.length > 0 ? updated : prompts);

      spinSound?.pause();
      spinSound!.currentTime = 0;
      winSound?.play();

      setSpinning(false);

      // Redirect after short delay
      setTimeout(() => {
        router.push(`/create-story?prompt=${encodeURIComponent(chosen)}`);
      }, 2000);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300">
      <motion.div
        animate={{ rotate: spinning ? 1080 : 0 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="w-64 h-64 rounded-full border-8 border-purple-500 flex items-center justify-center text-center text-lg font-bold bg-white shadow-xl"
      >
        {spinning
          ? "Spinning..."
          : selectedPrompt || "Spin the wheel to get a magical idea!"}
      </motion.div>

      <Button
        onClick={spinWheel}
        disabled={spinning}
        className="mt-8 px-8 py-4 text-xl rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg transition-transform hover:scale-105"
      >
        🎡 Spin the Wheel
      </Button>
    </div>
  );
}
