import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import marker images from public folder
import markerIcon from "/marker-icon.png";
import markerShadow from "/marker-shadow.png";

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

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
