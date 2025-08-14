import React from 'react';
import { Sun, Moon } from 'lucide-react';
import CurrencySelector from './CurrencySelector';

const BillForgeLogo = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Glass gradient */}
      <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:'#ffffff', stopOpacity:0.25}} />
        <stop offset="50%" style={{stopColor:'#ffffff', stopOpacity:0.1}} />
        <stop offset="100%" style={{stopColor:'#ffffff', stopOpacity:0.05}} />
      </linearGradient>
      
      {/* Blue glass gradient */}
      <linearGradient id="blueGlass" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:'#3B82F6', stopOpacity:0.3}} />
        <stop offset="100%" style={{stopColor:'#1E40AF', stopOpacity:0.2}} />
      </linearGradient>
      
      {/* Light glass gradient for reports */}
      <linearGradient id="lightGlass" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:'#DBEAFE', stopOpacity:0.6}} />
        <stop offset="100%" style={{stopColor:'#93C5FD', stopOpacity:0.4}} />
      </linearGradient>
      
      {/* Blur filter for backdrop */}
      <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
      </filter>
    </defs>
    

    
    {/* Main document with glass effect */}
    <rect x="8" y="8" width="20" height="28" rx="2" 
          fill="url(#glassGrad)" 
          stroke="url(#blueGlass)" 
          strokeWidth="1.5"/>
    
    {/* Glass highlight on document */}
    <rect x="9" y="9" width="18" height="12" rx="1" 
          fill="url(#glassGrad)" 
          opacity="0.8"/>
    
    {/* Document lines with glass effect */}
    <line x1="12" y1="16" x2="24" y2="16" stroke="#3B82F6" strokeWidth="0.8" opacity="0.6"/>
    <line x1="12" y1="20" x2="22" y2="20" stroke="#3B82F6" strokeWidth="0.8" opacity="0.5"/>
    <line x1="12" y1="24" x2="24" y2="24" stroke="#3B82F6" strokeWidth="0.8" opacity="0.6"/>
    
    {/* Small report pages with glass effect */}
    <rect x="26" y="26" width="8" height="10" rx="1" 
          fill="url(#lightGlass)" 
          stroke="#93C5FD" 
          strokeWidth="1" 
          opacity="0.8"/>
    
    <rect x="28" y="24" width="8" height="10" rx="1" 
          fill="url(#lightGlass)" 
          stroke="#60A5FA" 
          strokeWidth="1" 
          opacity="0.9"/>
    
    {/* Glass highlights on report pages */}
    <rect x="29" y="25" width="6" height="3" rx="0.5" 
          fill="#ffffff" 
          opacity="0.3"/>
    <rect x="27" y="27" width="6" height="3" rx="0.5" 
          fill="#ffffff" 
          opacity="0.2"/>
  </svg>
);

const Header = ({ darkMode, toggleDarkMode, currentCurrency, onCurrencyClick }) => {
  return (
    <header className="bg-gradient-to-br from-accentBackgroundColor via-sky-700 to-accentBackgroundColor dark:from-gray-800 dark:via-accentBackgroundColor dark:to-gray-600 rounded-md shadow-2xl mb-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-600/20 to-blue-600/20 dark:from-sky-400/10 dark:to-blue-400/10"></div>
      <div className="relative px-8 py-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3">
              <BillForgeLogo />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                BillForge
              </h1>
              <p className="text-blue-100 dark:text-blue-200 text-lg">
                Forge professional PDF reports from your bill data
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {currentCurrency && (
              <CurrencySelector
                currentCurrency={currentCurrency}
                onClick={onCurrencyClick}
                className="bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 backdrop-blur-sm hover:scale-105 text-white"
              />
            )}
            <button
              onClick={toggleDarkMode}
              className="p-3 bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 rounded-md backdrop-blur-sm transition-all duration-200 text-white hover:scale-105"
              title={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;