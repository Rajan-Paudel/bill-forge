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
  File,
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
  onNoAttachments,
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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white/70 backdrop-blur-md dark:backdrop-blur-xl dark:bg-white/10 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accentBackgroundColor/20 rounded-lg">
                          <File className="h-5 w-5 text-accentBackgroundColor" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Upload and Order Files
            </h3>
          </div>
          <button
            onClick={() => setShowImagePopup(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">Upload Files</h4>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span>
                {selectedFiles.length} file{selectedFiles.length !== 1 ? "s" : ""} uploaded
              </span>
              {selectedFiles.length > 0 && (
                <span className="flex items-center space-x-1">
                  <GripVertical className="h-4 w-4" />
                  <span>Drag to reorder</span>
                </span>
              )}
            </div>
          </div>

          <div className="mb-6">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div 
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer bg-gray-50/50 dark:bg-gray-800/50"
              onClick={handleUploadClick}
              onDrop={(e) => {
                e.preventDefault();
                const files = Array.from(e.dataTransfer.files);
                handleFileUpload({ target: { files } });
              }}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
            >
              <Upload className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h5 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Upload Images and PDFs
              </h5>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Click to browse or drag and drop files here
              </p>
              <div className="space-y-1">
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Supported: JPG, PNG, GIF, WebP, SVG, PDF
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Images: One per page • PDFs: Merged from next page
                </p>
              </div>
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <div>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="uploaded-files" direction="vertical">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`space-y-2 ${
                        snapshot.isDraggingOver ? "bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2" : ""
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
                              className={`p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                                snapshot.isDragging ? "shadow-lg bg-white dark:bg-gray-800" : ""
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="flex-shrink-0">
                                    {getFileTypeIcon(file)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 dark:text-white truncate">{file.name}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                      {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </div>
                                  </div>
                                  <div className="flex-shrink-0">
                                    <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 rounded-full">{index + 1}</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div
                                    {...provided.dragHandleProps}
                                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-move"
                                    title="Drag to reorder"
                                  >
                                    <GripVertical className="h-4 w-4 text-gray-400" />
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
                                      <Eye className="h-4 w-4" />
                                    </button>
                                  )}
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleFileRemove(file.id)}
                                    title="Remove file"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
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

        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {selectedFiles.length > 0 ? (
              <span>
                {selectedFiles.length} file{selectedFiles.length !== 1 ? "s" : ""} uploaded
              </span>
            ) : (
              <span>No files uploaded</span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowImagePopup(false)}
              className="btn btn-secondary"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
            <button 
              onClick={() => {
                if (selectedFiles.length === 0) {
                  onNoAttachments();
                } else {
                  handleCreatePDF();
                }
              }} 
              className="btn btn-success"
            >
              <Download className="h-4 w-4" />
              Create PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSelector;