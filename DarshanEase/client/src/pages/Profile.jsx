import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Phone, Shield } from 'lucide-react';
import axios from 'axios';
import Loader from '../components/Loader';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('/api/auth/profile', config);
        setProfileData(data);
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="bg-gradient-to-r from-primary-500 to-primary-700 px-8 py-10 text-center">
            <div className="h-24 w-24 rounded-full bg-white text-primary-600 mx-auto flex items-center justify-center text-4xl font-bold shadow-inner">
              {profileData?.name?.charAt(0).toUpperCase()}
            </div>
            <h2 className="mt-4 text-2xl font-bold text-white">{profileData?.name}</h2>
            <p className="text-primary-100 flex items-center justify-center mt-1">
              {profileData?.role === 'admin' ? (
                <span className="flex items-center"><Shield className="w-4 h-4 mr-1"/> Admin</span>
              ) : 'Devotee'}
            </p>
          </div>
          
          <div className="px-8 py-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Account Information</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <User className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</p>
                  <p className="text-lg text-gray-900 dark:text-white">{profileData?.name}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</p>
                  <p className="text-lg text-gray-900 dark:text-white">{profileData?.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</p>
                  <p className="text-lg text-gray-900 dark:text-white">{profileData?.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium mr-4">
                Edit Profile
              </button>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
