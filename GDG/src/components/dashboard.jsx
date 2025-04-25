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
  const [loadingGemini, setLoadingGemini] = useState(false);
//yash


  // Inputs for Gemini
  const [targetCustomers, setTargetCustomers] = useState("Family");
  const [competition, setCompetition] = useState("Low");
  const [workingHours, setWorkingHours] = useState("9AM-9PM");
  const [delivery, setDelivery] = useState("Yes");
  const [searchRadius, setSearchRadius] = useState(3000);

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
      radius: searchRadius.toString(),
      type: selectedBusiness,
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);
        setHeatmapData([]);
        setSuggestedSpots([]);
      } else {
        console.error("Places request failed:", status);
      }
    });
  };

  const callGeminiForSuggestions = async () => {
    if (!city) return;

   const prompt = `
Suggest exactly 5 distinct coordinates (latitude and longitude pairs in strict format Lat: <value>, Lng: <value>) within ${searchRadius} meters of ${city} ideal to open ${selectedBusiness} with
Target Customers ${targetCustomers}, Competition preference ${competition}, Working Hours ${workingHours}, Delivery Services ${delivery}.
  `;
    

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error: ${errorText}`);
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      const matches = [...text.matchAll(/Lat:\s*([\d.-]+),\s*Lng:\s*([\d.-]+)/gi)];
      const coordinates = matches.map((m) => ({
        lat: parseFloat(m[1]),
        lng: parseFloat(m[2]),
      }));

      setSuggestedSpots([]); // Clear old suggestions
      setSuggestedSpots(coordinates);

    } catch (error) {
      console.error("Gemini API call failed:", error);
    } finally {
      setLoadingGemini(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="bg-[#48CFCB] w-80 p-5 space-y-4 text-white flex-shrink-0 overflow-y-auto">
        <h1 className="text-xl font-bold">Business Input</h1>

        <label className="block font-semibold">Type of Business</label>
        <select
          value={selectedBusiness}
          onChange={(e) => setSelectedBusiness(e.target.value)}
          className="w-full p-2 rounded text-black bg-[#F1F5F9]"
        >
          <option value="bakery">Cake Shop</option>
          <option value="pharmacy">Pharmacy</option>
          <option value="laundry">Laundry</option>
        </select>

        <label className="block font-semibold">Target Area</label>
        <input
          type="text"
          placeholder="Location, PINcode or Coordinates"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 border rounded text-black bg-[#F1F5F9]"
        />

        <label className="block font-semibold">Search Radius (meters)</label>
        <input
          type="number"
          value={searchRadius}
          onChange={(e) => setSearchRadius(Number(e.target.value))}
          className="w-full p-2 border rounded text-black bg-[#F1F5F9]"
          placeholder="e.g. 3000"
          min="500"
        />

        <label className="block font-semibold">Target Customers</label>
        <select
          value={targetCustomers}
          onChange={(e) => setTargetCustomers(e.target.value)}
          className="w-full p-2 rounded text-black bg-[#F1F5F9]"
        >
          <option>Family</option>
          <option>Students</option>
        </select>

        <label className="block font-semibold">Competition Preference	</label>
        <select
          value={competition}
          onChange={(e) => setCompetition(e.target.value)}
          className="w-full p-2 rounded text-black bg-[#F1F5F9]"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <label className="block font-semibold">Working Hours</label>
        <select
          value={workingHours}
          onChange={(e) => setWorkingHours(e.target.value)}
          className="w-full p-2 rounded text-black bg-[#F1F5F9]"
        >
          <option>9AM-9PM</option>
          <option>24/7</option>
          <option>Custom Hours</option>
        </select>

        <label className="block font-semibold">Delivery Services</label>
        <select
          value={delivery}
          onChange={(e) => setDelivery(e.target.value)}
          className="w-full p-2 rounded text-black bg-[#F1F5F9]"
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
            Show Nearby Businesses
          </button>
          <button
  onClick={async () => {
    setLoadingGemini(true);
    await callGeminiForSuggestions();
    setLoadingGemini(false);
  }}
  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-semibold px-4 py-2 rounded shadow hover:shadow-md transition"
  disabled={loadingGemini}
>
  {loadingGemini ? "Thinking..." : "Get Suggested Locations"}
</button>
<button
  onClick={() => window.print()}
  className="w-full bg-gray-700 text-white font-semibold px-4 py-2 rounded hover:bg-gray-800 transition"
>
🖨 Print Results
</button>


        </div>
      </aside>

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