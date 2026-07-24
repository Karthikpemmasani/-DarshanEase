import React from 'react';
import { RefreshCw, CalendarX, CheckCircle, Clock, ShieldAlert, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CancellationPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 sm:p-10">
        
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 mb-3">
            <RefreshCw className="w-4 h-4" /> Ticket Cancellation & Slot Release
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Cancellation Policy
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Understanding how slot cancellations and automatic slot releases work on DarshanEase.
          </p>
        </div>

        <div className="space-y-8 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" /> 1. Free & Instant Cancellation
            </h2>
            <p>
              We understand plans can change! You can cancel any booked Darshan slot **free of charge** up to **2 hours prior** to your scheduled Darshan time slot.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-orange-600" /> 2. Automatic Slot Release to Public Pool
            </h2>
            <p>
              When you click **Cancel Booking** in your "My Bookings" menu, the system immediately invalidates the ticket pass and returns +1 available slot back to the temple’s public booking pool so that fellow devotees can reserve it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <CalendarX className="w-5 h-5 text-orange-600" /> 3. Step-by-Step Cancellation Guide
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Log in to your DarshanEase account.</li>
              <li>Click your user profile avatar in the navigation bar and select **My Bookings**.</li>
              <li>Locate the ticket pass you wish to release.</li>
              <li>Click the red **Cancel Booking** button and confirm your action.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-orange-600" /> 4. No-Show & Expired Pass Rules
            </h2>
            <p>
              If a devotee does not arrive within their allocated 2-hour time window, the ticket pass automatically expires. Expired passes cannot be re-used or rescheduled.
            </p>
          </section>

        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <Link to="/my-bookings" className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 dark:text-orange-400 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Go to My Bookings
          </Link>
          <Link to="/faq" className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:underline">
            Have Questions? View FAQs &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CancellationPolicy;
