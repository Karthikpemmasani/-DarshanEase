import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const TempleCard = ({ temple, onFavoriteToggle }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('darshanease_favorite_temples') || '[]');
      const exists = favs.some((f) => (typeof f === 'string' ? f === temple._id : f._id === temple._id));
      setIsFavorite(exists);
    } catch (e) {
      console.log('Error reading favorites');
    }
  }, [temple._id]);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
      if (onFavoriteToggle) onFavoriteToggle();
    } catch (err) {
      toast.error('Could not update favorites');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700/60 group">
      
      {/* Temple Banner Image */}
      <div className="relative h-52 overflow-hidden">
        <img 
          src={temple.image || 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&q=80&w=800'} 
          alt={temple.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&q=80&w=800'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* Favorite Heart Toggle */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-gray-700 dark:text-gray-200 hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg"
          title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        >
          <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600 dark:text-gray-300'}`} />
        </button>

        {/* Floating Available Slots Badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          {temple.availableSlots} Slots left
        </div>

        {/* Temple Location Banner overlay */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <span className="text-xs font-semibold uppercase tracking-wider bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-md inline-block mb-1">
            {temple.state || 'India'}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-1.5 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
            {temple.name}
          </h3>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">
            <MapPin className="h-4 w-4 mr-1 text-orange-500 flex-shrink-0" />
            <span className="truncate">{temple.location}, {temple.state}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-xs line-clamp-2 leading-relaxed mb-4">
            {temple.description}
          </p>
        </div>

        <Link 
          to={`/temples/${temple._id}`} 
          className="w-full text-center bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-2.5 rounded-2xl shadow-md hover:shadow-orange-500/25 transition-all text-xs tracking-wide uppercase"
        >
          View Temple & Book Slot
        </Link>
      </div>
    </div>
  );
};

export default TempleCard;
