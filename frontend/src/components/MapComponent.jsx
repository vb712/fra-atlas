import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Sample data points
const claimLocations = [
  {
    id: 1,
    position: [23.3441, 85.3096], // Ranchi
    title: "Ranchi Forest Claims",
    claims: 125,
    approved: 78,
  },
  {
    id: 2,
    position: [19.2033, 84.7333], // Koraput
    title: "Koraput Forest Claims",
    claims: 89,
    approved: 45,
  },
  {
    id: 3,
    position: [21.8974, 80.1517], // Balaghat
    title: "Balaghat Forest Claims",
    claims: 156,
    approved: 92,
  },
];

function MapComponent() {
  useEffect(() => {
    // Fix for default marker icons
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className="h-[600px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer 
        center={[20.5937, 78.9629]}
        zoom={5} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {claimLocations.map((location) => (
          <Marker 
            key={location.id} 
            position={location.position}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold mb-2">{location.title}</h3>
                <div className="text-sm">
                  <p>Total Claims: {location.claims}</p>
                  <p>Approved: {location.approved}</p>
                  <p className="text-green-600">
                    Success Rate: {((location.approved / location.claims) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapComponent;

