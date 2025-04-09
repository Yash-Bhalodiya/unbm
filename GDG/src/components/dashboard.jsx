import React, { useState } from "react";
import GoogleMapComponent from "./GoogleMapComponent";

const defaultCenter = { lat: 19.076, lng: 72.8777 }; // Mumbai

export default function Dashboard() {
  const [city, setCity] = useState("");
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [heatmapData, setHeatmapData] = useState([]);
  const [places, setPlaces] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState("restaurant");
  const [suggestedSpots, setSuggestedSpots] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        const newCenter = { lat, lng };
        setMapCenter(newCenter);
        setHeatmapData([]);
        setPlaces([]);
        setSuggestedSpots([]);
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const generateHeatmap = () => {
    const points = [];
    for (let i = 0; i < 300; i++) {
      points.push({
        location: new window.google.maps.LatLng(
          mapCenter.lat + (Math.random() - 0.5) * 0.1,
          mapCenter.lng + (Math.random() - 0.5) * 0.1
        ),
        weight: Math.floor(Math.random() * 50) + 10,
      });
    }
    setHeatmapData(points);
    setPlaces([]);
    setSuggestedSpots([]);
  };

  const fetchBusinessMarkers = () => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    const request = {
      location: new window.google.maps.LatLng(mapCenter.lat, mapCenter.lng),
      radius: "5000",
      type: selectedBusiness,
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);
        setHeatmapData([]);
        suggestBusinessSpots(results);
      } else {
        console.error("Places request failed:", status);
      }
    });
  };

  const suggestBusinessSpots = (existingPlaces) => {
    const suggestions = [];
    for (let i = 0; i < 10; i++) {
      const lat = mapCenter.lat + (Math.random() - 0.5) * 0.1;
      const lng = mapCenter.lng + (Math.random() - 0.5) * 0.1;
      const nearbyCount = existingPlaces.filter((place) => {
        const placeLat = place.geometry.location.lat();
        const placeLng = place.geometry.location.lng();
        const dist = Math.sqrt(Math.pow(placeLat - lat, 2) + Math.pow(placeLng - lng, 2));
        return dist < 0.01;
      }).length;

      if (nearbyCount < 3) {
        suggestions.push({ lat, lng });
      }
    }
    setSuggestedSpots(suggestions);
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
          Search City
        </button>
        <select
          value={selectedBusiness}
          onChange={(e) => setSelectedBusiness(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="restaurant">Restaurant</option>
          <option value="hospital">Hospital</option>
          <option value="school">School</option>
          <option value="hotel">Hotel</option>
          <option value="shopping_mall">Shopping Mall</option>
        </select>
        <button onClick={generateHeatmap} className="bg-red-500 text-white px-4 py-2 rounded">
          Show Heatmap
        </button>
        <button onClick={fetchBusinessMarkers} className="bg-green-600 text-white px-4 py-2 rounded">
          Show Businesses
        </button>
      </div>

      <GoogleMapComponent
        mapCenter={mapCenter}
        heatmapData={heatmapData}
        places={places}
        suggestedSpots={suggestedSpots}
      />
    </div>
  );
}
