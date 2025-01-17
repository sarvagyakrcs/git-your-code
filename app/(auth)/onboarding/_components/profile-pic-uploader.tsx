'use client'

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProfilePicUploaderProps {
  setFile: (file: File) => void;
}

export default function ProfilePicUploader({ setFile }: ProfilePicUploaderProps) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      setFileUrl(URL.createObjectURL(file));
    } else {
      setError("No file selected.");
    }
  };

  return (
    <div className="space-y-4">
      <input 
        onChange={handleFileChange} 
        type="file" 
        name="file" 
        required 
        className={cn('block w-full')} 
      />
      {fileUrl && <img src={fileUrl} alt="Uploaded file" className="w-32 h-32" />}
      {error && <p className="text-red-500">Error: {error}</p>}
    </div>
  );
}
