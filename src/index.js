// Source index script for Weather App

import { getWeather, getAirQuality, getForecast } from "./apiFunctions";
import {
    populateLocation,
    populateCurrentWeather,
    populateAirQuality,
    populateForecast,
    addError,
    startLoadingAnimation,
    endLoadingAnimation,
} from "./domFunctions";

import "./styles.css";

async function processWeather(location) {
    // Gets data from get weather apiFunctions function and gathers relavent info for display
    // Need to add try/catch to handle error

    const weatherData = await getWeather(location);

    console.log(weatherData);

    let importantData = {};

    importantData.Location = [weatherData.name, weatherData.sys.country];
    importantData.Date = [weatherData.dt, weatherData.timezone];
    importantData.Temperature = `${Math.round(weatherData.main.temp)} &#8451`;
    importantData["Feels Like"] = `${Math.round(
        weatherData.main.feels_like
    )} &#8451`;
    importantData.Humidity = `${weatherData.main.humidity} %`;
    importantData.Wind = [
        `${Math.round(weatherData.wind.speed * 3.6 * 100) / 100} km/hr`,
        weatherData.wind.deg,
    ];

    if (weatherData.wind.gust) {
        importantData.Gust = `${
            Math.round(weatherData.wind.gust * 3.6 * 100) / 100
        } km/hr`;
    }

    if (weatherData.rain) {
        importantData.Rain = `${weatherData.rain["1h"]} mm`;
    }

    importantData.Condition = [
        weatherData.weather[0].description,
        weatherData.weather[0].icon,
    ];

    // Format this object better
    // Object Constructor and create method to convert to different units

    return importantData;
}

async function processAirQuality(location) {
    // Gets data from air quality apiFunctions function and gathers relavent info for display

    const airQualityData = await getAirQuality(location);
    console.log(airQualityData);

    let importantData = {};

    importantData.AQI = airQualityData.list[0].main.aqi;
    importantData.components = airQualityData.list[0].components;

    return importantData;
}

async function processForecast(location) {
    // Gets data from forecast apiFunctions function and gathers relavent info for display

    const forecastData = await getForecast(location);
    console.log(forecastData);

    let importantData = [];

    for (const index in forecastData.list) {
        importantData[index] = {};
        importantData[index].Date = [
            forecastData.list[index].dt,
            forecastData.city.timezone,
        ];
        importantData[index].Condition = [
            forecastData.list[index].weather[0].description,
            forecastData.list[index].weather[0].icon,
        ];
        importantData[index].Temperature = `${Math.round(
            forecastData.list[index].main.temp
        )} &#8451`;
        importantData[index].Pop = `${Math.round(
            forecastData.list[index].pop * 100
        )} %`;

        importantData[index]["Feels Like"] = `${Math.round(
            forecastData.list[index].main.feels_like
        )} &#8451`;
        importantData[
            index
        ].Humidity = `${forecastData.list[index].main.humidity}%`;

        importantData[index][
            "Cloud Cover"
        ] = `${forecastData.list[index].clouds.all} %`;
        importantData[
            index
        ].Visibility = `${forecastData.list[index].visibility} km`;

        importantData[index].Wind = {
            speed: `${
                Math.round(forecastData.list[index].wind.speed * 3.6 * 100) /
                100
            } km/hr`,
            direction: forecastData.list[index].wind.deg,
        };
        importantData[index].Gust = `${
            Math.round(forecastData.list[index].wind.gust * 3.6 * 100) / 100
        } km/hr`;
    }

    return importantData;
}

async function processMap() {
    // Gets data from map apiFunctions function and gathers relavent info for display
}

async function loadPage(location) {
    // Add some visual indication that we're waiting for the data (promise.all) before it gets displayed (Map would likey take the longest to display)
    //Could add a class to change the display prior to promise.all showing that it's loading, and remove it to show data if successful or display a no results found page if error
    startLoadingAnimation();

    // Use a promise.all to wait for all processing to complete before displaying data

    Promise.all([
        processWeather(location),
        processAirQuality(location),
        processForecast(location),
    ])
        .then((data) => {
            populateLocation(data[0]);
            populateCurrentWeather(data[0]);
            populateAirQuality(data[1]);
            populateForecast(data[2]);
        })
        .catch((error) => {
            console.log(error);
            addError();
        })
        .finally(() => {
            endLoadingAnimation();
        });
}

const submitBtn = document.querySelector(".submitBtn");

submitBtn.addEventListener("click", () => {
    const search = document.querySelector(".search");

    if (search.value != "") {
        loadPage(search.value);
    }

    search.value = "";
});

/*
window.addEventListener("load", initialize);

function initialize() {
    const form = document.querySelector(".searchForm");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
    });

    const search = document.querySelector(".search");
    const autocomplete = new google.maps.places.Autocomplete(search);

    autocomplete.addListener("place_changed", function () {
        const place = autocomplete.getPlace();

        loadPage(place.name);
        search.value = "";
    });
}
*/

loadPage("London");
