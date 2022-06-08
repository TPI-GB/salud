const express = require("express");
const UserService = require("../services/user-service");
const emailResetPass = require("../helpers/email");

const auth = require("../middleware/auth");
const rolMiddleware = require("../middleware/roles");

class UserController {
  constructor() {
    this.userService = new UserService();
    this.router = express.Router();
    this.router.get(
      "/",
      [auth, rolMiddleware(["Medico", "Secretaria", "Director", "Admin"])],
      (req, res) => {
        this.getUsers(req, res);
      }
    );
    this.router.get(
      "/:id",
      [auth, rolMiddleware(["Medico", "Secretaria", "Director", "Admin"])],
      (req, res) => {
        this.getUserById(req, res);
      }
    );
    this.router.post(
      "/register",
     [auth, rolMiddleware(["Medico", "Secretaria", "Director", "Admin"])],
      (req, res) => {
        this.registerUser(req, res);
      }
    );
    this.router.post("/login", (req, res) => {
      this.loginUser(req, res);
    });
    this.router.put("/:id", 
    [auth, rolMiddleware(["Medico", "Secretaria", "Director", "Admin"])],
    (req, res) => {
      this.updateUser(req, res);
    });
    this.router.post("/reset", (req, res) => {
      resetPass(req, res);
    });
    
    this.router.get("/:tipoDocumento/:numeroDocumento",
    [auth, rolMiddleware(["Medico", "Secretaria", "Director", "Admin"])],
    (req, res) => {
      this.getUserByDocument(req, res);
    });
  }

  getUserByDocument(req, res) {
    const tipoDocumento = req.params.tipoDocumento;
    const numeroDocumento = req.params.numeroDocumento;

    let usersPromise = this.userService.getUserByDocument(
      tipoDocumento,
      numeroDocumento
    );

    usersPromise
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  getUsers(req, res) {
    let usersPromise = this.userService.getUsers();

    usersPromise
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  getUserById(req, res) {
    let userPromise = this.userService.getUserById(req.params.id);

    userPromise
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  async registerUser(req, res) {
    // La logica del registro empieza aca
    // Conseguir los inputs del usuario
    const { nombre, apellido, roles, tipodocumento, numerodocumento } =
      req.body;

    const credentialsHeader = req.headers.credentials;

    let email, contrasenia;
    if (credentialsHeader) {
      const method = credentialsHeader.split(" ")[0];
      const token = credentialsHeader.split(" ")[1];
      if (method && method === "Basic" && token) {
        const b = Buffer.from(token, "base64");
        const value = b.toString().split(":");
        email = value[0].toLowerCase(); // Se pasa a minusculas
        contrasenia = value[1];
      }
    }

    // Validar los inputs del usuario
    if (
      !(
        email &&
        contrasenia &&
        nombre &&
        apellido &&
        roles &&
        roles.length > 0 &&
        tipodocumento &&
        numerodocumento
      )
    ) {
      return res.status(400).json("Faltan campos requeridos!");
    }

    try {
      // Validar si el usuario existe en la base de datos

      const oldUserByEmail = await this.userService.getUserByEmail(email);

      if (oldUserByEmail) {
        return res
          .status(409)
          .json("Ya existe un usuario con el e-mail ingresado.");
      }

      const oldUserByDocumento = await this.userService.getUserByDocument(
        tipodocumento,
        numerodocumento
      );
      if (oldUserByDocumento) {
        return res
          .status(409)
          .json(
            "Ya existe un usuario con el tipo y numero de documento ingresado."
          );
      }

      const userData = {
        nombre,
        apellido,
        roles,
        tipodocumento,
        numerodocumento,
        email,
        contrasenia,
      };

      const userStored = await this.userService.registerUser(userData);
      // devolver el usuario guardado
      return res.status(201).json(userStored);
    } catch (exception) {
      console.log(exception);
      return res.status(500).json(exception.message);
    }
  }

  updateUser(req, res) {
    const id = req.params.id;
    const data = req.body;
    const updatedUserPromise = this.userService.updateUser(id, data);

    updatedUserPromise
      .then((updatedUser) => {
        res.status(200).json(updatedUser);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
      });
  }

  resetPass = async (req, res) => {
    const { email } = req.body;
    console.log(email)
    const user = await this.userService.getUserByEmail(email);
      if (!user) {
        const error = new Error("El usuario no existe");
        return res.status(404).json ({ error: err.message });
      }

      try {
        user.token = generarId();
        await user.save();
        console.log(token)
        //Enviar mail
        emailResetPass({
          email: user.email,
          nombre: user.nombre,
          token: user.token,
        });
        
        res.json({ msg: "Hemos enviado un mail con las instrucciones" });
      } catch (error) {
        console.log(error);
      }
  } 

  loginUser(req, res) {
    // La logica del login empieza aca
    // Conseguir los inputs del usuario
    const authHeader = req.headers.authorization;

    let email, contrasenia;
    if (authHeader) {
      const method = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];
      if (method && method === "Basic" && token) {
        const b = Buffer.from(token, "base64");
        const value = b.toString().split(":");
        email = value[0];
        contrasenia = value[1];
      }
    }

    // Validar los inputs del usuario
    if (!(email)) {
      return res.status(400).json("Se requieren todos los campos!");
    }

    const loginUserPromise = this.userService.loginUser(
      email.toLowerCase(), // se pone en minusculas el email para no tener problemas en buscarlo
      contrasenia
    );

    loginUserPromise
      .then((userSuccess) => {
        res.status(200).json(userSuccess);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  }
}

module.exports = UserController;
