const apiKey = '886705b4c1182eb1c69f28eb8c520e20';
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city !== '') {
    getWeather(city);
  } else {
    alert('Please enter a city name');
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (data.cod === '404') {
      const retry = confirm('City not found. Do you want to try again?');
      if (retry) {
        const userInput = prompt('Please enter the city name again:');
        if (userInput) {
          getWeather(userInput.trim());
        } else {
          weatherInfo.innerHTML = 'No city entered';
        }
      } else {
        weatherInfo.innerHTML = 'City not found';
      }
    } else if (data.cod !== 200) {
      weatherInfo.innerHTML = 'Something went wrong';
    } else {
      // Display weather information
      const weatherDetails = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon"></p>
        <p>Weather Description: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Pressure: ${data.main.pressure} hPa</p>
        <!-- You can add more weather data here -->
      `;
      weatherInfo.innerHTML = weatherDetails;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    weatherInfo.innerHTML = 'Something went wrong';
  }
}
