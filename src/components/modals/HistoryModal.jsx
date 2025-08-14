import React from 'react';
import { History, X, Upload, FileDown, Trash2 } from 'lucide-react';

const HistoryModal = ({
  showHistoryPopup,
  setShowHistoryPopup,
  historyData,
  loadFromHistory,
  downloadJSON,
  deleteHistoryItem,
  currentCurrency = { symbol: '₹' },
}) => {
  if (!showHistoryPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white/70 backdrop-blur-md dark:backdrop-blur-xl dark:bg-white/10 rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accentBackgroundColor/20 rounded-lg">
              <History className="h-5 w-5 text-accentBackgroundColor" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Report History
            </h3>
          </div>
          <button
            onClick={() => setShowHistoryPopup(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {historyData.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No saved reports found.</p>
              <p>Create and save a PDF to see it appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {historyData.map((item) => (
                <div key={item.id} className="p-4 border border-accentBackgroundColor/20 rounded-lg bg-white/50 dark:bg-black/30 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">{item.filename}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 space-x-4">
                        <span>
                          Created:{" "}
                          {new Date(item.timestamp).toLocaleDateString()}
                        </span>
                        <span>Bills: {item.bills.length}</span>
                        <span>Total: {(item.currentCurrency?.symbol || currentCurrency.symbol)}{item.bills.reduce((sum, bill) => sum + bill.amount, 0).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
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
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {historyData.length} saved report
            {historyData.length !== 1 ? "s" : ""}
          </div>
          <button
            onClick={() => setShowHistoryPopup(false)}
            className="btn btn-secondary"
          >
            <X className="h-4 w-4" />
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;