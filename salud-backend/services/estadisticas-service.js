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
  //preciso hacer esto? O van en el req del controller?
  async getUsersStats(startDate, endDate) {
    return this.statisticsRepository.findAllUsers(startDate, endDate);
  }

  async getHistoriesStats(startDate, endDate) {
    return this.statisticsRepository.findAllHistories(startDate, endDate);
  }
}
module.exports = StatisticsService;
