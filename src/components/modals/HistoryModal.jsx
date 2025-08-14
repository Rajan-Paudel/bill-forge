import React from 'react';
import { History, X, Upload, FileDown, Trash2 } from 'lucide-react';

const HistoryModal = ({
  showHistoryPopup,
  setShowHistoryPopup,
  historyData,
  loadFromHistory,
  downloadJSON,
  deleteHistoryItem,
}) => {
  if (!showHistoryPopup) return null;

  return (
    <div className="popup-overlay">
      <div className="popup modern-popup">
        <div className="popup-header">
          <div className="popup-title">
            <History size={24} />
            <h3>Report History</h3>
          </div>
          <button
            className="close-btn"
            onClick={() => setShowHistoryPopup(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="history-content">
          {historyData.length === 0 ? (
            <div className="no-history-message">
              <p>No saved reports found.</p>
              <p>Create and save a PDF to see it appear here.</p>
            </div>
          ) : (
            <div className="history-list">
              {historyData.map((item) => (
                <div key={item.id} className="history-item">
                  <div className="history-info">
                    <div className="history-filename">{item.filename}</div>
                    <div className="history-details">
                      <span>
                        Created:{" "}
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                      <span>Bills: {item.bills.length}</span>
                      <span>Total: ${item.bills.reduce((sum, bill) => sum + bill.amount, 0).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="history-actions">
                    <button
                      onClick={() => loadFromHistory(item)}
                      className="btn btn-primary btn-sm"
                      title="Load this report"
                    >
                      <Upload size={14} />
                      Load
                    </button>
                    <button
                      onClick={() => downloadJSON(item)}
                      className="btn btn-secondary btn-sm"
                      title="Download JSON file"
                    >
                      <FileDown size={14} />
                      JSON
                    </button>
                    <button
                      onClick={() => deleteHistoryItem(item.id)}
                      className="btn btn-danger btn-sm"
                      title="Delete this history item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="popup-footer">
          <div className="selection-summary">
            {historyData.length} saved report
            {historyData.length !== 1 ? "s" : ""}
          </div>
          <div className="popup-buttons">
            <button
              onClick={() => setShowHistoryPopup(false)}
              className="btn btn-secondary"
            >
              <X size={16} />
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;