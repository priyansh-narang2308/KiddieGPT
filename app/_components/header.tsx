"use client"

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuList = [
    { name: 'Home', path: '/' },
    { name: 'Create Story', path: '/create-story' },
    { name: 'Explore Stories', path: '/explore' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <header className={cn(
      "w-full fixed top-0 z-50 transition-all duration-500 border-b",
      scrolled
        ? "bg-white/60 backdrop-blur-xl shadow-2xl border-purple-200/70"
        : "bg-purple-100/70 backdrop-blur-md border-purple-200/50"
    )}>
      {/* Floating particles for header and hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full shadow-md shadow-purple-300"
            initial={{ x: Math.random() * 1200, y: Math.random() * 400 }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{ duration: 6 + Math.random() * 5, repeat: Infinity }}
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <Image
              src="/logooo.png"
              alt="logo"
              fill
              className="object-contain drop-shadow-lg"
              sizes="48px"
            />
          </div>
          <Link href={"/"}>
            <span className="text-xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent drop-shadow-md hover:drop-shadow-xl transition-all">
              KiddieGPT
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-2 justify-center flex-1">
          {menuList.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              asChild
              className="group relative text-lg font-semibold text-purple-800 hover:text-purple-600 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-purple-50/40"
            >
              <a href={item.path}>
                {item.name}
                <motion.span
                  className="absolute left-0 bottom-1 h-0.5 bg-gradient-to-r from-purple-500 to-purple-700"
                  initial={{ width: 0 }}
                  whileHover={{ width: "80%" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ originX: 0 }}
                />
              </a>
            </Button>
          ))}
        </nav>

        <div className="hidden md:flex gap-3 items-center">
          <SignedIn>
            <Link href={"/dashboard"}>
              <Button variant="default" className="border-purple-300 cursor-pointer bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-purple-400/50 transition-all">
                <LayoutDashboard /> Dashboard
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button className="bg-gradient-to-r from-purple-600 to-purple-800 cursor-pointer hover:from-purple-700 hover:to-purple-900 shadow-lg hover:shadow-purple-500/60 transition-all animate-pulse">
                Get Started
              </Button>
            </SignInButton>
          </SignedOut>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-purple-700 hover:bg-purple-100/50"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu with particles */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="bg-white/95 px-6 py-6 md:hidden flex flex-col gap-3 border-t border-purple-100 shadow-2xl rounded-b-2xl relative"
          >
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute w-1 h-1 bg-purple-300 rounded-full"
                initial={{ x: Math.random() * 300, y: Math.random() * 200 }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{ duration: 4 + Math.random() * 3, repeat: Infinity }}
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              />
            ))}

            {menuList.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full"
              >
                <Button
                  variant="ghost"
                  asChild
                  className="w-full justify-start text-lg text-purple-800 hover:bg-purple-50 py-3 px-4 rounded-lg group relative overflow-hidden"
                  onClick={() => setIsOpen(false)}
                >
                  <a href={item.path}>
                    {item.name}
                    <span className="absolute left-0 bottom-2.5 h-0.5 bg-purple-600 w-0 group-hover:w-3/4 transition-all duration-300 ease-out" />
                  </a>
                </Button>
              </motion.div>
            ))}
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-purple-100">
              <SignedIn>
                <Link href={"/dashboard"}>
                  <Button variant="outline" className="border-purple-300 cursor-pointer text-purple-700 hover:bg-purple-50 hover:text-purple-800 shadow hover:shadow-purple-300/50">
                    <LayoutDashboard /> Dashboard
                  </Button>
                  <UserButton afterSignOutUrl="/" />
                </Link>
              </SignedIn>

              <SignedOut>
                <SignInButton>
                  <Button className="bg-gradient-to-r from-purple-600 to-purple-800 cursor-pointer hover:from-purple-700 hover:to-purple-900 shadow-lg hover:shadow-purple-500/60 transition-all">
                    Get Started
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
