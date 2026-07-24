import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { Calendar, Clock, CreditCard, User, Fingerprint, ShieldCheck, ArrowRight } from 'lucide-react';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [temple, setTemple] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    date: '',
    slot: '',
    name: user?.name || '',
    aadharNumber: '',
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  const timeSlots = [
    '06:00 AM - 08:00 AM',
    '08:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM',
    '06:00 PM - 08:00 PM'
  ];

  useEffect(() => {
    const fetchTemple = async () => {
      try {
        const { data } = await axios.get(`/api/temples/${id}`);
        setTemple(data);
      } catch (error) {
        toast.error('Failed to load temple details');
      } finally {
        setLoading(false);
      }
    };
    fetchTemple();
  }, [id]);

  const handleAadharChange = (e) => {
    // Restrict strictly to digits and maximum 12 numbers
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 12);
    setBookingData({ ...bookingData, aadharNumber: digitsOnly });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!bookingData.date || !bookingData.slot) {
      toast.error('Please select both a date and time slot');
      return;
    }

    if (!bookingData.name.trim()) {
      toast.error('Please enter the devotee full name');
      return;
    }

    if (bookingData.aadharNumber.length !== 12) {
      toast.error('Aadhar number must be exactly 12 numeric digits');
      return;
    }

    try {
      setBookingLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      
      const { data } = await axios.post('/api/bookings', {
        templeId: id,
        date: bookingData.date,
        slot: bookingData.slot,
        name: bookingData.name,
        aadharNumber: bookingData.aadharNumber
      }, config);

      toast.success('Darshan Slot Booked Successfully!');
      navigate('/payment-success', { state: { booking: data, temple } });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (!temple) return <div className="text-center py-20 text-xl font-medium dark:text-white">Temple not found</div>;

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 p-8 text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                  Darshan Booking
                </span>
                <h2 className="text-3xl font-extrabold">{temple.name}</h2>
                <p className="text-orange-100 text-sm mt-1 flex items-center">
                  📍 {temple.location}, {temple.state} • {temple.availableSlots} Slots Available
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <form onSubmit={handleBooking} className="space-y-8">
              
              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-orange-600 dark:text-orange-400" /> Select Visit Date *
                  </label>
                  <input
                    type="date"
                    min={today}
                    required
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    className="block w-full border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" /> Choose Time Slot *
                  </label>
                  <select
                    required
                    value={bookingData.slot}
                    onChange={(e) => setBookingData({ ...bookingData, slot: e.target.value })}
                    className="block w-full border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">-- Select Darshan Time --</option>
                    {timeSlots.map((slot, idx) => (
                      <option key={idx} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Devotee Identification Details */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-orange-600" /> Devotee Verification Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Devotee Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={bookingData.name}
                        onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                        required
                        placeholder="Name as per Aadhar Card"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Aadhar Card Number *
                      </label>
                      <span className={`text-xs font-semibold ${bookingData.aadharNumber.length === 12 ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
                        {bookingData.aadharNumber.length}/12 digits
                      </span>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Fingerprint className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        maxLength={12}
                        value={bookingData.aadharNumber}
                        onChange={handleAadharChange}
                        required
                        placeholder="Enter 12-digit Aadhar number"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm tracking-wider"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Must be exactly 12 numeric numbers</p>
                  </div>
                </div>
              </div>

              {/* Devotee Summary Card */}
              <div className="bg-orange-50/50 dark:bg-gray-700/40 p-5 rounded-2xl border border-orange-100 dark:border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-orange-800 dark:text-orange-300 uppercase tracking-wider mb-1">Registered Account</h4>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name} ({user.phone})</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
                <div className="text-left md:text-right">
                  <span className="text-xs font-semibold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                    Free Entry Darshan
                  </span>
                </div>
              </div>

              {/* Submission CTA */}
              <div className="pt-4 flex items-center justify-end border-t border-gray-200 dark:border-gray-700">
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-lg hover:shadow-orange-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 transition-all duration-200"
                >
                  {bookingLoading ? 'Processing Booking...' : (
                    <>
                      Confirm & Generate Ticket <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

