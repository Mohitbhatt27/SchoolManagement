const express = require("express");
const Schoolrouter = express.Router();
const { body, validationResult } = require("express-validator");
const schoolController = require("../../controllers/school.controller");

Schoolrouter.post(
  "/addSchool",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("latitude")
      .isFloat({ min: -90, max: 90 })
      .withMessage("Latitude must be between -90 and 90"),
    body("longitude")
      .isFloat({ min: -180, max: 180 })
      .withMessage("Longitude must be between -180 and 180"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  schoolController.addSchool
);

Schoolrouter.get("/listSchools", schoolController.listSchools);

module.exports = Schoolrouter;
