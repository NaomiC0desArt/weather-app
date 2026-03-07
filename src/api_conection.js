const ciudad = "Santo Domingo";
const pais = "DO";

async function getWeatherInfo(location) {
  try {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}/next7days?unitGroup=metric&elements=datetime,temp,humidity,windspeed,description,feelslike,uvindex,icon&include=days,hours,current&key=FZZ4MXU8CULUGK3XSJFMKNUQV&contentType=json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("HTTP error " + response.status);
    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
  }
}

export { getWeatherInfo };
