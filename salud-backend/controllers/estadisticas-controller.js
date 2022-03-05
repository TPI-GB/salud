const express = require("express");
const StatisticsService = require("../services/estadisticas-service");

class StatisticsController {
  constructor() {
    this.StatisticsService = new StatisticsService();
    this.router = express.Router();
    this.router.get("/userCount", (req, res) => {
      this.getCreatedUsers(req, res);
    });
    this.router.get("/historyCount", (req, res) => {
      this.getHistoryCount(req, res);
    });
  }

  getCreatedUsers(req, res) {
    let statsPromise = this.StatisticsService.getUsersStats();

    statsPromise
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  }

  getHistoryCount(req, res) {
    let statsPromise = this.StatisticsService.getHistoriesStats();

    statsPromise
      .then((histories) => {
        res.status(200).json(histories);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  }
}
module.exports = StatisticsController;
