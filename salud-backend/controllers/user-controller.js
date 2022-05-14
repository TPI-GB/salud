const express = require("express");
const UserService = require("../services/user-service");
const auth = require("../middleware/auth");

const rolMiddleware = (rolesWithAccess) => {
  return (req, res, next) => {
    let { roles } = req.user;
    console.log("rolMiddleware");
    console.log(roles);
    console.log(rolesWithAccess);
    if (
      rolesWithAccess.length &&
      !rolesWithAccess.some((x) => roles.includes(x))
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      next();
    }
  };
};
class UserController {
  constructor() {
    this.userService = new UserService();
    this.router = express.Router();
    this.router.get("/", [auth, rolMiddleware([])], (req, res) => {
      this.getUsers(req, res);
    });
    this.router.get("/:id", (req, res) => {
      this.getUserById(req, res);
    });
    this.router.post("/register", (req, res) => {
      this.registerUser(req, res);
    });
    this.router.post("/login", (req, res) => {
      this.loginUser(req, res);
    });
    this.router.put("/:id", (req, res) => {
      this.updateUser(req, res);
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
    if (!(email && contrasenia)) {
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
