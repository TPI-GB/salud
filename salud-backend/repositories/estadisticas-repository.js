const User = require("../models/user-model");
const History = require("../models/medical-history-model");

class StatisticsRepository {
  // async findAllUsers() {
  //   return await User.count();
  // }

  // async findAllHistories() {
  //   return await History.count();
  // }
  async findAllUsers(startDate, endDate) {
    const result = await User.count({
      createdAt: { $gte: startDate, $lte: endDate },
    });
    console.log(result);
    return result;
  }

  async findAllHistories(startDate, endDate) {
    return await History.count(startDate, endDate);
  }
}

module.exports = StatisticsRepository;
