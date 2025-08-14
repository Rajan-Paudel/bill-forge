import React from 'react';
import { FileText, AlertTriangle, Download, X } from 'lucide-react';

const NoAttachmentsModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  onCancel 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white/70 backdrop-blur-md dark:backdrop-blur-xl dark:bg-white/10 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accentBackgroundColor/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-accentBackgroundColor" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              No Attachments Selected
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
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-gray-900 dark:text-white font-medium">
                  Generate PDF without attachments?
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  No images or files have been selected for attachment.
                </p>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300">
              The PDF will contain only the bill table and summary. You can add attachments later if needed.
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-primary"
          >
            <Download className="h-4 w-4" />
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoAttachmentsModal;