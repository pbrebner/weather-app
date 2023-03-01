// Source index script for Weather App

import { getWeather } from "./apiFunctions";
import { populateCurrentWeather } from "./domFunctions";

async function processWeather(location) {
    // Need to add try/catch to handle errors
    const weatherData = await getWeather(location);

    let importantData = {};

    importantData.location = weatherData.name;
    importantData.temperature = weatherData.main.temp;
    importantData.humidity = weatherData.main.humidity;
    importantData.tempMax = weatherData.main.temp_max;
    importantData.tempMin = weatherData.main.temp_min;

    console.log(importantData);
    return importantData;
}

async function processAirQuality() {
    // Gets data from air quality apiFunctions function and gathers relavent info for display
}

async function processForecast() {
    // Gets data from forecast apiFunctions function and gathers relavent info for display
}

async function processMap() {
    // Gets data from map apiFunctions function and gathers relavent info for display
}

async function loadPage(location) {
    // Add some visual indication that we're waiting for the data (promise.all) before it gets displayed (Map would likey take the longest to display)
    //Could add a class to change the display prior to promise.all showing that it's loading, and remove it to show data if successful or display a no results found page if error

    // Use a promise.all to wait for all processing to complete before displaying data

    Promise.all([processWeather(location)]).then((data) => {
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
