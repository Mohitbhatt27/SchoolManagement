const express = require("express");
const Schoolrouter = express.Router();
const { body, validationResult } = require("express-validator");
const schoolController = require("../../controllers/school.controller");

/**
 * @swagger
 * tags:
 *   name: School
 *   description: API endpoints for adding and listing schools
 */

/**
 * @swagger
 * /api/v1/school/addSchool:
 *   post:
 *     summary: Add a new school
 *     description: Adds a new school to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the school
 *                 example: Springfield Elementary
 *               address:
 *                 type: string
 *                 description: Address of the school
 *                 example: 742 Evergreen Terrace
 *               latitude:
 *                 type: number
 *                 format: float
 *                 description: Latitude of the school's location (must be between -90 and 90)
 *                 example: 40.7128
 *               longitude:
 *                 type: number
 *                 format: float
 *                 description: Longitude of the school's location (must be between -180 and 180)
 *                 example: -74.0060
 *             required:
 *               - name
 *               - address
 *               - latitude
 *               - longitude
 *     responses:
 *       200:
 *         description: School successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: School added successfully
 *                 schoolId:
 *                   type: string
 *                   example: 12345
 *             examples:
 *               success:
 *                 value:
 *                   message: School added successfully
 *                   schoolId: "12345"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Error message
 *                         example: Name is required
 *                       param:
 *                         type: string
 *                         description: Parameter with the error
 *                         example: name
 *                       location:
 *                         type: string
 *                         description: Where the error occurred
 *                         example: body
 *             examples:
 *               validationError:
 *                 value:
 *                   errors:
 *                     - msg: Name is required
 *                       param: name
 *                       location: body
 *                     - msg: Address is required
 *                       param: address
 *                       location: body
 *                     - msg: Latitude must be between -90 and 90
 *                       param: latitude
 *                       location: body
 *                     - msg: Longitude must be between -180 and 180
 *                       param: longitude
 *                       location: body
 */

Schoolrouter.post("/addSchool", schoolController.addSchool);
/**
 * @swagger
 * /api/v1/school/listSchools:
 *   get:
 *     summary: List schools by proximity
 *     tags: [Schools]
 *     parameters:
 *       - in: query
 *         name: latitude
 *         required: true
 *         schema:
 *           type: number
 *           format: float
 *       - in: query
 *         name: longitude
 *         required: true
 *         schema:
 *           type: number
 *           format: float
 *     responses:
 *       200:
 *         description: A list of schools sorted by distance
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   address:
 *                     type: string
 *                   latitude:
 *                     type: number
 *                     format: float
 *                   longitude:
 *                     type: number
 *                     format: float
 *                   distanceFromUser:
 *                     type: string
 *       400:
 *         description: Latitude and longitude are required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

Schoolrouter.get("/listSchools", schoolController.listSchools);

module.exports = Schoolrouter;
