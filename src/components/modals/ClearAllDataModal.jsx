import React from 'react';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

const ClearAllDataModal = ({ showClearAllModal, setShowClearAllModal, confirmClearAll }) => {
  if (!showClearAllModal) return null;

  return (
    <div className="confirmation-overlay">
      <div className="confirmation-popup">
        <div className="popup-header">
          <div className="popup-title">
            <AlertTriangle size={24} className="text-red-600" />
            <h3>Clear All Data</h3>
          </div>
          <button
            className="close-btn"
            onClick={() => setShowClearAllModal(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="confirmation-content">
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Are you sure you want to clear all data?
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This action will permanently remove:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-6">
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

        <div className="popup-footer">
          <div className="popup-buttons">
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
              <Trash2 size={16} />
              Clear All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClearAllDataModal;