import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TempleCard from '../components/TempleCard';
import Loader from '../components/Loader';
import { Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const TempleList = () => {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const fetchTemples = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/temples?keyword=${keyword}&state=${stateFilter}`);
      setTemples(data);
    } catch (error) {
      toast.error('Failed to load temples');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemples();
  }, [stateFilter]); // Refetch when state filter changes

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTemples();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Explore Temples</h1>
          
          {/* Search and Filter Section */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between border border-gray-100 dark:border-gray-700">
            <form onSubmit={handleSearch} className="relative w-full md:w-1/2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search temples by name..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors"
              />
              <button type="submit" className="hidden">Search</button>
            </form>
            
            <div className="w-full md:w-64 flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
              >
                <option value="">All States</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : temples.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">No temples found</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {temples.map((temple) => (
              <TempleCard key={temple._id} temple={temple} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TempleList;
