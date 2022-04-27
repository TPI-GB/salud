const multer = require("multer");
const path = require("path");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "." +
      file.mimetype.split("/")[1];
    cb(null, file.fieldname + uniqueSuffix);
  },
});

const upload = multer({ storage: diskStorage }).single("image");

module.exports = upload;
