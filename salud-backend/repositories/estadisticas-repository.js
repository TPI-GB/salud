const User = require("../models/user-model");
const History = require("../models/medical-history-model");

class StatisticsRepository {
  async findAllUsers() {
    return await User.count();
  }

  async findAllHistories() {
    return await History.count();
  }
  async findAllUsers(startDate, endDate) {
    const minuendo = await User.count({
      createdAt: { $and: [{ $lte: endDate }, { $gte: startDate }] },
    });

    return minuendo;
  }

  async findAllHistories(startDate, endDate) {
    return await History.count(startDate, endDate);
  }
}

module.exports = StatisticsRepository;
