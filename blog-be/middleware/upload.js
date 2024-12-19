const multer = require("multer");
const path = require("path");

// Ensure this path points to the 'uploads' directory in the root of the project
const uploadPath = path.join(__dirname, "../uploads"); // Assuming the uploads folder is in the root directory

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure the uploads directory exists
    cb(null, uploadPath); // Save uploaded files to 'uploads' directory
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images are allowed."), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
