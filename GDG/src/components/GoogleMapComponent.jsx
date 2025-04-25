import React, { useRef, useEffect, useState, useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  HeatmapLayer,
  Marker,
  Circle,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const libraries = ["visualization", "places", "geometry"];

export default function GoogleMapComponent({
  mapCenter,
  heatmapData = [],
  places = [],
  suggestedSpots = [],
  searchRadius = 3000,
}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [mapRef, setMapRef] = useState(null);
  const suggestionMarkersRef = useRef([]);
  const suggestionCirclesRef = useRef([]);

  // Helper to check radius
  const isWithinRadius = (latLng) => {
    const center = new window.google.maps.LatLng(mapCenter.lat, mapCenter.lng);
    const point = new window.google.maps.LatLng(latLng.lat, latLng.lng);
    const distance = window.google.maps.geometry.spherical.computeDistanceBetween(center, point);
    return distance <= searchRadius;
  };

  const filteredHeatmapData = useMemo(() => {
    return heatmapData.filter((point) =>
      isWithinRadius({
        lat: point.location.lat(),
        lng: point.location.lng(),
      })
    );
  }, [heatmapData, mapCenter, searchRadius]);

  const filteredPlaces = useMemo(() => {
    return places.filter((place) =>
      isWithinRadius({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      })
    );
  }, [places, mapCenter, searchRadius]);

  const filteredSuggestedSpots = useMemo(() => {
    return suggestedSpots.filter((spot) =>
      isWithinRadius({ lat: spot.lat, lng: spot.lng })
    );
  }, [suggestedSpots, mapCenter, searchRadius]);

  useEffect(() => {
    if (!mapRef || !window.google) return;

    // Clear previous markers/circles
    suggestionMarkersRef.current.forEach((marker) => marker.setMap(null));
    suggestionCirclesRef.current.forEach((circle) => circle.setMap(null));
    suggestionMarkersRef.current = [];
    suggestionCirclesRef.current = [];

    // Render new consistent suggestions
    filteredSuggestedSpots.forEach((spot, idx) => {
      const marker = new window.google.maps.Marker({
        position: { lat: spot.lat, lng: spot.lng },
        map: mapRef,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
        },
        title: `Gemini Suggestion #${idx + 1}`,
      });

      const circle = new window.google.maps.Circle({
        strokeColor: "#4ade80",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#bbf7d0",
        fillOpacity: 0.35,
        map: mapRef,
        center: { lat: spot.lat, lng: spot.lng },
        radius: 300,
      });

      suggestionMarkersRef.current.push(marker);
      suggestionCirclesRef.current.push(circle);
    });
  }, [filteredSuggestedSpots, mapRef]);

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={mapCenter}
      zoom={13.6}
      onLoad={setMapRef}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {/* 🔵 Radius Circle */}
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

      {/* 🔥 Heatmap Layer */}
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

      {/* 📍 Existing Businesses */}
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
    </GoogleMap>
  );
}
