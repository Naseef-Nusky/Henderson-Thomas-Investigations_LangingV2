import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black/90 backdrop-blur-md text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4 flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="K3K Investigations Logo" 
                className="h-12 w-auto"
              />
              <span className="text-3xl font-bold text-white tracking-wider">K3K</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              UK's top-rated private detective agency specializing in corporate investigations, 
              covert surveillance, and discreet investigative services. We provide professional, 
              confidential solutions for all your investigation needs.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="mr-2">📞</span>
                <span className="font-semibold">0740 7612 398</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm text-gray-300">AVAILABLE 24/7</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">Our Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-cyan-400 transition-colors duration-300 cursor-pointer">Corporate Investigation</li>
              <li className="hover:text-cyan-400 transition-colors duration-300 cursor-pointer">Covert Surveillance</li>
              <li className="hover:text-cyan-400 transition-colors duration-300 cursor-pointer">Spouse Investigation</li>
              <li className="hover:text-cyan-400 transition-colors duration-300 cursor-pointer">Background Checks</li>
              <li className="hover:text-cyan-400 transition-colors duration-300 cursor-pointer">Asset Tracing</li>
              <li className="hover:text-cyan-400 transition-colors duration-300 cursor-pointer">Fraud Investigation</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">Contact Us</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start">
                <span className="mr-3 mt-1">📍</span>
                <div>
                  <p>London Office</p>
                  <p className="text-sm">United Kingdom</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="mr-3">📧</span>
                <span>info@k3k-investigations.com</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">📞</span>
                <span>0740 7612 398</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 K3K Investigations. All rights reserved. | Privacy Policy | Terms of Service
          </div>
          <div className="flex space-x-4">
            <div className="text-gray-400 text-sm">
              Licensed & Insured Private Investigators
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm text-gray-400">24/7 Available</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
