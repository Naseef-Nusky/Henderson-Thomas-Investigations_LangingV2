import React, { useEffect, useState } from 'react';

const reviews = [
  {
    id: 1,
    text: "Professional, and discreet ! They kept me updated and got results quickly. Highly recommended!",
    name: "Sarah L",
    rating: 5
  },
  {
    id: 2,
    text: "Super easy to deal with and got results fast. No nonsense, no time-wasting—just proper professionals",
    name: "Darrel",
    rating: 5
  },
  {
    id: 3,
    text: "I'd never done anything like this before, but the team were so considerate and easy to talk to. They really helped take the stress out of it. Thanks again guys!",
    name: "Rebecca W",
    rating: 5
  },
  {
    id: 4,
    text: "Outstanding service from start to finish. They delivered exactly what they promised and exceeded my expectations.",
    name: "Michael T",
    rating: 5
  }
];

const Stars = ({ rating }) => (
  <div className="flex text-yellow-500 mb-3" aria-label={`${rating} star rating`}>
    {[...Array(5)].map((_, i) => (
      <svg key={i} viewBox="0 0 20 20" className={`w-4 h-4 ${i < rating ? 'fill-current' : 'text-gray-300'}`}>
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
  const [index, setIndex] = useState(reviews.length); // Start at the middle set
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState(null);

  // Create infinite loop by duplicating reviews array
  const infiniteReviews = [...reviews, ...reviews, ...reviews];

  useEffect(() => {
    const onResize = () => setSlidesToShow(getSlidesToShow());
    setSlidesToShow(getSlidesToShow());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const max = Math.max(0, infiniteReviews.length - slidesToShow);
    if (index > max) setIndex(max);
  }, [slidesToShow, index, infiniteReviews.length]);

  // True infinite loop - seamless continuous movement
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        // When we reach the end of the duplicated array, reset to start of middle set
        if (nextIndex >= infiniteReviews.length - reviews.length) {
          // Reset to start of middle set without animation
          setTimeout(() => setIndex(reviews.length), 0);
          return reviews.length;
        }
        return nextIndex;
      });
    }, 2000); // Move every 2 seconds for smooth chain effect

    return () => clearInterval(interval);
  }, [reviews.length, infiniteReviews.length, isAutoPlaying]);

  const next = () => {
    setIsAutoPlaying(false); // Pause auto-play when user interacts
    const max = Math.max(0, infiniteReviews.length - slidesToShow);
    setIndex((i) => (i >= max ? reviews.length : i + 1));
    setTimeout(() => setIsAutoPlaying(true), 3000); // Resume after 3 seconds
  };
  
  const prev = () => {
    setIsAutoPlaying(false); // Pause auto-play when user interacts
    const max = Math.max(0, infiniteReviews.length - slidesToShow);
    setIndex((i) => (i <= reviews.length ? max : i - 1));
    setTimeout(() => setIsAutoPlaying(true), 3000); // Resume after 3 seconds
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
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${index * (100 / slidesToShow)}%)`,
              }}
            >
               {infiniteReviews.map((r, idx) => (
                 <div
                   key={`${r.id}-${idx}`}
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
                     <Stars rating={r.rating} />
                     <p className="text-sm text-gray-700 leading-relaxed mb-4 flex-1">
                       "{r.text}"
                     </p>
                     <div className="text-xs text-gray-500">
                       —{r.name}
                     </div>
                   </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className={`absolute top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-blue-50 border border-gray-200 shadow-xl rounded-full flex items-center justify-center text-xl text-gray-600 hover:text-blue-600 transition-all duration-300 hover:shadow-2xl hover:scale-110 ${
              isMobile ? 'left-2 w-10 h-10' : '-left-6 w-12 h-12'
            }`}
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className={`absolute top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-blue-50 border border-gray-200 shadow-xl rounded-full flex items-center justify-center text-xl text-gray-600 hover:text-blue-600 transition-all duration-300 hover:shadow-2xl hover:scale-110 ${
              isMobile ? 'right-2 w-10 h-10' : '-right-6 w-12 h-12'
            }`}
            aria-label="Next slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: reviews.length }).map((_, i) => {
            const adjustedIndex = index % reviews.length;
            return (
              <button
                key={i}
                onClick={() => setIndex(reviews.length + i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === adjustedIndex ? 'bg-yellow-500 w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReviewSlider;