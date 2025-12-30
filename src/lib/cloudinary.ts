export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo',
  uploadPreset: import.meta.env.PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default',
};

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
}

declare global {
  interface Window {
    cloudinary: any;
  }
}
