import React, { useState } from 'react';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  Truck, 
  Shield, 
  Recycle, 
  Heart,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

const RewearFooter = () => {
  const [emailSubscription, setEmailSubscription] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (emailSubscription.trim()) {
      setIsSubscribed(true);
      setEmailSubscription('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const footerSections = [
    {
      title: 'Shop',
      id: 'shop',
      links: ['Women', 'Men', 'Kids', 'Accessories', 'New Arrivals', 'Sale']
    },
    {
      title: 'About',
      id: 'about',
      links: ['Our Story', 'Sustainability', 'Quality Promise', 'Sell With Us', 'Impact Report']
    },
    {
      title: 'Help',
      id: 'help',
      links: ['Size Guide', 'Shipping', 'Returns', 'Contact Us', 'FAQs', 'Live Chat']
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Main Footer Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Rewear
              </h2>
              <p className="text-xs text-gray-500 tracking-wide mb-3">SUSTAINABLE FASHION</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-sm">
                Giving pre-loved fashion a second chance while reducing textile waste.
              </p>
            </div>

            {/* Newsletter Signup */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Stay Updated</h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={emailSubscription}
                  onChange={(e) => setEmailSubscription(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-gray-900 transition-all duration-200"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleEmailSubmit(e);
                    }
                  }}
                />
                <button
                  onClick={handleEmailSubmit}
                  className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all duration-200"
                >
                  Subscribe
                </button>
              </div>
              {isSubscribed && (
                <p className="text-green-600 text-xs mt-2 flex items-center">
                  <Heart className="w-3 h-3 mr-1" />
                  Thank you for subscribing!
                </p>
              )}
            </div>

            {/* Social Links */}
            <div className="flex space-x-2">
              <a href="#" className="w-8 h-8 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-all duration-200">
                <Facebook className="w-4 h-4 text-gray-600" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-all duration-200">
                <Instagram className="w-4 h-4 text-gray-600" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-all duration-200">
                <Twitter className="w-4 h-4 text-gray-600" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-all duration-200">
                <Youtube className="w-4 h-4 text-gray-600" />
              </a>
            </div>
          </div>

          {/* Footer Links - Desktop */}
          <div className="hidden lg:contents">
            {footerSections.map((section) => (
              <div key={section.id}>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a 
                        href="#" 
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer Links - Mobile Accordion */}
          <div className="lg:hidden space-y-2">
            {footerSections.map((section) => (
              <div key={section.id} className="border-b border-gray-100 pb-2">
                <button 
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center justify-between w-full text-left py-2 hover:bg-gray-50 rounded-lg transition-all duration-200"
                >
                  <h3 className="text-sm font-medium text-gray-900">
                    {section.title}
                  </h3>
                  {expandedSection === section.id ? 
                    <ChevronUp className="w-4 h-4 text-gray-600" /> : 
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  }
                </button>
                {expandedSection === section.id && (
                  <ul className="mt-2 space-y-1 pl-2">
                    {section.links.map((link) => (
                      <li key={link}>
                        <a 
                          href="#" 
                          className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm block py-1"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Impact Section */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sustainability Badges */}
            <div className="md:col-span-3">
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
                  <Truck className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-700 font-medium">Carbon Neutral</span>
                </div>
                <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                  <Shield className="w-3 h-3 text-blue-600 mr-1" />
                  <span className="text-xs text-blue-700 font-medium">Quality Assured</span>
                </div>
                <div className="flex items-center bg-purple-50 px-3 py-1 rounded-full">
                  <Recycle className="w-3 h-3 text-purple-600 mr-1" />
                  <span className="text-xs text-purple-700 font-medium">Circular Fashion</span>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>123 Sustainable St, Green City, CA</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-3 h-3 mr-1" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-3 h-3 mr-1" />
                  <span>hello@rewear.com</span>
                </div>
              </div>
            </div>

            {/* Impact Stats */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                <Recycle className="w-4 h-4 text-green-600 mr-1" />
                Our Impact
              </h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Garments Saved</span>
                  <span className="text-gray-900 font-medium">50K+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">CO2 Reduced</span>
                  <span className="text-gray-900 font-medium">2.3M lbs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Water Saved</span>
                  <span className="text-gray-900 font-medium">1.5M gal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="text-gray-600 text-xs text-center sm:text-left">
              © 2025 Rewear. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-4 text-xs">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Accessibility
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default RewearFooter;