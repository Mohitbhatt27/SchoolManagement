const schoolService = require("../services/school.services");

const addSchool = async (req, res) => {
  try {
    const schoolData = req.body;
    const newSchool = await schoolService.addSchool(schoolData);
    res.status(201).json(newSchool);
  } catch (error) {
    console.error("Error adding school:", error.message);
    res.status(400).json({ error: "Failed to add school" });
  }
};

const listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required" });
    }
    const schools = await schoolService.listSchools(latitude, longitude);
    res.json(schools);
  } catch (error) {
    console.error("Error listing schools:", error.message);
    res.status(500).json({ error: "Failed to list schools" });
  }
};

module.exports = { addSchool, listSchools };
