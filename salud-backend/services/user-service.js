const UserRepository = require("../repositories/user-repository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUsers() {
    let users = await this.userRepository.findAll();

    return users;
  }

  async getUserById(id) {
    let user = await this.userRepository.findById(id);

    return user;
  }

  async getUserByEmail(email) {
    let user = await this.userRepository.findByEmail(email);

    return user;
  }

  async getUserByDocument(documentType, documentNumber) {
    let user = await this.userRepository.findByDocument(
      documentType,
      documentNumber
    );

    return user;
  }

  async registerUser(userData) {
    const {
      nombre,
      apellido,
      roles,
      tipodocumento,
      numerodocumento,
      email,
      contrasenia,
    } = userData;

    // Encriptar la contraseña del usuario
    let encryptedPassword = await bcrypt.hash(contrasenia, 10);
    
    const user = {
      nombre,
      apellido,
      roles,
      contrasenia: encryptedPassword,
      email,
      tipodocumento,
      numerodocumento,
    };

    let newUser = await this.userRepository.register(user);

    return newUser;
  }

  async loginUser(email, password) {
    // Validar si el usuario existe en la base de datos
    const user = await this.userRepository.findByEmail(email);

    if (
      user &&
      user.activo &&
      (await bcrypt.compare(password, user.contrasenia))
    ) {
      // Crear Token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "30m",
        }
      );
      // Se guarda el token en el usuario si el login es exitoso.
      user.token = token;

      return user;
    } else {
      throw "Credenciales inválidas";
    }
  }

  /* async logoutUser(email, password) {
    const user = await this.userRepository.findByEmail(email);
  } */
}

module.exports = UserService;
