"use client";

import { motion } from "framer-motion";
import { Lightbulb, Edit, Send } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "Choose a Theme",
    description: "Select from a range of magical, adventurous, or futuristic worlds.",
  },
  {
    icon: Edit,
    title: "Customize Your Story",
    description: "Add your child's name, preferences, and special details.",
  },
  {
    icon: Send,
    title: "Get Your Story",
    description: "Download instantly or share directly with loved ones.",
  },
];

export default function HowItWorks() {
  return (
    <header className="fixed w-full top-0 z-50 bg-gradient-to-br from-[#EEDFFF] via-[#E4CAFF] to-[#DBB5FF] shadow-md">
      {/* Decorative WOW blur orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute -top-20 -left-20 w-72 h-72 bg-pink-400/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-20 -right-20 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
        >
          How It Works
        </motion.h2>

        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg hover:shadow-xl transition"
            >
              <step.icon className="mx-auto h-12 w-12 text-pink-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-purple-700">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </header>
  );
}
