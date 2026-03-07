export { createWeatherCard, setIndoContainer, setLocation, creadeHourlySideBar };
import { loadWeatherIcon } from "./helper.js";
import { celciusToFahrenheit } from "./dataCleaner.js";

async function createWeatherCard(dataArr, container, unit) {
  container.innerHTML = "";

  for (const day of dataArr) {
    const displayTemp = unit === "F" ? celciusToFahrenheit(day.temp) : day.temp;

    const card = document.createElement("div");
    card.classList.add("weather-day-card");

    const dayOfweek = document.createElement("h3");
    dayOfweek.classList.add("dayOfWeek");
    dayOfweek.textContent = day.weekday;

    const weatherIcon = document.createElement("img");
    weatherIcon.classList.add("weather-icon");
    weatherIcon.src = await loadWeatherIcon(day.icon);

    const temp = document.createElement("p");
    temp.classList.add("temp-by-day");
    temp.innerHTML = `${displayTemp}<span class="temp-unit">°${unit}</span>`;

    card.appendChild(dayOfweek);
    card.appendChild(weatherIcon);
    card.appendChild(temp);
    container.appendChild(card);
  }
}

function setIndoContainer(data, unit) {
  const displayTemp = unit === "F" ? celciusToFahrenheit(data.temp) : data.temp;

  const temp = document.querySelector("#temp");
  temp.innerHTML = `${displayTemp}<span class="temp-unit">°${unit}</span>`;

  const description = document.querySelector("#desc");
  description.textContent = data.description;

  const humidity = document.querySelector("#humidity");
  humidity.textContent = `${data.humidity} %`;

  const wind = document.querySelector("#wind");
  wind.textContent = `${data.wind} km/h`;
}

function setLocation(data) {
  const location = document.querySelector("#locationName");
  location.textContent = data.city;
  const date = document.querySelector("#date");
  date.textContent = `(${data.today.date})`;
}

async function creadeHourlySideBar(hoursArr, container, unit) {
  container.innerHTML = "";

  for (const day of hoursArr) {
    const displayTemp = unit === "F" ? celciusToFahrenheit(day.temp) : day.temp;

    const card = document.createElement("div");
    card.classList.add("hour-item");

    const hour = document.createElement("span");
    hour.classList.add("hour");
    hour.textContent = day.hour;

    const weatherIcon = document.createElement("img");
    weatherIcon.classList.add("weather-icon");
    weatherIcon.src = await loadWeatherIcon(day.icon);

    const temp = document.createElement("p");
    temp.classList.add("temp-by-day");
    temp.innerHTML = `${displayTemp}<span class="temp-unit">°${unit}</span>`;

    card.appendChild(hour);
    card.appendChild(weatherIcon);
    card.appendChild(temp);
    container.appendChild(card);
  }
}
