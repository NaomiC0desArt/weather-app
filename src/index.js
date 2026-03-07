import "./style.css";
import { getWeatherInfo } from "./api_conection";
import { formatWeatherData } from "./dataCleaner";
import {
  createWeatherCard,
  setIndoContainer,
  setLocation,
  creadeHourlySideBar,
} from "./ui";
import { obtainLocation } from "./location";
import { fetchLocationSuggestions } from "./autocomplete";

//state for cel or far
let currentUnit = "C";
let lastWeatherData = null;
let currentSuggestions = [];

const searchIcon = document.querySelector(".search-icon");
const daysContainer = document.querySelector(".weather-by-day-container");
const searchBar = document.querySelector("#search-bar");
const form = document.querySelector("form");
const getLocation = document.querySelector(".my-location");
const changeUnit = document.querySelector(".unit-toggle");
const hourlyContainer = document.querySelector(".hourly-list");
const datalist = document.querySelector("#suggestions");

//search
searchIcon.addEventListener("click", async () => {
  const query = searchBar.value.trim();
  if (query === "") return;

  const data = await getWeatherInfo(query);
  if (data) {
    populateView(data);
  }
});

searchBar.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchIcon.click();
});

form.addEventListener("submit", (E) => {
  E.preventDefault();
});

//autocomplete
let debounceTimer;

searchBar.addEventListener("input", () => {
  clearTimeout(debounceTimer);

  const query = searchBar.value.trim();

  if (query.length < 2) {
    clearSuggestions();
    return;
  }

  debounceTimer = setTimeout(() => showSuggestions(query), 300);
});

searchBar.addEventListener("change", () => {
  const selected = currentSuggestions.find((s) => s.label === searchBar.value);

  if (selected) {
    searchBar.value = selected.label; 
    clearSuggestions();
    getWeatherInfo(selected.value).then((data) => {
      if (data) populateView(data);
    });
  }
});

async function showSuggestions(query) {
  currentSuggestions = await fetchLocationSuggestions(query);
  clearSuggestions();

  currentSuggestions.forEach(({ label }) => {
    const option = document.createElement("option");
    option.value = label;
    datalist.appendChild(option);
  });
}

function clearSuggestions() {
  datalist.innerHTML = "";
}

//geolocation
getLocation.addEventListener("click", async () => {
  const data = await obtainLocation();
  let city = "Santo Domingo Sur";
  let country = "DO";

  if (data) {
    console.log(data.location);
    city = data.location.city;
    country = data.location.country;

    let location = `${city},${country}`;
    populateSearchBar(location);
    const dataWeather = await getWeatherInfo(location);
    populateView(dataWeather);
  } else {
    const dataWeather = await getWeatherInfo(`${city},${country}`);
    populateView(dataWeather);
  }
});

//unit toggle
changeUnit.addEventListener("click", () => {
  currentUnit = currentUnit === "C" ? "F" : "C";
  changeUnit.textContent = `°${currentUnit === "C" ? "F" : "C"}`;
  renderView();
});

function populateView(data) {
  lastWeatherData = formatWeatherData(data); 
  renderView();
}

async function renderView() {
  setIndoContainer(lastWeatherData.today, currentUnit);
  createWeatherCard(lastWeatherData.nextDays, daysContainer, currentUnit);
  creadeHourlySideBar(lastWeatherData.hours, hourlyContainer, currentUnit);
  setLocation(lastWeatherData);
}

function populateSearchBar(info) {
  searchBar.value = info;
}


async function initApp() {
   try {
    const data = await getWeatherInfo("Santo Domingo,DO");
    if (!data) {
      console.error("API returned no data");
      return;
    }
    populateView(data);
  } catch (e) {
    console.error("initApp failed:", e);
  }
}

initApp();