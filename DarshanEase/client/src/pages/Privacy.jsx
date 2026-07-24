import React from 'react';
import { Lock, ShieldCheck, Eye, Database, Server, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 sm:p-10">
        
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 mb-3">
            <Lock className="w-4 h-4" /> Data Protection
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Last Updated: July 24, 2026 • We respect and protect your personal information.
          </p>
        </div>

        <div className="space-y-8 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-orange-600" /> 1. Information We Collect
            </h2>
            <p className="mb-2">To facilitate authentic Darshan slot reservations, DarshanEase collects minimal required information:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600 dark:text-gray-400">
              <li>**Account Details**: Full Name, Email Address, and 10-digit Phone Number.</li>
              <li>**Devotee Verification Data**: 12-digit Aadhar number provided during slot booking.</li>
              <li>**Booking History**: Selected temple, date of visit, time slot, and generated QR ticket pass.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Eye className="w-5 h-5 text-orange-600" /> 2. How We Use Your Information
            </h2>
            <p className="mb-2">Your information is used strictly for legitimate temple booking purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600 dark:text-gray-400">
              <li>To generate official QR Darshan Passes verified at temple entrance gates.</li>
              <li>To mask Aadhar numbers (showing only the last 4 digits on printed receipts) to safeguard identity privacy.</li>
              <li>To send booking confirmation SMS/email notifications and support ticket updates.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Database className="w-5 h-5 text-orange-600" /> 3. Data Protection & Security
            </h2>
            <p>
              We implement industry-standard encryption protocols (HTTPS/SSL, bcrypt password hashing, and masked ID views) to prevent unauthorized access. We **never** sell, rent, or trade devotee personal details to third-party advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Server className="w-5 h-5 text-orange-600" /> 4. Your Rights
            </h2>
            <p>
              You have full control to view your active bookings, update your 10-digit phone number and profile details, or request account deletion by contacting our Support Desk.
            </p>
          </section>

        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <Link to="/contact" className="text-sm font-semibold text-orange-600 dark:text-orange-400 hover:underline">
            Contact Privacy Officer &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Privacy;
