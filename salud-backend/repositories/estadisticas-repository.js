const User = require("../models/user-model");

class StatisticsRepository {
  async findAll() {
    return await User.count();
  }
}

module.exports = StatisticsRepository;
