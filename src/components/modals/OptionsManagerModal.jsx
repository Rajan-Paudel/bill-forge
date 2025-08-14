import React from 'react';
import { Settings, X, Plus, Trash2, FileText, DollarSign } from 'lucide-react';

const OptionsManagerModal = ({
  showOptionsManager,
  setShowOptionsManager,
  selectableOptions,
  bills,
  removeSelectableOption,
  newOptionLabel,
  setNewOptionLabel,
  newOptionAmount,
  setNewOptionAmount,
  addSelectableOption,
}) => {
  if (!showOptionsManager) return null;

  return (
    <div className="popup-overlay">
      <div className="popup modern-popup">
        <div className="popup-header">
          <div className="popup-title">
            <Settings size={24} />
            <h3>Manage Selectable Options</h3>
          </div>
          <button
            className="close-btn"
            onClick={() => setShowOptionsManager(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="history-content">
          <div className="section-header">
            <h4>Current Options</h4>
            <span className="image-count">
              {selectableOptions.length} options
            </span>
          </div>

          <div className="history-list">
            {selectableOptions.map((option) => (
              <div key={option.label} className="history-item">
                <div className="history-info">
                  <div className="history-filename">{option.label}</div>
                  <div className="history-details">
                    <span>Amount: ₹{option.amount}</span>
                    <span>
                      Bills using this:{" "}
                      {
                        bills.filter((bill) => bill.title === option.label)
                          .length
                      }
                    </span>
                  </div>
                </div>
                <div className="history-actions">
                  <button
                    onClick={() => removeSelectableOption(option.label)}
                    className="btn btn-danger btn-sm"
                    title="Remove this option"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="section-header" style={{ marginTop: "2rem" }}>
            <h4>Add New Option</h4>
          </div>

          <div className="confirmation-content">
            <div className="control-group">
              <label>
                <FileText size={16} />
                Option Name
              </label>
              <input
                type="text"
                value={newOptionLabel}
                onChange={(e) => setNewOptionLabel(e.target.value)}
                placeholder="Enter option name..."
              />
            </div>
            <div className="control-group">
              <label>
                <DollarSign size={16} />
                Default Amount (₹)
              </label>
              <div className="input-wrapper amount-input">
                <span className="input-icon">₹</span>
                <input
                  type="number"
                  step="0.01"
                  value={newOptionAmount}
                  onChange={(e) => setNewOptionAmount(e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="popup-footer">
          <div className="popup-buttons">
            <button
              onClick={() => setShowOptionsManager(false)}
              className="btn btn-secondary"
            >
              <X size={16} />
              Close
            </button>
            <button
              onClick={addSelectableOption}
              className="btn btn-primary"
              disabled={!newOptionLabel.trim() || !newOptionAmount.trim()}
            >
              <Plus size={16} />
              Add Option
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsManagerModal;