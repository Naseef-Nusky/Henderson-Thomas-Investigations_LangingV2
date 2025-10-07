import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    investigationType: '',
    timing: '',
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setFormData(prev => ({ ...prev, investigationType: option }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
        case 1:
          return (
            <div className="mb-8 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">What investigation can we help you with?</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <button 
                className={`group p-6 border-2 rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 text-center relative overflow-hidden ${
                  selectedOption === 'corporate' 
                    ? 'border-cyan-400 bg-gradient-to-br from-cyan-50 to-blue-50 text-cyan-700 shadow-lg scale-105' 
                    : 'border-gray-300 bg-white text-gray-600 hover:border-cyan-400 hover:text-cyan-600 hover:shadow-md hover:scale-105'
                }`}
                onClick={() => handleOptionSelect('corporate')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Corporate Investigation</span>
              </button>
              
              <button 
                className={`group p-6 border-2 rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 text-center relative overflow-hidden ${
                  selectedOption === 'surveillance' 
                    ? 'border-cyan-400 bg-gradient-to-br from-cyan-50 to-blue-50 text-cyan-700 shadow-lg scale-105' 
                    : 'border-gray-300 bg-white text-gray-600 hover:border-cyan-400 hover:text-cyan-600 hover:shadow-md hover:scale-105'
                }`}
                onClick={() => handleOptionSelect('surveillance')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Covert Surveillance</span>
              </button>
              
              <button 
                className={`group p-6 border-2 rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 text-center relative overflow-hidden ${
                  selectedOption === 'spouse' 
                    ? 'border-cyan-400 bg-gradient-to-br from-cyan-50 to-blue-50 text-cyan-700 shadow-lg scale-105' 
                    : 'border-gray-300 bg-white text-gray-600 hover:border-cyan-400 hover:text-cyan-600 hover:shadow-md hover:scale-105'
                }`}
                onClick={() => handleOptionSelect('spouse')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Spouse Investigation</span>
              </button>
              
              <button 
                className={`group p-6 border-2 rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 text-center relative overflow-hidden ${
                  selectedOption === 'other' 
                    ? 'border-cyan-400 bg-gradient-to-br from-cyan-50 to-blue-50 text-cyan-700 shadow-lg scale-105' 
                    : 'border-gray-300 bg-white text-gray-600 hover:border-cyan-400 hover:text-cyan-600 hover:shadow-md hover:scale-105'
                }`}
                onClick={() => handleOptionSelect('other')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Other</span>
              </button>
            </div>
          </div>
        );

        case 2:
          return (
            <div className="mb-8 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">When do you want the investigation to start?</h3>

              <div className="space-y-3 max-w-md mx-auto">
              {['ASAP', 'Within a week', 'Within a month', 'Not sure'].map((option) => (
                <button
                  key={option}
                  className={`w-full p-4 border-2 rounded-xl text-sm font-medium cursor-pointer transition-all duration-300 text-center ${
                    formData.timing === option
                      ? 'border-cyan-400 bg-gradient-to-br from-cyan-50 to-blue-50 text-cyan-700 shadow-lg'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-cyan-400 hover:text-cyan-600 hover:shadow-md'
                  }`}
                  onClick={() => handleInputChange('timing', option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

        case 3:
          return (
            <div className="mb-8 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">What's your full name?</h3>

              <div className="max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Enter Name*"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl text-gray-600 focus:border-cyan-400 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>
          );

        case 4:
          return (
            <div className="mb-8 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Nice to meet you {formData.name || 'there'}. And what's your email address?
              </h3>

              <div className="max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter Email*"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl text-gray-600 focus:border-cyan-400 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>
          );

        case 5:
          return (
            <div className="mb-8 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Finally, what's your telephone number?</h3>

              <div className="max-w-md mx-auto">
                <input
                  type="tel"
                  placeholder="Enter Phone*"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl text-gray-600 focus:border-cyan-400 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>
          );

      default:
        return null;
    }
  };

  return (
    <section className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-fixed pt-20 flex items-center justify-center overflow-hidden" 
             style={{ backgroundImage: "url('/hero.jpg')" }}>
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 animate-pulse"></div>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl w-full px-4 md:px-8 text-center text-white z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-2xl">
            <span className="text-white inline-block hover:text-gray-200 transition-colors duration-300">Hiring A Private Investigator You Can Trust Could Be Cheaper Than You Think!</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-white drop-shadow-lg max-w-4xl mx-auto leading-relaxed">
            <strong className="font-bold text-cyan-300">Book your 100% discreet consultation</strong>
          </p>
          
          <p className="text-base md:text-lg mb-8 text-white drop-shadow-lg max-w-4xl mx-auto leading-relaxed">
            Please submit your details below to receive your free quote
          </p>
        </div>

        <div className={`max-w-2xl mx-auto bg-white/95 backdrop-blur-sm p-6 md:p-10 rounded-3xl shadow-2xl mx-4 md:mx-0 border border-white/20 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } hover:shadow-3xl hover:scale-105`}>
          {renderStep()}
          
          {/* Progress Bar Inside Step Card */}
          <div className="mb-6 text-center">
            <div className="text-sm font-semibold text-gray-700 mb-3">
              Step {currentStep} of 5
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Complete our short form in 30 seconds
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-4">
            {currentStep > 1 && (
              <button 
                onClick={handlePrev}
                className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-medium hover:border-cyan-400 hover:text-cyan-600 transition-all duration-300"
              >
                Prev
              </button>
            )}
            
            {currentStep < 5 ? (
              <button 
                onClick={handleNext}
                className="group ml-auto bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 px-8 rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center">
                  Next
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </button>
            ) : (
              <button className="group ml-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-8 rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center">
                  Submit
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">✓</span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;