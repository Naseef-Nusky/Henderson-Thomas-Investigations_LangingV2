import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl py-3 shadow-2xl' 
        : 'bg-white/90 backdrop-blur-md py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="logo group flex items-center">
          <img 
            src="/logo.png" 
            alt="Rosewood Investigations Logo" 
            className="h-10 w-auto transition-all duration-300 group-hover:scale-105"
          />
        </div>
        
        {/* Mobile call icon (mobile only) */}
        <a
          href="tel:07407612398"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-200 bg-white/90 text-gray-700 shadow-sm"
          aria-label="Call us"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h1.5c.93 0 1.74.57 2.06 1.438l.87 2.322a2.25 2.25 0 01-.54 2.403l-1.02 1.02a.75.75 0 00-.165.822 11.27 11.27 0 006.045 6.045.75.75 0 00.822-.165l1.02-1.02a2.25 2.25 0 012.403-.54l2.322.87A2.25 2.25 0 0119.5 20.25v1.5c0 1.243-1.007 2.25-2.25 2.25h-.75C7.708 24 0 16.292 0 6.75v-.75z" />
          </svg>
        </a>
        
        {/* Contact Information */}
        <div className="text-right text-gray-800 hidden md:block">
          <div className="text-xs md:text-sm font-semibold mb-1 text-gray-700">Call 100% Confidential now</div>
          <a href="tel:07407612398" className="inline-flex items-center justify-end text-lg md:text-xl font-bold mb-1 transition-colors duration-300 hover:text-cyan-600">
            <span className="mr-2">📞</span>
            0740 7612 398
          </a>
          <div className="text-xs opacity-70 flex items-center justify-end">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            AVAILABLE 24/7
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
