import React, { useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Upload,
  X,
  Eye,
  GripVertical,
  Trash2,
  Download,
  FileImage,
  FileText,
} from 'lucide-react';

const ImageSelector = ({
  showImagePopup,
  setShowImagePopup,
  selectedFiles,
  handleFileUpload,
  handleFileRemove,
  onDragEnd,
  setFullScreenImage,
  handleCreatePDF,
}) => {
  const fileInputRef = useRef(null);

  if (!showImagePopup) return null;

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const getFileTypeIcon = (file) => {
    if (file.type.startsWith('image/')) {
      return <FileImage size={16} className="text-blue-500" />;
    } else if (file.type === 'application/pdf') {
      return <FileText size={16} className="text-red-500" />;
    }
    return <FileImage size={16} className="text-gray-500" />;
  };

  return (
    <div className="popup-overlay">
      <div className="popup modern-popup">
        <div className="popup-header">
          <div className="popup-title">
            <Upload size={24} />
            <h3>Upload and Order Files</h3>
          </div>
          <button
            className="close-btn"
            onClick={() => setShowImagePopup(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="image-selection">
          <div className="section-header">
            <h4>Upload Files</h4>
            <div className="selection-info">
              <span className="image-count">
                {selectedFiles.length} file{selectedFiles.length !== 1 ? "s" : ""} uploaded
              </span>
              {selectedFiles.length > 0 && (
                <span className="drag-hint">
                  <GripVertical size={14} />
                  Drag to reorder
                </span>
              )}
            </div>
          </div>

          {/* File Upload Area */}
          <div className="upload-area">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div 
              className="upload-dropzone"
              onClick={handleUploadClick}
              onDrop={(e) => {
                e.preventDefault();
                const files = Array.from(e.dataTransfer.files);
                handleFileUpload({ target: { files } });
              }}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
            >
              <div className="upload-content">
                <Upload size={48} className="text-gray-400 mb-4" />
                <h5 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Upload Images and PDFs
                </h5>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Click to browse or drag and drop files here
                </p>
                <div className="upload-info">
                  <p className="text-xs text-gray-400">
                    Supported: JPG, PNG, GIF, WebP, SVG, PDF
                  </p>
                  <p className="text-xs text-gray-400">
                    Images: One per page • PDFs: Merged from next page
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Uploaded Files List */}
          {selectedFiles.length > 0 && (
            <div className="uploaded-files">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="uploaded-files" direction="vertical">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`files-list ${
                        snapshot.isDraggingOver ? "dragging-over" : ""
                      }`}
                    >
                      {selectedFiles.map((file, index) => (
                        <Draggable
                          key={`file-${file.id}`}
                          draggableId={`file-${file.id}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`file-item ${
                                snapshot.isDragging ? "dragging" : ""
                              }`}
                            >
                              <div className="file-info">
                                <div className="file-icon">
                                  {getFileTypeIcon(file)}
                                </div>
                                <div className="file-details">
                                  <span className="file-name">{file.name}</span>
                                  <span className="file-size">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                  </span>
                                </div>
                                <div className="file-order">
                                  <span className="order-badge">{index + 1}</span>
                                </div>
                              </div>
                              <div className="file-actions">
                                <div
                                  {...provided.dragHandleProps}
                                  className="drag-handle"
                                  title="Drag to reorder"
                                >
                                  <GripVertical size={16} />
                                </div>
                                {file.type.startsWith('image/') && (
                                  <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setFullScreenImage(file);
                                    }}
                                    title="Preview image"
                                  >
                                    <Eye size={14} />
                                  </button>
                                )}
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleFileRemove(file.id)}
                                  title="Remove file"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          )}
        </div>

        <div className="popup-footer">
          <div className="selection-summary">
            {selectedFiles.length > 0 ? (
              <span>
                {selectedFiles.length} file{selectedFiles.length !== 1 ? "s" : ""} uploaded
              </span>
            ) : (
              <span>No files uploaded</span>
            )}
          </div>
          <div className="popup-buttons">
            <button
              onClick={() => setShowImagePopup(false)}
              className="btn btn-secondary"
            >
              <X size={16} />
              Cancel
            </button>
            <button 
              onClick={handleCreatePDF} 
              className="btn btn-success"
              disabled={selectedFiles.length === 0}
            >
              <Download size={16} />
              Create PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSelector;