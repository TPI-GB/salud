require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const app = express();

const port = process.env.port || 3001

app.use(express.json());

// Logic goes here

module.exports = app;

