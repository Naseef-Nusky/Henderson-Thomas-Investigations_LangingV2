import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const formRef = useRef(null);
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const phoneOk = /^\+?\d[\d\s-]{6,}$/.test(form.phone);
  const [touched, setTouched] = useState({ name: false, phone: false, email: false, message: false });
  const [submitTried, setSubmitTried] = useState(false);
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onBlur = (e) => setTouched({ ...touched, [e.target.name]: true });
  const [status, setStatus] = useState({ sending: false, ok: null, error: '' });
  const submit = async (e) => {
    e.preventDefault();
    setSubmitTried(true);
    if (!form.name || !emailOk || !phoneOk || !form.message.trim()) return;
    setStatus({ sending: true, ok: null, error: '' });
    try {
      const EMAILJS_CONFIG = {
        serviceId: 'service_z9nrpnh',
        templateId: 'template_o96o6re',
        publicKey: 'KMtxeuThzMItKsmDc',
      };

      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          title: `New Website Contact from ${form.name}`,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
          time: new Date().toLocaleString(),
        },
        EMAILJS_CONFIG.publicKey
      );

      if (result.status === 200) {
        setStatus({ sending: false, ok: true, error: '' });
        setForm({ name: '', phone: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send');
      }
    } catch (err) {
      setStatus({ sending: false, ok: false, error: err?.text || err?.message || 'Failed to send' });
    }
  };

  return (
    <section id="contact" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Get Your Free Consultation
          </h2>
          <p className="text-gray-600 mb-8 md:mb-12 max-w-4xl mx-auto text-sm md:text-base">
            Ready to get started? Contact our professional investigators today for confidential assistance.
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Image */}
          <div className="order-1 lg:order-1">
            <div className="relative">
              <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/contact-bottom.jpg"
                  alt="Professional Investigation Services"
                  className="w-full h-64 md:h-96 lg:h-[500px] object-cover"
                />
              </div>
              {/* Floating Contact Info */}
              <div className="absolute -bottom-3 -left-3 md:-bottom-6 md:-left-6 bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl border border-gray-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3 md:mr-4">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
            </div>
            <div>
                    <div className="text-xs md:text-sm text-gray-500">Call Now</div>
                    <div className="font-bold text-gray-900 text-sm md:text-base">07826 416466</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-3 -right-3 md:-top-6 md:-right-6 bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">24/7</div>
                  <div className="text-xs md:text-sm text-gray-600">Available</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="order-2 lg:order-2">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-gray-100 p-6 md:p-8">
              {/* Form Header */}
              <div className="mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h3>
                <p className="text-gray-600 text-sm md:text-base">We'll get back to you within 24 hours</p>
                {status.ok && (
                  <div className="mt-3 text-green-600 text-sm font-semibold">Message sent successfully.</div>
                )}
                {status.ok === false && (
                  <div className="mt-3 text-red-600 text-sm font-semibold">{status.error}</div>
                )}
              </div>

              {/* Contact Form */}
              <form ref={formRef} onSubmit={submit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Name *</label>
                  <input 
                    name="name" 
                    value={form.name} 
                    onChange={handle} 
                    onBlur={onBlur}
                    required 
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                      form.name.trim() 
                        ? 'border-green-300 focus:border-green-500 bg-green-50/30' 
                        : 'border-gray-300 focus:border-blue-500'
                    }`} 
                    placeholder="Enter your full name" 
                  />
                  {((touched.name || submitTried) && !form.name.trim()) && (
                    <p className="text-red-600 text-sm">Please enter your name.</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Phone Number *</label>
                    <input 
                      name="phone" 
                      value={form.phone} 
                      onChange={handle} 
                      onBlur={onBlur}
                      required 
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                        phoneOk 
                          ? 'border-green-300 focus:border-green-500 bg-green-50/30' 
                          : 'border-gray-300 focus:border-blue-500'
                      }`} 
                      placeholder="Enter your phone number" 
                    />
                    {((touched.phone || submitTried) && !phoneOk) && (
                      <p className="text-red-600 text-sm">Please enter a valid phone number.</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={form.email} 
                      onChange={handle} 
                      onBlur={onBlur}
                      required 
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                        emailOk 
                          ? 'border-green-300 focus:border-green-500 bg-green-50/30' 
                          : 'border-gray-300 focus:border-blue-500'
                      }`} 
                      placeholder="Enter your email address" 
                    />
                    {((touched.email || submitTried) && !emailOk) && (
                      <p className="text-red-600 text-sm">Please enter a valid email address.</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">How Can We Help? *</label>
                  <textarea 
                    name="message" 
                    rows={5} 
                    value={form.message} 
                    onChange={handle} 
                    onBlur={onBlur}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 focus:outline-none resize-none" 
                    placeholder="Tell us about your investigation needs..." 
                  />
                  {((touched.message || submitTried) && !form.message.trim()) && (
                    <p className="text-red-600 text-sm">Please enter a short description of your request.</p>
                  )}
                </div>
                
                {/* Submit Button */}
                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={status.sending || !form.name || !emailOk || !form.message.trim() || !phoneOk} 
                    className={`w-full inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 ${
                      !status.sending && form.name && emailOk && phoneOk && form.message.trim()
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl' 
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <svg className={`w-5 h-5 mr-2 ${status.sending ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    {status.sending ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;