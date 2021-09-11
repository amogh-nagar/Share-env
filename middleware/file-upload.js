const multer = require("multer");

const {v4:uuidv4}=require('uuid')
const filestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "." + file.originalname);
  },
});

const fileupload = multer({
  limits: 500000,
  storage: filestorage,
});

module.exports = fileupload;
