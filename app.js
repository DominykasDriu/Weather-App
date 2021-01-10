// SET DAY,MONTH,WEEKDAY
const setDate = (dateUnix) => {
  let date = new Date(dateUnix * 1000);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  document.getElementById('date').innerHTML = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`
}
// SET CURRENT COUNTRY TIME
const setTime = (dateUnix, timezone) => {
  let time = new Date(dateUnix * 1000);
  // SET COUNTRY TIMEZONE
  let hours = (time.getHours() + (timezone / 3600)) - 2;
  document.getElementById('time').innerHTML = `${hours}:${('0' + time.getMinutes()).slice(-2)}`
}
// SET CITY NAME
const setCity = (cityName) => {
  document.getElementById('city').innerHTML = `${cityName}`
}
// SET CURRENT TEMPERATURE
const setTemp = (temp) => {
  document.getElementById('temp').innerHTML = `${Math.round(temp)}°`
}
// SET CARD BACKGROUND ACCORDING TO TEMPERATURE
const setBackground = (temp) => {
  let mainContainer = document.querySelector('main')
  if (temp >= 18) {
    mainContainer.classList.add('hot-temp')
  } else if (temp >= 5) {
    mainContainer.classList.add('medium-temp')
  } else {
    mainContainer.classList.add('cold-temp')
  }
}
// SET CURRENT WEATHER CONDITION
const setCondition = (condition) => {
  document.querySelector('.condition').innerHTML = condition;
}
// SET HIGH AND LOW TEMPERATURE
const setHighLow = (high, low) => {
  document.querySelector('.high').innerHTML = `H: ${Math.round(high)}`;
  document.querySelector('.low').innerHTML = `L: ${Math.round(low)}`;
}
// SET ICON ACCORDING TO WEATHER CONDITIONS AND DAYTIME
const iconInject = (icon) => {
  document.getElementById('weather-icon').setAttribute('src', icon)
}
const setIcon = (iconCode) => {
  switch (iconCode) {
    case '01d':
      iconInject(`./Weather Icons/Sun.svg`);
      break;
    case '01n':
      iconInject(`./Weather Icons/Moon.svg`);
      break;
    case '02d':
      iconInject(`./Weather Icons/Cloud_Sun.svg`);
      break;
    case '02n':
      iconInject(`./Weather Icons/Cloud_Moon.svg`);
      break;
    case '03d':
      iconInject(`./Weather Icons/Cloud.svg`);
      break;
    case '03n':
      iconInject(`./Weather Icons/Cloud.svg`);
      break;
    case '04d':
      iconInject(`./Weather Icons/Cloud.svg`);
      break;
    case '04n':
      iconInject(`./Weather Icons/Cloud.svg`);
      break;
    case '09d':
      iconInject(`./Weather Icons/Rain_Light.svg`);
      break;
    case '09n':
      iconInject(`./Weather Icons/Rain_Light_Moon.svg`);
      break;
    case '10d':
      iconInject(`./Weather Icons/Rain_Heavy.svg`);
      break;
    case '10n':
      iconInject(`./Weather Icons/Rain_Heavy_Moon.svg`);
      break;
    case '11d':
      iconInject(`./Weather Icons/Thunder.svg`);
      break;
    case '11n':
      iconInject(`./Weather Icons/Thunder_Moon.svg`);
      break;
    case '13d':
      iconInject(`./Weather Icons/Snow_1.svg`);
      break;
    case '13n':
      iconInject(`./Weather Icons/Snow_1_Moon.svg`);
      break;
    case '50d':
      iconInject(`./Weather Icons/Fog.svg`);
      break;
    case '50n':
      iconInject(`./Weather Icons/Fog_Moon.svg`);
      break;
    default:
      console.log('No icon found!');
  }
}
// HTML ELEMENTS
let cityInput = document.getElementById('cityInput');
let weatherCard = document.querySelector('.weather-card');
let mainContainer = document.querySelector('main');
let searchIcon = document.querySelector('i');
// OPEN WEATHER CARD AFTER SUCCESSFUL API CALL
const openWeatherCard = () => {
  weatherCard.classList.add('active');
  cityInput.classList.add('white-placeholder');
  searchIcon.style.color = 'white';
}
// FUNCTION CLOSES THE CARD AFTER FOCUSING ON INPUT
cityInput.addEventListener('focus', () => {
  weatherCard.classList.remove('active')
  mainContainer.className = '';
  cityInput.className = '';
  searchIcon.style.color = 'rgb(100, 100, 100)';
})
// API CALL FUNCTION
const apiCall = (city) => {
  fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${city}&lat=0&lon=0&id=2172797&lang=null&units=metric`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "1a6ee7683amsh373318a67015f44p1e8773jsn0d10398361a4",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.message !== 'city not found') {
        setBackground(data.main.temp, )
        setDate(data.dt)
        setTime(data.dt, data.timezone)
        setCity(data.name)
        setTemp(data.main.temp)
        setCondition(data.weather[0].main)
        setHighLow(data.main.temp_max, data.main.temp_min)
        setIcon(data.weather[0].icon)
        // OPEN WEATHER CARD AND RESET INPUT
        cityInput.value = '';
        openWeatherCard();
      } else {
        cityInput.value = '';
        alert('City not found!')
      }
    })
    .catch(error => console.log(error))
}
// CLICK BUTTON LISTENER
document.getElementById('submit').addEventListener('click', (e) => {
  e.preventDefault()
  let city = cityInput.value;
  if (city) {
    apiCall(city);
  }
})
// ENTER KEY LISTENER
cityInput.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    let city = cityInput.value;
    if (city) {
      apiCall(city);
      cityInput.blur();
    }
  }
})
// Created by Dominykas Driukas
// Icon set by Charlotte de Wolfe