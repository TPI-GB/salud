const express = require("express");
const UserService = require("../services/user-service");

class UserController {
  constructor() {
    this.userService = new UserService();
    this.router = express.Router();
    this.router.get("/", (req, res) => {
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
        console.log(err);
        res.status(400).json({ error: err });
      });
  }

  getUserById(req, res) {
    let userPromise = this.userService.getUserById(req.params.id);

    userPromise
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  }

  registerUser(req, res) {
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
        tipodocumento &&
        numerodocumento
      )
    ) {
      return res.status(400).send("Faltan campos requeridos!");
    }

    // Validar si el usuario existe en la base de datos
    const oldUserPromise = this.userService.getUserByEmail(email);

    oldUserPromise
      .then((oldUser) => {
        if (oldUser) {
          console.log(oldUser);
          return res.status(409).send("El usuario ya existe");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    const userData = {
      nombre,
      apellido,
      roles,
      tipodocumento,
      numerodocumento,
      email,
      contrasenia,
    };

    const userStoredPromise = this.userService.registerUser(userData);

    // devolver el usuario guardado
    userStoredPromise
      .then((userStored) => {
        return res.status(201).json(userStored);
      })
      .catch((err) => {
        console.log(err);
      });
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
        res.status(400).json({ error: err });
        console.log(err);
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
      res.status(400).send("Se requieren todos los campos!");
    }
    // Validar si el usuario existe en la base de datos
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(contrasenia, user.contrasenia))) {
      // Crear Token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5m",
        }
      );

      // Agrega el token al usuario (NO A LA DB)
      user.token = token;

      // Usuario
      return res.status(200).json(user);
    }
    res.status(400).send("Credenciales invalidas");
    // Our register logic ends here
  }
}

module.exports = UserController;
