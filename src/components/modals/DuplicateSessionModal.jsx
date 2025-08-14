import React from 'react';
import { AlertTriangle, RefreshCw, X } from 'lucide-react';

const DuplicateSessionModal = ({ 
  isOpen, 
  onClose, 
  onModify, 
  onCancel,
  existingItem 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white/70 backdrop-blur-md dark:backdrop-blur-xl dark:bg-white/10 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accentBackgroundColor/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-accentBackgroundColor" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Bill Already Exists
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              A bill report with this session ID already exists in your history:
            </p>
            
            {existingItem && (
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-sm space-y-1">
                  <div><strong>Name:</strong> {existingItem.filename}</div>
                  <div><strong>Date:</strong> {new Date(existingItem.timestamp).toLocaleString()}</div>
                  <div><strong>Bills:</strong> {existingItem.bills?.length || 0} items</div>
                </div>
              </div>
            )}
            
            <p className="text-gray-600 dark:text-gray-300">
              Do you want to modify the existing entry with the new data?
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={onModify}
            className="btn btn-primary"
          >
            <RefreshCw className="h-4 w-4" />
            Modify Existing
          </button>
        </div>
      </div>
    </div>
  );
};

export default DuplicateSessionModal;