const User = require("../models/user-model");

class UserRepository {

    async findAll() {
        return await User.find();
    }

    async findById(id) {
        return await User.findById(id);
    }

    async findByEmail(email) {
        return await User.findOne({email});
    }

    async register(userData) {
        let newUser = User(userData)

        return await newUser.save()
    }

    async update(id, data) {
        return User.findByIdAndUpdate({_id: id}, data, { new: true});
    }
}

module.exports = UserRepository;