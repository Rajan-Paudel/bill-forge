import React from 'react';
import { Settings, X, Check } from 'lucide-react';

const ConfirmSelectableModeModal = ({
  showSelectableModeConfirm,
  confirmSelectableMode,
  selectableOptions,
}) => {
  if (!showSelectableModeConfirm) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white/70 backdrop-blur-md dark:backdrop-blur-xl dark:bg-white/10 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
              <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Enable Selectable Options Mode?
            </h3>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <p className="text-gray-900 dark:text-white">Enabling Selectable Options Mode will:</p>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
              <li>Change bill titles to predefined selectable options</li>
              <li>Set predefined amounts for each option</li>
              <li>New bills will be dated 3 days from the last bill (instead of 1 month)</li>
              <li>Apply to all new bills added</li>
            </ul>
            <div>
              <p className="font-medium text-gray-900 dark:text-white mb-2">Available options:</p>
              <ul className="text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                {selectableOptions.map((option) => (
                  <li key={option.label}>
                    {option.label} - ₹{option.amount}
                  </li>
                ))}
              </ul>
            </div>
            <p className="font-medium text-gray-900 dark:text-white">
              Do you want to continue?
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => confirmSelectableMode(false)}
            className="btn btn-secondary"
          >
            <X className="h-4 w-4" />
            Cancel
          </button>
          <button
            onClick={() => confirmSelectableMode(true)}
            className="btn btn-primary"
          >
            <Check className="h-4 w-4" />
            Yes, Enable
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSelectableModeModal;