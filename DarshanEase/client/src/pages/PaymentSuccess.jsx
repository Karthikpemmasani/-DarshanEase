import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Download, User, Fingerprint, ShieldCheck } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthContext } from '../context/AuthContext';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { booking, temple } = location.state || {};

  useEffect(() => {
    if (!booking) {
      navigate('/');
    }
  }, [booking, navigate]);

  if (!booking) return null;

  const devoteeName = booking.name || user?.name || 'Devotee';
  const rawAadhar = booking.aadharNumber || '';
  const last4Aadhar = rawAadhar.length >= 4 ? rawAadhar.slice(-4) : 'XXXX';
  const maskedAadhar = `XXXX-XXXX-${last4Aadhar}`;

  const handleDownloadPDF = () => {
    const receipt = document.getElementById('receipt-card');
    html2canvas(receipt, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`DarshanEase_Ticket_${booking.ticketNumber}.pdf`);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center transition-colors">
      <div className="text-center mb-8">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h2 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">Booking Confirmed!</h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Your darshan slot has been successfully booked.</p>
      </div>

      <div id="receipt-card" className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden max-w-md w-full border border-gray-100 dark:border-gray-700 relative">
        {/* Decorative Top */}
        <div className="h-4 bg-gradient-to-r from-orange-600 to-amber-600"></div>
        <div className="p-8">
          <div className="text-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-6">
            <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              Official Darshan Pass
            </span>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{temple.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">📍 {temple.location}, {temple.state}</p>
          </div>
          
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/40 p-3 rounded-xl">
              <span className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1.5">
                <User className="w-4 h-4 text-orange-600" /> Devotee Name
              </span>
              <span className="font-bold text-gray-900 dark:text-white">{devoteeName}</span>
            </div>

            <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/40 p-3 rounded-xl">
              <span className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1.5">
                <Fingerprint className="w-4 h-4 text-orange-600" /> Aadhar No. (Last 4)
              </span>
              <span className="font-mono font-bold text-gray-900 dark:text-white tracking-wider">{maskedAadhar}</span>
            </div>

            <div className="flex justify-between items-center px-1">
              <span className="text-gray-500 dark:text-gray-400">Ticket No.</span>
              <span className="font-mono font-bold text-gray-900 dark:text-white">{booking.ticketNumber}</span>
            </div>
            
            <div className="flex justify-between items-center px-1">
              <span className="text-gray-500 dark:text-gray-400">Visit Date</span>
              <span className="font-medium text-gray-900 dark:text-white">{new Date(booking.date).toLocaleDateString('en-IN')}</span>
            </div>
            
            <div className="flex justify-between items-center px-1">
              <span className="text-gray-500 dark:text-gray-400">Time Slot</span>
              <span className="font-medium text-gray-900 dark:text-white">{booking.slot}</span>
            </div>
            
            <div className="flex justify-between items-center px-1">
              <span className="text-gray-500 dark:text-gray-400">Status</span>
              <span className="font-bold text-green-600 dark:text-green-400 uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> {booking.status}
              </span>
            </div>
          </div>

          <div className="mt-8 flex justify-center border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="bg-white p-3 rounded-2xl shadow-inner border border-gray-200">
               <QRCodeSVG value={`Ticket:${booking.ticketNumber}|Name:${devoteeName}|Aadhar:*${last4Aadhar}|Temple:${temple.name}|Date:${booking.date}`} size={140} />
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">Present this QR code and original Aadhar card at temple entry.</p>
        </div>
      </div>

      <div className="mt-8 flex space-x-4">
        <button 
          onClick={handleDownloadPDF}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 transition-colors shadow-lg hover:shadow-orange-500/20"
        >
          <Download className="w-5 h-5 mr-2" /> Download PDF
        </button>
        <Link 
          to="/my-bookings"
          className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
        >
          View All Bookings
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;

