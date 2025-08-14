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
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-white/70 backdrop-blur-md dark:backdrop-blur-xl dark:bg-white/10 rounded-lg shadow-xl max-w-md w-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
             <div className="p-2 bg-accentBackgroundColor/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-accentBackgroundColor" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Cannot Remove Option
              </h3>
            </div>
            <button
              onClick={() => setShowRemoveOptionModal(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Cannot remove the last option
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                You must keep at least one selectable option. Add a new option first before removing this one.
              </p>
            </div>
          </div>

          <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShowRemoveOptionModal(false)}
              className="btn btn-primary"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white/70 backdrop-blur-md dark:backdrop-blur-xl dark:bg-white/10 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
           <div className="p-2 bg-accentBackgroundColor/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-accentBackgroundColor" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Remove Option
            </h3>
          </div>
          <button
            onClick={() => setShowRemoveOptionModal(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              Remove option "{optionToRemove?.label}"?
            </p>
            
            {billsUsingOption > 0 ? (
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
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
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
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
            <Trash2 className="h-4 w-4" />
            Remove Option
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveOptionModal;