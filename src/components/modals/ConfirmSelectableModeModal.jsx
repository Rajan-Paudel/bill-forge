import React from 'react';
import { Settings, X, Check } from 'lucide-react';

const ConfirmSelectableModeModal = ({
  showSelectableModeConfirm,
  confirmSelectableMode,
  selectableOptions,
}) => {
  if (!showSelectableModeConfirm) return null;

  return (
    <div className="popup-overlay confirmation-overlay">
      <div className="popup confirmation-popup">
        <div className="popup-header">
          <div className="popup-title">
            <Settings size={24} />
            <h3>Enable Selectable Options Mode?</h3>
          </div>
        </div>

        <div className="confirmation-content">
          <p>Enabling Selectable Options Mode will:</p>
          <ul>
            <li>Change bill titles to predefined selectable options</li>
            <li>Set predefined amounts for each option</li>
            <li>
              New bills will be dated 3 days from the last bill (instead of
              1 month)
            </li>
            <li>Apply to all new bills added</li>
          </ul>
          <p>
            <strong>Available options:</strong>
          </p>
          <ul>
            {selectableOptions.map((option) => (
              <li key={option.label}>
                {option.label} - ₹{option.amount}
              </li>
            ))}
          </ul>
          <p>
            <strong>Do you want to continue?</strong>
          </p>
        </div>

        <div className="popup-footer">
          <div className="popup-buttons">
            <button
              onClick={() => confirmSelectableMode(false)}
              className="btn btn-secondary"
            >
              <X size={16} />
              Cancel
            </button>
            <button
              onClick={() => confirmSelectableMode(true)}
              className="btn btn-primary"
            >
              <Check size={16} />
              Yes, Enable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSelectableModeModal;