document.addEventListener("DOMContentLoaded", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    document.getElementById("weather").innerHTML =
      "Geolocation is not supported by this browser.";
  }
});

function showPosition(position) {
  const apiKey = "aa621e96393172fd2adda25734367f2d";
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  getWeather(latitude, longitude, apiKey);
  getForecast(latitude, longitude, apiKey);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      document.getElementById("weather").innerHTML =
        "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      document.getElementById("weather").innerHTML =
        "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      document.getElementById("weather").innerHTML =
        "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      document.getElementById("weather").innerHTML =
        "An unknown error occurred.";
      break;
  }
}

function getWeather(latitude, longitude, apiKey) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  const loader = document.getElementById("loader");
  const content = document.getElementById("default-section");
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
      loader.style.display = "none";
      content.style.display = "block";
    })
    .catch((error) => {
      document.getElementById("weather").innerHTML =
        "Error retrieving weather data.";
      console.error("Error:", error);
    });
}

function displayWeather(data) {
  const weatherDiv = document.getElementById("weather");
  const city = document.getElementById("city");
  const date = document.getElementById("date");
  const location = data.name;
  const temperature = Math.floor(data.main.temp);
  const description = data.weather[0].description;

  const iconCode = data.weather[0].icon;
  let weatherIcon = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  weatherDiv.innerHTML = `
        <h2>${location} <sup>${data.sys.country}</sup></h2>
        <img class="weather-icon" src="${weatherIcon}" alt="Weather Icon">
        <h1>${temperature}<sup>°C</sup></h1>
        <p>${description}</p>
    `;
  city.innerHTML = `${location} , ${data.sys.country}`;
  const today = new Date();

  const yyyy = today.getFullYear();
  let dd = today.getDate();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (dd < 10) dd = "0" + dd;

  const formattedToday = dd + " " + month[today.getMonth()] + " " + yyyy;

  date.innerHTML = formattedToday;
}

function getForecast(latitude, longitude, apiKey) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayForecast(data.list);
    })
    .catch((error) =>
      console.error("Error fetching the forecast data:", error)
    );
}

function displayForecast(daily) {
  const forecastContainer = document.getElementById("forecast");
  forecastContainer.innerHTML = "";

  const filteredList = daily.filter((item) => item.dt_txt.includes("12:00:00"));
  filteredList.forEach((item) => {
    const forecastDay = document.createElement("div");
    forecastDay.className = "forecast-day";

    const date = new Date(item.dt * 1000);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

    const temp = `${Math.floor(item.main.temp)}°C`;
    const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
    const description = item.weather[0].description;

    forecastDay.innerHTML = `
                    <div class="forecast-day">${dayName}</div>
                    <div class="forecast-temp">${temp}</div>
                    <img src="${icon}" alt="${description}">
                `;

    forecastContainer.appendChild(forecastDay);
  });
}

const form = document.querySelector(".header__container .header__form");
const input = document.querySelector(
  ".header__container .header__form .header__input"
);
const msg = document.querySelector(
  ".header__container .header__form .header__text"
);
const list = document.querySelector(".city-section .city-section__ul");
const apiKey = "aa621e96393172fd2adda25734367f2d";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputVal = input.value;

  //check if there's already a city
  const listItems = list.querySelectorAll(".city-section .city-section__li");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter((el) => {
      let content = "";
      if (inputVal.includes(",")) {
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } ...otherwise be more specific by providing the country code as well 😉`;
      form.reset();
      input.focus();
      return;
    }
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { main, name, sys, weather } = data;
      const iconCode = data.weather[0].icon;
      let icon = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

      const li = document.createElement("li");
      li.classList.add("city-section__li");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${
        weather[0]["description"]
      }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid location";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});
