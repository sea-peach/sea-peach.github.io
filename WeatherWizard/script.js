

window.onload = function() {
  fetchWeatherData();
};

function fetchWeatherData() {
  fetch('https://api.open-meteo.com/v1/forecast?latitude=43.25&longitude=-79.85&current=weather_code,temperature_2m,apparent_temperature,precipitation,wind_speed_10m&hourly=temperature_2m&daily=temperature_2m_min,apparent_temperature_max&timezone=America%2FNew_York')
    .then(response => response.json())
    .then(data => {
      const hourlyForecastByDay = groupHourlyForecastByDay(data.hourly);
      const dailyForecast = data.daily;
      displayCurrentWeather(data.current);
      displayDailyForecast(dailyForecast);
      displayCurrentMonth(); // Call function to display current month
      displayHourlyForecast(hourlyForecastByDay);
    })
    .catch(error => console.error('Error fetching weather data:', error));
}

function displayCurrentMonth() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const today = new Date();
  const currentMonth = months[today.getMonth()];

  const hourlyForecastContainer = document.querySelector('.hourly-forecast');
  const figureElement = document.createElement('figure');

  const monthHeading = document.createElement('h2');
  monthHeading.textContent = currentMonth;
  figureElement.appendChild(monthHeading);

  const forecastHeading = document.createElement('h2');
  forecastHeading.textContent = '7 day forecast';
  figureElement.appendChild(forecastHeading);

  hourlyForecastContainer.insertBefore(figureElement, hourlyForecastContainer.firstChild);
}

  
// ••••• DAY CONTAINERS ••••• //

  function groupHourlyForecastByDay(hourlyForecast) {
    const groupedForecast = {};
    hourlyForecast.time.forEach((time, index) => {
      const date = new Date(time);
      const day = date.toDateString();
      if (!groupedForecast[day]) {
        groupedForecast[day] = [];
      }
      groupedForecast[day].push({
        time: time,
        temperature: hourlyForecast.temperature_2m[index]
      });
    });
    return groupedForecast;
  }
  
// •••••• TODAY CURRENT WEATHER •••••• //

function displayCurrentWeather(currentWeather) {
  const currentWeatherElement = document.getElementById('current-weather');
  // Get current day and month
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const today = new Date();
  const currentDay = days[today.getDay()];
  const numericalDay = today.getDate();
  const month = months[today.getMonth()];

  // Define an object to map weather codes to descriptions
  const weatherCodeDescriptions = {
    '0': { description: 'Clear sky', class: 'clear-sky' },
    '1': { description: 'Mainly clear', class: 'mainly-clear' },
    '2': { description: 'Partly cloudy', class: 'partly-cloudy' },
    '3': { description: 'Overcast', class: 'overcast' },
    '45': { description: 'Fog', class: 'fog' },
    '48': { description: 'Depositing rime fog', class: 'deposition-rime-fog' },
    '51': { description: 'Light drizzle', class: 'light-drizzle' },
    '53': { description: 'Moderate drizzle', class: 'moderate-drizzle' },
    '55': { description: 'Dense drizzle', class: 'dense-drizzle' },
    '56': { description: 'Light freezing drizzle', class: 'light-freezing-drizzle' },
    '57': { description: 'Dense freezing drizzle', class: 'dense-freezing-drizzle' },
    '61': { description: 'Slight rain', class: 'slight-rain' },
    '63': { description: 'Moderate rain', class: 'moderate-rain' },
    '65': { description: 'Heavy rain', class: 'heavy-rain' },
    '66': { description: 'Light freezing rain', class: 'light-freezing-rain' },
    '67': { description: 'Heavy freezing rain', class: 'heavy-freezing-rain' },
    '71': { description: 'Slight snow fall', class: 'slight-snow-fall' },
    '73': { description: 'Moderate snow fall', class: 'moderate-snow-fall' },
    '75': { description: 'Heavy snow fall', class: 'heavy-snow-fall' },
    '77': { description: 'Snow grains', class: 'snow-grains' },
    '80': { description: 'Slight rain showers', class: 'slight-rain-showers' },
    '81': { description: 'Moderate rain showers', class: 'moderate-rain-showers' },
    '82': { description: 'Violent rain showers', class: 'violent-rain-showers' },
    '85': { description: 'Slight snow showers', class: 'slight-snow-showers' },
    '86': { description: 'Heavy snow showers', class: 'heavy-snow-showers' },
    '95': { description: 'Slight or moderate thunderstorm', class: 'thunderstorm' },
    '96': { description: 'Thunderstorm with slight hail', class: 'thunderstorm-slight-hail' },
    '99': { description: 'Thunderstorm with heavy hail', class: 'thunderstorm-heavy-hail' },
  };

  // Translate weather code to description and class
  const weatherData = weatherCodeDescriptions[currentWeather.weather_code] || { description: 'Unknown weather code', class: 'unknown' };
  const weatherDescription = weatherData.description;
  const weatherClass = weatherData.class;

  // Construct HTML to display current weather with current day
  const html = `
    <span><div><h3>${currentDay}</h3> <h3>${month}</h3> <h3>${numericalDay}</h3>
    <h4>${weatherDescription}</h4></div>
    <h1>${currentWeather.temperature_2m}°C</h1>
    </span>
    <figure><h2>feels like</h2><p>${currentWeather.apparent_temperature}</p><h2>°C</h2></figure>
    <figure><h2>precipitation</h2> <p>${currentWeather.precipitation}</p><h2>mm</h2></figure>
    <figure><h2>wind speed</h2> <p>${currentWeather.wind_speed_10m}</p><h2>km/h</h2></figure>
    
    `;
  currentWeatherElement.innerHTML = html;

  // Add class based on temperature range
  if (parseFloat(currentWeather.apparent_temperature) < 0) {
      currentWeatherElement.classList.add('below-zero');
  } else {
      currentWeatherElement.classList.add('above-zero');
  }

  // Add class based on weather code
  currentWeatherElement.classList.add(weatherClass);
}



  

// ••••• HOURLY FORECAST ••••• //
  
function displayHourlyForecast(hourlyForecastByDay) {
  const hourlyForecastElement = document.getElementById('hourly-forecast');
  // Construct HTML to display hourly forecast grouped by day
  let html = '';
  for (const day in hourlyForecastByDay) {
    // Extract day of the week and numerical day
    const dateParts = day.split(' ');
    const dayOfWeek = dateParts[0];
    const numericalDay = dateParts[2];

    html += `<section><h3>${dayOfWeek} ${numericalDay}</h3>`;
    hourlyForecastByDay[day].forEach(forecast => {
      const time = new Date(forecast.time);
      const hour = time.getHours();
      html += `<ul><li>${hour}:00</li>
               <li>${forecast.temperature}°C</li></ul>`;
    });
    html += '</section>';
  }
  hourlyForecastElement.innerHTML = html;
}

  
  function displayDailyForecast(dailyForecast) {
    const dailyForecastElement = document.getElementById('daily-forecast');
    // Construct HTML to display daily forecast
    let html = '<section>';
    dailyForecast.time.forEach((time, index) => {
      const date = new Date(time);
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayOfWeek = days[date.getDay()];
      const month = date.toLocaleString('en-US', { month: 'short' });
      const numericalDay = date.getDate();
      html += `<span><h4>${dayOfWeek}, ${month} ${numericalDay}</h4> <div><p>${dailyForecast.temperature_2m_min[index]}°C</p> <p>${dailyForecast.apparent_temperature_max[index]}°C</p></div></span>`;
    });
    html += '</section>';
    dailyForecastElement.innerHTML = html;
  }