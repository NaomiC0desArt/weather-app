export async function loadWeatherIcon(iconName) {
  try {
    let icon = undefined;

    if (iconName.includes("thunder-")) {
      icon = await import(`./assets/icons/thunder.svg`);
      return icon.default;
    } else if (iconName == "snow-shower-night") {
      icon = await import(`./assets/icons/snow.svg`);
      return icon.default;
    }

    icon = await import(`./assets/icons/${iconName}.svg`);
    return icon.default;
  } catch (err) {
    console.error("El icono no fue encontrado", err);
    const fallback = await import("./assets/icons/clear-day.svg");
    return fallback.default;
  }
}
