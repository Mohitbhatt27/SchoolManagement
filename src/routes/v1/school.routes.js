const express = require("express");
const Schoolrouter = express.Router();

const schoolController = require("../../controllers/school.controller");

Schoolrouter.post("/addSchool", schoolController.addSchool);
Schoolrouter.get("/listSchools", schoolController.listSchools);

module.exports = Schoolrouter;
