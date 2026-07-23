import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TempleCard from '../components/TempleCard';
import Loader from '../components/Loader';
import { Search, Filter, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';

const TempleList = () => {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    state: 'Andhra Pradesh',
    description: '',
    availableSlots: 500,
    image: '',
    poojaTypes: 'Morning Aarti, Evening Aarti, Special Darshan',
  });
  
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
  }, [stateFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTemples();
  };

  const handleAddTempleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const payload = {
        ...formData,
        availableSlots: Number(formData.availableSlots),
        image: formData.image.trim() || 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&q=80&w=800',
        poojaTypes: formData.poojaTypes.split(',').map((s) => s.trim()).filter(Boolean),
      };
      await axios.post('/api/temples', payload);
      toast.success('Temple added successfully!');
      setIsModalOpen(false);
      setFormData({
        name: '',
        location: '',
        state: 'Andhra Pradesh',
        description: '',
        availableSlots: 500,
        image: '',
        poojaTypes: 'Morning Aarti, Evening Aarti, Special Darshan',
      });
      fetchTemples();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add temple');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Explore Temples</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Discover and book darshan slots across India</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-medium px-5 py-2.5 rounded-lg shadow transition duration-200"
          >
            <Plus className="w-5 h-5" /> Add New Temple
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between border border-gray-100 dark:border-gray-700 mb-8">
          <form onSubmit={handleSearch} className="relative w-full md:w-1/2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search temples by name..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors"
            />
            <button type="submit" className="hidden">Search</button>
          </form>
          
          <div className="w-full md:w-64 flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
            >
              <option value="">All States</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : temples.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">No temples found</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400 mb-6">Click below to add the first temple to the system!</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-medium px-5 py-2.5 rounded-lg shadow"
            >
              <Plus className="w-5 h-5" /> Add Temple Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {temples.map((temple) => (
              <TempleCard key={temple._id} temple={temple} />
            ))}
          </div>
        )}
      </div>

      {/* Add Temple Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-gray-100 dark:border-gray-700">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Add New Temple</h2>
            
            <form onSubmit={handleAddTempleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Temple Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tirumala Venkateswara Temple"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location (City) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tirupati"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  >
                    {indianStates.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Enter details about the temple history and significance..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Available Daily Slots</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.availableSlots}
                    onChange={(e) => setFormData({ ...formData, availableSlots: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pooja Types (Comma separated)</label>
                <input
                  type="text"
                  placeholder="Morning Aarti, Suprabhatham, Archana"
                  value={formData.poojaTypes}
                  onChange={(e) => setFormData({ ...formData, poojaTypes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-sm bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Add Temple'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TempleList;
