async function fetchLocationSuggestions(query) {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en`
    );
    const data = await response.json();

    if (!data.results) return [];

    return data.results.map((place) => ({
      label: [place.name, place.admin1, place.country_code]
        .filter(Boolean)
        .join(", "),
      value: `${place.name},${place.country_code}`,
    }));
  } catch (err) {
    console.error("Autocomplete error:", err);
    return [];
  }
}

export { fetchLocationSuggestions };