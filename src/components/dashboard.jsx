import React, { useState } from "react";
import GoogleMapComponent from "./GoogleMapComponent";

const defaultCenter = { lat: 19.076, lng: 72.8777 }; // Default to Mumbai

export default function Dashboard() {
  const [city, setCity] = useState("");
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [heatmapData, setHeatmapData] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyAvvGJigGWrt9rVAViia3XpqAYkfFHZkZg`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setMapCenter({ lat, lng });

        generateHeatmapPoints(lat, lng);
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const generateHeatmapPoints = (lat, lng) => {
    const points = [];
    for (let i = 0; i < 200; i++) {
      points.push({
        location: new window.google.maps.LatLng(
          lat + (Math.random() - 0.5) * 0.1,
          lng + (Math.random() - 0.5) * 0.1
        ),
        weight: Math.floor(Math.random() * 50) + 10,
      });
    }
    setHeatmapData(points);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border p-2 rounded"
      />
      <button onClick={handleSearch} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
        Show Population Heatmap
      </button>
      {/* Dropdown on the Right Side */}
      <select className="ml-2 border p-2 rounded">
        <option value="restaurant">Restaurant</option>
        <option value="hospital">Hospital</option>
        <option value="school">School</option>
        <option value="hotel">Hotel</option>
        <option value="mall">Shopping Mall</option>
        </select>

      <GoogleMapComponent mapCenter={mapCenter} heatmapData={heatmapData} />
    </div>
  );
}
