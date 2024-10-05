'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { title: "Records", path: "/records" },
    { title: "Diagnosis", path: "/diagnosis" },
    { title: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.menu-btn') && !e.target.closest('.mobile-menu')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <header className="shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex gap-8">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-[#45637e]">
                MediCloud
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.title}
                  href={item.path}
                  className="inline-flex items-center px-1 pt-1 text-md font-medium text-gray-500 hover:text-[#45637e] hover:border-b-2 hover:border-[#45637e]"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link
              href="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#45637e] hover:bg-[#3a526b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#45637e]"
            >
              Login
            </Link>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="menu-btn inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#45637e]"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      <motion.div 
        className={`sm:hidden mobile-menu ${isMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.title}
              href={item.path}
              className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-500 hover:text-[#45637e] hover:bg-gray-50 hover:border-[#45637e]"
            >
              {item.title}
            </Link>
          ))}
          <Link
            href="/login"
            className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-white bg-[#45637e] hover:bg-[#3a526b]"
          >
            Login
          </Link>
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar;