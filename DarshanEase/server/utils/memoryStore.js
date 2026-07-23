const bcrypt = require('bcryptjs');

const initialTemples = [
  {
    _id: '64f1a0000000000000000001',
    name: 'Tirumala Venkateswara Temple',
    location: 'Tirupati',
    state: 'Andhra Pradesh',
    description: 'A historic Hindu temple situated on the hills of Tirumala, dedicated to Lord Venkateswara, an incarnation of Vishnu.',
    image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&q=80&w=800',
    availableSlots: 500,
    poojaTypes: ['Suprabhatham', 'Thomala Seva', 'Archana'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '64f1a0000000000000000002',
    name: 'Kashi Vishwanath Temple',
    location: 'Varanasi',
    state: 'Uttar Pradesh',
    description: 'One of the most famous Hindu temples dedicated to Lord Shiva, located in the holy city of Varanasi.',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800',
    availableSlots: 200,
    poojaTypes: ['Mangala Aarti', 'Bhog Aarti', 'Rudrabhishek'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '64f1a0000000000000000003',
    name: 'Meenakshi Amman Temple',
    location: 'Madurai',
    state: 'Tamil Nadu',
    description: 'A historic Hindu temple located on the southern bank of the Vaigai River in the temple city of Madurai.',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&q=80&w=800',
    availableSlots: 350,
    poojaTypes: ['Kala Santhi', 'Uchikalam', 'Sayarakshai'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '64f1a0000000000000000004',
    name: 'Jagannath Temple',
    location: 'Puri',
    state: 'Odisha',
    description: 'An important Hindu temple dedicated to Jagannath, a form of Vishnu, famous for its annual Rath Yatra.',
    image: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&q=80&w=800',
    availableSlots: 400,
    poojaTypes: ['Mangal Alati', 'Mailam', 'Abakash'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '64f1a0000000000000000005',
    name: 'Somnath Temple',
    location: 'Veraval',
    state: 'Gujarat',
    description: 'First among the twelve Jyotirlinga shrines of Shiva, it is an important pilgrimage and tourist spot.',
    image: 'https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&q=80&w=800',
    availableSlots: 300,
    poojaTypes: ['Morning Aarti', 'Noon Aarti', 'Evening Aarti'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '64f1a0000000000000000006',
    name: 'Siddhivinayak Temple',
    location: 'Mumbai',
    state: 'Maharashtra',
    description: 'A Hindu temple dedicated to Lord Shri Ganesh. It is one of the richest temples in Mumbai.',
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&q=80&w=800',
    availableSlots: 600,
    poojaTypes: ['Kakad Aarti', 'Shree Darshan', 'Ashirwad Pooja'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '64f1a0000000000000000007',
    name: 'Badrinath Temple',
    location: 'Badrinath',
    state: 'Uttarakhand',
    description: 'A Hindu temple dedicated to Lord Vishnu which is situated in the town of Badrinath in Uttarakhand.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800',
    availableSlots: 150,
    poojaTypes: ['Maha Abhishek', 'Geeta Path', 'Aarti'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '64f1a0000000000000000008',
    name: 'Golden Temple (Harmandir Sahib)',
    location: 'Amritsar',
    state: 'Punjab',
    description: 'The preeminent spiritual site of Sikhism, famous for its fully golden dome.',
    image: 'https://images.unsplash.com/photo-1588096344356-9b50b55ec70d?auto=format&fit=crop&q=80&w=800',
    availableSlots: 1000,
    poojaTypes: ['Prakash', 'Kirtan', 'Sukhasan'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

class MemoryStore {
  constructor() {
    this.temples = [...initialTemples];
    this.users = [];
    this.bookings = [];
  }

  // Temples
  getTemples(keyword, state) {
    let result = [...this.temples];
    if (keyword) {
      const lowerKey = keyword.toLowerCase();
      result = result.filter(t => t.name.toLowerCase().includes(lowerKey));
    }
    if (state) {
      result = result.filter(t => t.state === state);
    }
    return result;
  }

  getTempleById(id) {
    return this.temples.find(t => t._id.toString() === id.toString()) || null;
  }

  createTemple(data) {
    const newTemple = {
      _id: 'tmp_' + Date.now() + Math.random().toString(36).substring(2, 6),
      name: data.name,
      location: data.location,
      state: data.state,
      description: data.description,
      image: data.image || 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&q=80&w=800',
      availableSlots: Number(data.availableSlots) || 500,
      poojaTypes: Array.isArray(data.poojaTypes) ? data.poojaTypes : ['Morning Aarti', 'Evening Aarti'],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.temples.unshift(newTemple);
    return newTemple;
  }

  updateTemple(id, data) {
    const index = this.temples.findIndex(t => t._id.toString() === id.toString());
    if (index !== -1) {
      this.temples[index] = { ...this.temples[index], ...data, updatedAt: new Date() };
      return this.temples[index];
    }
    return null;
  }

  deleteTemple(id) {
    const index = this.temples.findIndex(t => t._id.toString() === id.toString());
    if (index !== -1) {
      this.temples.splice(index, 1);
      return true;
    }
    return false;
  }

  // Users
  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    const u = this.users.find(user => user._id.toString() === id.toString());
    if (u) {
      const { password, ...userWithoutPassword } = u;
      return userWithoutPassword;
    }
    return null;
  }

  async createUser({ name, email, password, phone, role = 'user' }) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      _id: 'usr_' + Date.now() + Math.random().toString(36).substring(2, 6),
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async comparePassword(candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  // Bookings
  createBooking({ userId, templeId, date, slot, name, aadharNumber }) {
    const ticketNumber = 'TKT-' + Math.random().toString(36).substring(2, 11).toUpperCase();
    const temple = this.getTempleById(templeId);
    
    if (temple && temple.availableSlots > 0) {
      temple.availableSlots -= 1;
    }

    const newBooking = {
      _id: 'bkg_' + Date.now() + Math.random().toString(36).substring(2, 6),
      userId,
      templeId: temple || { _id: templeId, name: 'Temple', location: 'India' },
      date: new Date(date),
      slot,
      name,
      aadharNumber,
      ticketNumber,
      status: 'booked',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.bookings.unshift(newBooking);
    return newBooking;
  }

  getUserBookings(userId) {
    return this.bookings.filter(b => (b.userId._id || b.userId).toString() === userId.toString());
  }

  getAllBookings() {
    return this.bookings;
  }

  cancelBooking(id, userId, userRole) {
    const booking = this.bookings.find(b => b._id.toString() === id.toString());
    if (booking) {
      const ownerId = (booking.userId._id || booking.userId).toString();
      if (ownerId !== userId.toString() && userRole !== 'admin') {
        return { error: 'Not authorized' };
      }
      booking.status = 'cancelled';
      const temple = this.getTempleById(booking.templeId._id || booking.templeId);
      if (temple) {
        temple.availableSlots += 1;
      }
      return { success: true };
    }
    return { error: 'Booking not found' };
  }
}

const memoryStore = new MemoryStore();
module.exports = memoryStore;
