import React, { useRef } from 'react';
import { Upload, X, FileDown } from 'lucide-react';

const LoadJSONModal = ({
  showLoadJSONDialog,
  setShowLoadJSONDialog,
  handleJSONFileLoad,
}) => {
  const fileInputRef = useRef(null);

  if (!showLoadJSONDialog) return null;

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white/70 backdrop-blur-md dark:backdrop-blur-xl dark:bg-white/10 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accentBackgroundColor/20 rounded-lg">
              <Upload className="h-5 w-5 text-accentBackgroundColor" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Load JSON File
            </h3>
          </div>
          <button
            onClick={() => setShowLoadJSONDialog(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                <div className="flex items-center space-x-2">
                  <FileDown className="h-4 w-4" />
                  <span>Select JSON File</span>
                </div>
              </label>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleJSONFileLoad}
                className="hidden"
              />
              
              <div 
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer bg-gray-50/50 dark:bg-gray-800/50"
                onClick={handleUploadClick}
                onDrop={(e) => {
                  e.preventDefault();
                  const files = e.dataTransfer.files;
                  if (files.length > 0) {
                    handleJSONFileLoad({ target: { files } });
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
              >
                <Upload className="h-8 w-8 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Click to browse or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Select a JSON file (.json)
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> Select a JSON file that was previously downloaded from the History section to restore all bills, settings, and data.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowLoadJSONDialog(false)}
            className="btn btn-secondary"
          >
            <X className="h-4 w-4" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadJSONModal;