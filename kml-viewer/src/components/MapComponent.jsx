// src/components/MapComponent.jsx
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ geoJsonData }) => {
    return (
        <div className="w-full h-[500px]">
            <MapContainer center={[20, 0]} zoom={2} className="w-full h-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                />
                {geoJsonData && <GeoJSON data={geoJsonData} />}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
