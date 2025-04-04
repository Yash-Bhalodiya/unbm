import React from "react";
import { GoogleMap, useLoadScript, HeatmapLayer } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const libraries = ["visualization"];

export default function GoogleMapComponent({ mapCenter, heatmapData }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAvvGJigGWrt9rVAViia3XpqAYkfFHZkZg",
    libraries,
  });

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading...</p>; // Prevent infinite loading

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={mapCenter} zoom={12}>
      {heatmapData.length > 0 && (
        <HeatmapLayer
          data={heatmapData.map((point) => point.location)}
          options={{
            radius: 60,
            opacity: 0.6,
            maxIntensity: 50,
          }}
        />
      )}
    </GoogleMap>
  );
}
