import "./style.css";
import { getWeatherInfo, WeatherApiError } from "./api_conection";
import { formatWeatherData } from "./dataCleaner";
import {
  createWeatherCard,
  setIndoContainer,
  setLocation,
  creadeHourlySideBar,
} from "./ui";
import { obtainLocation } from "./location";
import { fetchLocationSuggestions } from "./autocomplete";
import { showLoading, showError, clearStatus } from "./ui-states";
import { saveLastCity, loadLastCity } from "./storage";

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

  clearSuggestions();
  await fetchAndRender(query);
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
    fetchAndRender(selected.value);
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
  const locationData = await obtainLocation();
  const city = locationData?.location?.city ?? "Santo Domingo Sur";
  const country = locationData?.location?.country ?? "DO";
  const query = `${city},${country}`;

  searchBar.value = query;
  await fetchAndRender(query);
});

//unit toggle
changeUnit.addEventListener("click", () => {
  currentUnit = currentUnit === "C" ? "F" : "C";
  changeUnit.textContent = `°${currentUnit === "C" ? "F" : "C"}`;
  renderView();
});

//render

async function fetchAndRender(query) {
  showLoading();

  try {
    const data = await getWeatherInfo(query);
    saveLastCity(query);
    populateView(data);
    clearStatus();
  } catch (e) {
    const type = e instanceof WeatherApiError ? e.type : "network";
    showError(type);
    console.error("fetchAndRender:", e.message);
  }
}

function populateView(data) {
  lastWeatherData = formatWeatherData(data);
  renderView();
}

async function renderView() {
  if (!lastWeatherData) return;
  setIndoContainer(lastWeatherData.today, currentUnit);
  createWeatherCard(lastWeatherData.nextDays, daysContainer, currentUnit);
  creadeHourlySideBar(lastWeatherData.hours, hourlyContainer, currentUnit);
  setLocation(lastWeatherData);
}

function populateSearchBar(info) {
  searchBar.value = info;
}

async function initApp() {
  const lastCity = loadLastCity() ?? "Santo Domingo,DO";
  await fetchAndRender(lastCity);
}

initApp();
