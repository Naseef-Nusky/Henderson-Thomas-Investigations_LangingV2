import React, { useState } from 'react';

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'How Much Does a Private Investigator Cost?',
      a: "If you're asking, 'How much does a private investigator cost?' the answer depends on the type of investigation required. At Henderson Thomas Investigations, we provide affordable private investigator services tailored to your needs. Whether you need a detective private eye, legal investigator, or corporate private investigator, our pricing is transparent, competitive, and designed to deliver results."
    },
    {
      q: 'What Types of Investigations Do You Handle?',
      a: "We specialize in a wide range of investigative services including surveillance, background checks, matrimonial investigations, corporate investigations, fraud detection, missing persons cases, and legal support. Our experienced team uses cutting-edge technology and proven methodologies to deliver accurate results."
    },
    {
      q: 'How Long Does a Typical Investigation Take?',
      a: "The duration of an investigation varies greatly depending on the complexity and scope of the case. Simple background checks may take 2-5 business days, while complex surveillance or fraud investigations can take several weeks. We provide realistic timelines during our initial consultation and keep you updated throughout the process."
    },
    {
      q: 'Is Everything Confidential and Discreet?',
      a: "Absolutely. Confidentiality is the cornerstone of our business. All investigations are conducted with the utmost discretion, and we maintain strict confidentiality agreements. Your privacy and the integrity of the investigation are our top priorities. We never compromise on discretion."
    },
    {
      q: 'What Information Do You Need to Start an Investigation?',
      a: "The information required depends on the type of investigation. Generally, we need basic details about the subject, your objectives, and any relevant background information. During our free consultation, we'll discuss exactly what information would be helpful and what we can work with to achieve the best results."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-8xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Get answers to the most common questions about our private investigation services
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* FAQ Image - Left Side */}
          <div className="order-2 lg:order-1">
            <img 
              src="/faq.jpg" 
              alt="FAQ Section" 
              className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* FAQ Accordions - Right Side */}
          <div className="order-1 lg:order-2 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between text-left px-5 py-4 md:px-6 md:py-5 bg-gray-50 hover:bg-gray-100 transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`faq-panel-${index}`}
              >
                <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                  {faq.q}
                </span>
                <span className="ml-4 text-gray-600 text-xl md:text-2xl select-none flex-shrink-0">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>

              {openIndex === index && (
                <div id={`faq-panel-${index}`} className="px-5 py-4 md:px-6 md:py-6 bg-white text-gray-700 leading-relaxed">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;


