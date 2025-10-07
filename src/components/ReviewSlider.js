import React, { useEffect, useState } from 'react';

const reviews = [
  { id: 1, title: 'Heartfelt thanks', text: "Heartfelt thanks to Rosewood Investigations for aiding in the search for my long-lost friend.", author: 'James', date: '15 Oct 2023' },
  { id: 2, title: 'One of the best', text: 'One of the best companies to go to, they helped me so much and for a reasonable price. 10/10 would recommend.', author: 'Reck Trec', date: '7 Jan 2024' },
  { id: 3, title: 'Great business', text: 'The team is professional, friendly, and efficient. They respond quickly and are reliable.', author: 'Tony', date: '24 Nov 2023' },
  { id: 4, title: 'Crypto Scammer Tracked', text: 'I am grateful to Rosewood Investigations who did an amazing job of locating a crypto scammer.', author: 'Daniel', date: '02 Aug 2023' },
  { id: 5, title: 'Discreet and effective', text: 'Handled my case with total discretion and delivered solid evidence.', author: 'Ryan', date: '18 May 2024' },
  { id: 6, title: 'Highly recommended', text: 'Clear communication and fast results. Professional throughout.', author: 'Sophia', date: '03 Mar 2024' },
];

const Stars = () => (
  <div className="flex text-green-500 mb-3" aria-label="5 star rating">
    {[...Array(5)].map((_, i) => (
      <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 fill-current">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const ReviewSlider = () => {
  // Responsive breakpoints:
  // Mobile (< 768px): 1 slide
  // iPad (768px - 1023px): 2 slides
  // iPad Pro (1024px - 1919px): 3 slides
  // Full HD & above (>= 1920px): 4 slides
  const getSlidesToShow = () => {
    if (typeof window === 'undefined') return 1;
    const w = window.innerWidth;
    if (w >= 1920) return 4;
    if (w >= 1024) return 3;
    if (w >= 768) return 2;
    return 1;
  };

  const [slidesToShow, setSlidesToShow] = useState(1);
  const [current, setCurrent] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  useEffect(() => {
    const onResize = () => setSlidesToShow(getSlidesToShow());
    setSlidesToShow(getSlidesToShow());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const max = Math.max(0, reviews.length - slidesToShow);
    if (current > max) setCurrent(max);
  }, [slidesToShow, current]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => {
        const max = Math.max(0, reviews.length - slidesToShow);
        return prev >= max ? 0 : prev + 1;
      });
    }, 5000);
    return () => clearInterval(id);
  }, [slidesToShow]);

  const next = () => {
    const max = Math.max(0, reviews.length - slidesToShow);
    setCurrent((p) => (p >= max ? 0 : p + 1));
  };

  const prev = () => {
    const max = Math.max(0, reviews.length - slidesToShow);
    setCurrent((p) => (p <= 0 ? max : p - 1));
  };

  const isMobile = slidesToShow === 1;

  return (
    <section className="pt-24 md:pt-16 pb-16 bg-gray-50">
      <div className="w-full">
        <div className="text-center mb-10 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            5 Star Rated Investigators
          </h2>
          <p className="text-gray-600 mt-3">
            Our clients' trust is our greatest asset, and there's no better testament to our dedication
            and professionalism than the 5-star feedback we have received from those we have helped.
          </p>
        </div>

        <div className="relative container mx-auto px-4">
          <div
            className="overflow-hidden"
            onTouchStart={(e) => setTouchStartX(e.changedTouches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX === null) return;
              const delta = e.changedTouches[0].clientX - touchStartX;
              if (Math.abs(delta) > 40) {
                if (delta > 0) prev();
                else next();
              }
              setTouchStartX(null);
            }}
            style={{ touchAction: 'pan-y' }}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${current * 100}%)`,
              }}
            >
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="flex-shrink-0"
                  style={{
                    width: isMobile ? '100%' : `${100 / slidesToShow}%`,
                    paddingLeft: isMobile ? '0' : '12px',
                    paddingRight: isMobile ? '0' : '12px',
                  }}
                >
                  <div
                    className={`bg-white h-full flex flex-col ${
                      isMobile
                        ? 'rounded-none border-0 shadow-none p-6'
                        : 'rounded-2xl border border-gray-200 shadow-sm p-5'
                    }`}
                  >
                    <Stars />
                    <h3 className="font-semibold text-gray-900 mb-1">{r.title}</h3>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4 flex-1">
                      {r.text}
                    </p>
                    <div className="text-xs text-gray-500">
                      —{r.author}, {r.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prev}
            className={`absolute top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow hover:shadow-md transition-shadow ${
              isMobile ? 'left-2 w-10 h-10' : '-left-3 w-10 h-10 hidden md:flex'
            }`}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={next}
            className={`absolute top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow hover:shadow-md transition-shadow ${
              isMobile ? 'right-2 w-10 h-10' : '-right-3 w-10 h-10 hidden md:flex'
            }`}
            aria-label="Next"
          >
            ›
          </button>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.max(0, reviews.length - slidesToShow + 1) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? 'bg-green-600 w-8' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSlider;