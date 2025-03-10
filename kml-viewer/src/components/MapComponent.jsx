import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default icon path issue
const customIcon = new L.Icon({
  iconUrl: "/marker-icon.png", // Use direct string path
  shadowUrl: "/marker-shadow.png", // Use direct string path
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapComponent = ({ geoJsonData }) => {
  return (
    <div className="w-full h-[500px]">
      <MapContainer center={[20, 0]} zoom={2} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />
        {geoJsonData && (
          <GeoJSON
            data={geoJsonData}
            pointToLayer={(feature, latlng) => L.marker(latlng, { icon: customIcon })}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
