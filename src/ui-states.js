const weatherInfoContainer = document.querySelector(".weather-info-container");
const daysContainer = document.querySelector(".weather-by-day-container");
const hourlyContainer = document.querySelector(".hourly-list");

export function showLoading() {
  setContainersOpacity(0.4);

  const existing = document.querySelector(".status-message");
  if (existing) existing.remove();

  const msg = document.createElement("div");
  msg.classList.add("status-message", "status-loading");
  msg.innerHTML = `
    <div class="status-spinner"></div>
    <p>Loading weather data...</p>
  `;
  document.querySelector(".container").appendChild(msg);
}

export function showError(type = "network") {
  setContainersOpacity(0.4);

  const existing = document.querySelector(".status-message");
  if (existing) existing.remove();

  const messages = {
    notFound: {
      icon: "location_off",
      title: "City not found",
      sub: "Try a different city name or check the spelling.",
    },
    network: {
      icon: "wifi_off",
      title: "Connection error",
      sub: "Check your internet connection and try again.",
    },
    api: {
      icon: "cloud_off",
      title: "Weather service unavailable",
      sub: "Our weather provider is temporarily down. Try again in a moment.",
    },
  };

  const { icon, title, sub } = messages[type] ?? messages.network;

  const msg = document.createElement("div");
  msg.classList.add("status-message", "status-error");
  msg.innerHTML = `
    <span class="material-symbols-outlined status-icon">${icon}</span>
    <p class="status-title">${title}</p>
    <p class="status-sub">${sub}</p>
  `;
  document.querySelector(".container").appendChild(msg);
}

export function clearStatus() {
  const existing = document.querySelector(".status-message");
  if (existing) existing.remove();
  setContainersOpacity(1);
}

function setContainersOpacity(value) {
  [weatherInfoContainer, daysContainer, hourlyContainer].forEach((el) => {
    if (el) el.style.opacity = value;
  });
}