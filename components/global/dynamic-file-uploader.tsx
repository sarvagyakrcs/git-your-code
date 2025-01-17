'use client'

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { X, Upload, FileIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FileUploaderProps } from '@/types/file-uploader'
import { cn } from '@/lib/utils'

/**
 * FileUploader Component
 * 
 * A customizable and responsive file upload component that supports drag and drop,
 * file type restrictions, file size limits, and optional file preview.
 * 
 * @component
 * @example
 * ```jsx
 * <FileUploader
 *   allowedTypes={[FileDataType.IMAGE, FileDataType.PDF]}
 *   maxFiles={3}
 *   showPreview={false}
 *   maxFileSize={5 * 1024 * 1024} // 5MB
 *   setFiles={(files) => console.log(files)}
 * />
 * ```
 */
const DynamicFileUploader: React.FC<FileUploaderProps> = ({
  allowedTypes,
  maxFiles,
  showPreview = false,
  maxFileSize,
  setFiles,
  disabled = false
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => file.size <= maxFileSize)
    const newFiles = [...uploadedFiles, ...validFiles].slice(0, maxFiles)
    setUploadedFiles(newFiles)
    setFiles(newFiles)
  }, [maxFileSize, maxFiles, uploadedFiles, setFiles])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: allowedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxFiles: maxFiles - uploadedFiles.length,
  })

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(newFiles)
    setFiles(newFiles)
  }

  return (
    <Card className={cn("w-full max-w-md mx-auto", disabled && 'opacity-50 cursor-none')}>
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25 hover:border-primary/50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            Drag & drop files here, or click to select files
          </p>
          <p className="text-xs text-muted-foreground/75 mt-1">
            {allowedTypes.map(type => type.split('/')[1]).join(', ')} files are allowed
          </p>
          <p className="text-xs text-muted-foreground/75">
            Max file size: {(maxFileSize / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                <div className="flex items-center space-x-2">
                  <FileIcon className="h-5 w-5 text-primary" />
                  <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  className="h-8 w-8 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {showPreview && uploadedFiles.length === 1 && uploadedFiles[0].type.startsWith('image/') && (
          <div className="mt-4">
            <img
              src={URL.createObjectURL(uploadedFiles[0])}
              alt="File preview"
              className="max-w-full h-auto rounded-md"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default DynamicFileUploader;

