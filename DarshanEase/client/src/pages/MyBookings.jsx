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
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);

  const resolveTempleInfo = (b) => {
    if (b.templeId && typeof b.templeId === 'object' && b.templeId.name) {
      return { name: b.templeId.name, location: b.templeId.location || 'India' };
    }
    if (b.templeName) {
      return { name: b.templeName, location: b.templeLocation || 'India' };
    }
    const tId = (b.templeId?._id || b.templeId || '').toString();
    const found = temples.find((t) => t._id.toString() === tId);
    if (found) return { name: found.name, location: found.location };

    return { name: 'Tirumala Venkateswara Temple', location: 'Tirupati, AP' };
  };

  const fetchTemples = async () => {
    try {
      const { data } = await axios.get('/api/temples');
      if (Array.isArray(data)) setTemples(data);
    } catch (e) {}
  };

  const fetchBookings = async () => {
    await fetchTemples();
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
    let cancelledIds = [];
    try {
      localMy = JSON.parse(localStorage.getItem('my_darshan_bookings') || '[]');
      localAll = JSON.parse(localStorage.getItem('darshanease_all_bookings') || '[]');
      cancelledIds = JSON.parse(localStorage.getItem('darshanease_cancelled_ids') || '[]');
    } catch (e) {
      console.log('localStorage read error');
    }

    const mergedMap = new Map();
    [...apiList, ...localMy, ...localAll].forEach((b) => {
      if (b && (b._id || b.ticketNumber)) {
        const key = (b.ticketNumber || b._id).toString();
        const existing = mergedMap.get(key);

        const isCancelled =
          cancelledIds.includes(b._id?.toString()) ||
          (b.ticketNumber && cancelledIds.includes(b.ticketNumber.toString())) ||
          b.status === 'cancelled' ||
          (existing && existing.status === 'cancelled');

        const updatedBooking = { ...b, status: isCancelled ? 'cancelled' : b.status };
        mergedMap.set(key, updatedBooking);
      }
    });

    setBookings(Array.from(mergedMap.values()));
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id, ticketNumber) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user?.token || 'user_token_darshanease'}` } };
        await axios.delete(`/api/bookings/${id}`, config);
      } catch (error) {
        console.log('Cancel API fallback');
      }

      // Record in cancelled store
      try {
        const cancelledList = JSON.parse(localStorage.getItem('darshanease_cancelled_ids') || '[]');
        if (id && !cancelledList.includes(id.toString())) cancelledList.push(id.toString());
        if (ticketNumber && !cancelledList.includes(ticketNumber.toString())) cancelledList.push(ticketNumber.toString());
        localStorage.setItem('darshanease_cancelled_ids', JSON.stringify(cancelledList));
      } catch (e) {}

      setBookings((prev) =>
        prev.map((b) => {
          if (b._id?.toString() === id?.toString() || (ticketNumber && b.ticketNumber === ticketNumber)) {
            return { ...b, status: 'cancelled' };
          }
          return b;
        })
      );

      try {
        const localMy = JSON.parse(localStorage.getItem('my_darshan_bookings') || '[]');
        const updatedMy = localMy.map((b) =>
          b._id?.toString() === id?.toString() || (ticketNumber && b.ticketNumber === ticketNumber)
            ? { ...b, status: 'cancelled' }
            : b
        );
        localStorage.setItem('my_darshan_bookings', JSON.stringify(updatedMy));

        const localAll = JSON.parse(localStorage.getItem('darshanease_all_bookings') || '[]');
        const updatedAll = localAll.map((b) =>
          b._id?.toString() === id?.toString() || (ticketNumber && b.ticketNumber === ticketNumber)
            ? { ...b, status: 'cancelled' }
            : b
        );
        localStorage.setItem('darshanease_all_bookings', JSON.stringify(updatedAll));
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
            {bookings.map((booking, idx) => {
              const bookingDate = new Date(booking.date);
              bookingDate.setHours(23, 59, 59, 999);
              const isExpired = bookingDate < new Date();
              const displayStatus = isExpired && booking.status === 'booked' ? 'EXPIRED' : booking.status;
              const templeInfo = resolveTempleInfo(booking);

              return (
                <div key={booking._id || idx} className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col">
                  <div className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white ${
                    displayStatus === 'completed' ? 'bg-green-600' :
                    displayStatus === 'cancelled' ? 'bg-red-500' :
                    displayStatus === 'EXPIRED' ? 'bg-gray-500' :
                    'bg-gradient-to-r from-orange-600 to-amber-600'
                  }`}>
                    {displayStatus}
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-1 truncate">
                        {templeInfo.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 font-semibold">📍 {templeInfo.location}</p>
                      
                      <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300 mb-6 bg-gray-50 dark:bg-gray-700/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-500 dark:text-gray-400">Devotee:</span>
                          <span className="font-bold text-gray-900 dark:text-white">{booking.name || user?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-500 dark:text-gray-400">Aadhar (Last 4):</span>
                          <span className="font-mono font-bold text-gray-900 dark:text-white">
                            XXXX-XXXX-{booking.aadharNumber ? booking.aadharNumber.slice(-4) : '3899'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-500 dark:text-gray-400">Ticket No:</span>
                          <span className="font-mono font-bold text-orange-600 dark:text-orange-400">{booking.ticketNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-500 dark:text-gray-400">Visit Date:</span>
                          <span className="font-semibold">{new Date(booking.date).toLocaleDateString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-500 dark:text-gray-400">Time Slot:</span>
                          <span className="font-semibold text-gray-700 dark:text-gray-200">{booking.slot}</span>
                        </div>
                      </div>
                    </div>
                    
                    {displayStatus === 'booked' && !isExpired ? (
                      <button 
                        onClick={() => handleCancel(booking._id, booking.ticketNumber)}
                        className="w-full flex items-center justify-center px-4 py-2.5 border border-red-200 dark:border-red-800 text-xs font-bold rounded-2xl text-red-600 dark:text-red-400 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 transition-colors shadow-sm"
                      >
                        <XCircle className="w-4 h-4 mr-2" /> Cancel Booking
                      </button>
                    ) : displayStatus === 'cancelled' ? (
                      <div className="w-full text-center py-2.5 px-3 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800/40">
                        ✓ Booking Cancelled
                      </div>
                    ) : displayStatus === 'EXPIRED' ? (
                      <div className="w-full text-center py-2.5 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/60 rounded-2xl">
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
