import React from 'react';
import {
  FileText,
  Plus,
  Download,
  Check,
  Settings,
  History,
  Upload,
  RotateCcw,
} from 'lucide-react';

const ReportSettings = ({
  reportTitle,
  setReportTitle,
  showDateRange,
  setShowDateRange,
  isSelectableMode,
  handleSelectableModeChange,
  setShowOptionsManager,
  addNewBill,
  setShowHistoryPopup,
  setShowLoadJSONDialog,
  generatePDF,
  showSessionRestored,
  clearAllData,
}) => {
  return (
    <div className="card animate-slide-up">
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
            <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Report Settings
          </h2>
        </div>
        {showSessionRestored && (
          <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 text-sm">
            <Check className="h-4 w-4" />
            <span>Session restored from last visit</span>
          </div>
        )}
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <FileText className="h-4 w-4" />
            <span>Report Title</span>
          </label>
          <input
            type="text"
            value={reportTitle}
            onChange={(e) => setReportTitle(e.target.value)}
            placeholder="Enter report title..."
            className="input-field"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={(e) => {
              e.preventDefault();
              setShowDateRange(!showDateRange);
            }}
          >
            <input
              type="checkbox"
              checked={showDateRange}
              onChange={(e) => setShowDateRange(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`checkbox-custom ${
                showDateRange ? "checked" : ""
              } group-hover:border-blue-400`}
            >
              {showDateRange && <Check className="h-3 w-3 text-white" />}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
              Show date range below title
            </span>
          </label>

          <div className="flex items-center justify-between">
            <label 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={(e) => {
                e.preventDefault();
                handleSelectableModeChange(!isSelectableMode);
              }}
            >
              <input
                type="checkbox"
                checked={isSelectableMode}
                onChange={(e) =>
                  handleSelectableModeChange(e.target.checked)
                }
                className="sr-only"
              />
              <div
                className={`checkbox-custom ${
                  isSelectableMode ? "checked" : ""
                } group-hover:border-blue-400`}
              >
                {isSelectableMode && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                Selectable Options Mode
              </span>
            </label>
            {isSelectableMode && (
              <button
                onClick={() => setShowOptionsManager(true)}
                className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg transition-all duration-200"
                title="Manage selectable options"
              >
                <Settings className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-4">
          <button onClick={addNewBill} className="btn btn-primary">
            <Plus className="h-4 w-4" />
            Add New Bill
          </button>
          <button
            onClick={() => setShowHistoryPopup(true)}
            className="btn btn-secondary"
          >
            <History className="h-4 w-4" />
            History
          </button>
          <button
            onClick={() => setShowLoadJSONDialog(true)}
            className="btn btn-secondary"
          >
            <Upload className="h-4 w-4" />
            Load JSON
          </button>
          <button onClick={generatePDF} className="btn btn-success">
            <Download className="h-4 w-4" />
            Generate PDF
          </button>
          <button
            onClick={clearAllData}
            className="btn btn-danger"
            title="Clear all data"
          >
            <RotateCcw className="h-4 w-4" />
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportSettings;