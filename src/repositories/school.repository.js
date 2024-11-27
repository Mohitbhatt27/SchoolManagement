const School = require("../models/school.model");

const createSchool = async (schoolData) => {
  try {
    return await School.create(schoolData);
  } catch (error) {
    console.error("Error creating school:", error.message);
    throw new Error("Failed to create school");
  }
};

const getAllSchools = async () => {
  try {
    return await School.findAll();
  } catch (error) {
    console.error("Error fetching schools:", error.message);
    throw new Error("Failed to fetch schools");
  }
};

module.exports = { createSchool, getAllSchools };
