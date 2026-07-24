import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, Ticket, ShieldCheck, Clock, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const Faq = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      category: 'Booking & Slots',
      q: 'How do I book a Darshan slot on DarshanEase?',
      a: 'Select your preferred temple from the "Temples" page, click "View Details" or "Book Slot", choose your visit date and available time slot, fill in your Devotee Name and 12-digit Aadhar number, and click "Confirm Booking". Your QR ticket pass will be generated instantly.'
    },
    {
      category: 'Booking & Slots',
      q: 'Is there any fee for Darshan slot bookings?',
      a: 'No! All general Darshan slot bookings on DarshanEase are 100% free of cost for all devotees.'
    },
    {
      category: 'Verification & Entry',
      q: 'Why is a 12-digit Aadhar number required during booking?',
      a: 'Temple security boards require official government identity verification to prevent ticket hoarding and ensure genuine devotees get peaceful Darshan access. You must bring your original Aadhar card along with the QR ticket pass.'
    },
    {
      category: 'Verification & Entry',
      q: 'Can I change the Devotee Name or Aadhar number after booking?',
      a: 'For security reasons, ticket pass details cannot be edited once generated. If you entered incorrect details, please cancel the existing pass and book a fresh slot.'
    },
    {
      category: 'Cancellation & Release',
      q: 'What is the cancellation policy for Darshan slots?',
      a: 'You can cancel your booking anytime up to 2 hours prior to your scheduled time slot from the "My Bookings" page. Upon cancellation, the slot is immediately released back to the temple pool for other waiting devotees.'
    },
    {
      category: 'Technical & Account',
      q: 'Why does the registration or phone field require 10 digits?',
      a: 'All Indian mobile numbers are standardized to 10 numeric digits. Entering less or more digits will show a validation prompt to prevent wrong contact details.'
    },
    {
      category: 'Technical & Account',
      q: 'How do I download my Darshan Pass PDF?',
      a: 'After completing a booking, click the "Download PDF" button on the confirmation screen or access your active pass from the "My Bookings" menu anytime.'
    }
  ];

  const filteredFaqs = faqs.filter(
    item =>
      item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300">
            Devotee Assistance
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-3 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-base">
            Everything you need to know about Darshan slot bookings, entry rules, and account support.
          </p>

          {/* Search Input */}
          <div className="mt-6 max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search questions (e.g. Aadhar, cancellation, free slots)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            />
          </div>
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 text-center border border-gray-200 dark:border-gray-700">
              <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-lg font-semibold text-gray-900 dark:text-white">No matching questions found</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Try searching with different keywords or submit a custom support ticket.</p>
              <Link to="/contact" className="inline-block mt-4 text-sm font-semibold text-orange-600 dark:text-orange-400 hover:underline">
                Contact Support Desk &rarr;
              </Link>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 font-bold text-gray-900 dark:text-white hover:bg-orange-50/50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300">
                      {faq.category}
                    </span>
                    <span>{faq.q}</span>
                  </div>
                  {openIndex === idx ? (
                    <ChevronUp className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>

                {openIndex === idx && (
                  <div className="px-6 pb-5 pt-2 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700/50 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Still Need Help Banner */}
        <div className="mt-12 bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl p-8 text-white text-center shadow-xl">
          <h3 className="text-2xl font-bold">Still have questions?</h3>
          <p className="text-orange-100 text-sm mt-1">Our Devotee Helpdesk is available 24/7 to assist you.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-white text-orange-700 font-bold rounded-xl shadow-md hover:bg-orange-50 transition-colors text-sm"
            >
              Open Support Ticket
            </Link>
            <Link
              to="/cancellation-policy"
              className="px-6 py-2.5 bg-white/20 backdrop-blur-md text-white font-semibold rounded-xl hover:bg-white/30 transition-colors text-sm"
            >
              View Cancellation Rules
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Faq;
