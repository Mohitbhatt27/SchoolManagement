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

    // First, calculate distances and create objects with numerical distance values
    const schoolsWithDistance = schools.map((school) => {
      const distance = getDistance(
        userLatitude,
        userLongitude,
        school.latitude,
        school.longitude
      );

      return {
        id: school.id,
        name: school.name,
        address: school.address,
        latitude: school.latitude,
        longitude: school.longitude,
        distance: distance, // Keep numerical distance for sorting
        distanceFromUser: `${distance.toFixed(2)} km`, // Formatted distance for display
      };
    });

    // Sort using the numerical distance value
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    // Remove the numerical distance field from final response
    return schoolsWithDistance.map(({ distance, ...school }) => school);
  } catch (error) {
    console.error("Error listing schools:", error.message);
    throw new Error("Failed to list schools");
  }
};

const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in kilometers
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
