import React from 'react';
import { Shield, FileText, CheckCircle, AlertCircle, Scale, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 sm:p-10">
        
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 mb-3">
            <Scale className="w-4 h-4" /> Legal Agreement
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Effective Date: July 24, 2026 • Applies to all DarshanEase users & devotees.
          </p>
        </div>

        <div className="space-y-8 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-orange-600" /> 1. Acceptance of Terms
            </h2>
            <p>
              By creating an account, accessing, or using DarshanEase, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our online Darshan slot reservation platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-600" /> 2. Devotee Identity Verification (Aadhar & Phone Rules)
            </h2>
            <p className="mb-2">
              To prevent illegal ticketing commercialization and ensure equitable access to holy shrines for all devotees:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600 dark:text-gray-400">
              <li>Devotees must provide an accurate **10-digit Indian mobile number** during registration.</li>
              <li>Every Darshan booking requires entering an authentic **12-digit Aadhar number** corresponding to the physical attendee.</li>
              <li>Devotees must carry their physical Aadhar card along with the QR Darshan Pass for security verification at temple entrance gates.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-orange-600" /> 3. Slot Availability & Free Booking Policy
            </h2>
            <p>
              All general Darshan slot bookings provided on DarshanEase are completely **free of cost**. DarshanEase does not charge any booking fees. Slots are filled on a first-come, first-served basis according to official temple board capacity limits.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" /> 4. Prohibited Conduct & Fair Usage
            </h2>
            <p className="mb-2">Users are strictly prohibited from:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600 dark:text-gray-400">
              <li>Selling, scalping, or reselling Darshan passes to third parties.</li>
              <li>Using automated bots, scripts, or fake identity credentials to hoard time slots.</li>
              <li>Creating multiple duplicate accounts using invalid 10-digit phone numbers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Lock className="w-5 h-5 text-orange-600" /> 5. Cancellation & Slot Return
            </h2>
            <p>
              Devotees who cannot attend their scheduled time slot are requested to cancel their booking at least 2 hours in advance via the "My Bookings" page so that the slot can be released for other waiting pilgrims.
            </p>
          </section>

        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-wrap justify-between items-center gap-4">
          <Link to="/privacy" className="text-sm font-semibold text-orange-600 dark:text-orange-400 hover:underline">
            Read Privacy Policy &rarr;
          </Link>
          <Link to="/cancellation-policy" className="text-sm font-semibold text-orange-600 dark:text-orange-400 hover:underline">
            Read Cancellation Policy &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Terms;
