// src/App.jsx
import { useState, useEffect } from "react";
import FileUpload from "./components/FileUpload";
import MapComponent from "./components/MapComponent";

const App = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [summary, setSummary] = useState({});
  const [detailedData, setDetailedData] = useState({});
  const [view, setView] = useState(""); // "summary" or "detailed"

  // Recompute detailed data when geoJsonData changes
  useEffect(() => {
    if (geoJsonData) {
      setDetailedData(generateDetails(geoJsonData));
    }
  }, [geoJsonData]);

  // Calculates total length for LineString and MultiLineString types
  const generateDetails = (geoJson) => {
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
        // For MultiLineString, coordinates is an array of line arrays
        const multiCoords = feature.geometry.coordinates;
        let length = 0;
        multiCoords.forEach((line) => {
          for (let i = 0; i < line.length - 1; i++) {
            length += calculateDistance(line[i], line[i + 1]);
          }
        });
        detailData["MultiLineString"] = (detailData["MultiLineString"] || 0) + length;
      }
    });
    return detailData;
  };

  // Haversine formula to calculate distance between two points (in km)
  const calculateDistance = ([lon1, lat1], [lon2, lat2]) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>KML Viewer</h1>
      <FileUpload setGeoJsonData={setGeoJsonData} setSummary={setSummary} />

      <div style={{ margin: "20px" }}>
        <button onClick={() => setView("summary")}>Summary</button>
        <button onClick={() => setView("detailed")}>Detailed</button>
      </div>

      {view === "summary" && (
        <div>
          <h2>Summary</h2>
          <table border="1" style={{ margin: "auto", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: "8px" }}>Element Type</th>
                <th style={{ padding: "8px" }}>Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(summary).map(([type, count]) => (
                <tr key={type}>
                  <td style={{ padding: "8px" }}>{type}</td>
                  <td style={{ padding: "8px" }}>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === "detailed" && (
        <div>
          <h2>Detailed</h2>
          <table border="1" style={{ margin: "auto", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: "8px" }}>Element Type</th>
                <th style={{ padding: "8px" }}>Total Length (km)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(detailedData).map(([type, length]) => (
                <tr key={type}>
                  <td style={{ padding: "8px" }}>{type}</td>
                  <td style={{ padding: "8px" }}>{length.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <MapComponent geoJsonData={geoJsonData} />
    </div>
  );
};

export default App;
