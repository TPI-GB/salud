const express = require("express");
const cors = require("cors");
const app = express();
<<<<<<< HEAD
const fileUpload = require("express-fileupload");
const FeriadoController = require("./controllers/feriadoController");
=======
const lugarController = require("./controllers/lugar-controller");
const turnoController = require("./controllers/turno-controller");
>>>>>>> b4ea7d108008a5841b49c63ad51b550b8719e7fe

app.use(cors());

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/places", lugarController.router);
app.use("/turns", turnoController.router);

<<<<<<< HEAD
let feriadoController = new FeriadoController();

app.use("/feriado", feriadoController.router);




module.exports = app;
=======
module.exports = app;
>>>>>>> b4ea7d108008a5841b49c63ad51b550b8719e7fe
