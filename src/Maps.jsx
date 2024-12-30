import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./maps.css";
import { useState, useEffect } from "react";

const markerIcon = new L.Icon({
  iconUrl: ("https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-1024.png"),
  iconSize: [35,45],
  iconAnchor: [17,46]

})
// Helper component to dynamically update map center
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

function Maps() {
  const [userLocation, setUserLocation] = useState({
    latitude: 30.3753,
    longitude: 69.3451, // Default to Pakistan coordinates
  });
  const [mosques, setMosques] = useState([]); // State for storing nearby mosques
  const [isLoading, setIsLoading] = useState(true); // Track data loading

  // Get User's Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

// Fetch Nearby Mosques (Trigger after a 3-second delay when userLocation updates)
useEffect(() => {
  const fetchNearbyMosques = async () => {
    if (userLocation.latitude && userLocation.longitude) {
      setIsLoading(true); // Start loading
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=mosque&bounded=1&viewbox=${
            userLocation.longitude - 0.05
          },${userLocation.latitude + 0.05},${
            userLocation.longitude + 0.05
          },${userLocation.latitude - 0.05}`
        );

        const data = await response.json();
        setMosques(
          data.map((mosque, index) => ({
            geocode: [parseFloat(mosque.lat), parseFloat(mosque.lon)],
            id: index + 2,
            popUp: mosque.display_name || "Mosque",
          }))
        );
      } catch (error) {
        console.error("Error fetching nearby mosques:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    }
  };

  // Set a timeout to delay the fetch by 3 seconds
  const timeoutId = setTimeout(fetchNearbyMosques, 3000);

  // Cleanup to avoid memory leaks
  return () => clearTimeout(timeoutId);
}, [userLocation]);

  console.log(...mosques)
  // Combine User Location and Mosque Markers
  const marker = [
    {
      geocode: [userLocation.latitude, userLocation.longitude],
      id: 1,
      popUp: "Your Location!",
    },
    ...mosques, // Spread mosque data into markers
  ];

 // Ensure mosque data is properly fetched

  return (
    <MapContainer
      center={[userLocation.latitude, userLocation.longitude]}
      zoom={12}
      style={{ height: "500px", width: "100%" }}
    >
      <ChangeView center={[userLocation.latitude, userLocation.longitude]} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Show loading message if fetching */}
      {isLoading && (
        <Popup position={[userLocation.latitude, userLocation.longitude]}>
          Loading nearby mosques...
        </Popup>
      )}

      {/* Render all markers */}
      {marker.map((marker) => (
        <Marker key={marker.id} position={marker.geocode} icon={markerIcon}>
          <Popup>{marker.popUp}</Popup>
        </Marker>
      ))}

    </MapContainer>
  );
}

export default Maps;
