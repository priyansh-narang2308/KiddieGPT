"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuList = [
    { name: "Create Story", path: "/create-story" },
    { name: "Explore Stories", path: "/explore" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Vocabulary", path: "/vocabulary" },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
    exit: { opacity: 0, y: -15, transition: { duration: 0.2 } },
  };

  return (
    <header
      className={cn(
        "w-full fixed top-0 z-50 transition-all duration-300 border-b overflow-hidden",
        scrolled
          ? "bg-gradient-to-r from-[#EEDFFF] via-[#E4CAFF] to-[#DBB5FF] shadow-md border-purple-200/70 backdrop-blur-md"
          : "bg-gradient-to-r from-[#EEDFFF] via-[#E4CAFF] to-[#DBB5FF] border-purple-200/50"
      )}
    >
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
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
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
              className="group relative text-lg font-medium text-purple-800 hover:text-pink-600 hover:bg-transparent px-4 py-2 rounded-lg transition-all"
            >
              <Link href={item.path}>{item.name}</Link>
            </Button>
          ))}
        </nav>

        <div className="hidden md:flex gap-2">
          <SignedIn>
            <Link href={"/dashboard"}>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md hover:shadow-lg flex items-center cursor-pointer gap-2">
                <LayoutDashboard /> Dashboard
              </Button>
            </Link>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 cursor-pointer to-pink-600 text-white shadow-md hover:shadow-lg"
            >
              <Link href="/sign-in">Get Started</Link>
            </Button>
          </SignedOut>
        </div>

        <div className="md:hidden">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-8 h-8 flex flex-col justify-center items-center"
            animate={isOpen ? "open" : "closed"}
          >
            <motion.span
              className="absolute w-6 h-0.5 bg-purple-700 rounded"
              variants={{
                closed: { rotate: 0, y: -6 },
                open: { rotate: 45, y: 0 },
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute w-6 h-0.5 bg-purple-700 rounded"
              variants={{
                closed: { opacity: 1, rotate: 0 },
                open: { opacity: 0 },
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute w-6 h-0.5 bg-purple-700 rounded"
              variants={{
                closed: { rotate: 0, y: 6 },
                open: { rotate: -45, y: 0 },
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="bg-gradient-to-r from-[#EEDFFF] via-[#E4CAFF] to-[#DBB5FF] px-6 py-4 md:hidden flex flex-col gap-3 border-t border-purple-200 shadow-lg"
          >
            {menuList.map((item, i) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={i}
              >
                <Link href={item.path}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-lg text-purple-800 hover:text-pink-600 hover:bg-transparent py-3"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Button>
                </Link>
              </motion.div>
            ))}

            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={menuList.length}
              className="flex flex-col gap-3 pt-2 border-t border-purple-200"
            >
              <SignedIn>
                <Link href={"/dashboard"}>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md hover:shadow-lg flex items-center gap-2">
                    <LayoutDashboard /> Dashboard
                  </Button>
                </Link>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md hover:shadow-lg"
                >
                  <Link href="/sign-in">Get Started</Link>
                </Button>
              </SignedOut>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
