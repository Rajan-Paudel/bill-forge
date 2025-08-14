import React, { useState, useEffect } from 'react';
import { X, Save, SaveAll } from 'lucide-react';

const SaveModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  defaultFilename = "",
  title = "Save Bill Report"
}) => {
  const [filename, setFilename] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFilename(defaultFilename);
    }
  }, [isOpen, defaultFilename]);

  const handleSave = () => {
    if (filename.trim()) {
      onSave(filename.trim());
      setFilename("");
      onClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white/70 backdrop-blur-md dark:backdrop-blur-xl dark:bg-white/10 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accentBackgroundColor/20 rounded-lg">
              <SaveAll className="h-5 w-5 text-accentBackgroundColor" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter a name for this save:
              </label>
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter filename..."
                className="input-field w-full"
                autoFocus
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!filename.trim()}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveModal;