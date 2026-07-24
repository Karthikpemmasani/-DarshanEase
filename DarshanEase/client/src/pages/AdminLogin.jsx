import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { ShieldCheck, Lock, Key, UserCheck, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [securityPin, setSecurityPin] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { loginAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await loginAdmin(adminId, password, securityPin);
    setLoading(false);

    if (result.success) {
      toast.success('Admin Authentication Verified! Welcome to Dashboard.');
      navigate('/admin');
    } else {
      toast.error(result.message || 'Invalid Admin Credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-orange-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-white transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-orange-600 to-amber-500 shadow-2xl mb-4 border-2 border-white/20">
          <ShieldCheck className="w-9 h-9 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight">
          Admin Portal Authentication
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Restricted access for temple board administrators
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800/80 backdrop-blur-md py-8 px-6 shadow-2xl rounded-3xl sm:px-10 border border-gray-700 space-y-6">
          
          <form className="space-y-5" onSubmit={handleAdminSubmit}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                Admin User ID / Email *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-orange-400">
                  <UserCheck className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Enter Admin ID (e.g. ADMIN-DARSHAN-2026)"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 rounded-xl bg-gray-900/90 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                Admin Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-orange-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="Enter Admin Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 rounded-xl bg-gray-900/90 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                Security Access PIN *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-orange-400">
                  <Key className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  maxLength={4}
                  placeholder="Enter 4-digit Security PIN"
                  value={securityPin}
                  onChange={(e) => setSecurityPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="block w-full pl-11 pr-4 py-3 rounded-xl bg-gray-900/90 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm font-mono tracking-widest"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-white font-bold bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-xl hover:shadow-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 transition-all duration-200"
            >
              {loading ? (
                'Authenticating Admin...'
              ) : (
                <>
                  Verify & Access Dashboard <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-gray-700 text-center">
            <Link to="/login" className="text-xs text-gray-400 hover:text-orange-400 transition-colors">
              &larr; Return to Regular Devotee Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
