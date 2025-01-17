'use server'

import { uploadToR2, getSignedUrlFromR2, deleteFromR2 } from '../utils/r2';
import { v4 as uuidv4 } from 'uuid';

export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) {
    throw new Error('No file provided');
  }

  const fileExtension = file.name.split('.').pop();
  const key = `uploads/${uuidv4()}.${fileExtension}`;

  try {
    const url = await uploadToR2(file, key);
    return { success: true, url, key };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { success: false, error: 'Failed to upload file' };
  }
}

export async function uploadFileAsFile(file: File) {
  if (!file) {
    throw new Error('No file provided');
  }

  const fileExtension = file.name.split('.').pop();
  const key = `uploads/${uuidv4()}.${fileExtension}`;

  try {
    const url = await uploadToR2(file, key);
    return { success: true, url, key };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { success: false, error: 'Failed to upload file' };
  }
}

export async function getSignedUrl(key: string) {
  try {
    const url = await getSignedUrlFromR2(key);
    return { success: true, url };
  } catch (error) {
    console.error('Error getting signed URL:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to get signed URL' };
  }
}

export async function deleteFile(key: string) {
  try {
    await deleteFromR2(key);
    return { success: true };
  } catch (error) {
    console.error('Error deleting file:', error);
    return { success: false, error: 'Failed to delete file' };
  }
}

