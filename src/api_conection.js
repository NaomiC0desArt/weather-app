export class WeatherApiError extends Error {
  constructor(type, message) {
    super(message);
    this.type = type; //if network, api or not found
  }
}

async function getWeatherInfo(location) {
  try {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}/next7days?unitGroup=metric&elements=datetime,temp,humidity,windspeed,description,feelslike,uvindex,icon&include=days,hours,current&key=FZZ4MXU8CULUGK3XSJFMKNUQV&contentType=json`;
    const response = await fetch(url);

    if (response.status === 400 || response.status === 404) {
      throw new WeatherApiError("notFound", `City not found: ${location}`);
    }

    if (!response.ok) {
      throw new WeatherApiError("api", `API error: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (e) {
    if (e instanceof WeatherApiError) throw e;

    throw new WeatherApiError("network", e.message);
  }
}

export { getWeatherInfo };
