import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      isMobile
        ? 'bg-white py-3 shadow-md border-b border-gray-200'
        : (isScrolled ? 'bg-white/95 backdrop-blur-xl py-3 shadow-2xl' : 'bg-white/90 backdrop-blur-md py-4')
    }`}>
      <div className="container mx-auto px-3 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="logo group flex items-center">
          <img 
            src="/logo.png" 
            alt="Henderson Thomas Investigations Logo" 
            className="h-10 w-auto transition-all duration-300 group-hover:scale-105"
          />
        </div>
        
        {/* Mobile call icon removed per request */}
        
        {/* Contact Information */}
        <div className="text-right text-gray-800 hidden md:block">
          <div className="px-2 py-1">
            <div className="text-xs font-medium text-gray-500 mb-1">Call 100% Confidential</div>
            <a href="tel:07826416466" className="inline-flex items-center justify-end text-lg font-bold text-gray-900 transition-colors duration-300 hover:text-blue-600">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              07826 416466
            </a>
            <div className="flex items-center justify-end mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">Available 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
