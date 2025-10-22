import React from 'react';

const MobileCallPill = () => {
  return (
    <a
      href="tel:07826416466"
      className="fixed inset-x-4 md:hidden z-[60] bg-blue-600 text-white rounded-xl shadow-xl px-6 py-4 flex items-center justify-center gap-3 transition-transform duration-300 transform-gpu"
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
      aria-label="Call 100% Confidential now"
    >
      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </div>
      <div className="text-center">
        <div className="text-xs font-medium text-blue-100">Call 100% Confidential</div>
        <div className="text-sm font-bold">07826 416466</div>
        <div className="flex items-center justify-center gap-1 mt-1">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-200">Available 24/7</span>
        </div>
      </div>
    </a>
  );
};

export default MobileCallPill;


