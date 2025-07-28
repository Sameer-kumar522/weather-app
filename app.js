const apiKey = "f583dedc41b76ad13651c8504be9003e";

const cityName = document.getElementById("cityName");
const cityInput = document.getElementById("city");
const submit = document.getElementById("submit");

const Wind_speed2 = document.getElementById("wind_speed2");
const Temp = document.getElementById("temp");
const Feels_like = document.getElementById("feels_like");
const Humidity = document.getElementById("humidity");
const Min_temp = document.getElementById("min_temp");
const Max_temp = document.getElementById("max_temp");
const Wind_speed = document.getElementById("wind_speed");
const Wind_degree = document.getElementById("wind_degree");
const Sunrise = document.getElementById("sunrise");
const Sunset = document.getElementById("sunset");
const weatherBody = document.getElementById("weather-table-body");

const Temp2 = document.getElementById("temp2");
const Humidity2 = document.getElementById("humidity2");

const cities = ["Lahore", "Boston", "Islamabad", "Peshawar", "Melbourne", "London"];
async function addCityToTable(city) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${city}</td>
      <td>${data.main.temp}°C</td>
      <td>${data.main.feels_like}°C</td>
      <td>${data.main.humidity}%</td>
      <td>${data.main.temp_min}°C</td>
      <td>${data.main.temp_max}°C</td>
      <td>${data.wind.speed} m/s</td>
      <td>${data.wind.deg}°</td>
      <td>${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</td>
      <td>${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</td>
    `;
    weatherBody.appendChild(row);
  } catch (error) {
    console.error("Error loading", city, error);
    const row = document.createElement("tr");
    row.innerHTML = `<td>${city}</td><td colspan="10">Error loading data</td>`;
    weatherBody.appendChild(row);
  }
}

// ✅ Call this once at the beginning
cities.forEach(city => addCityToTable(city));

// ✅ Search functionality — still works
async function checkWeather(city) {
  try {
    cityName.innerHTML = city;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    Temp.innerHTML = data.main.temp + "°C";
    Feels_like.innerHTML = data.main.feels_like + "°C";
    Humidity.innerHTML = data.main.humidity + "%";
    Min_temp.innerHTML = data.main.temp_min + "°C";
    Max_temp.innerHTML = data.main.temp_max + "°C";
    Wind_speed.innerHTML = data.wind.speed + " m/s";
    Wind_degree.innerHTML = data.wind.deg + "°";
    Sunrise.innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    Sunset.innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    if (Temp2) Temp2.innerHTML = data.main.temp;
    if (Humidity2) Humidity2.innerHTML = data.main.humidity;
    if (Wind_speed2) Wind_speed2.innerHTML = data.wind.speed;

  } catch (error) {
    alert("City not found or API error.");
  }
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city !== "") {
    checkWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});


checkWeather("Karachi");
