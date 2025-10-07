import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden order-2 lg:order-1">
            <img
              src="/about.jpg"
              alt="Rosewood Investigations in action"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="text-teal-600 font-semibold mb-3">Why Choose Rosewood Investigations</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comprehensive Solutions for Private & Corporate Clients
            </h2>
            <div className="space-y-5 text-gray-700 leading-relaxed">
              <p>
                Rosewood Investigations is a trusted private investigation agency offering a wide
                range of professional detective services to meet your needs. Whether you’re looking
                for a private investigator near you, need help with a phone investigation, or require
                discreet surveillance, our experienced local investigators are ready to assist.
              </p>
              <p>
                We specialize in financial investigations, electronic harassment, corporate
                investigations, and more. From missing person cases to fraud and asset tracing, our
                tailored solutions ensure you receive the support that fits your unique situation.
              </p>
              <p>
                Whether you need a legal investigator, personal investigator, or digital private
                investigator, you can rely on our professionalism and 100% confidentiality. Our
                London-based team operates with sensitivity and absolute discretion while working
                meticulously to uncover the facts.
              </p>
              <p className="font-medium text-gray-800">
                We’re dedicated to delivering reliable, results‑focused investigations you can trust.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;


