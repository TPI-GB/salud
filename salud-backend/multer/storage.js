const multer = require("multer");
const path = require("path");

const diskStorage = multer.diskStorage({
  destination: path.join(__dirname, "./uploadedFiles"),
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "." +
      file.type.split("/")[1];
    cb(null, file.fieldname + uniqueSuffix);
  },
});

const upload = multer({ storage: diskStorage }).any("files");

module.exports = upload;
