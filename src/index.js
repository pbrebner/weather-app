// Source script for Weather App

async function getWeather(location) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=69a0fe9d89aa3c562c09a50fbd505046`
    );

    const weatherData = await response.json();
    console.log(weatherData);
    processWeather(weatherData);
}

function processWeather(jsonData) {
    importantData = {};

    importantData.location = jsonData.name;
    importantData.temp = jsonData.main.temp;
    importantData.humidity = jsonData.main.humidity;
    importantData.tempMax = jsonData.main.temp_max;
    importantData.tempMin = jsonData.main.temp_min;

    console.log(importantData);

    populateCurrentWeather(importantData);

    // This should return a weather object
    // split into individual sections????
}

function populateCurrentWeather(data) {
    const currentWeatherDetails = document.querySelector(
        ".currentWeatherDetails"
    );

    currentWeatherDetails.innerHTML = "";

    for (const property in data) {
        const weatherItem = document.createElement("div");
        weatherItem.classList.add("weatherItem");

        weatherItem.innerHTML = `${property}: ${data[property]}`;

        currentWeatherDetails.appendChild(weatherItem);
    }
}

const submitBtn = document.querySelector(".submitBtn");

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const search = document.querySelector(".search");

    getWeather(search.value);

    search.value = "";
});

getWeather("London");
