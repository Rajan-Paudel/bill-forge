import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  Plus,
  Download,
  Check,
  Settings,
  History,
  Upload,
  RotateCcw,
  Save,
  ArrowUp,
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
  saveToHistory,
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        // Show sticky toolbar when the card is scrolled past the top
        setIsSticky(rect.bottom <= 80);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Sticky Toolbar - only shows when scrolled */}
      {isSticky && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md dark:bg-black/10 border-b border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 py-4">
              <button onClick={addNewBill} className="btn btn-primary">
                <Plus className="h-4 w-4" />
                Add New Bill
              </button>
              <button onClick={saveToHistory} className="btn btn-primary">
                <Save className="h-4 w-4" />
                Save
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
              <button
                onClick={scrollToTop}
                className="btn btn-secondary ml-auto"
                title="Scroll to top"
              >
                <ArrowUp className="h-4 w-4" />
                Go Up
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Card */}
      <div ref={cardRef} className="card animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-accentBackgroundColor/40 dark:border-accentBackgroundColor/40">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accentBackgroundColor/20 rounded-lg">
              <Settings className="h-5 w-5 text-accentBackgroundColor" />
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
                  className="btn btn-ghost btn-sm"
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
            <button onClick={saveToHistory} className="btn btn-primary">
              <Save className="h-4 w-4" />
              Save
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
    </>
  );
};

export default ReportSettings;