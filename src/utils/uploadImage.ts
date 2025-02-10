import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { UploadResult } from '../types';

export const uploadImage = async (file: File): Promise<UploadResult> => {
  try {
    const fileRef = ref(storage, `receipts/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    
    return {
      success: true,
      url: downloadUrl
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    return {
      success: false,
      error: 'Gagal mengunggah gambar. Silakan coba lagi.'
    };
  }
};
