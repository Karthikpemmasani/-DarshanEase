import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Phone, Shield, Edit, Save, X, CheckCircle } from 'lucide-react';
import axios from 'axios';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', phone: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('/api/auth/profile', config);
        setProfileData(data);
        setEditForm({ name: data.name || '', phone: data.phone || '' });
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handlePhoneChange = (e) => {
    // Restrict strictly to 10 digits
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setEditForm({ ...editForm, phone: digitsOnly });
  };

  const handleSave = () => {
    if (editForm.phone.length !== 10) {
      toast.error('Phone number must be exactly 10 numeric digits');
      return;
    }
    setProfileData({ ...profileData, name: editForm.name, phone: editForm.phone });
    setIsEditing(false);
    toast.success('Profile details updated successfully!');
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700">
          
          {/* Cover Header */}
          <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 px-8 py-10 text-center relative">
            <div className="h-24 w-24 rounded-full bg-white text-orange-600 mx-auto flex items-center justify-center text-4xl font-extrabold shadow-2xl border-4 border-white/40">
              {profileData?.name?.charAt(0).toUpperCase()}
            </div>
            <h2 className="mt-4 text-3xl font-extrabold text-white">{profileData?.name}</h2>
            <p className="text-orange-100 flex items-center justify-center mt-1 text-sm">
              {profileData?.role === 'admin' ? (
                <span className="flex items-center bg-white/20 px-3 py-1 rounded-full"><Shield className="w-4 h-4 mr-1"/> Administrator</span>
              ) : (
                <span className="bg-white/20 px-3 py-1 rounded-full">Devotee Account</span>
              )}
            </p>
          </div>
          
          <div className="px-8 py-8">
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Account Information</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400"
                >
                  <Edit className="w-4 h-4" /> Edit Details
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center gap-1 text-xs font-semibold bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700"
                  >
                    <Save className="w-3.5 h-3.5" /> Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="inline-flex items-center gap-1 text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded-lg"
                  >
                    <X className="w-3.5 h-3.5" /> Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              
              {/* Name */}
              <div className="flex items-center">
                <div className="flex-shrink-0 h-11 w-11 bg-orange-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <User className="h-5 w-5" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Full Name</p>
                  {!isEditing ? (
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{profileData?.name}</p>
                  ) : (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                    />
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center">
                <div className="flex-shrink-0 h-11 w-11 bg-orange-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Email Address</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{profileData?.email}</p>
                </div>
              </div>

              {/* Phone (10 digits restricted) */}
              <div className="flex items-center">
                <div className="flex-shrink-0 h-11 w-11 bg-orange-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Phone Number (10 digits)</p>
                    {isEditing && (
                      <span className="text-xs text-gray-400 font-medium">{editForm.phone.length}/10 digits</span>
                    )}
                  </div>
                  {!isEditing ? (
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{profileData?.phone}</p>
                  ) : (
                    <input
                      type="text"
                      maxLength={10}
                      value={editForm.phone}
                      onChange={handlePhoneChange}
                      placeholder="10-digit mobile number"
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                    />
                  )}
                </div>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" /> Account Active & Verified
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

