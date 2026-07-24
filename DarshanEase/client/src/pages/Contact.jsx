import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Send, HelpCircle, MessageSquare, ShieldCheck, ChevronDown, ChevronUp, CheckCircle, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Booking Help',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [ticketCreated, setTicketCreated] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const handlePhoneChange = (e) => {
    // Enforce 10 numeric digits only
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: digitsOnly });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.phone && formData.phone.length !== 10) {
      toast.error('Phone number must be exactly 10 numeric digits');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const ticketId = 'SUP-' + Math.floor(100000 + Math.random() * 900000);
      setTicketCreated({
        id: ticketId,
        category: formData.category,
        date: new Date().toLocaleDateString('en-IN')
      });
      toast.success(`Support Ticket ${ticketId} Created! We will respond within 2 hours.`);
      setFormData({ name: '', email: '', phone: '', category: 'Booking Help', subject: '', message: '' });
      setLoading(false);
    }, 600);
  };

  const faqs = [
    {
      q: 'How do I book a Darshan slot?',
      a: 'Navigate to the Temples page, select your desired temple, choose your visit date and time slot, enter your 12-digit Aadhar number, and click Confirm Booking.'
    },
    {
      q: 'Is there any fee for Darshan slot booking?',
      a: 'No, all regular Darshan slot bookings on DarshanEase are completely free of charge.'
    },
    {
      q: 'Can I cancel my booked ticket?',
      a: 'Yes! Go to "My Bookings" in your profile menu and click the "Cancel Booking" button on any active ticket.'
    },
    {
      q: 'How do I add a new temple to the system?',
      a: 'Go to the Temples page and click the "+ Add New Temple" button on top right to submit a new temple listing.'
    },
    {
      q: 'What if my Aadhar or Phone number shows an error?',
      a: 'Ensure your phone number has exactly 10 digits and your Aadhar number has exactly 12 numeric digits without spaces or special characters.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto">
        
        {/* Support Header */}
        <div className="text-center mb-12">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300">
            24/7 Devotee Helpdesk
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-3 tracking-tight">
            Support & Help Center
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions about temple timings, slot availability, or ticket bookings? We are here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Quick Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-start gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 rounded-xl">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">Toll-Free Helpline</h3>
                <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 mt-0.5">1800-123-DARSHAN</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Available 6:00 AM – 10:00 PM IST</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-start gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 rounded-xl">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">Email Support</h3>
                <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 mt-0.5">support@darshanease.com</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Response guaranteed within 2 hours</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-start gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 rounded-xl">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">Headquarters</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">Smartbridge Tech Hub</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Hyderabad, Telangana, India</p>
              </div>
            </div>

            {ticketCreated && (
              <div className="bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 p-5 rounded-2xl">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-bold mb-1">
                  <CheckCircle className="w-5 h-5" /> Ticket Submitted
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Ref ID: <span className="font-mono font-bold text-gray-900 dark:text-white">{ticketCreated.id}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Our team is processing your request for <span className="font-semibold">{ticketCreated.category}</span>.
                </p>
              </div>
            )}
          </div>

          {/* Support Ticket Submission Form */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-orange-600" /> Send Us a Support Request
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number *</label>
                    <span className="text-xs text-gray-400">{formData.phone.length}/10 digits</span>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Support Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                  >
                    <option value="Booking Help">Booking Help & Slots</option>
                    <option value="Ticket Cancellation">Ticket Cancellation</option>
                    <option value="Temple Listing">Add New Temple</option>
                    <option value="Technical Issue">Website Technical Bug</option>
                    <option value="General Feedback">General Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="Brief summary of your issue"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message Description *</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Describe your issue or request in detail..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-lg hover:shadow-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 transition-all duration-200"
              >
                {loading ? (
                  'Submitting Ticket...'
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Submit Support Request
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Interactive FAQ Section */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-orange-600" /> Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Quick answers to common queries</p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center font-semibold text-gray-900 dark:text-white hover:bg-orange-50/50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;

