const API_KEY = "3973254a73ffc7761c0f4a1f2c152a13";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weatherIcon = document.createElement("img");
      weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      weatherIcon.alt = "icon";
      const weatherRow = document.querySelector("#weather");
      weatherRow.appendChild(weatherIcon);
      const weather = document.querySelector("#weatherInfo");
      const city = document.querySelector("#city");
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
