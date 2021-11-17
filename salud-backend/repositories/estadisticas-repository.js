const User = require("../models/user-model");
const History = require("../models/medical-history-model");

class StatisticsRepository {
  async findAllUsers() {
    return await User.count();
  }

  async findAllHistories() {
    return await History.count();
  }
}

module.exports = StatisticsRepository;
