import React from 'react';

const WhyChooseSection = () => {
  const features = [
    {
      title: 'Confidential & Trusted',
      description: 'All cases handled with complete discretion and professionalism.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: 'Expert Team',
      description: 'Highly experienced detectives specializing in corporate and personal cases.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Comprehensive Services',
      description: 'From phone investigations to financial and legal cases.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: 'Tailored Solutions',
      description: 'Every case is customized to deliver precise, accurate results.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="gap-8 lg:gap-12 lg:flex lg:items-center">
          {/* Left content */}
          <div className="lg:flex-1 lg:pr-12">
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Why Choose Us?
              </h2>
              <p className="text-gray-600 mb-8 md:mb-12 text-sm md:text-base">
                With over 25 years of experience, Henderson Thomas Investigations delivers discreet and results-oriented private investigation services you can trust.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start group">
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mr-4 md:mr-6 group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 md:mt-12">
              <a href="#contact" className="inline-block w-full md:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center">
                Get Started Today
              </a>
            </div>
          </div>

          {/* Right image */}
          <div className="lg:flex-1 mt-8 md:mt-12 lg:mt-0">
            <div className="relative">
              <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/why.jpg"
                  alt="Why choose Henderson Thomas Investigations"
                  className="w-full h-64 md:h-96 lg:h-[500px] object-cover"
                />
              </div>
              {/* Floating stats */}
              <div className="absolute -bottom-3 -left-3 md:-bottom-6 md:-left-6 bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">25+</div>
                  <div className="text-xs md:text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
              <div className="absolute -top-3 -right-3 md:-top-6 md:-right-6 bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">100%</div>
                  <div className="text-xs md:text-sm text-gray-600">Confidential</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;


