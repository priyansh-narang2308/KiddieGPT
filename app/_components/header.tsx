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
    const handleScroll = () => setScrolled(window.scrollY > 10)
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
        : "bg-gradient-to-r from-purple-100/70 to-pink-100/70 backdrop-blur-md border-purple-200/50"
    )}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <Image src="/logooo.png" alt="logo" fill className="object-contain drop-shadow-lg" sizes="48px"/>
          </div>
          <Link href={"/"}>
            <span className="text-xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent drop-shadow-md hover:drop-shadow-xl transition-all">
              KiddieGPT
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 justify-center flex-1">
          {menuList.map((item) => (
            <motion.div key={item.name} whileHover={{ scale: 1.08 }}>
              <Link href={item.path}>
                <span className="relative text-lg font-semibold text-purple-800 hover:text-purple-600 transition-all after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 hover:after:w-full after:transition-all after:duration-300">
                  {item.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-3 items-center">
          <SignedIn>
            <Link href={"/dashboard"}>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-purple-400/50 transition-all">
                <LayoutDashboard /> Dashboard
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button className="btn-shine bg-gradient-to-r from-purple-600 to-pink-700 text-white">
                Get Started
              </Button>
            </SignInButton>
          </SignedOut>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-purple-700 hover:bg-purple-100/50">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 250, damping: 30 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 px-6 py-6 md:hidden flex flex-col gap-4 border-t border-purple-100 shadow-xl rounded-b-2xl"
          >
            {menuList.map((item) => (
              <Link key={item.name} href={item.path} onClick={() => setIsOpen(false)}>
                <span className="block py-3 text-lg font-medium text-purple-800 hover:text-purple-600 transition-colors">{item.name}</span>
              </Link>
            ))}

            <SignedIn>
              <Link href={"/dashboard"}>
                <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 shadow">
                  Dashboard
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button className="btn-shine w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  Get Started
                </Button>
              </SignInButton>
            </SignedOut>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
