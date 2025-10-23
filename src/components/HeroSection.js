import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const HeroSection = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    investigationType: '',
    otherType: '',
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
    // simple per-step validation
    if (currentStep === 1 && !formData.investigationType) return;
    if (currentStep === 2 && !formData.timing) return;
    if (currentStep === 3 && !formData.name.trim()) return;
    if (currentStep === 4 && (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))) return;
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const [submitState, setSubmitState] = useState({ sending: false, ok: null, error: '' });

  const submitHeroForm = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) || !/^\+?\d[\d\s-]{6,}$/.test(formData.phone)) {
      setSubmitState({ sending: false, ok: false, error: 'Please complete all required fields correctly.' });
      return;
    }
    setSubmitState({ sending: true, ok: null, error: '' });
    try {
      const EMAILJS_CONFIG = {
        serviceId: 'service_z9nrpnh',
        templateId: 'template_ito81i4',
        publicKey: 'KMtxeuThzMItKsmDc',
      };

      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          title: `Hero Quote Request from ${formData.name}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: 'Hero form submission',
          investigationType: formData.investigationType || formData.otherType || 'N/A',
          timing: formData.timing || 'N/A',
          time: new Date().toLocaleString(),
        },
        EMAILJS_CONFIG.publicKey
      );

      if (result.status !== 200) {
        throw new Error('Failed to send');
      }
      setSubmitState({ sending: false, ok: true, error: '' });
      
      // Reset form after successful submission
      setFormData({
        investigationType: '',
        timing: '',
        name: '',
        email: '',
        phone: '',
        otherType: ''
      });
      setCurrentStep(1);
    } catch (err) {
      setSubmitState({ sending: false, ok: false, error: err.message || 'Failed to send' });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
        case 1:
          return (
            <div className="mb-8 text-center">
              <h3 className="text-xl font-semibold text-white mb-6 drop-shadow-lg">What investigation can we help you with?</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
              <button 
                className={`group p-4 border-2 rounded-full text-sm md:text-base font-medium cursor-pointer transition-all duration-300 text-center relative overflow-hidden ${
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
                className={`group p-4 border-2 rounded-full text-sm md:text-base font-medium cursor-pointer transition-all duration-300 text-center relative overflow-hidden ${
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
                className={`group p-4 border-2 rounded-full text-sm md:text-base font-medium cursor-pointer transition-all duration-300 text-center relative overflow-hidden ${
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
                className={`group p-4 border-2 rounded-full text-sm md:text-base font-medium cursor-pointer transition-all duration-300 text-center relative overflow-hidden ${
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
            
            {/* Text input for "Other" option */}
            {selectedOption === 'other' && (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Please specify your investigation type*"
                  value={formData.otherType || ''}
                  onChange={(e) => handleInputChange('otherType', e.target.value)}
                  className="w-full p-4 border-2 border-gray-300 rounded-full text-gray-600 focus:border-cyan-400 focus:outline-none transition-all duration-300"
                />
              </div>
            )}
          </div>
        );

        case 2:
          return (
            <div className="mb-8 text-center">
              <h3 className="text-xl font-semibold text-white mb-6 drop-shadow-lg">When do you want the investigation to start?</h3>

              <div className="grid grid-cols-2 gap-4 w-full">
              {['ASAP', 'Within a week', 'Within a month', 'Not sure'].map((option) => (
                <button
                  key={option}
                  className={`w-full p-4 border-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 text-center ${
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
              <h3 className="text-xl font-semibold text-white mb-6 drop-shadow-lg">What's your full name?</h3>

              <div className="w-full">
                <input
                  type="text"
                  placeholder="Enter Name*"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full p-4 border-2 rounded-full text-gray-600 focus:outline-none transition-all duration-300 ${formData.name.trim() ? 'border-gray-300 focus:border-cyan-400' : 'border-red-300 focus:border-red-400'}`}
                />
              </div>
            </div>
          );

        case 4:
          return (
            <div className="mb-8 text-center">
              <h3 className="text-xl font-semibold text-white mb-6 drop-shadow-lg">
                Nice to meet you {formData.name || 'there'}. And what's your email address?
              </h3>

              <div className="w-full">
                <input
                  type="email"
                  placeholder="Enter Email*"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full p-4 border-2 rounded-full text-gray-600 focus:outline-none transition-all duration-300 ${/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'border-gray-300 focus:border-cyan-400' : 'border-red-300 focus:border-red-400'}`}
                />
              </div>
            </div>
          );

        case 5:
          return (
            <div className="mb-8 text-center">
              <h3 className="text-xl font-semibold text-white mb-6 drop-shadow-lg">Finally, what's your telephone number?</h3>

              <div className="w-full">
                <input
                  type="tel"
                  placeholder="Enter Phone*"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full p-4 border-2 rounded-full text-gray-600 focus:outline-none transition-all duration-300 ${/^\+?\d[\d\s-]{6,}$/.test(formData.phone) ? 'border-gray-300 focus:border-cyan-400' : 'border-red-300 focus:border-red-400'}`}
                />
              </div>
            </div>
          );

      default:
        return null;
    }
  };

  return (
    <section className="relative min-h-screen bg-cover bg-center bg-no-repeat md:bg-fixed overflow-hidden" 
             style={{ backgroundImage: "url('/hero.jpg')" }}>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gray-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-24 md:pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center min-h-[90vh]">
          {/* Left side - Content */}
          <div className={`space-y-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-sm font-medium">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
              Professional Investigation Services
            </div>

            {/* Main heading */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-normal drop-shadow-2xl break-words">
              <span className="block font-semibold text-2xl md:text-4xl lg:text-5xl mb-2">
                Finding a Trustworthy
              </span>
              <span className="block font-bold text-3xl md:text-5xl lg:text-6xl mb-4 pb-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Private Investigator
              </span>
              <span className="block font-medium text-xl md:text-3xl lg:text-4xl text-white/90 leading-relaxed">
                Might Be More Affordable Than You Expect!
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-2xl text-gray-200 leading-relaxed max-w-2xl drop-shadow-lg">
              <span className="text-blue-300 font-bold">We offer a 100% free consultation</span> – with no obligation. 
              Simply complete the questions or call our office today.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="flex items-center space-x-4 text-gray-200">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">✓</span>
                </div>
                <span className="text-lg font-medium">100% Confidential</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-200">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">✓</span>
                </div>
                <span className="text-lg font-medium">Free Consultation</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-200">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">✓</span>
                </div>
                <span className="text-lg font-medium">Trusted Professionals</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-200">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">✓</span>
                </div>
                <span className="text-lg font-medium">Bespoke Solutions</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                <a href="#contact" className="flex items-center justify-center">
                  Start Free Consultation
                  <svg className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </button>
              <button className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border-2 border-white/30 hover:border-blue-400 text-white hover:text-blue-300 font-bold text-lg rounded-2xl transition-all duration-300 hover:bg-blue-500/10 backdrop-blur-sm">
                Call Now: 07826 416466
              </button>
            </div>
          </div>

          {/* Right side - Form */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Modern Card Design with Background Image */}
            <div className="relative bg-cover bg-center bg-no-repeat rounded-3xl shadow-2xl p-6 md:p-8 hover:shadow-3xl transition-all duration-300 overflow-hidden" 
                 style={{ backgroundImage: "url('/herobg2.jpg')" }}>
              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-black/60 rounded-2xl"></div>
              {/* Content with relative positioning */}
              <div className="relative z-10">
              {/* Header Section */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-4 shadow-lg">
                  <img src="/favicon.ico" alt="Investigation Services" className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">Get Your Free Quote</h2>
                <p className="text-gray-200 text-sm drop-shadow-md">Complete our quick form in under 2 minutes</p>
              </div>

              {/* Progress Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm font-semibold text-gray-200">Step {currentStep} of 5</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-300">{Math.round((currentStep / 5) * 100)}%</div>
                    <div className="text-xs text-gray-300">Complete</div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${(currentStep / 5) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Form Content */}
              <div className="mb-8">
                {renderStep()}
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                {currentStep > 1 && (
                  <button 
                    onClick={handlePrev}
                    className="w-full flex items-center justify-center px-6 py-3 border border-white/30 text-white rounded-xl font-medium bg-white/10 backdrop-blur-sm hover:border-blue-400 hover:text-blue-300 transition-all duration-300 hover:bg-white/20"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous Step
                  </button>
                )}
                
                {currentStep < 5 ? (
                  <button 
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <span className="flex items-center justify-center">
                      Continue to Next Step
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </button>
                ) : (
                  <div>
                    <button onClick={submitHeroForm} disabled={submitState.sending} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-60">
                      <span className="flex items-center justify-center">
                        {submitState.sending ? 'Sending...' : 'Submit & Get Your Quote'}
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    </button>
                    {submitState.ok && (
                      <div className="mt-3 text-green-300 text-sm font-semibold text-center">Request sent successfully.</div>
                    )}
                    {submitState.ok === false && (
                      <div className="mt-3 text-red-300 text-sm font-semibold text-center">{submitState.error}</div>
                    )}
                  </div>
                )}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;