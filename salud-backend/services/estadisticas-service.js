const StatisticsRepository = require("../repositories/estadisticas-repository");
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");

class StatisticsService {
  constructor() {
    this.statisticsRepository = new StatisticsRepository();
  }

  async getUsersStats() {
    return this.statisticsRepository.findAllUsers();
  }

  async getHistoriesStats() {
    return this.statisticsRepository.findAllHistories();
  }

  async getUsersStats(startDate, endDate) {
    console.log(startDate);
    console.log(endDate);
    return this.statisticsRepository.findAllUsers(startDate, endDate);
  }

  async getHistoriesStats(startDate, endDate) {
    return this.statisticsRepository.findAllHistories(startDate, endDate);
  }
}
module.exports = StatisticsService;
