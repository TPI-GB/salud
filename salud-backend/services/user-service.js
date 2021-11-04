const UserRepository = require("../repositories/user-repository");
const bcrypt = require('bcryptjs');
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

      async registerUser(userData) {
        const {
            nombre,
            apellido,
            roles,
            tipodocumento,
            numerodocumento,
            email,
            contrasenia
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
}

module.exports = UserService;