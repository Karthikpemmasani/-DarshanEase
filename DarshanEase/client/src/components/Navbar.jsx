import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, User as UserIcon } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setDarkMode(true);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Temples', path: '/temples' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-700">
                DarshanEase
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
                {link.name}
              </Link>
            ))}
            
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-600" />}
            </button>

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 transition-all">
                  <UserIcon className="h-4 w-4 text-orange-600" />
                  <span>{user.name}</span>
                  {user.role === 'admin' && (
                    <span className="text-[10px] uppercase font-extrabold bg-orange-600 text-white px-1.5 py-0.5 rounded">Admin</span>
                  )}
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 w-52 mt-2 py-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 font-medium">Profile</Link>
                  <Link to="/my-bookings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 font-medium">My Bookings</Link>
                  
                  {user.role === 'admin' ? (
                    <Link to="/admin" className="block px-4 py-2 text-sm font-bold text-orange-600 hover:bg-orange-50 dark:hover:bg-gray-700">
                      🛡️ Admin Dashboard
                    </Link>
                  ) : (
                    <Link to="/admin-login" className="block px-4 py-2 text-sm font-bold text-orange-600 hover:bg-orange-50 dark:hover:bg-gray-700 border-t border-gray-100 dark:border-gray-700/50 mt-1 pt-2">
                      🛡️ Admin Portal Login
                    </Link>
                  )}
                  
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 font-medium border-t border-gray-100 dark:border-gray-700/50 mt-1 pt-2">Logout</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 font-medium text-sm transition-colors">Login</Link>
                <Link to="/admin-login" className="px-3 py-1.5 rounded-lg border border-orange-500 text-orange-600 dark:text-orange-400 text-xs font-bold hover:bg-orange-50 dark:hover:bg-gray-800 transition-colors">Admin Login</Link>
                <Link to="/register" className="px-4 py-2 rounded-xl bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 transition-colors shadow-md hover:shadow-lg">Register</Link>
              </div>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={toggleDarkMode} className="p-2 mr-2 rounded-full">
              {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-600" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-gray-300">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-800">
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Profile</Link>
                <Link to="/my-bookings" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">My Bookings</Link>
                {user.role === 'admin' ? (
                  <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-bold text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-800">🛡️ Admin Dashboard</Link>
                ) : (
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-bold text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-800">🛡️ Admin Login</Link>
                )}
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50 dark:hover:bg-gray-800">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Login</Link>
                <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-bold text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-800">Admin Login</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-800">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
