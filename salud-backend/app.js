const express = require("express");
const cors = require("cors");
const UserController = require("./controllers/user-controller");
const MedicalHistoryController = require("./controllers/medical-history-controller");
const StatisticsController = require("./controllers/estadisticas-controller");
const auth = require("./middleware/auth");
const ObrasocialController = require("./controllers/obra-social-controller");

const app = express();
const userController = new UserController();
const obrasocialController = new ObrasocialController();
const medicalHistoryController = new MedicalHistoryController();
const estadisticasController = new StatisticsController();

const multer = require("multer");
const path = require("path");
const helpers = require("../salud-backend/middleware/helpers.js");
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//meter auth como middleware y funcion que checkea roles
app.use("/users", userController.router);
app.use("/obras-sociales", obrasocialController.router);
app.use("/medical-histories", medicalHistoryController.router);
app.use("/stats", estadisticasController.router);
app.use("/images", express.static("images"));

module.exports = app;

// middleware
app.use("/public", express.static(__dirname + "/public/uploads"));

// app.post(
//   "/upload-multiple-images",
//   upload.array("docs", 12),
//   function (req, res, next) {
//     console.log(req.files);
//     return res.status(200).json({});
//     // req.files is array of `photos` files
//     // req.body will contain the text fields, if there were any
//   }
// );

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

app.post("/upload-multiple-images", (req, res) => {
  // 10 is the limit I've defined for number of uploaded files at once
  // 'multiple_images' is the name of our file input field
  let upload = multer({
    storage: storage,
    fileFilter: helpers.imageFilter,
  }).array("docs", 10);

  upload(req, res, function (err) {
    console.log(req.files);
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.files) {
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
      result += `<img src="/public/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="./">Carga mas archivos</a>';
    res.send(result);
  });
});
