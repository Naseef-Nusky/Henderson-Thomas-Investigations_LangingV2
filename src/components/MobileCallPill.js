import React from 'react';

const MobileCallPill = () => {
  return (
    <a
      href="tel:02038684560"
      className="fixed left-4 right-4 bottom-5 z-50 md:hidden bg-green-500 text-white rounded-[28px] shadow-2xl px-5 py-4 flex flex-col items-center justify-center gap-1 active:scale-[0.98]"
      aria-label="Call 100% Confidential now"
    >
      <span className="text-xs font-semibold leading-4 text-center">Call 100% Confidential now</span>
      <span className="flex items-center gap-2 text-2xl font-extrabold tracking-wide leading-6 whitespace-nowrap">
        <span aria-hidden className="text-white">📞</span>
        0740 7612 398
      </span>
    </a>
  );
};

export default MobileCallPill;


