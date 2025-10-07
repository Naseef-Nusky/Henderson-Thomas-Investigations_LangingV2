import React, { useState } from 'react';

const FAQAccordion = () => {
  const [open, setOpen] = useState(true);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Frequently Asked Question
        </h2>

        <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between text-left px-5 py-4 md:px-6 md:py-5 bg-gray-50 hover:bg-gray-100 transition-colors"
            aria-expanded={open}
            aria-controls="faq-panel-1"
          >
            <span className="text-base md:text-lg font-semibold text-gray-900">
              How much does a private investigator cost?
            </span>
            <span className="ml-4 text-gray-600 text-xl md:text-2xl select-none">
              {open ? '−' : '+'}
            </span>
          </button>

          {open && (
            <div id="faq-panel-1" className="px-5 py-4 md:px-6 md:py-6 bg-white text-gray-700 leading-relaxed">
              <p className="mb-3">
                If you’re wondering how much does a private investigator cost, our private investigator prices are
                competitive, offering cheap private investigators near me without compromising quality.
              </p>
              <p>
                If you need to hire an investigator, whether for personal or legal matters, Rosewood Investigations is
                the name you can rely on. Contact us today to speak with a professional investigator.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;


