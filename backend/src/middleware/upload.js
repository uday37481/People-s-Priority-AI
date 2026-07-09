const multer = require('multer');
const path = require('path');

// Configure disk storage for temp files before uploading to Cloudinary
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter validation
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|webp|mp3|wav|m4a|ogg|aac/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type! Only images (JPEG/PNG/WEBP) and audio (MP3/WAV/M4A/OGG) files are allowed.'));
  }
};

// Initialize multer upload middleware
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB maximum limit
  },
  fileFilter: fileFilter
});

// Define upload field configurations
const suggestionUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'audio', maxCount: 1 }
]);

module.exports = {
  suggestionUpload
};
