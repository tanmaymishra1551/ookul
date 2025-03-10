// src/App.jsx
import { useState, useEffect } from "react";
import FileUpload from "./components/FileUpload";
import MapComponent from "./components/MapComponent";
import SummaryTable from "./components/SummaryTable";
import DetailedTable from "./components/DetailedTable";
import { generateDetails } from "./utils.js/geoUtils.js";

const App = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [summary, setSummary] = useState({});
  const [detailedData, setDetailedData] = useState({});
  const [view, setView] = useState(""); // "summary" or "detailed"

  useEffect(() => {
    if (geoJsonData) {
      setDetailedData(generateDetails(geoJsonData));
    }
  }, [geoJsonData]);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold underline text-red-500 mb-4">
        KML Viewer
      </h1>
      <FileUpload setGeoJsonData={setGeoJsonData} setSummary={setSummary} />

      <div className="my-5 flex gap-3">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setView("summary")}
        >
          Summary
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => setView("detailed")}
        >
          Detailed
        </button>
      </div>

      {view === "summary" && <SummaryTable summary={summary} />}
      {view === "detailed" && <DetailedTable detailedData={detailedData} />}

      <MapComponent geoJsonData={geoJsonData} />
    </div>
  );
};

export default App;
