document.addEventListener('DOMContentLoaded', function () {
    const weatherSection = document.getElementById('weather');
    const form = document.querySelector('form');
    const searchInput = document.getElementById('weather-search');
    const apiKey = '349afb2a9869a89854e4a871186ec3d8';

    // Function to fetch weather data
    function fetchWeatherData(userQuery) {
    const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
    const queryString = `?units=imperial&appid=${apiKey}&q=${userQuery}`;
    const fetchURL = weatherUrl + queryString;

    fetch(fetchURL)
        .then((response) => {
        if (!response.ok) {
            throw new Error('Location not found');
    }
        return response.json();
        })
        .then((data) => {
        displayWeatherData(data);
        })
        .catch(() => {
        displayError();
        });
    }

    // Function to display weather data
    function displayWeatherData(data) {
    const city = data.name;
    const country = data.sys.country;
    const description = data.weather[0].description;
      const temp = data.main.temp.toFixed(2);  // Fahrenheit temperature
      const feelsLike = data.main.feels_like.toFixed(2);  // Perceived temperature in Fahrenheit
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const lat = data.coord.lat;
    const lon = data.coord.lon;
      const lastUpdated = new Date(data.dt * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      });
  
      // Construct the weather display
      weatherSection.innerHTML = `
        <h2>${city}, ${country}</h2>
        <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="_BLANK">Click to view map</a>
        <img src="${iconUrl}" alt="${description}">
        <p style="text-transform: capitalize;">${description}</p><br>
        <p>Current: ${temp}° F</p>
        <p>Feels like: ${feelsLike}° F</p><br>
        <p>Last updated: ${lastUpdated}</p>
    `;

      // Clear the search input field
    searchInput.value = '';
    }

    // Function to display error message
    function displayError() {
    weatherSection.innerHTML = `
        <h2>Location not found</h2>
    `;
    searchInput.value = '';
    }

    // Form submit event handler
    form.addEventListener('submit', function (e) {
    e.preventDefault();
        const userQuery = searchInput.value.trim();
    if (userQuery) {
        // Clear previous weather data
        weatherSection.innerHTML = '';
        fetchWeatherData(userQuery);
    }
    });
});  