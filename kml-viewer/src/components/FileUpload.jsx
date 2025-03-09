// src/components/FileUpload.jsx
import { useState } from "react";
import { DOMParser } from "xmldom"; // For XML parsing
import { kml } from "@tmcw/togeojson"; // Converts KML to GeoJSON

const FileUpload = ({ setGeoJsonData, setSummary }) => {
    const [fileName, setFileName] = useState("");

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setFileName(file.name);
        const reader = new FileReader();

        reader.onload = (e) => {
            const text = e.target.result;
            const xml = new DOMParser().parseFromString(text, "text/xml");
            const geoJson = kml(xml);

            setGeoJsonData(geoJson);
            generateSummary(geoJson);
        };

        reader.readAsText(file);
    };

    const generateSummary = (geoJson) => {
        const typeCount = {};
        geoJson.features.forEach((feature) => {
            const type = feature.geometry.type;
            typeCount[type] = (typeCount[type] || 0) + 1;
        });
        setSummary(typeCount);
    };

    return (
        <div>
            <input type="file" accept=".kml" onChange={handleFileUpload} />
            {fileName && <p>Uploaded: {fileName}</p>}
        </div>
    );
};

export default FileUpload;
