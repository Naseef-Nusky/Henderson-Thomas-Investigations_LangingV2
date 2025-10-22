import React from 'react';

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
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Investigation Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional, confidential, and results-driven investigation services tailored to your specific needs. 
            Follow our proven process to get the answers you need.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {steps.map((step, idx) => (
            <div key={step.id} className="relative">
              {/* Step Card */}
              <div className="relative bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200 h-full">
                {/* Step Number Badge */}
                <div className="absolute -top-3 right-6 px-3 py-1 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm bg-white border-2 border-blue-200 shadow-lg">
                  Step {step.id}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600">
                  {renderIcon(step.icon)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {step.headline}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {step.body}
                  </p>
                </div>
              </div>

              {/* Connection Arrow (except for last item) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 w-8 h-8 z-10">
                  <div className="w-full h-full bg-white rounded-full border-2 border-gray-200 flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="flex justify-center">
            <a href="#contact" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
              Start Your Investigation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;


