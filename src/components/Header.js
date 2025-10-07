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
        
        {/* Contact Information */}
        <div className="text-right text-gray-800">
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
