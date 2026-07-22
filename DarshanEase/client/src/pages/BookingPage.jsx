import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { Calendar, Clock, CreditCard } from 'lucide-react';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [temple, setTemple] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({ date: '', slot: '', name: '', aadharNumber: '' });
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

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!bookingData.date || !bookingData.slot) {
      toast.error('Please select both date and time slot');
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

      toast.success('Booking Successful!');
      // In a real app, integrate payment gateway here.
      // For now, redirect to payment success page.
      navigate('/payment-success', { state: { booking: data, temple } });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (!temple) return <div className="text-center py-20 text-xl dark:text-white">Temple not found</div>;

  // Set min date to today
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="bg-primary-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Book Darshan Slot</h2>
            <p className="text-primary-100 mt-1">{temple.name}</p>
          </div>
          
          <div className="p-8">
            <form onSubmit={handleBooking} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" /> Select Date
                  </label>
                  <input
                    type="date"
                    min={today}
                    required
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                {/* Slot Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2" /> Select Time Slot
                  </label>
                  <select
                    required
                    value={bookingData.slot}
                    onChange={(e) => setBookingData({ ...bookingData, slot: e.target.value })}
                    className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">-- Choose a slot --</option>
                    {timeSlots.map((slot, idx) => (
                      <option key={idx} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Additional Devotee Details Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={bookingData.name || ''}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Aadhar Number</label>
                  <input
                    type="text"
                    value={bookingData.aadharNumber || ''}
                    onChange={(e) => setBookingData({ ...bookingData, aadharNumber: e.target.value })}
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* User Details Preview */}
              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Devotee Details</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-semibold">Name:</span> {user.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-semibold">Phone:</span> {user.phone}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-semibold">Email:</span> {user.email}</p>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  Free Darshan Booking
                </div>
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors"
                >
                  {bookingLoading ? 'Processing...' : (
                    <>
                      Confirm Booking
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
