import React, { useState } from "react";
import GoogleMapComponent from "./GoogleMapComponent";

const defaultCenter = { lat: 19.076, lng: 72.8777 }; // Mumbai

export default function Dashboard() {
  const [city, setCity] = useState("");
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [heatmapData, setHeatmapData] = useState([]);
  const [places, setPlaces] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState("bakery");
  const [suggestedSpots, setSuggestedSpots] = useState([]);

  // Inputs for Gemini
  const [targetCustomers, setTargetCustomers] = useState("Family");
  const [competition, setCompetition] = useState("Low");
  const [workingHours, setWorkingHours] = useState("9AM-9PM");
  const [delivery, setDelivery] = useState("Yes");

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setMapCenter({ lat, lng });
        setHeatmapData([]);
        setPlaces([]);
        setSuggestedSpots([]);
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const generateHeatmap = () => {
    const points = Array.from({ length: 600 }, () => ({
      location: new window.google.maps.LatLng(
        mapCenter.lat + (Math.random() - 0.5) * 0.1,
        mapCenter.lng + (Math.random() - 0.5) * 0.1
      ),
      weight: Math.floor(Math.random() * 50) + 10,
    }));
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
    for (let i = 0; i < 15; i++) {
      const lat = mapCenter.lat + (Math.random() - 0.5) * 0.1;
      const lng = mapCenter.lng + (Math.random() - 0.5) * 0.1;
      const nearbyCount = existingPlaces.filter((place) => {
        const placeLat = place.geometry.location.lat();
        const placeLng = place.geometry.location.lng();
        const dist = Math.sqrt((placeLat - lat) ** 2 + (placeLng - lng) ** 2);
        return dist < 0.01;
      }).length;

      if (nearbyCount < 3) {
        suggestions.push({ lat, lng });
      }
    }
    setSuggestedSpots(suggestions);
  };

  const callGeminiForSuggestions = async () => {
    const prompt = `
    Suggest 5 ideal coordinates in ${city} to start a ${selectedBusiness}. Criteria:
    - Target Customers: ${targetCustomers}
    - Nearby Competition: ${competition}
    - Working Hours: ${workingHours}
    - Delivery Services: ${delivery}
    Return only coordinates in this format:
    Lat: <value>, Lng: <value>
    `.trim();
  
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: prompt }],
              },
            ],
          })
        }
      );
  
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`API Error: ${response.status} - ${text}`);
      }
  
      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  
      const matches = [...text.matchAll(/Lat:\s*([\d.]+),\s*Lng:\s*([\d.]+)/gi)];
      const coordinates = matches.map((match) => ({
        lat: parseFloat(match[1]),
        lng: parseFloat(match[2]),
      }));
  
      setSuggestedSpots(coordinates);
      setHeatmapData([]);
      setPlaces([]);
    } catch (error) {
      console.error("Gemini API call error:", error);
    }
  };
  
  
  const extractCoordinates = (response) => {
    const text = response.choices?.[0]?.text || response.candidates?.[0]?.output || "";
    const matches = [...text.matchAll(/Lat:\s*([\d.]+),\s*Lng:\s*([\d.]+)/gi)];
    return matches.map(match => ({
      lat: parseFloat(match[1]),
      lng: parseFloat(match[2]),
    }));
  };

return (
  <div className="flex h-screen overflow-hidden">
    {/* Sidebar */}
    <aside className="bg-[#48CFCB] w-80 p-5 space-y-4 text-white flex-shrink-0 overflow-y-auto">
      <h1 className="text-xl font-bold">Business Input</h1>

      <label className="block font-semibold text-[#F8FAFC]">Type of Business</label>
      <select
        value={selectedBusiness}
        onChange={(e) => setSelectedBusiness(e.target.value)}
        className="w-full p-2 rounded border border-[#CBD5E1] text-black bg-[#F1F5F9]"
      >
        <option value="bakery">Cake Shop</option>
        <option value="pharmacy">Pharmacy</option>
        <option value="laundry">Laundry</option>
      </select>

      <label className="block font-semibold text-[#F8FAFC]">Location</label>
      <input
        type="text"
        placeholder="E.g. Pune City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full p-2 border border-[#CBD5E1] rounded text-black bg-[#F1F5F9]"
      />

      <label className="block font-semibold text-[#F8FAFC]">Target Customers</label>
      <select
        value={targetCustomers}
        onChange={(e) => setTargetCustomers(e.target.value)}
        className="w-full p-2 rounded border border-[#CBD5E1] text-black bg-[#F1F5F9]"
      >
        <option>Family</option>
        <option>Students</option>
      </select>

      <label className="block font-semibold text-[#F8FAFC]">Nearby Competition</label>
      <select
        value={competition}
        onChange={(e) => setCompetition(e.target.value)}
        className="w-full p-2 rounded border border-[#CBD5E1] text-black bg-[#F1F5F9]"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <label className="block font-semibold text-[#F8FAFC]">Working Hours</label>
      <select
        value={workingHours}
        onChange={(e) => setWorkingHours(e.target.value)}
        className="w-full p-2 rounded border border-[#CBD5E1] text-black bg-[#F1F5F9]"
      >
        <option>9AM-9PM</option>
        <option>24/7</option>
        <option>Custom Hours</option>
      </select>

      <label className="block font-semibold text-[#F8FAFC]">Delivery Services</label>
      <select
        value={delivery}
        onChange={(e) => setDelivery(e.target.value)}
        className="w-full p-2 rounded border border-[#CBD5E1] text-black bg-[#F1F5F9]"
      >
        <option>Yes</option>
        <option>No</option>
      </select>

      <div className="space-y-2 pt-4">
        <button
          onClick={handleSearch}
          className="w-full bg-[#3B82F6] text-white px-4 py-2 rounded"
        >
          Search Location
        </button>
        <button
          onClick={generateHeatmap}
          className="w-full bg-[#EF4444] text-white px-4 py-2 rounded"
        >
          Generate Heatmap
        </button>
        <button
          onClick={fetchBusinessMarkers}
          className="w-full bg-[#10B981] text-white px-4 py-2 rounded"
        >
          Find Similar Businesses
        </button>
        <button
          onClick={callGeminiForSuggestions}
          className="w-full bg-[#FBBF24] text-black px-4 py-2 rounded font-bold"
        >
          Get Gemini Suggestions
        </button>
      </div>
    </aside>

    {/* Map Section */}
    <main className="flex-grow h-full">
      <GoogleMapComponent
        mapCenter={mapCenter}
        heatmapData={heatmapData}
        places={places}
        suggestedSpots={suggestedSpots}
      />
    </main>
  </div>
);

}
