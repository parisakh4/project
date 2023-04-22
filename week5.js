function showTime(timestamp) {
  let current = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[current.getDay()];
  let hour = current.getHours();
  let minute = current.getMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute}`;
}

function showTemperature(response) {
  console.log(response.data);

  let tempShow = document.querySelector("#temp");

  let h1 = document.querySelector("h1");

  let dateElement = document.querySelector("#tell-time");
  let iconElelement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp - 273.15;

  tempShow.innerHTML = Math.round(celsiusTemperature);
  h1.innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  dateElement.innerHTML = showTime(response.data.dt * 1000);

  iconElelement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElelement.setAttribute("alt", response.data.weather[0].description);
}

function search(theCity) {
  let apiKey = `5da7b2dc058f07286fea39c4cee516a3`;
  let apiEnd = `https://api.openweathermap.org/data/2.5/weather?`;
  let unit = `metric`;
  let apiUrl = `${apiEnd}q=${theCity}&appid=${apiKey}&unit=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-enter");
  let theCity = citySearch.value;
  search(theCity);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let tempShow = document.querySelector("#temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  tempShow.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsius(event) {
  event.preventDefault();
  let tempShow = document.querySelector("#temp");
  tempShow.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

search(`Tehran`);
