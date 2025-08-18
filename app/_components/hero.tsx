"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles, Star, BookOpen } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="relative overflow-hidden animated-gradient px-4 sm:px-6 lg:px-8 py-20 md:py-28 min-h-screen">
      {/* Floating Decorative Icons */}
      <motion.div className="absolute inset-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Star className="absolute top-16 left-12 text-yellow-400 animate-pulse" size={32}/>
        <BookOpen className="absolute bottom-24 right-20 text-purple-300 animate-bounce" size={40}/>
        <Sparkles className="absolute top-1/2 left-1/3 text-pink-300 animate-spin-slow" size={28}/>
      </motion.div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16">
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center md:text-left"
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-purple-900 bg-clip-text text-transparent leading-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9 }}
            >
              Spark Your Child's Imagination with <span className="bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent animate-pulse">Magical Stories</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-purple-900/90 max-w-xl mx-auto md:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Create enchanting, personalized stories tailored to your child’s interests—building creativity and a lifelong love of reading.
            </motion.p>

            {/* Buttons */}
            <motion.div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link href={"/create-story"}>
                <Button size="lg" className="btn-shine relative bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-purple-500/50">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Create Your Story Now
                </Button>
              </Link>
              <Link href="/explore">
                <Button variant="outline" size="lg" className="border-purple-300 text-purple-700 hover:bg-purple-100 hover:text-purple-800 transition-all">
                  Explore Stories
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="absolute -inset-6 bg-gradient-to-r from-pink-200 to-purple-300 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-purple-100 group-hover:border-purple-300 transition-all duration-500 transform group-hover:scale-105">
              <Image src="/hero.png" alt="Child reading a magical storybook" width={600} height={500} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" priority />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
