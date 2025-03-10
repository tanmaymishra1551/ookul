// src/utils/geoUtils.js
export const calculateDistance = ([lon1, lat1], [lon2, lat2]) => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const generateDetails = (geoJson) => {
  const detailData = {};
  geoJson.features.forEach((feature) => {
    if (feature.geometry.type === "LineString") {
      const coordinates = feature.geometry.coordinates;
      let length = 0;
      for (let i = 0; i < coordinates.length - 1; i++) {
        length += calculateDistance(coordinates[i], coordinates[i + 1]);
      }
      detailData["LineString"] = (detailData["LineString"] || 0) + length;
    } else if (feature.geometry.type === "MultiLineString") {
      const multiCoords = feature.geometry.coordinates;
      let length = 0;
      multiCoords.forEach((line) => {
        for (let i = 0; i < line.length - 1; i++) {
          length += calculateDistance(line[i], line[i + 1]);
        }
      });
      detailData["MultiLineString"] =
        (detailData["MultiLineString"] || 0) + length;
    }
  });
  return detailData;
};
