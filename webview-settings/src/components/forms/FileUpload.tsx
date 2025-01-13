import React, { useState, useRef } from 'react'
import './FileUpload.css'

export interface FileUploadProps {
  label: string
  accept?: string
  multiple?: boolean
  maxSize?: number
  onChange?: (files: File[]) => void
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept = '*',
  multiple = false,
  maxSize = 5 * 1024 * 1024, // 5MB default
  onChange
}) => {
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    
    // Validate file size
    const oversizedFiles = selectedFiles.filter(file => file.size > maxSize)
    if (oversizedFiles.length > 0) {
      setError(`File(s) exceed maximum size of ${maxSize / 1024 / 1024}MB`)
      return
    }

    setFiles(selectedFiles)
    setError(null)
    onChange?.(selectedFiles)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(droppedFiles)
    onChange?.(droppedFiles)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="file-upload-container">
      <label>{label}</label>
      <div 
        className="file-upload-dropzone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="file-input"
          aria-label="File upload"
        />
        <p>
          Drag and drop files here or 
          <span className="file-upload-link"> click to select</span>
        </p>
      </div>
      {error && <p className="file-upload-error">{error}</p>}
      {files.length > 0 && (
        <div className="file-list">
          <p>Selected Files:</p>
          {files.map((file, index) => (
            <div key={index} className="file-item">
              {file.name} - {(file.size / 1024).toFixed(2)} KB
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FileUpload
