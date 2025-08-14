import React from 'react';
import { Eye, X } from 'lucide-react';

const FullScreenImageModal = ({ fullScreenImage, setFullScreenImage }) => {
  if (!fullScreenImage) return null;

  return (
    <div
      className="fullscreen-overlay"
      onClick={() => setFullScreenImage(null)}
    >
      <div
        className="fullscreen-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="fullscreen-header">
          <div className="fullscreen-title">
            <Eye size={20} />
            <span>Image Preview</span>
          </div>
          <button
            className="close-fullscreen-btn"
            onClick={() => setFullScreenImage(null)}
          >
            <X size={20} />
          </button>
        </div>
        <div className="fullscreen-image-container">
          {fullScreenImage.type && fullScreenImage.type.startsWith('image/') ? (
            <img
              src={fullScreenImage.url}
              alt={fullScreenImage.name}
              className="fullscreen-image"
            />
          ) : (
            <img
              src={fullScreenImage.url || fullScreenImage.src}
              alt={fullScreenImage.name}
              className="fullscreen-image"
            />
          )}
        </div>
        <div className="fullscreen-info">
          <h4>{fullScreenImage.name}</h4>
          {fullScreenImage.size && (
            <p className="text-sm text-gray-500">
              {(fullScreenImage.size / 1024 / 1024).toFixed(2)} MB
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullScreenImageModal;