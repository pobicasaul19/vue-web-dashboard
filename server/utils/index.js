const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const uploadDirectory = path.resolve(__dirname, '../assets');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uuid = uuidv4();
const upload = multer({ storage: storage })
const counter = (data, key) => {
  return data[key].sort((a, b) => b.id - a.id)[0];
}

module.exports = { uuid, upload, counter };
