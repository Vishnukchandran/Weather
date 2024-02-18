const apikey = "99e8cd061169796a88f368cfa2e6c297"; //Api key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";  //API link
 
//Function to fetch weather data by location
function getWeather() {
  const locationInput = document.getElementById("location");
  const city = locationInput.value;

  fetchWeather(city)
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error.message);
    });
}

// Function to fetch weather data from the API
function fetchWeather(city) {
  return new Promise((resolve, reject) => {
    const url = `${apiUrl}?q=${encodeURIComponent(city)}&appid=${apikey}`;
    fetch(url)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Function to display weather 
function displayWeather(data) {
  const weatherInfo = document.getElementById("weather-info");
  weatherInfo.innerHTML = `
    <h2>Weather Information for ${data.name}</h2>
    <p>Temperature: ${KtoC(data.main.temp)}°C</p>
    <p>Description: ${data.weather[0].description}</p>
  `;
}

//convert temperature from Kelvin to Celsius
function KtoC(K) {
  return Math.round(K - 273.15);
}
