import React from 'react';
import { Eye, X } from 'lucide-react';

const FullScreenImageModal = ({ fullScreenImage, setFullScreenImage }) => {
  if (!fullScreenImage) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={() => setFullScreenImage(null)}
    >
      <div
        className="bg-white/70 backdrop-blur-md dark:backdrop-blur-xl dark:bg-white/10 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
              <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Image Preview
            </h3>
          </div>
          <button
            onClick={() => setFullScreenImage(null)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center p-6 min-h-0">
          {fullScreenImage.type && fullScreenImage.type.startsWith('image/') ? (
            <img
              src={fullScreenImage.url}
              alt={fullScreenImage.name}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          ) : (
            <img
              src={fullScreenImage.url || fullScreenImage.src}
              alt={fullScreenImage.name}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          )}
        </div>
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="font-medium text-gray-900 dark:text-white">{fullScreenImage.name}</h4>
          {fullScreenImage.size && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {(fullScreenImage.size / 1024 / 1024).toFixed(2)} MB
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullScreenImageModal;