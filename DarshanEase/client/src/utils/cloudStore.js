import axios from 'axios';

const CLOUD_BLOB_URL = 'https://jsonblob.com/api/jsonBlob/019f9a0c-1e9f-731f-ba69-05be463f320c';

export const fetchCloudBookings = async () => {
  try {
    const { data } = await axios.get(CLOUD_BLOB_URL, { timeout: 5000 });
    if (Array.isArray(data)) {
      return data;
    }
  } catch (error) {
    console.log('Cloud sync fetch error:', error.message);
  }
  return [];
};

export const pushCloudBooking = async (newBooking) => {
  try {
    const currentBookings = await fetchCloudBookings();
    
    const exists = currentBookings.some(
      (b) => (b._id && b._id === newBooking._id) || (b.ticketNumber && b.ticketNumber === newBooking.ticketNumber)
    );

    let updatedList = [];
    if (exists) {
      updatedList = currentBookings.map((b) =>
        (b._id && b._id === newBooking._id) || (b.ticketNumber && b.ticketNumber === newBooking.ticketNumber)
          ? { ...b, ...newBooking }
          : b
      );
    } else {
      updatedList = [newBooking, ...currentBookings];
    }

    await axios.put(CLOUD_BLOB_URL, updatedList, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
    });

    return updatedList;
  } catch (error) {
    console.log('Cloud sync push error:', error.message);
    return [];
  }
};

export const updateCloudBookingStatus = async (bookingId, ticketNumber, status) => {
  try {
    const currentBookings = await fetchCloudBookings();
    const updatedList = currentBookings.map((b) => {
      if ((bookingId && b._id === bookingId) || (ticketNumber && b.ticketNumber === ticketNumber)) {
        return { ...b, status };
      }
      return b;
    });

    await axios.put(CLOUD_BLOB_URL, updatedList, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
    });
    return updatedList;
  } catch (error) {
    console.log('Cloud sync status update error:', error.message);
    return [];
  }
};
