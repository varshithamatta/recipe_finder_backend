const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // ensure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1713178402345.jpg
    }
});

// File filter for images only
const fileFilter = function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mime = allowedTypes.test(file.mimetype);

    if (ext && mime) cb(null, true);
    else cb(new Error('Only images are allowed'));
};

const upload = multer({ storage, fileFilter });
