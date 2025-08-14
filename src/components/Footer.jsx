import React from 'react';
import { Heart, Coffee, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-12 py-8 px-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Main credit */}
          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
            <span>Created with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span>by</span>
            <span className="font-semibold text-sky-600 dark:text-sky-400">
              Rajan Paudel
            </span>
          </div>

          {/* Donate and support buttons */}
          <div className="flex items-center space-x-4">
            <a
              href="https://ko-fi.com/rajanpaudel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <Coffee className="h-4 w-4" />
              <span className="font-medium">Buy me a coffee</span>
            </a>
            
            <a
              href="https://github.com/Rajan-Paudel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <Github className="h-4 w-4" />
              <span className="font-medium">View on GitHub</span>
            </a>
          </div>

          {/* App info */}
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              <span className="font-semibold text-sky-600 dark:text-sky-400">BillForge</span> - 
              Professional bill report generator with PDF export and attachments
            </p>
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-500 dark:text-gray-500 text-center pt-4 border-t border-gray-200 dark:border-gray-700 w-full">
            <p>&copy; {new Date().getFullYear()} Rajan Paudel. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;