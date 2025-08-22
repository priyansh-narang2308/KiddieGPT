// app/_components/Benefits.tsx
"use client";
import { motion } from "framer-motion";

export default function Benefits() {
  const benefits = [
    { title: "Boosts Creativity", description: "Encourages imaginative thinking and storytelling." },
    { title: "Enhances Literacy", description: "Supports reading comprehension and vocabulary growth." },
    { title: "Engages Emotionally", description: "Creates personal connections through customized stories." },
    { title: "Accessible Anywhere", description: "Read or share stories anytime on any device." }
  ];

  return (
    <section id="benefits" className="relative py-20 overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-purple-200 dark:from-purple-900 dark:via-purple-800 dark:to-pink-900">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-400/30 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl font-extrabold text-purple-900 dark:text-pink-200 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Benefits of Our Platform
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="relative p-8 rounded-2xl shadow-lg bg-white/70 dark:bg-purple-800/70 backdrop-blur-lg border border-purple-200 dark:border-pink-700 hover:scale-105 transform transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold text-purple-800 dark:text-pink-200">
                {benefit.title}
              </h3>
              <p className="text-gray-700 dark:text-pink-100 mt-3">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}