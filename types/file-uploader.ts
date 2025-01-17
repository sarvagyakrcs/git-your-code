export enum FileDataType {
    IMAGE = 'image/*',
    PDF = 'application/pdf',
    DOC = 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ANY = '*/*'
}

export interface FileUploaderProps {
    /** Allowed file types */
    allowedTypes: FileDataType[];
    /** Maximum number of files allowed to upload */
    maxFiles: number;
    /** Whether to show preview (only applicable for single file upload) */
    showPreview?: boolean;
    /** Maximum file size in bytes */
    maxFileSize: number;
    /** Callback function to set the file(s) in the parent component */
    setFiles: (files: File[]) => void;

    disabled?: boolean
}

