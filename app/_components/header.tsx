"use client"

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, Menu, User, X } from 'lucide-react'
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
      "w-full fixed top-0 z-50 transition-all duration-300 border-b",
      scrolled
        ? "bg-white/80 backdrop-blur-md shadow-md border-purple-200/70"
        : "bg-purple-100 border-purple-200/50"
    )}>
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
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
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              KiddieGPT
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-1 justify-center flex-1">
          {menuList.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              asChild
              className={cn(
                "group relative text-lg font-medium text-purple-800 hover:text-purple-600  hover:underline transition-all hover:bg-transparent",
                "px-4 py-2 rounded-lg transition-all duration-300"
              )}
            >
              <a href={item.path}>
                {item.name}
                <motion.span
                  className="absolute left-0 bottom-1.5 h-0.5 bg-purple-600"
                  initial={{ width: 0 }}
                  whileHover={{ width: "70%" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ originX: 0 }}
                />
              </a>
            </Button>
          ))}
        </nav>

        <div className="hidden md:flex gap-2">
          <SignedIn>
            <Link href={"/dashboard"}>
              <Button variant="default" className="border-purple-300 cursor-pointer hover:bg-gray-800">
                <LayoutDashboard /> Dashboard
              </Button>
            </Link>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button className="bg-gradient-to-r from-purple-600 cursor-pointer to-purple-800 hover:from-purple-700 hover:to-purple-900 shadow-purple-200 shadow-sm hover:shadow-md transition-all">
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white/95 px-6 py-4 md:hidden flex flex-col gap-1 border-t border-purple-100 shadow-lg"
          >
            {menuList.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
            <div className="flex flex-col gap-3 mt-2 pt-2 border-t border-purple-100">
              <SignedIn>
                <Link href={"/dashboard"}>
                  <Button variant="outline" className="border-purple-300 cursor-pointer text-purple-700 hover:bg-purple-50 hover:text-purple-800">
                    <LayoutDashboard /> Dashboard
                  </Button>
                  <UserButton />
                </Link>
              </SignedIn>

              <SignedOut>
                <SignInButton>
                  <Button className="bg-gradient-to-r from-purple-600 cursor-pointer to-purple-800 hover:from-purple-700 hover:to-purple-900 shadow-purple-200 shadow-sm hover:shadow-md transition-all">
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