import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import { MapPin, Calendar, Clock, Info, Heart, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

const TempleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [temple, setTemple] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchTemple = async () => {
      try {
        const { data } = await axios.get(`/api/temples/${id}`);
        setTemple(data);
        const favs = JSON.parse(localStorage.getItem('darshanease_favorite_temples') || '[]');
        const exists = favs.some((f) => (typeof f === 'string' ? f === data._id : f._id === data._id));
        setIsFavorite(exists);
      } catch (error) {
        toast.error('Failed to load temple details');
      } finally {
        setLoading(false);
      }
    };
    fetchTemple();
  }, [id]);

  const handleToggleFavorite = () => {
    if (!temple) return;
    try {
      const favs = JSON.parse(localStorage.getItem('darshanease_favorite_temples') || '[]');
      const exists = favs.some((f) => (typeof f === 'string' ? f === temple._id : f._id === temple._id));
      let updated = [];
      if (exists) {
        updated = favs.filter((f) => (typeof f === 'string' ? f !== temple._id : f._id !== temple._id));
        toast('Removed from Favorites', { icon: '💔' });
        setIsFavorite(false);
      } else {
        updated = [temple, ...favs];
        toast.success(`${temple.name} added to Favorites! ❤️`);
        setIsFavorite(true);
      }
      localStorage.setItem('darshanease_favorite_temples', JSON.stringify(updated));
    } catch (e) {
      toast.error('Could not update favorites');
    }
  };

  if (loading) return <Loader />;
  if (!temple) return <div className="text-center py-20 text-xl dark:text-white">Temple not found</div>;

  const handleBookNow = () => {
    if (!user) {
      toast.error('Please login to book a darshan');
      navigate('/login');
    } else {
      navigate(`/book/${id}`);
    }
  };

const getTempleImage = (temple) => {
  const name = (temple?.name || '').toLowerCase();
  
  if (name.includes('tirumala') || name.includes('venkateswara') || name.includes('tirupati')) {
    return '/images/1.jpg';
  }
  if (name.includes('kashi') || name.includes('vishwanath') || name.includes('varanasi')) {
    return '/images/2.jpg';
  }
  if (name.includes('meenakshi') || name.includes('madurai')) {
    return '/images/3.jpg';
  }
  if (name.includes('jagannath') || name.includes('puri')) {
    return '/images/4.jpg';
  }
  if (name.includes('somnath') || name.includes('veraval')) {
    return '/images/5.jpg';
  }
  if (name.includes('siddhivinayak') || name.includes('mumbai')) {
    return '/images/6.jpg';
  }
  if (name.includes('badrinath')) {
    return '/images/7.jpg';
  }
  if (name.includes('golden') || name.includes('harmandir') || name.includes('amritsar')) {
    return '/images/8.jpg';
  }

  if (temple?.image && temple.image.startsWith('/images/')) {
    return temple.image;
  }
  if (temple?.image && temple.image.startsWith('data:image')) {
    return temple.image;
  }
  return '/images/1.jpg';
};

  const displayImage = getTempleImage(temple);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="relative h-96 bg-gray-100 dark:bg-gray-700">
          <img 
            src={displayImage} 
            alt={temple.name} 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = '/images/1.jpg'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          
          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-xs font-bold text-gray-800 dark:text-white hover:scale-105 transition-all shadow-xl"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600 dark:text-gray-300'}`} />
            {isFavorite ? 'Favorited ❤️' : 'Add to Favorites'}
          </button>

          <div className="absolute bottom-0 left-0 p-8 w-full text-white">
            <span className="text-xs font-bold uppercase tracking-wider bg-orange-600/90 backdrop-blur-md px-3 py-1 rounded-full mb-3 inline-block">
              {temple.state}
            </span>
            <h1 className="text-4xl font-extrabold mb-2">{temple.name}</h1>
            <div className="flex items-center text-lg text-gray-200">
              <MapPin className="h-5 w-5 mr-2 text-orange-400" />
              {temple.location}, {temple.state}
            </div>
          </div>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Info className="h-6 w-6 mr-2 text-primary-500" /> About
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {temple.description}
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary-500" /> Available Poojas
              </h3>
              <div className="flex flex-wrap gap-2">
                {temple.poojaTypes && temple.poojaTypes.map((pooja, index) => (
                  <span key={index} className="px-3 py-1 bg-primary-100 dark:bg-gray-700 text-primary-800 dark:text-primary-300 rounded-full text-sm font-medium">
                    {pooja}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-100 dark:border-gray-600 self-start">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Booking Info</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 pb-3">
                <span className="text-gray-500 dark:text-gray-400">Available Slots</span>
                <span className="font-bold text-primary-600 dark:text-primary-400 text-lg">{temple.availableSlots}</span>
              </div>
              <div className="flex justify-between items-center pb-3">
                <span className="text-gray-500 dark:text-gray-400">Timings</span>
                <span className="font-medium text-gray-900 dark:text-white">06:00 AM - 09:00 PM</span>
              </div>
            </div>
            
            <button 
              onClick={handleBookNow}
              disabled={temple.availableSlots === 0}
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-all hover-lift"
            >
              {temple.availableSlots === 0 ? 'Slots Full' : 'Book Darshan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempleDetails;
