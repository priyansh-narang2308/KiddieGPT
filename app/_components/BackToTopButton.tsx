"use client";

import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 z-50 p-3 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-opacity ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-label="Go to top"
    >
      <FaArrowUp />
    </button>
  );
};

export default BackToTopButton;