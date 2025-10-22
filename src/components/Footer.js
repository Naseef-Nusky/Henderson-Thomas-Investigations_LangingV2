import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-800 py-12 mb-20 md:mb-0">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4 flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="Henderson Thomas Investigations Logo" 
                className="h-12 w-auto"
              />
            </div>
             <p className="text-gray-600 mb-4 leading-relaxed">
              UK's top-rated private detective agency specializing in corporate investigations, 
              covert surveillance, and discreet investigative services. We provide professional, 
              confidential solutions for all your investigation needs.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="mr-2">📞</span>
                <span className="font-semibold">07826 416466</span>
              </div>
              <div className="flex items-center">
                 <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                 <span className="text-sm text-gray-600">AVAILABLE 24/7</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-600">Our Services</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="hover:text-blue-600 transition-colors duration-300 cursor-pointer">Corporate Investigation</li>
              <li className="hover:text-blue-600 transition-colors duration-300 cursor-pointer">Covert Surveillance</li>
              <li className="hover:text-blue-600 transition-colors duration-300 cursor-pointer">Spouse Investigation</li>
              <li className="hover:text-blue-600 transition-colors duration-300 cursor-pointer">Background Checks</li>
              <li className="hover:text-blue-600 transition-colors duration-300 cursor-pointer">Asset Tracing</li>
              <li className="hover:text-blue-600 transition-colors duration-300 cursor-pointer">Fraud Investigation</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-600">Contact Us</h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start">
                <span className="mr-3 mt-1">📍</span>
                <div>
                  <p className="font-semibold">HENDERSON THOMAS INVESTIGATIONS</p>
                  <p>1st Floor, 238 Kensington High St,</p>
                  <p>London W8 6SN</p>
                </div>
              </div>
              {/* <div className="flex items-center">
                <span className="mr-3">📧</span>
                <span>hendersonthomasinvestigations@outlook.com</span>
              </div> */}
              <div className="flex items-center">
                <span className="mr-3">📞</span>
                <span>07826 416466</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">© Copyright 2025 | All Rights Reserved</div>
          <div className="flex space-x-4">
            <div className="text-gray-500 text-sm">
              Licensed & Insured Private Investigators
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm text-gray-500">24/7 Available</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
