const express = require("express");
const StatisticsService = require("../services/estadisticas-service");

class StatisticsController {
  constructor() {
    this.StatisticsService = new StatisticsService();
    this.router = express.Router();
    this.router.get("/", (req, res) => {
      this.getCreatedUsers(req, res);
      // });
      //   this.router.get("/:id", (req, res) => {
      //     this.getUserById(req, res);
      //   });
      //   this.router.post("/register", (req, res) => {
      //     this.registerUser(req, res);
      //   });
      //   this.router.post("/login", (req, res) => {
      //     this.loginUser(req, res);
      //   });
      //   this.router.put("/:id", (req, res) => {
      //     this.updateUser(req, res);
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
}

module.exports = StatisticsController;
