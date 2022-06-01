const express = require("express");

class imagesController {
  constructor() {
    this.StatisticsService = new StatisticsService();
    this.router = express.Router();
    this.router.post("/upload-multiple-images", (req, res) => {
      guardarImagen(req, res);
    });

    function guardarImagen(req, res) {
      let upload = multer({
        storage: storage,
        fileFilter: helpers.imageFilter,
      }).array("MULTIPLES-ARCHIVOS", 10);
    }

    upload(req, res, function (err) {
      if (req.fileValidationError) {
        return res.send(req.fileValidationError);
      } else if (!req.file) {
        return res.send("Seleccione los archivos a cargar");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }

      let result = "Se han cargado estos archivos: <hr />";
      const files = req.files;
      let index, len;

      // Loop through all the uploaded images and display them on frontend
      for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="${files[index].path}" width="300" style="margin-right: 20px;">`;
      }
      result += '<hr/><a href="./">Carga mas archivos</a>';
      res.send(result);
    });
  }
}
module.exports = StatisticsController;
