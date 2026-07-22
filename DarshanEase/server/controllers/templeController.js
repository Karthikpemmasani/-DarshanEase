const Temple = require('../models/Temple');

const templesData = [
  {
    name: 'Tirumala Venkateswara Temple',
    location: 'Tirupati',
    state: 'Andhra Pradesh',
    description: 'A historic Hindu temple situated on the hills of Tirumala, dedicated to Lord Venkateswara, an incarnation of Vishnu.',
    image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&q=80&w=800',
    availableSlots: 500,
    poojaTypes: ['Suprabhatham', 'Thomala Seva', 'Archana']
  },
  {
    name: 'Kashi Vishwanath Temple',
    location: 'Varanasi',
    state: 'Uttar Pradesh',
    description: 'One of the most famous Hindu temples dedicated to Lord Shiva, located in the holy city of Varanasi.',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800',
    availableSlots: 200,
    poojaTypes: ['Mangala Aarti', 'Bhog Aarti', 'Rudrabhishek']
  },
  {
    name: 'Meenakshi Amman Temple',
    location: 'Madurai',
    state: 'Tamil Nadu',
    description: 'A historic Hindu temple located on the southern bank of the Vaigai River in the temple city of Madurai.',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&q=80&w=800',
    availableSlots: 350,
    poojaTypes: ['Kala Santhi', 'Uchikalam', 'Sayarakshai']
  },
  {
    name: 'Jagannath Temple',
    location: 'Puri',
    state: 'Odisha',
    description: 'An important Hindu temple dedicated to Jagannath, a form of Vishnu, famous for its annual Rath Yatra.',
    image: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&q=80&w=800',
    availableSlots: 400,
    poojaTypes: ['Mangal Alati', 'Mailam', 'Abakash']
  },
  {
    name: 'Somnath Temple',
    location: 'Veraval',
    state: 'Gujarat',
    description: 'First among the twelve Jyotirlinga shrines of Shiva, it is an important pilgrimage and tourist spot.',
    image: 'https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&q=80&w=800',
    availableSlots: 300,
    poojaTypes: ['Morning Aarti', 'Noon Aarti', 'Evening Aarti']
  },
  {
    name: 'Siddhivinayak Temple',
    location: 'Mumbai',
    state: 'Maharashtra',
    description: 'A Hindu temple dedicated to Lord Shri Ganesh. It is one of the richest temples in Mumbai.',
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&q=80&w=800',
    availableSlots: 600,
    poojaTypes: ['Kakad Aarti', 'Shree Darshan', 'Ashirwad Pooja']
  },
  {
    name: 'Badrinath Temple',
    location: 'Badrinath',
    state: 'Uttarakhand',
    description: 'A Hindu temple dedicated to Lord Vishnu which is situated in the town of Badrinath in Uttarakhand.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800',
    availableSlots: 150,
    poojaTypes: ['Maha Abhishek', 'Geeta Path', 'Aarti']
  },
  {
    name: 'Golden Temple (Harmandir Sahib)',
    location: 'Amritsar',
    state: 'Punjab',
    description: 'The preeminent spiritual site of Sikhism, famous for its fully golden dome.',
    image: 'https://images.unsplash.com/photo-1588096344356-9b50b55ec70d?auto=format&fit=crop&q=80&w=800',
    availableSlots: 1000,
    poojaTypes: ['Prakash', 'Kirtan', 'Sukhasan']
  }
];

// @desc    Get all temples
// @route   GET /api/temples
// @access  Public
const getTemples = async (req, res) => {
  try {
    const count = await Temple.countDocuments();
    if (count === 0) {
      await Temple.insertMany(templesData);
    }

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
      
    const state = req.query.state ? { state: req.query.state } : {};

    const temples = await Temple.find({ ...keyword, ...state });
    res.json(temples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get temple by ID
// @route   GET /api/temples/:id
// @access  Public
const getTempleById = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (temple) {
      res.json(temple);
    } else {
      res.status(404).json({ message: 'Temple not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a temple
// @route   POST /api/temples
// @access  Private/Admin
const createTemple = async (req, res) => {
  try {
    const temple = new Temple(req.body);
    const createdTemple = await temple.save();
    res.status(201).json(createdTemple);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a temple
// @route   PUT /api/temples/:id
// @access  Private/Admin
const updateTemple = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (temple) {
      Object.assign(temple, req.body);
      const updatedTemple = await temple.save();
      res.json(updatedTemple);
    } else {
      res.status(404).json({ message: 'Temple not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a temple
// @route   DELETE /api/temples/:id
// @access  Private/Admin
const deleteTemple = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (temple) {
      await temple.deleteOne();
      res.json({ message: 'Temple removed' });
    } else {
      res.status(404).json({ message: 'Temple not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTemples,
  getTempleById,
  createTemple,
  updateTemple,
  deleteTemple,
};
