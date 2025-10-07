import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSlider from './components/ServicesSlider';
import Steps from './components/Steps';
import WhyChooseSection from './components/WhyChooseSection';
import ContactSection from './components/ContactSection';
import ReviewSlider from './components/ReviewSlider';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSlider />
      <Steps />
      {/* <AboutSection /> */}
      <WhyChooseSection />
      <ReviewSlider />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
