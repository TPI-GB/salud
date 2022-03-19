const imageFilter = function (req, file, cb) {
  // Accept images only
  if (
    !file.originalname.match(
      /.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|PDF|pdf|doc|DOC|docx|DOCX)$/
    )
  ) {
    req.fileValidationError =
      "Solo pueden subirse imagenes o texto como PDF o Word!";
    return cb(
      new Error("Solo pueden subirse imagenes o texto como PDF o Word!"),
      false
    );
  }
  cb(null, true);
};

exports.imageFilter = imageFilter;
