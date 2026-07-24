import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { LogIn, Shield, Sparkles } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    
    if (result.success) {
      toast.success('Logged in successfully');
      navigate('/');
    } else {
      toast.error(result.message);
    }
  };

  const fillAdminCredentials = () => {
    setEmail('admin@darshanease.com');
    setPassword('admin123');
    toast.success('Admin credentials loaded!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-gray-50 to-orange-100/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-600 text-white shadow-lg mb-4">
          <Sparkles className="w-7 h-7" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Sign in to DarshanEase
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Or <Link to="/register" className="font-semibold text-orange-600 hover:text-orange-500 dark:text-orange-400 transition-colors">create a new account</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border border-gray-100 dark:border-gray-700 backdrop-blur-sm space-y-6">
          
          {/* Admin Demo Credentials Box */}
          <div className="bg-orange-50 dark:bg-gray-700/50 border border-orange-200 dark:border-gray-600 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> Admin Account Credentials
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 font-mono mt-0.5">
                admin@darshanease.com | admin123
              </p>
            </div>
            <button
              type="button"
              onClick={fillAdminCredentials}
              className="text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 px-3 py-1.5 rounded-lg shadow transition-colors"
            >
              Fill Admin
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-semibold bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-lg hover:shadow-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 transition-all duration-200"
            >
              {loading ? 'Signing in...' : (
                <>
                  <LogIn className="w-5 h-5" /> Sign In
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

