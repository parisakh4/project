function showTime() {
  let current = new Date();
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
  let time = document.querySelector("#show-time");

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  time.innerHTML = `${day} ${hour}:${minute}`;
}
showTime();

function showTemperature(response) {
  console.log(response.data);
  let tempNum = Math.round(response.data.main.temp - 273.15);
  let tempShow = document.querySelector("#temp");
  tempShow.innerHTML = `${tempNum}℃`;

  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search(`Tehran`);
