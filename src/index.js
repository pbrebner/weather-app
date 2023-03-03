// Source index script for Weather App

import { getWeather, getAirQuality, getForecast } from "./apiFunctions";
import {
    populateLocation,
    populateCurrentWeather,
    populateAirQuality,
    populateForecast,
} from "./domFunctions";

async function processWeather(location) {
    // Need to add try/catch to handle errors
    const weatherData = await getWeather(location);

    console.log(weatherData);

    let importantData = {};

    importantData.Location = [weatherData.name, weatherData.sys.country];
    importantData.Temperature = weatherData.main.temp;
    importantData["Feels Like"] = weatherData.main.feels_like;
    importantData.Humidity = weatherData.main.humidity;
    importantData.Windspeed = weatherData.wind.speed;

    importantData.Condition = weatherData.weather[0].description;

    // Format this object better
    // Object Constructor?

    return importantData;
}

async function processAirQuality(location) {
    // Gets data from air quality apiFunctions function and gathers relavent info for display

    const airQualityData = await getAirQuality(location);
    console.log(airQualityData);

    let importantData = {};

    importantData.AQI = airQualityData.list[0].main.aqi;

    return importantData;
}

async function processForecast(location) {
    // Gets data from forecast apiFunctions function and gathers relavent info for display

    const forecastData = await getForecast(location);
    console.log(forecastData);

    let importantData = [];

    for (const index in forecastData.list) {
        importantData[index] = {};
        importantData[index].Date = forecastData.list[index].dt;
        importantData[index].Condition =
            forecastData.list[index].weather[0].description;
        importantData[index].Temperature = forecastData.list[index].main.temp;
        importantData[index].Pop = forecastData.list[index].pop;

        importantData[index]["Feels Like"] =
            forecastData.list[index].main.feels_like;
        importantData[index].Humidity = forecastData.list[index].main.humidity;

        importantData[index]["Cloud Cover"] =
            forecastData.list[index].clouds.all;
        importantData[index].Visibility = forecastData.list[index].visibility;

        importantData[index].Wind = {
            speed: forecastData.list[index].wind.speed,
            direction: forecastData.list[index].wind.deg,
        };
        importantData[index].Gust = forecastData.list[index].wind.gust;
    }

    return importantData;
}

async function processMap() {
    // Gets data from map apiFunctions function and gathers relavent info for display
}

async function loadPage(location) {
    // Add some visual indication that we're waiting for the data (promise.all) before it gets displayed (Map would likey take the longest to display)
    //Could add a class to change the display prior to promise.all showing that it's loading, and remove it to show data if successful or display a no results found page if error

    // Use a promise.all to wait for all processing to complete before displaying data

    Promise.all([
        processWeather(location),
        processAirQuality(location),
        processForecast(location),
    ]).then((data) => {
        //console.log(data);
        populateLocation(data[0]);
        populateCurrentWeather(data[0]);
        populateAirQuality(data[1]);
        populateForecast(data[2]);
    });
}

const submitBtn = document.querySelector(".submitBtn");

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const search = document.querySelector(".search");

    loadPage(search.value);

    search.value = "";
});

loadPage("London");
