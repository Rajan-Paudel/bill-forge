import React from 'react';
import { Save, X, Download, FileText } from 'lucide-react';

const FileNameModal = ({
  showFileNameDialog,
  setShowFileNameDialog,
  fileName,
  setFileName,
  confirmCreatePDF,
}) => {
  if (!showFileNameDialog) return null;

  return (
    <div className="popup-overlay">
      <div className="popup modern-popup">
        <div className="popup-header">
          <div className="popup-title">
            <Save size={24} />
            <h3>Save Report</h3>
          </div>
          <button
            className="close-btn"
            onClick={() => setShowFileNameDialog(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="confirmation-content">
          <div className="control-group">
            <label>
              <FileText size={16} />
              File Name
            </label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter file name..."
              autoFocus
            />
          </div>
          <p
            style={{
              marginTop: "1rem",
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
            }}
          >
            This will save both a PDF file and a JSON state file for future
            reference.
          </p>
        </div>

        <div className="popup-footer">
          <div className="popup-buttons">
            <button
              onClick={() => setShowFileNameDialog(false)}
              className="btn btn-secondary"
            >
              <X size={16} />
              Cancel
            </button>
            <button
              onClick={confirmCreatePDF}
              className="btn btn-success"
              disabled={!fileName.trim()}
            >
              <Download size={16} />
              Download Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileNameModal;