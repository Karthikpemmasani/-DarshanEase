import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-primary-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-5xl">Page not found</h2>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">Sorry, we couldn't find the page you're looking for.</p>
        <div className="mt-8">
          <Link to="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-colors">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
