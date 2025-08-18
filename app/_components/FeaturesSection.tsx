"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Book, Share2, Palette } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Personalized Stories",
    description: "Every tale adapts to your child's name, age, and preferences.",
  },
  {
    icon: Palette,
    title: "Custom Themes",
    description: "Choose magical worlds, futuristic cities, or cozy bedtime vibes.",
  },
  {
    icon: Book,
    title: "AI Customization",
    description: "Change plotlines, characters, or illustrations instantly.",
  },
  {
    icon: Share2,
    title: "Export & Share",
    description: "Download as PDF or share directly with friends and family.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-purple-200 via-pink-300 to-purple-400 overflow-hidden">
      {/* WOW Glow orbs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-400/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>

      <div className="relative container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent drop-shadow-lg"
        >
          Features
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="rounded-2xl shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition hover:scale-105 transform duration-300">
                <CardContent className="p-6 text-center">
                  <feature.icon className="mx-auto h-10 w-10 text-purple-600 mb-4 drop-shadow-md" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}