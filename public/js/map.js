document.addEventListener("DOMContentLoaded", async function () {
  const geocodeUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    listingLocation
  )}&apiKey=${mapToken}`;

  try {
    const response = await fetch(geocodeUrl);
    const data = await response.json();

    if (data.features.length === 0) {
      console.error("No location found");
      return;
    }

    const coords = data.features[0].geometry.coordinates;
    const lat = coords[1];
    const lon = coords[0];

    const map = L.map("map").setView([lat, lon], 12);

    L.tileLayer(
      `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${mapToken}`,
      {
        maxZoom: 20,
      }
    ).addTo(map);

    L.marker([lat, lon]).addTo(map).bindPopup(title).openPopup();

    // L.marker( [lat, lon]).addTo(map).bindPopup(title).openPopup();
  } catch (err) {
    console.error("Error fetching geocoding data:", err);
  }
});