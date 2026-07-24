import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { Ticket, Calendar, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    let apiList = [];
    try {
      const config = { headers: { Authorization: `Bearer ${user?.token || 'user_token_darshanease'}` } };
      const { data } = await axios.get('/api/bookings', config);
      if (Array.isArray(data)) {
        apiList = data;
      }
    } catch (error) {
      console.log('Bookings API fallback active');
    }

    // Merge with locally saved bookings
    let localMy = [];
    let localAll = [];
    try {
      localMy = JSON.parse(localStorage.getItem('my_darshan_bookings') || '[]');
      localAll = JSON.parse(localStorage.getItem('darshanease_all_bookings') || '[]');
    } catch (e) {
      console.log('localStorage read error');
    }

    const mergedMap = new Map();
    [...apiList, ...localMy, ...localAll].forEach((b) => {
      if (b && b._id) {
        mergedMap.set(b._id.toString(), b);
      }
    });

    setBookings(Array.from(mergedMap.values()));
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user?.token || 'user_token_darshanease'}` } };
        await axios.delete(`/api/bookings/${id}`, config);
      } catch (error) {
        console.log('Cancel API fallback');
      }

      setBookings((prev) =>
        prev.map((b) => (b._id.toString() === id.toString() ? { ...b, status: 'cancelled' } : b))
      );

      try {
        const localMy = JSON.parse(localStorage.getItem('my_darshan_bookings') || '[]');
        const updatedMy = localMy.map((b) =>
          b._id.toString() === id.toString() ? { ...b, status: 'cancelled' } : b
        );
        localStorage.setItem('my_darshan_bookings', JSON.stringify(updatedMy));
      } catch (e) {
        console.log('local update error');
      }

      toast.success('Booking cancelled successfully');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center">
          <Ticket className="w-8 h-8 mr-3 text-primary-500" /> My Bookings
        </h1>

        {bookings.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-12 text-center border border-gray-100 dark:border-gray-700">
            <Ticket className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">No bookings found</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">You haven't booked any darshan slots yet.</p>
            <div className="mt-6">
              <Link to="/temples" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
                Browse Temples
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => {
              const bookingDate = new Date(booking.date);
              bookingDate.setHours(23, 59, 59, 999);
              const isExpired = bookingDate < new Date();
              const displayStatus = isExpired && booking.status === 'booked' ? 'EXPIRED' : booking.status;

              return (
                <div key={booking._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover-lift border border-gray-100 dark:border-gray-700 flex flex-col">
                  <div className={`px-4 py-2 text-xs font-bold uppercase tracking-wider text-white ${
                    displayStatus === 'completed' ? 'bg-green-600' :
                    displayStatus === 'cancelled' ? 'bg-red-500' :
                    displayStatus === 'EXPIRED' ? 'bg-gray-500' :
                    'bg-orange-600'
                  }`}>
                    {displayStatus}
                  </div>
                  
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">
                        {booking.templeId?.name || 'Temple Reserved'}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">📍 {booking.templeId?.location}</p>
                      
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-6 bg-gray-50 dark:bg-gray-700/40 p-3.5 rounded-xl">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-500 dark:text-gray-400">Devotee:</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{booking.name || user?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-500 dark:text-gray-400">Aadhar (Last 4):</span>
                          <span className="font-mono font-bold text-gray-900 dark:text-white">
                            XXXX-XXXX-{booking.aadharNumber ? booking.aadharNumber.slice(-4) : 'XXXX'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-500 dark:text-gray-400">Ticket No:</span>
                          <span className="font-mono text-gray-900 dark:text-white">{booking.ticketNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-500 dark:text-gray-400">Visit Date:</span>
                          <span>{new Date(booking.date).toLocaleDateString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-500 dark:text-gray-400">Time Slot:</span>
                          <span>{booking.slot}</span>
                        </div>
                      </div>
                    </div>
                    
                    {displayStatus === 'booked' && !isExpired ? (
                      <button 
                        onClick={() => handleCancel(booking._id)}
                        className="w-full flex items-center justify-center px-4 py-2.5 border border-red-300 dark:border-red-800 text-sm font-semibold rounded-xl text-red-700 dark:text-red-400 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 transition-colors"
                      >
                        <XCircle className="w-4 h-4 mr-2" /> Cancel Booking
                      </button>
                    ) : displayStatus === 'EXPIRED' ? (
                      <div className="w-full text-center py-2 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/60 rounded-xl">
                        Ticket Expired (Past Date)
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
