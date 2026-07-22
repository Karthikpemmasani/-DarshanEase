import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const TempleCard = ({ temple }) => {
  // Use a fallback image if temple.image is missing or broken. Since this is just code, we assume temple.image works.
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover-lift flex flex-col h-full border border-gray-100 dark:border-gray-700">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={temple.image || 'https://via.placeholder.com/400x300?text=Temple'} 
          alt={temple.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur px-2 py-1 rounded text-xs font-semibold text-primary-600">
          {temple.availableSlots} Slots left
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{temple.name}</h3>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate">{temple.location}, {temple.state}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4 flex-grow">
          {temple.description}
        </p>
        <Link 
          to={`/temples/${temple._id}`} 
          className="mt-auto block w-full text-center bg-primary-50 dark:bg-gray-700 text-primary-600 dark:text-primary-400 py-2 rounded-lg font-medium hover:bg-primary-600 hover:text-white dark:hover:bg-primary-500 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default TempleCard;
