const express = require("express");
const V1router = express.Router();

const Schoolrouter = require("./school.routes");

V1router.use("/school", Schoolrouter);

module.exports = V1router;
