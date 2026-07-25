import axios from 'axios';

const RENDER_BACKEND_URL = 'https://darshanease-6lm4.onrender.com/api/bookings/public-sync';

export const fetchCloudBookings = async () => {
  let list = [];
  try {
    const { data } = await axios.get('/api/bookings/public-sync', { timeout: 4000 });
    if (Array.isArray(data) && data.length > 0) return data;
  } catch (e) {}

  try {
    const { data } = await axios.get(RENDER_BACKEND_URL, { timeout: 6000 });
    if (Array.isArray(data) && data.length > 0) return data;
  } catch (e) {}

  try {
    list = JSON.parse(localStorage.getItem('darshanease_all_bookings') || '[]');
  } catch (e) {}

  return list;
};

export const pushCloudBooking = async (newBooking) => {
  try {
    await axios.post('/api/bookings/public-sync', newBooking, { timeout: 4000 });
  } catch (e) {}

  try {
    await axios.post(RENDER_BACKEND_URL, newBooking, { timeout: 6000 });
  } catch (e) {}

  try {
    const existing = JSON.parse(localStorage.getItem('darshanease_all_bookings') || '[]');
    const filtered = existing.filter((b) => b.ticketNumber !== newBooking.ticketNumber && b._id !== newBooking._id);
    localStorage.setItem('darshanease_all_bookings', JSON.stringify([newBooking, ...filtered]));
  } catch (e) {}
};

export const updateCloudBookingStatus = async (bookingId, ticketNumber, status) => {
  const payload = { _id: bookingId, ticketNumber, status };
  try {
    await axios.post('/api/bookings/public-sync', payload, { timeout: 4000 });
  } catch (e) {}

  try {
    await axios.post(RENDER_BACKEND_URL, payload, { timeout: 6000 });
  } catch (e) {}

  try {
    const existing = JSON.parse(localStorage.getItem('darshanease_all_bookings') || '[]');
    const updated = existing.map((b) =>
      b._id === bookingId || b.ticketNumber === ticketNumber ? { ...b, status } : b
    );
    localStorage.setItem('darshanease_all_bookings', JSON.stringify(updated));
  } catch (e) {}
};
