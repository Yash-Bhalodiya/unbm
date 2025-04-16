import React from "react";
import {
  GoogleMap,
  useLoadScript,
  HeatmapLayer,
  Marker,
  Circle,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const libraries = ["visualization", "places", "geometry"];

export default function GoogleMapComponent({
  mapCenter,
  heatmapData,
  places,
  suggestedSpots = [],
  searchRadius = 3000, // default radius in meters
}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  // Filter function using Google Maps geometry API
  const isWithinRadius = (latLng) => {
    const center = new window.google.maps.LatLng(mapCenter.lat, mapCenter.lng);
    const point = new window.google.maps.LatLng(latLng.lat, latLng.lng);
    const distance = window.google.maps.geometry.spherical.computeDistanceBetween(center, point);
    return distance <= searchRadius;
  };

  // Filter heatmap points
  const filteredHeatmapData = heatmapData.filter((point) =>
    isWithinRadius({ lat: point.location.lat(), lng: point.location.lng() })
  );

  // Filter places (existing businesses)
  const filteredPlaces = places.filter((place) =>
    isWithinRadius({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    })
  );

  // Filter Gemini suggestions
  const filteredSuggestedSpots = suggestedSpots.filter((spot) =>
    isWithinRadius({ lat: spot.lat, lng: spot.lng })
  );

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={mapCenter}
      zoom={13.6}
    >
      {/* 🔵 Radius Visualization */}
      <Circle
        center={mapCenter}
        radius={searchRadius}
        options={{
          strokeColor: "#3b82f6",
          strokeOpacity: 0.4,
          strokeWeight: 2,
          fillColor: "#93c5fd",
          fillOpacity: 0.1,
        }}
      />

      {/* 🔥 Heatmap */}
      {filteredHeatmapData.length > 0 && (
        <HeatmapLayer
          data={filteredHeatmapData.map((point) => point.location)}
          options={{
            radius: 30,
            opacity: 0.6,
            maxIntensity: 100,
          }}
        />
      )}

      {/* 📍 Existing Business Markers */}
      {filteredPlaces.map((place, idx) => (
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

      {/* 🌱 Gemini Suggested Business Spots */}
      {filteredSuggestedSpots.map((spot, idx) => (
        <React.Fragment key={`gemini-suggestion-${idx}`}>
          <Marker
            position={{ lat: spot.lat, lng: spot.lng }}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
            }}
            title={`Gemini Suggestion #${idx + 1}`}
            aria-label={`Suggested Spot ${idx + 1}`}
          />
          <Circle
            center={{ lat: spot.lat, lng: spot.lng }}
            radius={300}
            options={{
              strokeColor: "#4ade80",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#bbf7d0",
              fillOpacity: 0.35,
            }}
          />
        </React.Fragment>
      ))}
    </GoogleMap>
  );
}
