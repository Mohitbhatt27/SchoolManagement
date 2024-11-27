const express = require("express");
const APIrouter = express.Router();

const V1router = require("./v1/index.js");

APIrouter.use("/v1", V1router);

module.exports = APIrouter;
