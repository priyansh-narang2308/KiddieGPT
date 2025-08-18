"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Ramesh Kumar",
    text: "My kids absolutely love these personalized stories. It’s like magic every night!"
  },
  {
    name: "Sunita Shah",
    text: "I never imagined bedtime stories could be so creative and interactive."
  },
  {
    name: "Virat Kohli ",
    text: "The customization options are incredible. We’ve made dozens of unique tales."
  }
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-pink-50 to-white overflow-hidden">
      {/* Purple-Pink Blur Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />

      <div className="relative container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-gray-900"
        >
          What Parents Say
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-gray-100 hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6">
                  <p className="italic mb-4 text-gray-700">"{t.text}"</p>
                  <p className="font-semibold text-purple-700">- {t.name}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}