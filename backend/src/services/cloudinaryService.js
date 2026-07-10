const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary if credentials are set
const isCloudinaryConfigured = 
  process.env.CLOUDINARY_CLOUD_NAME && 
  process.env.CLOUDINARY_API_KEY && 
  process.env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
} else {
  console.warn('Cloudinary not configured. Falling back to local file storage.');
}

/**
 * Uploads a local file to Cloudinary or falls back to local uploads folder paths.
 * @param {string} filePath - Absolute path to local temp file
 * @param {string} folder - Destination folder on Cloudinary
 * @returns {Promise<string>} Public URL of the uploaded resource
 */
const uploadFile = async (filePath, folder = 'suggestions') => {
  if (!filePath) return '';

  try {
    if (isCloudinaryConfigured) {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: `peoplepriority_${folder}`,
        resource_type: 'auto'
      });
      
      // Clean up local file after uploading
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error('Failed to delete temp file:', err);
      }

      return result.secure_url;
    } else {
      // Fallback: return path that can be served via Express static files
      const filename = path.basename(filePath);
      return `/uploads/${filename}`;
    }
  } catch (error) {
    console.error('File Upload Error:', error);
    // If Cloudinary fails, return the local file fallback
    const filename = path.basename(filePath);
    return `/uploads/${filename}`;
  }
};

module.exports = {
  uploadFile
};
