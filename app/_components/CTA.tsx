// app/_components/CTA.tsx
"use client";

import { motion } from "framer-motion";

export default function CallToActionSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-purple-100 via-pink-200 to-purple-00 text-white text-center">
      {/* 🌸 Blurred Orbs */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-pink-400/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-400/40 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg text-purple-600 "
        >
          Ready to Create Your Story?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-10 text-lg md:text-xl max-w-2xl mx-auto text-white/90"
        >
          Join thousands of parents bringing personalized adventures to life.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-pink-600 px-10 py-4 rounded-xl font-semibold shadow-lg hover:bg-gray-100 transition"
        >
          Get Started Now
        </motion.button>
      </div>
    </section>
  );
}