import React from 'react';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

const RemoveOptionModal = ({ 
  showRemoveOptionModal, 
  setShowRemoveOptionModal, 
  optionToRemove,
  billsUsingOption,
  confirmRemoveOption,
  isLastOption
}) => {
  if (!showRemoveOptionModal) return null;

  if (isLastOption) {
    return (
      <div className="confirmation-overlay">
        <div className="confirmation-popup">
          <div className="popup-header">
            <div className="popup-title">
              <AlertTriangle size={24} className="text-yellow-600" />
              <h3>Cannot Remove Option</h3>
            </div>
            <button
              className="close-btn"
              onClick={() => setShowRemoveOptionModal(false)}
            >
              <X size={20} />
            </button>
          </div>

          <div className="confirmation-content">
            <p className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Cannot remove the last option
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              You must keep at least one selectable option. Add a new option first before removing this one.
            </p>
          </div>

          <div className="popup-footer">
            <div className="popup-buttons">
              <button
                onClick={() => setShowRemoveOptionModal(false)}
                className="btn btn-primary"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-overlay">
      <div className="confirmation-popup">
        <div className="popup-header">
          <div className="popup-title">
            <AlertTriangle size={24} className="text-red-600" />
            <h3>Remove Option</h3>
          </div>
          <button
            className="close-btn"
            onClick={() => setShowRemoveOptionModal(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="confirmation-content">
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Remove option "{optionToRemove?.label}"?
          </p>
          
          {billsUsingOption > 0 ? (
            <div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This action will also remove <strong>{billsUsingOption}</strong> bill{billsUsingOption !== 1 ? 's' : ''} that use this option.
              </p>
              <p className="text-red-600 dark:text-red-400 font-medium">
                This action cannot be undone.
              </p>
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">
              This option is not currently being used by any bills.
            </p>
          )}
        </div>

        <div className="popup-footer">
          <div className="popup-buttons">
            <button
              onClick={() => setShowRemoveOptionModal(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                confirmRemoveOption();
                setShowRemoveOptionModal(false);
              }}
              className="btn btn-danger"
            >
              <Trash2 size={16} />
              Remove Option
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveOptionModal;