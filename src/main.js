import { reactive, createEffect, render } from "stitchjs-mini";

const state = reactive({
  selectedCity: "Sohag",
  weather: {
    temperature: "N/A",
    humidity: "N/A",
    description: "",
  },
});

const mockWeatherData = {
  Sohag: { temperature: "39°C", humidity: "55%", description: "Sunny" },
  Luxor: { temperature: "20°C", humidity: "35%", description: "Cloudy" },
  Aswan: { temperature: "2°C", humidity: "15%", description: "Cold" },
};

function fetchWeather(city) {
  setTimeout(() => {
    state.weather = reactive(mockWeatherData[city]);
  }, 200);
}

function updateSelectedCity(city) {
  state.selectedCity = city;
}

createEffect(() => {
  fetchWeather(state.selectedCity);
});

createEffect(() => {
  render(
    "#container",
    `
    <div class="card">
      <h2>Weather in ${state.selectedCity}</h2>
      <select id="citySelect">
        <option value="Sohag">Sohag</option>
        <option value="Luxor">Luxor</option>
        <option value="Aswan">Aswan</option>
      </select>
      <div class="weather-info">
        <p>🌡 Temperature: <strong>${state.weather.temperature}</strong></p>
        <p>💧 Humidity: <strong>${state.weather.humidity}</strong></p>
        <p>🌤 Description: <strong>${state.weather.description}</strong></p>
      </div>
    </div>
  `
  );

  const select = document.getElementById("citySelect");
  if (select) {
    select.value = state.selectedCity;
    select.onchange = (e) => updateSelectedCity(e.target.value);
  }
});

// 🌗 Theme Toggle
document.getElementById("toggleTheme").addEventListener("click", () => {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme");
  html.setAttribute("data-theme", current === "dark" ? "light" : "dark");
});
