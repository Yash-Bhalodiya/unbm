import React from "react";
import {
  GoogleMap,
  useLoadScript,
  HeatmapLayer,
  Marker,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const libraries = ["visualization", "places"];

export default function GoogleMapComponent({
  mapCenter,
  heatmapData,
  places,
  suggestedSpots = [],
}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading map...</p>;
  // Alternatively: <ClipLoader size={50} color={"#123abc"} loading={true} />

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={mapCenter}
      zoom={13}
    >
      {/* 🔥 Heatmap */}
      {heatmapData.length > 0 && (
        <HeatmapLayer
          data={heatmapData.map((point) => point.location)}
          options={{
            radius: 60,
            opacity: 0.6,
            maxIntensity: 100,
          }}
        />
      )}
      

      {/* 📍 Existing Business Markers */}
      {places.map((place, idx) => (
        <Marker
          key={`place-${idx}`}
          position={{
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          }}
          title={place.name}
          aria-label={`Business: ${place.name}`}
        />
      ))}

      {/* 🌱 Suggested Business Locations */}
      {suggestedSpots.map((spot, idx) => (
        <Marker
          key={`suggested-${idx}`}
          position={{ lat: spot.lat, lng: spot.lng }}
          icon={{
            url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png", // HTTPS
          }}
          title="Suggested Location"
          aria-label="Suggested Spot for New Business"
        />
      ))}
    </GoogleMap>
  );
}
