async function obtainLocation() {
  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const API_KEY = "25c03842b4mshb38353c2f114107p1d8317jsn560ac77901fa";

  try {
    const response = await fetch(
      `https://reverse-geocode1.p.rapidapi.com/city?latitude=${lat}&longitude=${lon}`,
      {
        headers: {
          "x-rapidapi-host": "reverse-geocode1.p.rapidapi.com",
          "x-rapidapi-key": API_KEY,
        },
      },
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export { obtainLocation };
