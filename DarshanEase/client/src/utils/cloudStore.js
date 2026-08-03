import axios from 'axios';

const RENDER_BACKEND_URL = 'https://darshanease-61m4.onrender.com/api/bookings/public-sync';
const JSONBLOB_URL = 'https://jsonblob.com/api/jsonBlob/019f9a1b-fb9d-73bc-b3ee-7ce017d11ad8';

export const fetchCloudBookings = async () => {
  const mergedMap = new Map();

  // 1. Fetch from jsonblob (Cross-device public JSON store)
  try {
    const res = await fetch(JSONBLOB_URL, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        data.forEach((b) => {
          if (b && (b.ticketNumber || b._id)) {
            mergedMap.set((b.ticketNumber || b._id).toString(), b);
          }
        });
      }
    }
  } catch (e) {
    console.log('jsonblob fetch error:', e.message);
  }

  // 2. Fetch from Render backend API
  try {
    const { data } = await axios.get(RENDER_BACKEND_URL, { timeout: 5000 });
    if (Array.isArray(data)) {
      data.forEach((b) => {
        if (b && (b.ticketNumber || b._id)) {
          mergedMap.set((b.ticketNumber || b._id).toString(), b);
        }
      });
    }
  } catch (e) {}

  // 3. Local proxy
  try {
    const { data } = await axios.get('/api/bookings/public-sync', { timeout: 3000 });
    if (Array.isArray(data)) {
      data.forEach((b) => {
        if (b && (b.ticketNumber || b._id)) {
          mergedMap.set((b.ticketNumber || b._id).toString(), b);
        }
      });
    }
  } catch (e) {}

  // 4. LocalStorage
  try {
    const local = JSON.parse(localStorage.getItem('darshanease_all_bookings') || '[]');
    local.forEach((b) => {
      if (b && (b.ticketNumber || b._id)) {
        const key = (b.ticketNumber || b._id).toString();
        if (!mergedMap.has(key)) mergedMap.set(key, b);
      }
    });
  } catch (e) {}

  return Array.from(mergedMap.values());
};

export const pushCloudBooking = async (newBooking) => {
  try {
    const current = await fetchCloudBookings();
    const updated = [newBooking, ...current.filter((b) => b.ticketNumber !== newBooking.ticketNumber && b._id !== newBooking._id)];
    await fetch(JSONBLOB_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(updated),
    });
  } catch (e) {
    console.log('jsonblob push error:', e.message);
  }

  try {
    await axios.post(RENDER_BACKEND_URL, newBooking, { timeout: 5000 });
  } catch (e) {}

  try {
    await axios.post('/api/bookings/public-sync', newBooking, { timeout: 3000 });
  } catch (e) {}

  try {
    const existing = JSON.parse(localStorage.getItem('darshanease_all_bookings') || '[]');
    const filtered = existing.filter((b) => b.ticketNumber !== newBooking.ticketNumber && b._id !== newBooking._id);
    localStorage.setItem('darshanease_all_bookings', JSON.stringify([newBooking, ...filtered]));
  } catch (e) {}
};

export const updateCloudBookingStatus = async (bookingId, ticketNumber, status) => {
  try {
    const current = await fetchCloudBookings();
    const updated = current.map((b) =>
      b._id === bookingId || (ticketNumber && b.ticketNumber === ticketNumber) ? { ...b, status } : b
    );
    await fetch(JSONBLOB_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(updated),
    });
  } catch (e) {}

  const payload = { _id: bookingId, ticketNumber, status };
  try {
    await axios.post(RENDER_BACKEND_URL, payload, { timeout: 5000 });
  } catch (e) {}

  try {
    await axios.post('/api/bookings/public-sync', payload, { timeout: 3000 });
  } catch (e) {}

  try {
    const existing = JSON.parse(localStorage.getItem('darshanease_all_bookings') || '[]');
    const updated = existing.map((b) =>
      b._id === bookingId || (ticketNumber && b.ticketNumber === ticketNumber) ? { ...b, status } : b
    );
    localStorage.setItem('darshanease_all_bookings', JSON.stringify(updated));
  } catch (e) {}
};
