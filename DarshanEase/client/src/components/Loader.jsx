import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-50 dark:bg-gray-900 bg-opacity-75 z-50 fixed inset-0">
      <Loader2 className="h-12 w-12 text-primary-500 animate-spin" />
    </div>
  );
};

export default Loader;
