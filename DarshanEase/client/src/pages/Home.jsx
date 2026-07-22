import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-primary-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 bg-primary-50 dark:bg-gray-800 lg:bg-transparent">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Book your divine</span>{' '}
                  <span className="block text-primary-600 dark:text-primary-500">darshan with ease</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Experience seamless and hassle-free temple darshan bookings across the country. Plan your spiritual journey today with DarshanEase.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/temples"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg transition-all hover:scale-105"
                    >
                      Browse Temples
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/about"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 dark:bg-gray-700 dark:text-primary-400 dark:hover:bg-gray-600 md:py-4 md:text-lg transition-all hover:scale-105"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center">
           {/* Abstract shape instead of placeholder image for premium look */}
           <div className="text-white text-center p-12">
              <h2 className="text-3xl font-bold mb-4">Find Peace & Tranquility</h2>
              <div className="h-64 w-64 rounded-full border-8 border-white/20 mx-auto animate-pulse flex items-center justify-center">
                 <div className="h-48 w-48 rounded-full border-4 border-white/40 flex items-center justify-center">
                    <div className="h-32 w-32 rounded-full bg-white/20 backdrop-blur-sm"></div>
                 </div>
              </div>
           </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Why choose us</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              A better way to plan your visit
            </p>
          </div>
          
          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
               {/* Feature 1 */}
               <div className="relative hover-lift p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                 <div className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-2">Instant Booking</div>
                 <p className="text-base text-gray-500 dark:text-gray-400">Book your slots in seconds with our streamlined and user-friendly interface.</p>
               </div>
               {/* Feature 2 */}
               <div className="relative hover-lift p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                 <div className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-2">Secure Payments</div>
                 <p className="text-base text-gray-500 dark:text-gray-400">Your transactions are 100% secure. Experience hassle-free checkout.</p>
               </div>
               {/* Feature 3 */}
               <div className="relative hover-lift p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                 <div className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-2">Verified Temples</div>
                 <p className="text-base text-gray-500 dark:text-gray-400">All temples listed are authenticated for a genuine spiritual experience.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
