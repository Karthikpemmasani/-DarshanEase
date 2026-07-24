import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <span className="text-2xl font-bold text-white">DarshanEase</span>
            <p className="text-sm">
              Making your spiritual journey seamless. Book temple darshan tickets online with ease and comfort.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/temples" className="hover:text-orange-400 transition-colors">Browse Temples</Link></li>
              <li><Link to="/about" className="hover:text-orange-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-orange-400 transition-colors">Support & Contact</Link></li>
              <li><Link to="/login" className="hover:text-orange-400 transition-colors">Login / Register</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Help & Policies</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-orange-400 transition-colors">Helpdesk Support</Link></li>
              <li><Link to="/faq" className="hover:text-orange-400 transition-colors">FAQ</Link></li>
              <li><Link to="/terms" className="hover:text-orange-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cancellation-policy" className="hover:text-orange-400 transition-colors">Cancellation Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>Smartbridge Tech Hub, Hyderabad, Telangana 500081</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <span>1800-123-DARSHAN</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <span>support@darshanease.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-gray-400">
            &copy; {new Date().getFullYear()} DarshanEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
