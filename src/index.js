// Source index script for Weather App

import { getWeather, getAirQuality, getForecast } from "./apiFunctions";
import { populateCurrentWeather } from "./domFunctions";

async function processWeather(location) {
    // Need to add try/catch to handle errors
    const weatherData = await getWeather(location);

    console.log(weatherData);

    let importantData = {};

    importantData.location = weatherData.name;
    importantData.temperature = weatherData.main.temp;
    importantData.humidity = weatherData.main.humidity;
    importantData.tempMax = weatherData.main.temp_max;
    importantData.tempMin = weatherData.main.temp_min;

    // Format this object better
    // Object Constructor?

    return importantData;
}

async function processAirQuality(location) {
    // Gets data from air quality apiFunctions function and gathers relavent info for display

    const airQualityData = await getAirQuality(location);
    console.log(airQualityData);
}

async function processForecast(location) {
    // Gets data from forecast apiFunctions function and gathers relavent info for display

    const forecastData = await getForecast(location);
    console.log(forecastData);
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
        populateCurrentWeather(data[0]);
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
