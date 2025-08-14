import React from 'react';

const CurrencySelector = ({ 
  currentCurrency, 
  onClick, 
  className = "" 
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ${className}`}
      title={`Currency: ${currentCurrency?.name} (${currentCurrency?.code})`}
    >
      <div className="w-8 h-8 flex items-center justify-center">
        <span className="text-lg font-mono text-white font-bold">
          {currentCurrency?.symbol || '₹'}
        </span>
      </div>
    </button>
  );
};

export default CurrencySelector;