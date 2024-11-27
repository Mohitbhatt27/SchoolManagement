const schoolService = require("../services/school.services");

const addSchool = async (req, res) => {
  try {
    const schoolData = req.body;
    const newSchool = await schoolService.addSchool(schoolData);
    res.status(201).json(newSchool);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addSchool, listSchools };
