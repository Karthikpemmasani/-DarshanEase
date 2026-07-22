import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-8 hover-lift">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-8">About DarshanEase</h1>
        <div className="space-y-6 text-gray-600 dark:text-gray-300">
          <p>
            Welcome to DarshanEase, your ultimate destination for hassle-free temple darshan bookings. 
            We understand the importance of spiritual journeys and the difficulties often faced in planning them.
          </p>
          <p>
            Our mission is to bridge the gap between devotees and the divine by providing a seamless, 
            transparent, and efficient platform to book darshan slots, poojas, and accommodations at major 
            temples across the country.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Our Vision</h2>
          <p>
            To become the most trusted and widely used spiritual travel companion, bringing peace of mind 
            to millions of pilgrims every year through innovative technology.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
