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
        <div className="flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Upload KML File
                <input 
                    type="file" 
                    accept=".kml" 
                    onChange={handleFileUpload} 
                    className="hidden"
                />
            </label>
            {fileName && <p className="mt-2 text-gray-700">Uploaded: {fileName}</p>}
        </div>
    );
};

export default FileUpload;
