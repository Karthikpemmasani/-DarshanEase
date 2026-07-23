import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';

// Set API URL (uses Vercel proxy rewrite automatically in production)
axios.defaults.baseURL = import.meta.env.VITE_API_URL || '';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <Toaster position="top-right" />
    </AuthProvider>
  </React.StrictMode>,
);
