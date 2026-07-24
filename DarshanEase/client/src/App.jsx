import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import TempleList from './pages/TempleList';
import TempleDetails from './pages/TempleDetails';
import BookingPage from './pages/BookingPage';
import PaymentSuccess from './pages/PaymentSuccess';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

import Faq from './pages/Faq';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import CancellationPolicy from './pages/CancellationPolicy';

import AdminLogin from './pages/AdminLogin';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" />;
  if (requireAdmin && user.role !== 'admin') return <Navigate to="/" />;

  return children;
};

function App() {
  const { loading } = useContext(AuthContext);

  React.useEffect(() => {
    // Automatically navigate to home page on browser refresh
    const navEntries = window.performance.getEntriesByType('navigation');
    const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';
    if (isReload && window.location.pathname !== '/') {
      window.location.href = '/';
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/temples" element={<TempleList />} />
            <Route path="/temples/:id" element={<TempleDetails />} />
            
            {/* Policy & Help Routes */}
            <Route path="/faq" element={<Faq />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cancellation-policy" element={<CancellationPolicy />} />
            
            {/* Protected Routes */}
            <Route path="/book/:id" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
            <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
            <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><AdminDashboard /></ProtectedRoute>} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
