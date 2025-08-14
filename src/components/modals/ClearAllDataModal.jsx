import React from 'react';
import { X, Trash2, BrushCleaning } from 'lucide-react';

const ClearAllDataModal = ({ showClearAllModal, setShowClearAllModal, confirmClearAll }) => {
  if (!showClearAllModal) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white/70 backdrop-blur-md dark:backdrop-blur-xl dark:bg-white/10 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
           <div className="p-2 bg-accentBackgroundColor/20 rounded-lg">
              <BrushCleaning className="h-5 w-5 text-accentBackgroundColor" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Clear All Data
            </h3>
          </div>
          <button
            onClick={() => setShowClearAllModal(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              Are you sure you want to clear all data?
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              This action will permanently remove:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>All bills and their data</li>
              <li>Report title and settings</li>
              <li>Auto-saved state</li>
              <li>Sort configuration</li>
              <li>Selectable options (if in selectable mode)</li>
            </ul>
            <p className="text-red-600 dark:text-red-400 font-medium">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowClearAllModal(false)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              confirmClearAll();
              setShowClearAllModal(false);
            }}
            className="btn btn-danger"
          >
            <Trash2 className="h-4 w-4" />
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClearAllDataModal;