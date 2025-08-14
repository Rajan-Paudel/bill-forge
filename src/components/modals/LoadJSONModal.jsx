import React from 'react';
import { Upload, X, FileDown } from 'lucide-react';

const LoadJSONModal = ({
  showLoadJSONDialog,
  setShowLoadJSONDialog,
  handleJSONFileLoad,
}) => {
  if (!showLoadJSONDialog) return null;

  return (
    <div className="popup-overlay">
      <div className="popup modern-popup">
        <div className="popup-header">
          <div className="popup-title">
            <Upload size={24} />
            <h3>Load JSON File</h3>
          </div>
          <button
            className="close-btn"
            onClick={() => setShowLoadJSONDialog(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="confirmation-content">
          <div className="control-group">
            <label>
              <FileDown size={16} />
              Select JSON File
            </label>
            <input
              type="file"
              accept=".json"
              onChange={handleJSONFileLoad}
              className="input-field"
            />
          </div>
          <p
            style={{
              marginTop: "1rem",
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
            }}
          >
            Select a JSON file that was previously downloaded from the
            History section to restore all bills, settings, and images.
          </p>
        </div>

        <div className="popup-footer">
          <div className="popup-buttons">
            <button
              onClick={() => setShowLoadJSONDialog(false)}
              className="btn btn-secondary"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadJSONModal;