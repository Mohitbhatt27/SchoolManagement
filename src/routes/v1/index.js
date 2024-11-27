const express = require("express");
const V1router = express.Router();

const pingRoutes = require("./ping_router_v1");

V1router.use("/ping", pingRoutes);

module.exports = V1router;
