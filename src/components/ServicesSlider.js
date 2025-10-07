// import React, { useEffect, useState } from 'react';

// const ServicesSlider = () => {
//   const services = [
//     {
//       id: 1,
//       title: 'Individual Investigations',
//       desc:
//         'Our team of highly skilled detectives is proficient in various investigations, ranging from online dating inquiries to missing person and matrimonial cases. You can rely on their expertise to assist you effectively.',
//       img: '/individual.jpg',
//       cta: 'Enquire Now',
//     },
//     {
//       id: 2,
//       title: 'Covert Surveillance',
//       desc:
//         'Our team of skilled detectives, both female and male, will provide you with essential photo and video evidence relevant to your case.',
//       img: '/covert.jpg',
//       cta: 'Enquire Now',
//     },
//     {
//       id: 3,
//       title: 'Fraud Investigation',
//       desc:
//         'The prevalence of online fraud in the UK results in significant financial losses amounting to billions of pounds annually. If you have been affected by online fraud, contact us without delay for immediate assistance.',
//       img: '/fraud.jpg',
//       cta: 'Enquire Now',
//     },
//     {
//       id: 4,
//       title: 'Missing Persons',
//       desc:
//         'In the UK, a person is reported missing every 90 seconds. With the expertise of our professionals, we can aid you in tracing individuals both within the country and internationally.',
//       img: '/missing.jpg',
//       cta: 'Enquire Now',
//     },
//   ];

//   // slides per view responsive: 1 mobile, 2 iPad, 3 iPad Pro, 4 desktop
//   const getSlidesToShow = () => {
//     if (typeof window === 'undefined') return 1;
//     const w = window.innerWidth;
//     if (w >= 1280) return 4;      // large desktops
//     if (w >= 1024) return 3;      // iPad Pro / large tablet
//     if (w >= 768) return 2;       // iPad / tablet
//     return 1;
//   };

//   const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());
//   const [index, setIndex] = useState(0);
//   const [touchStartX, setTouchStartX] = useState(null);

//   useEffect(() => {
//     const onResize = () => setSlidesToShow(getSlidesToShow());
//     // set initial value on mount for SSR safety
//     setSlidesToShow(getSlidesToShow());
//     window.addEventListener('resize', onResize);
//     return () => window.removeEventListener('resize', onResize);
//   }, []);

//   useEffect(() => {
//     const max = Math.max(0, services.length - slidesToShow);
//     if (index > max) setIndex(max);
//   }, [slidesToShow]);

//   const next = () => {
//     const max = Math.max(0, services.length - slidesToShow);
//     setIndex((i) => (i >= max ? 0 : i + 1));
//   };
//   const prev = () => {
//     const max = Math.max(0, services.length - slidesToShow);
//     setIndex((i) => (i <= 0 ? max : i - 1));
//   };

//   return (
//     <section className="py-16 bg-white overflow-x-hidden">
//       <div className="w-full px-0 md:px-3">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
//           We Help Individuals & Businesses Just Like You
//         </h2>
//         <p className="text-gray-600 mb-8 max-w-4xl mx-auto text-center">
//           Take control of your narrative today. With our unwavering commitment to your cause and our unparalleled expertise, you're never alone in your search for answers.
//         </p>

//         <div className="relative">
//           <div
//             className="overflow-hidden w-full overscroll-x-contain"
//             onTouchStart={(e) => setTouchStartX(e.changedTouches[0].clientX)}
//             onTouchEnd={(e) => {
//               if (touchStartX === null) return;
//               const delta = e.changedTouches[0].clientX - touchStartX;
//               if (Math.abs(delta) > 40) {
//                 if (delta > 0) prev(); else next();
//               }
//               setTouchStartX(null);
//             }}
//             style={{ touchAction: 'pan-y' }}
//           >
//             <div
//               className="flex transition-transform duration-500 ease-out"
//               style={{
//                 transform: `translateX(-${(index * (100 / slidesToShow))}%)`,
//                 width: `${(services.length * 100) / slidesToShow}%`
//               }}
//             >
//               {services.map((s) => (
//                 <div
//                   key={s.id}
//                   className="px-0 md:px-3 flex-shrink-0 min-w-0 box-border"
//                   style={{ width: `${100 / slidesToShow}%` }}
//                 >
//                   <div className="bg-white rounded-none md:rounded-3xl border-0 md:border border-gray-200 overflow-hidden h-full flex flex-col">
//                     <div
//                       className="h-56 md:h-64 w-full bg-cover bg-center"
//                       style={{ backgroundImage: `url(${s.img})` }}
//                     />
//                     <div className="p-4 md:p-6 flex-1 flex flex-col">
//                       <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                         {s.title}
//                       </h3>
//                       <p className="text-gray-600 text-sm leading-relaxed mb-6 break-words">
//                         {s.desc}
//                       </p>
//                       <div className="mt-auto">
//                         <a href="#contact" className="inline-flex items-center justify-center w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-full font-semibold transition-colors">
//                           {s.cta}
//                           <span className="ml-2">→</span>
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* arrows */}
//           <button
//             onClick={prev}
//             className="flex absolute left-2 md:-left-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-gray-200 shadow w-12 h-12 md:w-10 md:h-10 rounded-full items-center justify-center"
//             aria-label="Previous"
//           >
//             ‹
//           </button>
//           <button
//             onClick={next}
//             className="flex absolute right-2 md:-right-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-gray-200 shadow w-12 h-12 md:w-10 md:h-10 rounded-full items-center justify-center"
//             aria-label="Next"
//           >
//             ›
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServicesSlider;

import React, { useEffect, useState } from 'react';

const ServicesSlider = () => {
  const services = [
    {
      id: 1,
      title: 'Individual Investigations',
      desc:
        'Our team of highly skilled detectives is proficient in various investigations, ranging from online dating inquiries to missing person and matrimonial cases. You can rely on their expertise to assist you effectively.',
      img: '/individual.jpg',
      cta: 'Enquire Now',
    },
    {
      id: 2,
      title: 'Covert Surveillance',
      desc:
        'Our team of skilled detectives, both female and male, will provide you with essential photo and video evidence relevant to your case.',
      img: '/covert.jpg',
      cta: 'Enquire Now',
    },
    {
      id: 3,
      title: 'Fraud Investigation',
      desc:
        'The prevalence of online fraud in the UK results in significant financial losses amounting to billions of pounds annually. If you have been affected by online fraud, contact us without delay for immediate assistance.',
      img: '/fraud.jpg',
      cta: 'Enquire Now',
    },
    {
      id: 4,
      title: 'Missing Persons',
      desc:
        'In the UK, a person is reported missing every 90 seconds. With the expertise of our professionals, we can aid you in tracing individuals both within the country and internationally.',
      img: '/missing.jpg',
      cta: 'Enquire Now',
    },
  ];

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
  const [index, setIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  useEffect(() => {
    const onResize = () => setSlidesToShow(getSlidesToShow());
    setSlidesToShow(getSlidesToShow());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const max = Math.max(0, services.length - slidesToShow);
    if (index > max) setIndex(max);
  }, [slidesToShow, index, services.length]);

  const next = () => {
    const max = Math.max(0, services.length - slidesToShow);
    setIndex((i) => (i >= max ? 0 : i + 1));
  };
  
  const prev = () => {
    const max = Math.max(0, services.length - slidesToShow);
    setIndex((i) => (i <= 0 ? max : i - 1));
  };

  const isMobile = slidesToShow === 1;

  return (
    <section className="py-16 bg-gray-50">
      <div className="w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center px-4">
          We Help Individuals & Businesses Just Like You
        </h2>
        <p className="text-gray-600 mb-12 max-w-4xl mx-auto text-center px-4">
          Take control of your narrative today. With our unwavering commitment to your cause and our unparalleled expertise, you're never alone in your search for answers.
        </p>

        <div className="relative container mx-auto px-4">
          <div
            className="overflow-hidden"
            onTouchStart={(e) => setTouchStartX(e.changedTouches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX === null) return;
              const delta = e.changedTouches[0].clientX - touchStartX;
              if (Math.abs(delta) > 40) {
                if (delta > 0) prev(); else next();
              }
              setTouchStartX(null);
            }}
            style={{ touchAction: 'pan-y' }}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${index * 100}%)`,
              }}
            >
              {services.map((s) => (
                <div
                  key={s.id}
                  className="flex-shrink-0"
                  style={{ 
                    width: isMobile ? '100%' : `${100 / slidesToShow}%`,
                    paddingLeft: isMobile ? '0' : '12px',
                    paddingRight: isMobile ? '0' : '12px'
                  }}
                >
                  <div className={`bg-white overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow ${
                    isMobile ? 'rounded-xl border-0 shadow-none' : 'rounded-xl shadow-sm border border-gray-200'
                  }`}>
                    <div
                      className={`w-full bg-cover bg-center ${isMobile ? 'h-64' : 'h-56'}`}
                      style={{ backgroundImage: `url(${s.img})` }}
                    />
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {s.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                        {s.desc}
                      </p>
                      <div className="mt-auto">
                        <button className="inline-flex items-center justify-center w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-semibold transition-colors">
                          {s.cta}
                          <span className="ml-2">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className={`absolute top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 border border-gray-300 shadow-lg rounded-full flex items-center justify-center text-2xl text-gray-700 hover:text-gray-900 transition-colors ${
              isMobile ? 'left-2 w-10 h-10' : '-left-6 w-12 h-12'
            }`}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            onClick={next}
            className={`absolute top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 border border-gray-300 shadow-lg rounded-full flex items-center justify-center text-2xl text-gray-700 hover:text-gray-900 transition-colors ${
              isMobile ? 'right-2 w-10 h-10' : '-right-6 w-12 h-12'
            }`}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.max(0, services.length - slidesToShow + 1) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === index ? 'bg-teal-600 w-8' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSlider;