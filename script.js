document.addEventListener("DOMContentLoaded", () => {
  getWeatherByLocation(); // Automatically get weather when the page loads
});

function getWeatherByLocation() {
  if ("geolocation" in navigator) {
    console.log("Geolocation is supported! Requesting location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Geolocation success!"); // ✅ Added log
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetchWeatherByCoords(lat, lon);
      },
      (error) => {
        document.getElementById("weatherResult").innerHTML =
          "<p>Geolocation not allowed. Enter city manually.</p>";
      },
      { enableHighAccuracy: true }
    );
  } else {
    console.log("Geolocation is NOT supported.");
    document.getElementById("weatherResult").innerHTML =
      "<p>Geolocation not supported.</p>";
  }
}

function fetchWeatherByCoords(lat, lon) {
  const apiKey = "OUR_API_KEY";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => updateWeatherUI(data))
    .catch((error) => console.error("Error fetching weather:", error));
}

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    document.getElementById("weatherResult").innerHTML =
      "<p>Please enter a city name!</p>";
    return;
  }

  const apiKey = "YOUR_API_KEY";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      updateWeatherUI(data);
      cityInput.value = "";
    })
    .catch((error) => console.error("Error:", error));
}

function updateWeatherUI(data) {
  if (data.cod === 200) {
    document.getElementById("weatherResult").innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">
        `;
  } else {
    document.getElementById("weatherResult").innerHTML =
      "<p>City not found!</p>";
  }
}
