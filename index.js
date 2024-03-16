/* eslint-disable no-console */
const apiKeyWeather = 'd5f3744de08f4059ac9144557241603';
const urlWeather = `https://api.weatherapi.com/v1/current.json?key=${apiKeyWeather}&q=`;

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

const locationContainer = document.getElementById('location-container');
const cityTitle = document.getElementById('city-title');
const regionTitle = document.getElementById('region-title');
const countryTitle = document.getElementById('country-title');

const tempFeelsDiv = document.getElementById('temp-feels-div');
const temp = document.getElementById('temp');
const feelsLike = document.getElementById('feels-like');
// const conditionImg = document.getElementById('condition-img');
const condition = document.getElementById('condition');
const uv = document.getElementById('uv');
const windDir = document.getElementById('wind-dir');
const wind = document.getElementById('wind');
const precip = document.getElementById('precip');
const vis = document.getElementById('vis');
const toggleUnitsBtn = document.getElementById('toggle-units-btn');

//   conditionImg.src = item.current.condition.icon.slice(2, item.current.condition.icon.length);

async function getWeather(searchVal) {
  const response = await fetch(urlWeather + searchVal.toLowerCase().split(' ').join('-'));
  response.json()
    .then((item) => {
      let units = 'C';

      locationContainer.style.justifyContent = 'space-between';

      cityTitle.textContent = item.location.name;
      regionTitle.textContent = item.location.region;
      countryTitle.textContent = item.location.country;

      tempFeelsDiv.style.borderBottom = '2px solid gray';
      temp.textContent = `Temperature: ${item.current.temp_c} C`;
      feelsLike.textContent = `Feels like: ${item.current.feelslike_c} C`;
      condition.textContent = `Condition: ${item.current.condition.text}`;
      uv.textContent = `UV Index: ${item.current.uv}`;
      windDir.textContent = `Wind Direction: ${item.current.wind_dir}`;
      wind.textContent = `Wind Speed: ${item.current.wind_kph} kph`;
      precip.textContent = `Precipitation: ${item.current.precip_mm} mm`;
      vis.textContent = `Visibility: ${item.current.vis_km} km`;

      toggleUnitsBtn.style.display = 'block';
      // eslint-disable-next-line func-names
      toggleUnitsBtn.onclick = function () {
        // eslint-disable-next-line eqeqeq
        if (units == 'C') {
          toggleUnitsBtn.textContent = 'View Imperial';
          units = 'F';
          temp.textContent = `Temperature: ${item.current.temp_f} F`;
          feelsLike.textContent = `Feels like: ${item.current.feelslike_f} F`;
          vis.textContent = `Visibility: ${item.current.vis_km} mi`;
          wind.textContent = `Wind Speed: ${item.current.wind_mph} mph`;
          precip.textContent = `Precipitation: ${item.current.precip_mm} in`;
        } else {
          toggleUnitsBtn.textContent = 'View Metric';
          units = 'C';
          temp.textContent = `Temperature: ${item.current.temp_c} C`;
          feelsLike.textContent = `Feels like: ${item.current.feelslike_c} C`;
          vis.textContent = `Visibility: ${item.current.vis_km} km`;
          wind.textContent = `Wind Speed: ${item.current.wind_kph} kph`;
          precip.textContent = `Precipitation: ${item.current.precip_mm} mm`;
        }
      };

      console.log(item);
    }).catch((err) => {
      console.error(err);

      locationContainer.style.justifyContent = 'center';

      cityTitle.textContent = "Cette ville n'existe pas";
      regionTitle.textContent = '';
      countryTitle.textContent = '';

      temp.textContent = '';
      feelsLike.textContent = '';
      condition.textContent = '';
      uv.textContent = '';
      windDir.textContent = '';
      wind.textContent = '';
      precip.textContent = '';
      vis.textContent = '';

      toggleUnitsBtn.style.display = 'none';
    });
}

// toggleUnitsBtn.addEventListener('click', () => {
//   temp.textContent = 'helping';
// });

searchBtn.addEventListener('click', () => {
  getWeather(searchInput.value);
  searchInput.value = '';
});

searchInput.addEventListener('keydown', (e) => {
//   console.log(e.target.value);
  if (e.key === 'Enter') {
    getWeather(searchInput.value);
    searchInput.value = '';
  }
});
