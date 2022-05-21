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

  async updateUser(id, data) {
    const updatedUser = await this.userRepository.update(id, data);

    return updatedUser;
  }

  async loginUser(email, password) {
    // Validar si el usuario existe en la base de datos
    const user = await this.userRepository.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.contrasenia))) {
      // Crear Token
      const token = jwt.sign(
        { user_id: user._id, email, roles: user.roles },
        process.env.TOKEN_KEY,
        {
          expiresIn: "30m",
        }
      );
      // Se guarda el token en el usuario si el login es exitoso.
      console.log(process.env.TOKEN_KEY);

      console.log(token);
      user.token = token;

      return user;
    } else {
      throw "Credenciales inválidas";
    }
  }
}

module.exports = UserService;
