import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // 100% Client-side Admin Login Fallback
    if (email.toLowerCase() === 'admin@darshanease.com' && password === 'admin123') {
      const adminData = {
        _id: 'usr_admin_001',
        name: 'System Admin',
        email: 'admin@darshanease.com',
        phone: '9876543210',
        role: 'admin',
        token: 'admin_session_token_darshanease_2026',
      };
      setUser(adminData);
      localStorage.setItem('userInfo', JSON.stringify(adminData));
      return { success: true };
    }

    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (name, email, password, phone) => {
    try {
      const { data } = await axios.post('/api/auth/register', { name, email, password, phone });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  const loginAdmin = async (adminId, password, securityPin) => {
    const validIds = ['ADMIN-DARSHAN-2026', 'admin@darshanease.com', 'admin'];
    const validPasswords = ['Admin@2026', 'admin123'];
    const validPins = ['7777', '9999', '8888'];

    const normalizedId = (adminId || '').trim();
    const normalizedPass = (password || '').trim();
    const normalizedPin = (securityPin || '').trim();

    if (
      (validIds.includes(normalizedId) || validIds.includes(normalizedId.toUpperCase())) &&
      validPasswords.includes(normalizedPass) &&
      validPins.includes(normalizedPin)
    ) {
      const adminData = {
        _id: 'usr_admin_001',
        name: 'System Admin',
        email: 'admin@darshanease.com',
        phone: '9876543210',
        role: 'admin',
        token: 'admin_session_token_darshanease_2026',
      };
      setUser(adminData);
      localStorage.setItem('userInfo', JSON.stringify(adminData));
      return { success: true };
    } else {
      return { success: false, message: 'Invalid Admin ID, Password, or Security PIN' };
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, loginAdmin, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
