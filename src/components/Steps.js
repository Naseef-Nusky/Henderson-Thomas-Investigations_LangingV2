import React, { useState } from 'react';

const steps = [
  {
    id: 1,
    title: 'Step 1',
    headline: 'Complete the form',
    body:
      'Complete the form above and submit to receive your free quote. All details provided remain 100% confidential.',
    icon: 'form',
    img: '/step1.jpg',
  },
  {
    id: 2,
    title: 'Step 2',
    headline: 'Discuss your options',
    body:
      'Discuss your tailored options with an experienced private investigator. Decide which option works best for your budget.',
    icon: 'chat',
    img: '/step2.jpg',
  },
  {
    id: 3,
    title: 'Step 3',
    headline: 'Receive your evidence',
    body:
      'All evidence will be sent to your preferred contact method.',
    icon: 'inbox',
    img: '/step3.jpg',
  },
];

const Steps = () => {
  const [active, setActive] = useState(0);
  const renderIcon = (name) => {
    const base = 'w-6 h-6 stroke-current';
    switch (name) {
      case 'form':
        return (
          <svg viewBox="0 0 24 24" fill="none" className={base}>
            <path d="M9 7h6M9 11h6M9 15h4" strokeWidth="1.8" />
            <rect x="4" y="3" width="16" height="18" rx="2.5" strokeWidth="1.8" />
          </svg>
        );
      case 'chat':
        return (
          <svg viewBox="0 0 24 24" fill="none" className={base}>
            <path d="M8 17l-3.5 3.5V8a4 4 0 014-4h7a4 4 0 014 4v5a4 4 0 01-4 4H8z" strokeWidth="1.8" />
            <path d="M9 9h6M9 12h4" strokeWidth="1.8" />
          </svg>
        );
      case 'inbox':
        return (
          <svg viewBox="0 0 24 24" fill="none" className={base}>
            <path d="M4 12l2-7h12l2 7v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5z" strokeWidth="1.8" />
            <path d="M4 12h4l2 3h4l2-3h4" strokeWidth="1.8" />
          </svg>
        );
      default:
        return null;
    }
  };
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
          Transparent and Results-Focused Private Investigators
        </h2>
        <div className="gap-10 lg:flex lg:items-stretch">
          <div className="lg:flex-1">
            <div className="space-y-6">
              {steps.map((s, idx) => (
                <div
                  key={s.id}
                  className={`rounded-2xl border bg-white p-5 md:p-6 transition-colors cursor-pointer ${
                    active === idx ? 'border-teal-500' : 'border-teal-300/60 hover:border-teal-500'
                  }`}
                  onClick={() => setActive(idx)}
                >
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 text-teal-600" aria-hidden>
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center ${active===idx ? 'bg-teal-100' : 'bg-teal-50'}`}>
                        {renderIcon(s.icon)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-teal-600 font-semibold mb-1">{s.title}</div>
                      <div className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                        {s.headline}
                      </div>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden lg:flex-1 lg:max-h-full mt-6 md:mt-8 lg:mt-0">
            <img
              src={steps[active]?.img || '/call.jpg'}
              alt="Private investigator consultation"
              className="w-full h-full object-cover lg:h-[100%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;


