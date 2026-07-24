const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Temple = require('./models/Temple');

// Load env vars
dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/darshanease');

const templesData = [
  {
    name: 'Tirumala Venkateswara Temple',
    location: 'Tirupati',
    state: 'Andhra Pradesh',
    description: 'A historic Hindu temple situated on the hills of Tirumala, dedicated to Lord Venkateswara, an incarnation of Vishnu.',
    image: '/images/1.jpg',
    poojaTypes: ['Suprabhatham', 'Thomala Seva', 'Archana']
  },
  {
    name: 'Kashi Vishwanath Temple',
    location: 'Varanasi',
    state: 'Uttar Pradesh',
    description: 'One of the most famous Hindu temples dedicated to Lord Shiva, located in the holy city of Varanasi.',
    image: '/images/2.jpg',    availableSlots: 200,
    poojaTypes: ['Mangala Aarti', 'Bhog Aarti', 'Rudrabhishek']
  },
  {
    name: 'Meenakshi Amman Temple',
    location: 'Madurai',
    state: 'Tamil Nadu',
    description: 'A historic Hindu temple located on the southern bank of the Vaigai River in the temple city of Madurai.',
    image: '/images/3.jpg',    availableSlots: 350,
    poojaTypes: ['Kala Santhi', 'Uchikalam', 'Sayarakshai']
  },
  {
    name: 'Jagannath Temple',
    location: 'Puri',
    state: 'Odisha',
    description: 'An important Hindu temple dedicated to Jagannath, a form of Vishnu, famous for its annual Rath Yatra.',
    image: '/images/4.jpg',    availableSlots: 400,
    poojaTypes: ['Mangal Alati', 'Mailam', 'Abakash']
  },
  {
    name: 'Somnath Temple',
    location: 'Veraval',
    state: 'Gujarat',
    description: 'First among the twelve Jyotirlinga shrines of Shiva, it is an important pilgrimage and tourist spot.',
    image: '/images/5.jpg',    availableSlots: 300,
    poojaTypes: ['Morning Aarti', 'Noon Aarti', 'Evening Aarti']
  },
  {
    name: 'Siddhivinayak Temple',
    location: 'Mumbai',
    state: 'Maharashtra',
    description: 'A Hindu temple dedicated to Lord Shri Ganesh. It is one of the richest temples in Mumbai.',
    image: '/images/6.jpg',    availableSlots: 600,
    poojaTypes: ['Kakad Aarti', 'Shree Darshan', 'Ashirwad Pooja']
  },
  {
    name: 'Badrinath Temple',
    location: 'Badrinath',
    state: 'Uttarakhand',
    description: 'A Hindu temple dedicated to Lord Vishnu which is situated in the town of Badrinath in Uttarakhand.',
    image: '/images/7.jpg',    availableSlots: 150,
    poojaTypes: ['Maha Abhishek', 'Geeta Path', 'Aarti']
  },
  {
    name: 'Golden Temple (Harmandir Sahib)',
    location: 'Amritsar',
    state: 'Punjab',
    description: 'The preeminent spiritual site of Sikhism, famous for its fully golden dome.',
    image: '/images/8.jpg',    availableSlots: 1000,
    poojaTypes: ['Prakash', 'Kirtan', 'Sukhasan']
  }
];

const seedDB = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await Temple.deleteMany();
    await Temple.insertMany(templesData);
    console.log('Successfully seeded famous Indian temples with Local images!');
    process.exit();
  } catch (error) {
    console.error('Error seeding temples:', error);
    process.exit(1);
  }
};

seedDB();
