"use client";

import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-10 bg-gradient-to-br from-[#EEDFFF] via-[#E4CAFF] to-[#DBB5FF] text-gray-800 text-center">
      <div className="max-w-6xl mx-auto px-6 text-center space-y-8">
        {/* Logo */}
        <h2 className="text-3xl font-extrabold tracking-wide">KiddieGPT</h2>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-lg font-medium text-purple-800">
          <Link
            href="#features"
            className="hover:text-purple-600 transition"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("features")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Features
          </Link>
          <Link
            href="#benefits"
            className="hover:text-purple-600 transition"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("benefits")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Benefits
          </Link>
          <Link href="/explore" className="hover:text-purple-600 transition">
            Stories
          </Link>
          <Link
            href="/buy-credits"
            className="hover:text-purple-600 transition"
          >
            Pricing
          </Link>
          <Link href="/contact" className="hover:text-purple-600 transition">
            Contact
          </Link>
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 text-purple-700">
          <a
            href="https://github.com/priyansh-narang2308/KiddieGPT.git"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-500 transition"
          >
            <FaGithub size={26} />
          </a>
          <a
            href="https://www.linkedin.com/in/priyansh-narang230805"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-500 transition"
          >
            <FaLinkedin size={26} />
          </a>
          <a
            href="https://www.instagram.com/priyansh.narang23?igsh=MWpsOTU4OGF3YWU4NQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-500 transition"
          >
            <FaInstagram size={26} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-purple-600">
          © {new Date().getFullYear()} KiddieGPT · All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
