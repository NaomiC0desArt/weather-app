export { formatWeatherData, celciusToFahrenheit };

function formatWeatherData(jsonCrudo) {
  return {
    city: jsonCrudo.resolvedAddress,
    today: {
      temp: jsonCrudo.currentConditions.temp,
      description: jsonCrudo.days[0].description,
      date: convertDateToText(jsonCrudo.days[0].datetime),
      wind: jsonCrudo.currentConditions.windspeed,
      humidity: jsonCrudo.currentConditions.humidity,
      icon: jsonCrudo.currentConditions.icon,
    },
    hours: formatHours(jsonCrudo.days[0].hours),
    nextDays: formatDays(jsonCrudo.days),
  };
}

function formatHours(arrHours) {
  return arrHours
    .filter((hour) => getHour(hour.datetime) >= getCurrentHour())
    .map((hour) => {
      return {
        temp: hour.temp,
        hour: formatTo12Hour(hour.datetime),
        icon: hour.icon,
      };
    });
}

function formatDays(arrDays) {
  return arrDays.slice(1, 7).map((day) => {
    return {
      weekday: convertToDayOfTheWeek(day.datetime),
      temp: day.temp,
      icon: day.icon,
    };
  });
}

function convertDateToText(stringDate) {
  let options = {
    weeday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let date = new Date(stringDate);
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

function convertToDayOfTheWeek(stringDate) {
  const options = { weekday: "long" };
  const date = new Date(stringDate);
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

function getHour(stringHour) {
  return Number(stringHour.substring(0, 2));
}

function getCurrentHour() {
  return new Date().getHours();
}

function formatTo12Hour(stringHour) {
  const date = new Date(`2000-01-01T${stringHour}`);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: true,
  }).format(date);
}

function celciusToFahrenheit(temp){
  return Math.round((temp * 1.8) + 32);
}