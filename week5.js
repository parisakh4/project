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

function formatDay(timeStemp) {
  let date = new Date(timeStemp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let forcastElement = document.querySelector("#forecastSection");
  let forcast = response.data.daily;
  let forecastHtml = ``;
  forcast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="row">
      <div class="clearfix whole-forcast">
                  <span class="forcast-date">${formatDay(forecastDay.dt)}</span>
                  <div class="forcast-icon float-right">
                    <img
                      src="http://openweathermap.org/img/wn/${
                        forecastDay.weather[0].icon
                      }@2x.png"
                      alt="description"
                      width="40px"
                    />
                  </div>

                  <div class="forcast-max">
                    ${Math.round(
                      forecastDay.temp.max
                    )}° <span class="forcast-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
                  </div>
                </div>  
              </div>`;
    }
  });
  forcastElement.innerHTML = forecastHtml;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `894a2e7aa7f46eeca5d8778f6faa5a5b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
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

  getForecast(response.data.coord);
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
