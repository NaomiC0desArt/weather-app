const LAST_CITY_KEY = "weather_last_city";

export function saveLastCity(cityQuery) {
  try {
    localStorage.setItem(LAST_CITY_KEY, cityQuery);
  } catch {
    //localstorage unavailable
  }
}

export function loadLastCity() {
  try {
    return localStorage.getItem(LAST_CITY_KEY);
  } catch {
    return null;
  }
}
