import { useState, useEffect } from 'react';

export function useMap() {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Check if we're in the browser and if Leaflet is available
    if (typeof window !== 'undefined') {
      import('leaflet').then(() => {
        setMapReady(true);
      });
    }
  }, []);

  return { mapReady };
}

// Map center coordinates (India)
export const DEFAULT_CENTER = [20.5937, 78.9629];
export const DEFAULT_ZOOM = 5;

// Sample claim locations
export const CLAIM_LOCATIONS = [
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
