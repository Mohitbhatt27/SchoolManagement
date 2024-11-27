const schoolRepository = require("../repositories/school.repository");

const addSchool = async (schoolData) => {
  try {
    return await schoolRepository.createSchool(schoolData);
  } catch (error) {
    console.error("Error adding school:", error.message);
    throw new Error("Failed to add school");
  }
};

const listSchools = async (userLatitude, userLongitude) => {
  try {
    const schools = await schoolRepository.getAllSchools();
    schools.sort((a, b) => {
      const distanceA = getDistance(
        userLatitude,
        userLongitude,
        a.latitude,
        a.longitude
      );
      const distanceB = getDistance(
        userLatitude,
        userLongitude,
        b.latitude,
        b.longitude
      );
      return distanceA - distanceB;
    });
    return schools;
  } catch (error) {
    console.error("Error listing schools:", error.message);
    throw new Error("Failed to list schools");
  }
};

// Helper function to calculate distance between two coordinates
const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371;
  // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};
module.exports = { addSchool, listSchools };
