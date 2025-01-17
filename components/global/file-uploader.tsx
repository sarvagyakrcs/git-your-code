'use client'

import React, { useState } from 'react';
import { uploadFile, getSignedUrl, deleteFile } from '@/actions/r2';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  size?: 'sm' | 'md' | 'lg';
  messages?: {
    upload?: string;
    getSignedUrl?: string;
    delete?: string;
    uploadSuccess?: string;
    error?: string;
  };
  onUploadSuccess?: (url: string, key: string) => void;
  onDelete?: () => void;
  className?: string;
}

const defaultMessages = {
  upload: 'Upload',
  getSignedUrl: 'Get Signed URL',
  delete: 'Delete File',
  uploadSuccess: 'File uploaded:',
  error: 'Error:',
};

export default function FileUploader({
  size = 'md',
  messages = defaultMessages,
  onUploadSuccess,
  onDelete,
  className,
}: FileUploaderProps) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileKey, setFileKey] = useState<string | null>(null);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    const result = await uploadFile(formData);
    if (result.success) {
      if (result.url) {
        setFileUrl(result.url);
      } else {
        setError('An error occurred during upload');
      }
      if (result.key) {
        setFileKey(result.key);
      } else {
        setError('An error occurred during upload');
      }
      if (result.url && result.key) {
        onUploadSuccess?.(result.url, result.key);
      }
    } else {
      setError(result.error || 'An error occurred during upload');
    }
  };

  const handleGetSignedUrl = async () => {
    if (!fileKey) return;
    setError(null);
    const result = await getSignedUrl(fileKey);
    if (result.success) {
      if (result.url) {
        setSignedUrl(result.url);
      } else {
        setError('An error occurred while getting signed URL');
      }
    } else {
      setError(result.error || 'An error occurred while getting signed URL');
    }
  };

  const handleDelete = async () => {
    if (!fileKey) return;
    setError(null);
    const result = await deleteFile(fileKey);
    if (result.success) {
      setFileUrl(null);
      setFileKey(null);
      setSignedUrl(null);
      onDelete?.();
    } else {
      setError(result.error || 'An error occurred during file deletion');
    }
  };

  const buttonClasses = cn(
    'px-4 py-2 text-white rounded transition-colors',
    {
      'text-xs': size === 'sm',
      'text-sm': size === 'md',
      'text-base': size === 'lg',
    },
    className
  );

  return (
    <div className="space-y-4">
      <form onSubmit={handleUpload} className="space-y-2">
        <input type="file" name="file" required className={cn('block w-full', {
          'text-xs': size === 'sm',
          'text-sm': size === 'md',
          'text-base': size === 'lg',
        })} />
        <button type="submit" className={cn(buttonClasses, 'bg-blue-500 hover:bg-blue-600')}>
          {messages.upload}
        </button>
      </form>
      {fileUrl && (
        <div className="space-y-2">
          <p>{messages.uploadSuccess} {fileUrl}</p>
          <p>File key: {fileKey}</p>
          <button onClick={handleGetSignedUrl} className={cn(buttonClasses, 'bg-green-500 hover:bg-green-600')}>
            {messages.getSignedUrl}
          </button>
          <button onClick={handleDelete} className={cn(buttonClasses, 'bg-red-500 hover:bg-red-600')}>
            {messages.delete}
          </button>
        </div>
      )}
      {signedUrl && <p>Signed URL: {signedUrl}</p>}
      {error && <p className="text-red-500">{messages.error} {error}</p>}
    </div>
  );
}

