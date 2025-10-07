import React from 'react';

const WhyChooseSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="gap-10 lg:flex lg:items-stretch">
          {/* Left image */}
          <div className="rounded-2xl overflow-hidden lg:flex-1">
            <img
              src="/why.jpg"
              alt="Why choose Rosewood Investigations"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right content */}
          <div className="lg:flex-1 flex flex-col justify-center">
            <p className="text-teal-600 font-semibold mb-3">Why Choose Rosewood Investigations</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
              Comprehensive Solution for Private & Corporate
              <span className="block">Clients.</span>
            </h2>
            <div className="space-y-5 text-gray-700 leading-relaxed text-base md:text-lg">
              <p>
                In a world filled with uncertainty, we understand the emotional weight of not
                knowing. Whether it’s personal doubts or business‑related suspicions, our expert
                private investigators are here to guide you through the fog of uncertainty towards
                clarity.
              </p>
              <p>
                With our comprehensive range of services – from spouse investigations and bug
                sweeping, to covert surveillance, asset tracing, and cyber investigations – we bring
                unmatched experience and proven results to your unique situation. We handle every
                case with sensitivity, ensuring absolute confidentiality while working meticulously
                to uncover the facts.
              </p>
              <p>
                When you need answers, trust the leaders in the field. Contact Rosewood
                Investigations today for a free, no‑obligation consultation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;


