"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, BookOpen, Users, Heart, Lightbulb, Palette, Share2, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const AboutUs = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Magic",
      description: "Advanced AI creates unique, personalized stories tailored to your child's interests and age group."
    },
    {
      icon: BookOpen,
      title: "Educational Content",
      description: "Stories designed to enhance literacy, creativity, and critical thinking skills while entertaining."
    },
    {
      icon: Palette,
      title: "Visual Storytelling",
      description: "Beautiful illustrations in multiple art styles bring stories to life with stunning visuals."
    },
    {
      icon: Heart,
      title: "Safe & Secure",
      description: "Child-friendly content with secure user authentication and privacy protection."
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Sign Up",
      description: "Create your free account to get started with 3 complimentary story credits.",
      icon: Users
    },
    {
      step: "2",
      title: "Choose Your Story",
      description: "Select story type, age group, theme, and art style that matches your child's preferences.",
      icon: Lightbulb
    },
    {
      step: "3",
      title: "Generate Magic",
      description: "Our AI creates a personalized story with beautiful illustrations in seconds.",
      icon: Sparkles
    },
    {
      step: "4",
      title: "Read & Share",
      description: "Enjoy your story in our interactive book format and share with family and friends.",
      icon: Share2
    }
  ];

  const stats = [
    { number: "10,000+", label: "Stories Created" },
    { number: "5,000+", label: "Happy Families" },
    { number: "15+", label: "Art Styles" },
    { number: "99%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex justify-center mb-8">
              <div className="relative w-24 h-24">
                <Image
                  src="/logooo.png"
                  alt="KiddieGPT Logo"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              About KiddieGPT
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-700 max-w-4xl mx-auto leading-relaxed">
              Where imagination meets technology to create magical storytelling experiences for children worldwide
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-purple-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              At KiddieGPT, we believe every child deserves access to personalized, engaging stories that spark their imagination and foster a love for reading. Our AI-powered platform creates unique tales tailored to each child's interests, age, and learning needs, making storytelling more accessible, interactive, and magical than ever before.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300 border-purple-200">
                  <CardHeader>
                    <feature.icon className="w-12 h-12 mx-auto text-purple-600 mb-4" />
                    <CardTitle className="text-xl text-purple-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What is KiddieGPT Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-purple-800 mb-6">What is KiddieGPT?</h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg leading-relaxed">
                  KiddieGPT is an innovative AI-powered storytelling platform designed specifically for children. Using advanced artificial intelligence, we generate personalized stories that adapt to your child's age, interests, and reading level.
                </p>
                <p className="text-lg leading-relaxed">
                  Our platform combines the power of GPT technology with child development expertise to create engaging narratives that not only entertain but also educate and inspire young minds.
                </p>
                <p className="text-lg leading-relaxed">
                  With beautiful illustrations, interactive features, and endless customization options, KiddieGPT transforms screen time into quality storytelling time that parents and children can enjoy together.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/hero.png"
                  alt="Children enjoying stories"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How to Get Started Section */}
      <section className="py-16 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-purple-800 mb-6">How to Start Making Stories</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Getting started with KiddieGPT is simple and fun! Follow these easy steps to create your first magical story.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative"
              >
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 border-purple-200 hover:scale-105">
                  <CardHeader>
                    <div className="relative mx-auto mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {step.step}
                      </div>
                    </div>
                    <step.icon className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                    <CardTitle className="text-xl text-purple-800">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link href="/create-story">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start Creating Stories Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-purple-800 mb-6">Our Impact</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Join thousands of families who have already discovered the magic of personalized storytelling
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose KiddieGPT Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-purple-800 mb-6">Why Choose KiddieGPT?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-purple-200">
                <CardHeader>
                  <Star className="w-8 h-8 text-yellow-500 mb-2" />
                  <CardTitle className="text-2xl text-purple-800">Educational Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      Improves reading comprehension and vocabulary
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      Enhances creativity and imagination
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      Develops critical thinking skills
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      Promotes emotional intelligence
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-purple-200">
                <CardHeader>
                  <Heart className="w-8 h-8 text-red-500 mb-2" />
                  <CardTitle className="text-2xl text-purple-800">Parent-Friendly Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      Safe, age-appropriate content
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      Easy-to-use interface for all ages
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      Affordable credit-based system
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      Stories can be saved and shared
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Begin Your Story Adventure?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of families creating magical memories with personalized stories
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link href="/explore">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Explore Stories
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;