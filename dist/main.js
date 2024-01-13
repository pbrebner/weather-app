/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/apiFunctions.js":
/*!*****************************!*\
  !*** ./src/apiFunctions.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAirQuality": () => (/* binding */ getAirQuality),
/* harmony export */   "getForecast": () => (/* binding */ getForecast),
/* harmony export */   "getWeather": () => (/* binding */ getWeather),
/* harmony export */   "getWeatherMap": () => (/* binding */ getWeatherMap),
/* harmony export */   "updateWeatherMap": () => (/* binding */ updateWeatherMap)
/* harmony export */ });
// Functions to fetch weather data through API

async function getWeather(location) {
    const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=69a0fe9d89aa3c562c09a50fbd505046`
    );

    const weatherData = await weatherResponse.json();

    return weatherData;
}

async function getAirQuality(location) {
    const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=69a0fe9d89aa3c562c09a50fbd505046`
    );
    const weatherData = await weatherResponse.json();

    let lat = weatherData.coord.lat;
    let lon = weatherData.coord.lon;

    const airQualityResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&APPID=69a0fe9d89aa3c562c09a50fbd505046`
    );

    const airQualityData = await airQualityResponse.json();

    return airQualityData;
}

async function getForecast(location) {
    const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=69a0fe9d89aa3c562c09a50fbd505046`
    );

    const forecastData = await forecastResponse.json();

    return forecastData;
}

async function getWeatherMap(location) {
    const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=69a0fe9d89aa3c562c09a50fbd505046`
    );
    const weatherData = await weatherResponse.json();

    let lat = weatherData.coord.lat;
    let lon = weatherData.coord.lon;

    const weatherMap = document.querySelector(".weatherMap");
    weatherMap.innerHTML = "";

    let map = L.map("map").setView([lat, lon], 8);

    await L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 8,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    await L.tileLayer(
        `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=69a0fe9d89aa3c562c09a50fbd505046`,
        {
            maxZoom: 8,
        }
    ).addTo(map);

    return map;
}

async function updateWeatherMap(location) {
    const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=69a0fe9d89aa3c562c09a50fbd505046`
    );
    const weatherData = await weatherResponse.json();

    let lat = weatherData.coord.lat;
    let lon = weatherData.coord.lon;

    map.setView([lat, lon], 8);
}




/***/ }),

/***/ "./src/domFunctions.js":
/*!*****************************!*\
  !*** ./src/domFunctions.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addError": () => (/* binding */ addError),
/* harmony export */   "endLoadingAnimation": () => (/* binding */ endLoadingAnimation),
/* harmony export */   "populateAirQuality": () => (/* binding */ populateAirQuality),
/* harmony export */   "populateCurrentWeather": () => (/* binding */ populateCurrentWeather),
/* harmony export */   "populateForecast": () => (/* binding */ populateForecast),
/* harmony export */   "populateLocation": () => (/* binding */ populateLocation),
/* harmony export */   "startLoadingAnimation": () => (/* binding */ startLoadingAnimation)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
// Functions to create and display DOM elements



function populateLocation(data) {
    const location = document.querySelector(".location");
    location.innerHTML = "";

    for (const property in data) {
        if (property == "Location") {
            let regionNames = new Intl.DisplayNames(["en"], {
                type: "region",
            });
            let country = regionNames.of(`${data[property][1]}`);

            location.innerHTML = `${data[property][0]}, ${country}`;
        }
    }
}

function populateCurrentWeather(data) {
    const currentTime = document.querySelector(".currentTime");

    const currentWeatherDetails = document.querySelector(
        ".currentWeatherDetails"
    );

    const currentConditionIcon = document.querySelector(
        ".currentConditionIcon"
    );
    const currentConditionName = document.querySelector(
        ".currentConditionName"
    );
    const currentTemp = document.querySelector(".currentTemp");

    currentWeatherDetails.innerHTML = "";
    currentTemp.innerHTML = "";

    for (const property in data) {
        if (property == "Date") {
            const date = new Date(data[property][0] * 1000);

            const hour = date.getUTCHours(date);
            const minute = date.getUTCMinutes(date);

            const time = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.convertTime)(data[property][1], hour, minute);

            currentTime.innerHTML = time;
        } else if (property == "Temperature") {
            currentTemp.innerHTML = `${data[property]}`;
            // U+2109 for Fahrenheit
        } else if (property == "Condition") {
            currentConditionName.innerHTML = `${(0,_utils__WEBPACK_IMPORTED_MODULE_0__.capitalizeFirstLetters)(
                data[property][0]
            )}`;
            // Update the condition Icon according to name
            currentConditionIcon.src = `https://openweathermap.org/img/wn/${data[property][1]}@2x.png`;
        } else {
            const weatherItem = document.createElement("div");
            const hr = document.createElement("hr");
            weatherItem.classList.add("currentWeatherItem");

            const weatherItemProperty = document.createElement("div");
            const weatherItemData = document.createElement("div");
            weatherItemData.classList.add("weatherItemData");

            if (property == "Location") {
                weatherItemProperty.innerHTML = `${property}`;

                let regionNames = new Intl.DisplayNames(["en"], {
                    type: "region",
                });
                let country = regionNames.of(`${data[property][1]}`);

                weatherItemData.innerHTML = `${data[property][0]}, ${country}`;
            } else if (property == "Wind") {
                weatherItemProperty.innerHTML = `${property}`;
                weatherItemData.innerHTML = `${
                    data[property][0]
                } ${(0,_utils__WEBPACK_IMPORTED_MODULE_0__.convertWindDirection)(data[property][1])}`;
            } else {
                weatherItemProperty.innerHTML = `${property}`;
                weatherItemData.innerHTML = `${data[property]}`;
            }
            weatherItem.appendChild(weatherItemProperty);
            weatherItem.appendChild(weatherItemData);

            currentWeatherDetails.appendChild(weatherItem);
            currentWeatherDetails.appendChild(hr);
        }
    }
}

function populateAirQuality(data) {
    const airQualityContainer = document.querySelector(".airQualityContainer");

    const airQualityDisplay = document.querySelector(".airQualityDisplay");
    //const innerRing = document.querySelector(".innerRing");
    const displayRing = document.querySelector(".displayRing");
    const aqiValue = document.querySelector(".aqiValue");
    const airQualityHeader = document.querySelector(".airQualityHeader");
    const airQualityPara = document.querySelector(".airQualityPara");
    const detailsBtnDiv = document.querySelector(".detailsBtnDiv");

    //airQualityDisplay.innerHTML = "";
    //innerRing.innerHTML = "";
    aqiValue.innerHTML = "";
    airQualityHeader.innerHTML = "";
    airQualityPara.innerHTML = "";
    detailsBtnDiv.innerHTML = "";

    const ozoneValue = document.querySelector(".componentOzone .value");
    const N2Value = document.querySelector(".componentNitrogenDioxide .value");
    const finePMValue = document.querySelector(".componentFinePM .value");
    const PMValue = document.querySelector(".componentPM .value");
    const sulfurDioxideValue = document.querySelector(
        ".componentSulfurDioxide .value"
    );
    const carbonMonoxideValue = document.querySelector(
        ".componentCarbonMonoxide .value"
    );

    ozoneValue.innerHTML = "";
    N2Value.innerHTML = "";
    finePMValue.innerHTML = "";
    PMValue.innerHTML = "";
    sulfurDioxideValue.innerHTML = "";
    carbonMonoxideValue.innerHTML = "";

    const airQualityDesciptions = {
        1: [
            "Excellent",
            "The air quality is ideal for most individuals; Enjoy your usual outdoor activities.",
        ],
        2: [
            "Fair",
            "Air quality is fair and is not a concern for the general public. No need to modify your usual outdoor activities unless you experience symptoms such as coughing and throat irritation.",
        ],
        3: [
            "Moderate",
            "Air quality is moderate and typically safe for the general public; Consider reducing or rescheduling strenuous activities outdoors if you experience symptoms such as coughing and throat irritation.",
        ],
        4: [
            "Poor",
            "Air quality is poor and precautions should be considered. Reduce or reschedule strenuous activities outdoors. Children and the elderly should also take it easy.",
        ],
        5: [
            "Very Poor",
            "Air quality is very poor; Avoid strenuous activities outdoors. Children and the elderly should also avoid outdoor physical exertion.",
        ],
    };

    for (const property in data) {
        if (property == "AQI") {
            let speed = 30;
            let progressValue = 0;
            let progressEndValue = data[property] * 20;

            let progress = setInterval(() => {
                progressValue += 1;
                //aqiValue.innerHTML = `${progressValue}%`
                displayRing.style.background = `conic-gradient(
                    #4d5bf9 ${progressValue * 3.6}deg,
                    #cadcff ${progressValue * 3.6}deg
                )`;
                if (progressValue == progressEndValue) {
                    clearInterval(progress);
                }
            }, speed);

            aqiValue.innerHTML = `${data[property]} AQI`;

            airQualityHeader.innerHTML =
                airQualityDesciptions[`${data[property]}`][0];
            airQualityPara.innerHTML =
                airQualityDesciptions[`${data[property]}`][1];
        } else if (property == "components") {
            ozoneValue.innerHTML = `${data[property].o3} &#181g/m<sup>3</sup>`;
            N2Value.innerHTML = `${data[property].no2} &#181g/m<sup>3</sup>`;
            finePMValue.innerHTML = `${data[property].pm2_5} &#181g/m<sup>3</sup>`;
            PMValue.innerHTML = `${data[property].pm10} &#181g/m<sup>3</sup>`;
            sulfurDioxideValue.innerHTML = `${data[property].so2} &#181g/m<sup>3</sup>`;
            carbonMonoxideValue.innerHTML = `${data[property].co} &#181g/m<sup>3</sup>`;
        }
    }

    const airQualityBtn = document.createElement("button");
    airQualityBtn.classList.add("airQualityBtn");
    airQualityBtn.textContent = "More Details";

    airQualityBtn.addEventListener("click", () => {
        airQualityContainer.classList.toggle("expandAirQuality");

        if (airQualityBtn.textContent == "More Details") {
            airQualityBtn.textContent = "Less Details";
        } else {
            airQualityBtn.textContent = "More Details";
        }
    });

    detailsBtnDiv.appendChild(airQualityBtn);
}

function populateForecast(data) {
    const forecast = document.querySelector(".forecast");
    forecast.innerHTML = "";

    for (let i = 0; i < 8; i++) {
        const forecastTile = document.createElement("div");
        forecastTile.classList.add("forecastTile");

        const forecastTileMain = document.createElement("div");
        const forecastTileDisplay = document.createElement("div");
        const forecastTileSupp = document.createElement("div");

        forecastTileMain.classList.add("forecastTileMain");
        forecastTileDisplay.classList.add("forecastTileDisplay");
        forecastTileSupp.classList.add("forecastTileSupp");

        let tileData = data[i];

        for (const property in tileData) {
            if (property == "Date") {
                let date = new Date(tileData[property][0] * 1000);
                let hour = date.getUTCHours(date);

                const time = document.createElement("div");
                time.innerHTML = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.convertTime)(tileData[property][1], hour);

                forecastTileMain.appendChild(time);
            } else if (property == "Condition") {
                const icon = document.createElement("img");
                icon.classList.add("forecastIcon");

                icon.src = `https://openweathermap.org/img/wn/${tileData[property][1]}@2x.png`;

                forecastTileDisplay.appendChild(icon);
            } else if (property == "Temperature") {
                const forecastTemp = document.createElement("div");

                forecastTemp.innerHTML = `${tileData[property]}`;

                forecastTileDisplay.appendChild(forecastTemp);
                forecastTileMain.appendChild(forecastTileDisplay);
            } else if (property == "Pop") {
                const pop = document.createElement("div");

                pop.innerHTML = `${tileData[property]} pop`;

                forecastTileMain.appendChild(pop);
            } else {
                const forecastItem = document.createElement("div");
                forecastItem.classList.add("forecastItem");

                const hr = document.createElement("hr");
                hr.classList.add("forecastHr");

                const forecastItemProperty = document.createElement("div");
                const forecastItemData = document.createElement("div");

                forecastItemProperty.classList.add("forecastItemProperty");
                forecastItemData.classList.add("forecastItemData");

                if (property == "Wind") {
                    forecastItemProperty.innerHTML = `${property}`;
                    forecastItemData.innerHTML = `${
                        tileData[property].speed
                    } ${(0,_utils__WEBPACK_IMPORTED_MODULE_0__.convertWindDirection)(tileData[property].direction)}`;

                    forecastItem.appendChild(forecastItemProperty);
                    forecastItem.appendChild(forecastItemData);
                    forecastItem.appendChild(hr);

                    forecastTileSupp.appendChild(forecastItem);
                } else {
                    forecastItemProperty.innerHTML = `${property}`;
                    forecastItemData.innerHTML = `${tileData[property]}`;
                }

                forecastItem.appendChild(forecastItemProperty);
                forecastItem.appendChild(forecastItemData);
                forecastItem.appendChild(hr);

                forecastTileSupp.appendChild(forecastItem);
            }
        }

        const expandBtn = document.createElement("button");
        expandBtn.classList.add("expandBtn");
        expandBtn.innerHTML = "&#8964";

        expandBtn.addEventListener("click", () => {
            forecastTile.classList.toggle("expandForecast");
        });

        forecastTileMain.appendChild(expandBtn);

        forecastTile.appendChild(forecastTileMain);
        forecastTile.appendChild(forecastTileSupp);

        forecast.appendChild(forecastTile);
    }
}

function addError() {
    const location = document.querySelector(".location");
    location.innerHTML = "";

    const outerWrappers = document.querySelectorAll(".outerWrapper");

    const errorContainer = document.querySelector(".errorContainer");
    const errorWrapper = document.querySelector(".errorWrapper");

    outerWrappers.forEach((wrapper) => {
        wrapper.classList.add("hideContainer");
    });

    errorWrapper.classList.remove("hideContainer");
}

function removeError() {
    const outerWrappers = document.querySelectorAll(".outerWrapper");
    const errorWrapper = document.querySelector(".errorWrapper");

    outerWrappers.forEach((wrapper) => {
        wrapper.classList.remove("hideContainer");
    });

    errorWrapper.classList.add("hideContainer");
}

function startLoadingAnimation() {
    removeError();

    const conditionContainers = document.querySelectorAll(
        ".conditionContainer"
    );
    const outerWrappers = document.querySelectorAll(".outerWrapper");

    conditionContainers.forEach((container) => {
        container.classList.add("hideContainer");
    });

    outerWrappers.forEach((wrapper) => {
        wrapper.classList.add("skeleton");
    });
}

function endLoadingAnimation() {
    const conditionContainers = document.querySelectorAll(
        ".conditionContainer"
    );

    const outerWrappers = document.querySelectorAll(".outerWrapper");

    conditionContainers.forEach((container) => {
        container.classList.remove("hideContainer");
    });

    outerWrappers.forEach((wrapper) => {
        wrapper.classList.remove("skeleton");
    });
}




/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "capitalizeFirstLetters": () => (/* binding */ capitalizeFirstLetters),
/* harmony export */   "convertTime": () => (/* binding */ convertTime),
/* harmony export */   "convertWindDirection": () => (/* binding */ convertWindDirection)
/* harmony export */ });
// Utility functions for WeatherApp

function convertTime(timezone, hour, minute) {
    // Takes the hour in 24hr time and converts it to 12hr time with AM or PM
    let newTime = "";

    const timezoneShift = Math.floor(timezone / 3600);
    let adjustedHour = hour + timezoneShift;

    if (adjustedHour < 0) {
        adjustedHour = adjustedHour + 24;
    }

    if (!minute) {
        if (adjustedHour < 12) {
            newTime = `${adjustedHour % 12 || 12}AM`;
        } else {
            newTime = `${adjustedHour % 12 || 12}PM`;
        }
    } else {
        if (minute.toString().length == 1) {
            minute = "0" + minute;
        }
        if (adjustedHour < 12) {
            newTime = `${adjustedHour % 12 || 12}:${minute}AM`;
        } else {
            newTime = `${adjustedHour % 12 || 12}:${minute}PM`;
        }
    }

    return newTime;
}

function convertWindDirection(deg) {
    // Change in direction every 22.5 degrees
    const val = Math.round(deg / 22.5);
    const compassDirections = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW",
    ];

    const direction = compassDirections[val % 16];

    return direction;
}

function capitalizeFirstLetters(phrase) {
    const words = phrase.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(" ");
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _apiFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiFunctions */ "./src/apiFunctions.js");
/* harmony import */ var _domFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domFunctions */ "./src/domFunctions.js");
// Source index script for Weather App




async function processWeather(location) {
    // Gets data from get weather apiFunctions function and gathers relavent info for display
    // Need to add try/catch to handle error

    const weatherData = await (0,_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.getWeather)(location);

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

    const airQualityData = await (0,_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.getAirQuality)(location);
    console.log(airQualityData);

    let importantData = {};

    importantData.AQI = airQualityData.list[0].main.aqi;
    importantData.components = airQualityData.list[0].components;

    return importantData;
}

async function processForecast(location) {
    // Gets data from forecast apiFunctions function and gathers relavent info for display

    const forecastData = await (0,_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.getForecast)(location);
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

async function processMap(location) {
    // Gets data from map apiFunctions function and gathers relavent info for display
    (0,_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.updateWeatherMap)(location);
}

async function loadPage(location, map) {
    // Add some visual indication that we're waiting for the data (promise.all) before it gets displayed (Map would likey take the longest to display)
    //Could add a class to change the display prior to promise.all showing that it's loading, and remove it to show data if successful or display a no results found page if error
    (0,_domFunctions__WEBPACK_IMPORTED_MODULE_1__.startLoadingAnimation)();

    // Use a promise.all to wait for all processing to complete before displaying data

    Promise.all([
        processWeather(location),
        processAirQuality(location),
        processForecast(location),
        processMap(location),
    ])
        .then((data) => {
            (0,_domFunctions__WEBPACK_IMPORTED_MODULE_1__.populateLocation)(data[0]);
            (0,_domFunctions__WEBPACK_IMPORTED_MODULE_1__.populateCurrentWeather)(data[0]);
            (0,_domFunctions__WEBPACK_IMPORTED_MODULE_1__.populateAirQuality)(data[1]);
            (0,_domFunctions__WEBPACK_IMPORTED_MODULE_1__.populateForecast)(data[2]);
        })
        .catch((error) => {
            console.log(error);
            (0,_domFunctions__WEBPACK_IMPORTED_MODULE_1__.addError)();
        })
        .finally(() => {
            (0,_domFunctions__WEBPACK_IMPORTED_MODULE_1__.endLoadingAnimation)();
        });
}

const submitBtn = document.querySelector(".submitBtn");

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const search = document.querySelector(".search");

    loadPage(search.value);

    search.value = "";
});

let map = (0,_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.getWeatherMap)("London");
loadPage("London");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QiIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2FwaUZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9kb21GdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGdW5jdGlvbnMgdG8gZmV0Y2ggd2VhdGhlciBkYXRhIHRocm91Z2ggQVBJXG5cbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXIobG9jYXRpb24pIHtcbiAgICBjb25zdCB3ZWF0aGVyUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtsb2NhdGlvbn0mdW5pdHM9bWV0cmljJkFQUElEPTY5YTBmZTlkODlhYTNjNTYyYzA5YTUwZmJkNTA1MDQ2YFxuICAgICk7XG5cbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHdlYXRoZXJSZXNwb25zZS5qc29uKCk7XG5cbiAgICByZXR1cm4gd2VhdGhlckRhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEFpclF1YWxpdHkobG9jYXRpb24pIHtcbiAgICBjb25zdCB3ZWF0aGVyUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtsb2NhdGlvbn0mdW5pdHM9bWV0cmljJkFQUElEPTY5YTBmZTlkODlhYTNjNTYyYzA5YTUwZmJkNTA1MDQ2YFxuICAgICk7XG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCB3ZWF0aGVyUmVzcG9uc2UuanNvbigpO1xuXG4gICAgbGV0IGxhdCA9IHdlYXRoZXJEYXRhLmNvb3JkLmxhdDtcbiAgICBsZXQgbG9uID0gd2VhdGhlckRhdGEuY29vcmQubG9uO1xuXG4gICAgY29uc3QgYWlyUXVhbGl0eVJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvYWlyX3BvbGx1dGlvbj9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mQVBQSUQ9NjlhMGZlOWQ4OWFhM2M1NjJjMDlhNTBmYmQ1MDUwNDZgXG4gICAgKTtcblxuICAgIGNvbnN0IGFpclF1YWxpdHlEYXRhID0gYXdhaXQgYWlyUXVhbGl0eVJlc3BvbnNlLmpzb24oKTtcblxuICAgIHJldHVybiBhaXJRdWFsaXR5RGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0Rm9yZWNhc3QobG9jYXRpb24pIHtcbiAgICBjb25zdCBmb3JlY2FzdFJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT0ke2xvY2F0aW9ufSZ1bml0cz1tZXRyaWMmYXBwaWQ9NjlhMGZlOWQ4OWFhM2M1NjJjMDlhNTBmYmQ1MDUwNDZgXG4gICAgKTtcblxuICAgIGNvbnN0IGZvcmVjYXN0RGF0YSA9IGF3YWl0IGZvcmVjYXN0UmVzcG9uc2UuanNvbigpO1xuXG4gICAgcmV0dXJuIGZvcmVjYXN0RGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlck1hcChsb2NhdGlvbikge1xuICAgIGNvbnN0IHdlYXRoZXJSZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2xvY2F0aW9ufSZ1bml0cz1tZXRyaWMmQVBQSUQ9NjlhMGZlOWQ4OWFhM2M1NjJjMDlhNTBmYmQ1MDUwNDZgXG4gICAgKTtcbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHdlYXRoZXJSZXNwb25zZS5qc29uKCk7XG5cbiAgICBsZXQgbGF0ID0gd2VhdGhlckRhdGEuY29vcmQubGF0O1xuICAgIGxldCBsb24gPSB3ZWF0aGVyRGF0YS5jb29yZC5sb247XG5cbiAgICBjb25zdCB3ZWF0aGVyTWFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyTWFwXCIpO1xuICAgIHdlYXRoZXJNYXAuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIGxldCBtYXAgPSBMLm1hcChcIm1hcFwiKS5zZXRWaWV3KFtsYXQsIGxvbl0sIDgpO1xuXG4gICAgYXdhaXQgTC50aWxlTGF5ZXIoXCJodHRwczovL3RpbGUub3BlbnN0cmVldG1hcC5vcmcve3p9L3t4fS97eX0ucG5nXCIsIHtcbiAgICAgICAgbWF4Wm9vbTogOCxcbiAgICAgICAgYXR0cmlidXRpb246XG4gICAgICAgICAgICAnJmNvcHk7IDxhIGhyZWY9XCJodHRwOi8vd3d3Lm9wZW5zdHJlZXRtYXAub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+JyxcbiAgICB9KS5hZGRUbyhtYXApO1xuXG4gICAgYXdhaXQgTC50aWxlTGF5ZXIoXG4gICAgICAgIGBodHRwczovL3RpbGUub3BlbndlYXRoZXJtYXAub3JnL21hcC90ZW1wX25ldy97en0ve3h9L3t5fS5wbmc/YXBwaWQ9NjlhMGZlOWQ4OWFhM2M1NjJjMDlhNTBmYmQ1MDUwNDZgLFxuICAgICAgICB7XG4gICAgICAgICAgICBtYXhab29tOiA4LFxuICAgICAgICB9XG4gICAgKS5hZGRUbyhtYXApO1xuXG4gICAgcmV0dXJuIG1hcDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlV2VhdGhlck1hcChsb2NhdGlvbikge1xuICAgIGNvbnN0IHdlYXRoZXJSZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2xvY2F0aW9ufSZ1bml0cz1tZXRyaWMmQVBQSUQ9NjlhMGZlOWQ4OWFhM2M1NjJjMDlhNTBmYmQ1MDUwNDZgXG4gICAgKTtcbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHdlYXRoZXJSZXNwb25zZS5qc29uKCk7XG5cbiAgICBsZXQgbGF0ID0gd2VhdGhlckRhdGEuY29vcmQubGF0O1xuICAgIGxldCBsb24gPSB3ZWF0aGVyRGF0YS5jb29yZC5sb247XG5cbiAgICBtYXAuc2V0VmlldyhbbGF0LCBsb25dLCA4KTtcbn1cblxuZXhwb3J0IHtcbiAgICBnZXRXZWF0aGVyLFxuICAgIGdldEFpclF1YWxpdHksXG4gICAgZ2V0Rm9yZWNhc3QsXG4gICAgZ2V0V2VhdGhlck1hcCxcbiAgICB1cGRhdGVXZWF0aGVyTWFwLFxufTtcbiIsIi8vIEZ1bmN0aW9ucyB0byBjcmVhdGUgYW5kIGRpc3BsYXkgRE9NIGVsZW1lbnRzXG5cbmltcG9ydCB7XG4gICAgY29udmVydFRpbWUsXG4gICAgY29udmVydFdpbmREaXJlY3Rpb24sXG4gICAgY2FwaXRhbGl6ZUZpcnN0TGV0dGVycyxcbn0gZnJvbSBcIi4vdXRpbHNcIjtcblxuZnVuY3Rpb24gcG9wdWxhdGVMb2NhdGlvbihkYXRhKSB7XG4gICAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvY2F0aW9uXCIpO1xuICAgIGxvY2F0aW9uLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGRhdGEpIHtcbiAgICAgICAgaWYgKHByb3BlcnR5ID09IFwiTG9jYXRpb25cIikge1xuICAgICAgICAgICAgbGV0IHJlZ2lvbk5hbWVzID0gbmV3IEludGwuRGlzcGxheU5hbWVzKFtcImVuXCJdLCB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJyZWdpb25cIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IGNvdW50cnkgPSByZWdpb25OYW1lcy5vZihgJHtkYXRhW3Byb3BlcnR5XVsxXX1gKTtcblxuICAgICAgICAgICAgbG9jYXRpb24uaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV1bMF19LCAke2NvdW50cnl9YDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVDdXJyZW50V2VhdGhlcihkYXRhKSB7XG4gICAgY29uc3QgY3VycmVudFRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnRUaW1lXCIpO1xuXG4gICAgY29uc3QgY3VycmVudFdlYXRoZXJEZXRhaWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgXCIuY3VycmVudFdlYXRoZXJEZXRhaWxzXCJcbiAgICApO1xuXG4gICAgY29uc3QgY3VycmVudENvbmRpdGlvbkljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBcIi5jdXJyZW50Q29uZGl0aW9uSWNvblwiXG4gICAgKTtcbiAgICBjb25zdCBjdXJyZW50Q29uZGl0aW9uTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIFwiLmN1cnJlbnRDb25kaXRpb25OYW1lXCJcbiAgICApO1xuICAgIGNvbnN0IGN1cnJlbnRUZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50VGVtcFwiKTtcblxuICAgIGN1cnJlbnRXZWF0aGVyRGV0YWlscy5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGN1cnJlbnRUZW1wLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGRhdGEpIHtcbiAgICAgICAgaWYgKHByb3BlcnR5ID09IFwiRGF0ZVwiKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0YVtwcm9wZXJ0eV1bMF0gKiAxMDAwKTtcblxuICAgICAgICAgICAgY29uc3QgaG91ciA9IGRhdGUuZ2V0VVRDSG91cnMoZGF0ZSk7XG4gICAgICAgICAgICBjb25zdCBtaW51dGUgPSBkYXRlLmdldFVUQ01pbnV0ZXMoZGF0ZSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBjb252ZXJ0VGltZShkYXRhW3Byb3BlcnR5XVsxXSwgaG91ciwgbWludXRlKTtcblxuICAgICAgICAgICAgY3VycmVudFRpbWUuaW5uZXJIVE1MID0gdGltZTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eSA9PSBcIlRlbXBlcmF0dXJlXCIpIHtcbiAgICAgICAgICAgIGN1cnJlbnRUZW1wLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldfWA7XG4gICAgICAgICAgICAvLyBVKzIxMDkgZm9yIEZhaHJlbmhlaXRcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eSA9PSBcIkNvbmRpdGlvblwiKSB7XG4gICAgICAgICAgICBjdXJyZW50Q29uZGl0aW9uTmFtZS5pbm5lckhUTUwgPSBgJHtjYXBpdGFsaXplRmlyc3RMZXR0ZXJzKFxuICAgICAgICAgICAgICAgIGRhdGFbcHJvcGVydHldWzBdXG4gICAgICAgICAgICApfWA7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGNvbmRpdGlvbiBJY29uIGFjY29yZGluZyB0byBuYW1lXG4gICAgICAgICAgICBjdXJyZW50Q29uZGl0aW9uSWNvbi5zcmMgPSBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7ZGF0YVtwcm9wZXJ0eV1bMV19QDJ4LnBuZ2A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB3ZWF0aGVySXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBjb25zdCBociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKTtcbiAgICAgICAgICAgIHdlYXRoZXJJdGVtLmNsYXNzTGlzdC5hZGQoXCJjdXJyZW50V2VhdGhlckl0ZW1cIik7XG5cbiAgICAgICAgICAgIGNvbnN0IHdlYXRoZXJJdGVtUHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgY29uc3Qgd2VhdGhlckl0ZW1EYXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHdlYXRoZXJJdGVtRGF0YS5jbGFzc0xpc3QuYWRkKFwid2VhdGhlckl0ZW1EYXRhXCIpO1xuXG4gICAgICAgICAgICBpZiAocHJvcGVydHkgPT0gXCJMb2NhdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgd2VhdGhlckl0ZW1Qcm9wZXJ0eS5pbm5lckhUTUwgPSBgJHtwcm9wZXJ0eX1gO1xuXG4gICAgICAgICAgICAgICAgbGV0IHJlZ2lvbk5hbWVzID0gbmV3IEludGwuRGlzcGxheU5hbWVzKFtcImVuXCJdLCB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicmVnaW9uXCIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbGV0IGNvdW50cnkgPSByZWdpb25OYW1lcy5vZihgJHtkYXRhW3Byb3BlcnR5XVsxXX1gKTtcblxuICAgICAgICAgICAgICAgIHdlYXRoZXJJdGVtRGF0YS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XVswXX0sICR7Y291bnRyeX1gO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eSA9PSBcIldpbmRcIikge1xuICAgICAgICAgICAgICAgIHdlYXRoZXJJdGVtUHJvcGVydHkuaW5uZXJIVE1MID0gYCR7cHJvcGVydHl9YDtcbiAgICAgICAgICAgICAgICB3ZWF0aGVySXRlbURhdGEuaW5uZXJIVE1MID0gYCR7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFbcHJvcGVydHldWzBdXG4gICAgICAgICAgICAgICAgfSAke2NvbnZlcnRXaW5kRGlyZWN0aW9uKGRhdGFbcHJvcGVydHldWzFdKX1gO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3ZWF0aGVySXRlbVByb3BlcnR5LmlubmVySFRNTCA9IGAke3Byb3BlcnR5fWA7XG4gICAgICAgICAgICAgICAgd2VhdGhlckl0ZW1EYXRhLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3ZWF0aGVySXRlbS5hcHBlbmRDaGlsZCh3ZWF0aGVySXRlbVByb3BlcnR5KTtcbiAgICAgICAgICAgIHdlYXRoZXJJdGVtLmFwcGVuZENoaWxkKHdlYXRoZXJJdGVtRGF0YSk7XG5cbiAgICAgICAgICAgIGN1cnJlbnRXZWF0aGVyRGV0YWlscy5hcHBlbmRDaGlsZCh3ZWF0aGVySXRlbSk7XG4gICAgICAgICAgICBjdXJyZW50V2VhdGhlckRldGFpbHMuYXBwZW5kQ2hpbGQoaHIpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZUFpclF1YWxpdHkoZGF0YSkge1xuICAgIGNvbnN0IGFpclF1YWxpdHlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpclF1YWxpdHlDb250YWluZXJcIik7XG5cbiAgICBjb25zdCBhaXJRdWFsaXR5RGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlyUXVhbGl0eURpc3BsYXlcIik7XG4gICAgLy9jb25zdCBpbm5lclJpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmlubmVyUmluZ1wiKTtcbiAgICBjb25zdCBkaXNwbGF5UmluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGlzcGxheVJpbmdcIik7XG4gICAgY29uc3QgYXFpVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFxaVZhbHVlXCIpO1xuICAgIGNvbnN0IGFpclF1YWxpdHlIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpclF1YWxpdHlIZWFkZXJcIik7XG4gICAgY29uc3QgYWlyUXVhbGl0eVBhcmEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpclF1YWxpdHlQYXJhXCIpO1xuICAgIGNvbnN0IGRldGFpbHNCdG5EaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRldGFpbHNCdG5EaXZcIik7XG5cbiAgICAvL2FpclF1YWxpdHlEaXNwbGF5LmlubmVySFRNTCA9IFwiXCI7XG4gICAgLy9pbm5lclJpbmcuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBhcWlWYWx1ZS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGFpclF1YWxpdHlIZWFkZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBhaXJRdWFsaXR5UGFyYS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGRldGFpbHNCdG5EaXYuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIGNvbnN0IG96b25lVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXBvbmVudE96b25lIC52YWx1ZVwiKTtcbiAgICBjb25zdCBOMlZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wb25lbnROaXRyb2dlbkRpb3hpZGUgLnZhbHVlXCIpO1xuICAgIGNvbnN0IGZpbmVQTVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wb25lbnRGaW5lUE0gLnZhbHVlXCIpO1xuICAgIGNvbnN0IFBNVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXBvbmVudFBNIC52YWx1ZVwiKTtcbiAgICBjb25zdCBzdWxmdXJEaW94aWRlVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBcIi5jb21wb25lbnRTdWxmdXJEaW94aWRlIC52YWx1ZVwiXG4gICAgKTtcbiAgICBjb25zdCBjYXJib25Nb25veGlkZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgXCIuY29tcG9uZW50Q2FyYm9uTW9ub3hpZGUgLnZhbHVlXCJcbiAgICApO1xuXG4gICAgb3pvbmVWYWx1ZS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIE4yVmFsdWUuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBmaW5lUE1WYWx1ZS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIFBNVmFsdWUuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBzdWxmdXJEaW94aWRlVmFsdWUuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBjYXJib25Nb25veGlkZVZhbHVlLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBjb25zdCBhaXJRdWFsaXR5RGVzY2lwdGlvbnMgPSB7XG4gICAgICAgIDE6IFtcbiAgICAgICAgICAgIFwiRXhjZWxsZW50XCIsXG4gICAgICAgICAgICBcIlRoZSBhaXIgcXVhbGl0eSBpcyBpZGVhbCBmb3IgbW9zdCBpbmRpdmlkdWFsczsgRW5qb3kgeW91ciB1c3VhbCBvdXRkb29yIGFjdGl2aXRpZXMuXCIsXG4gICAgICAgIF0sXG4gICAgICAgIDI6IFtcbiAgICAgICAgICAgIFwiRmFpclwiLFxuICAgICAgICAgICAgXCJBaXIgcXVhbGl0eSBpcyBmYWlyIGFuZCBpcyBub3QgYSBjb25jZXJuIGZvciB0aGUgZ2VuZXJhbCBwdWJsaWMuIE5vIG5lZWQgdG8gbW9kaWZ5IHlvdXIgdXN1YWwgb3V0ZG9vciBhY3Rpdml0aWVzIHVubGVzcyB5b3UgZXhwZXJpZW5jZSBzeW1wdG9tcyBzdWNoIGFzIGNvdWdoaW5nIGFuZCB0aHJvYXQgaXJyaXRhdGlvbi5cIixcbiAgICAgICAgXSxcbiAgICAgICAgMzogW1xuICAgICAgICAgICAgXCJNb2RlcmF0ZVwiLFxuICAgICAgICAgICAgXCJBaXIgcXVhbGl0eSBpcyBtb2RlcmF0ZSBhbmQgdHlwaWNhbGx5IHNhZmUgZm9yIHRoZSBnZW5lcmFsIHB1YmxpYzsgQ29uc2lkZXIgcmVkdWNpbmcgb3IgcmVzY2hlZHVsaW5nIHN0cmVudW91cyBhY3Rpdml0aWVzIG91dGRvb3JzIGlmIHlvdSBleHBlcmllbmNlIHN5bXB0b21zIHN1Y2ggYXMgY291Z2hpbmcgYW5kIHRocm9hdCBpcnJpdGF0aW9uLlwiLFxuICAgICAgICBdLFxuICAgICAgICA0OiBbXG4gICAgICAgICAgICBcIlBvb3JcIixcbiAgICAgICAgICAgIFwiQWlyIHF1YWxpdHkgaXMgcG9vciBhbmQgcHJlY2F1dGlvbnMgc2hvdWxkIGJlIGNvbnNpZGVyZWQuIFJlZHVjZSBvciByZXNjaGVkdWxlIHN0cmVudW91cyBhY3Rpdml0aWVzIG91dGRvb3JzLiBDaGlsZHJlbiBhbmQgdGhlIGVsZGVybHkgc2hvdWxkIGFsc28gdGFrZSBpdCBlYXN5LlwiLFxuICAgICAgICBdLFxuICAgICAgICA1OiBbXG4gICAgICAgICAgICBcIlZlcnkgUG9vclwiLFxuICAgICAgICAgICAgXCJBaXIgcXVhbGl0eSBpcyB2ZXJ5IHBvb3I7IEF2b2lkIHN0cmVudW91cyBhY3Rpdml0aWVzIG91dGRvb3JzLiBDaGlsZHJlbiBhbmQgdGhlIGVsZGVybHkgc2hvdWxkIGFsc28gYXZvaWQgb3V0ZG9vciBwaHlzaWNhbCBleGVydGlvbi5cIixcbiAgICAgICAgXSxcbiAgICB9O1xuXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBkYXRhKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0eSA9PSBcIkFRSVwiKSB7XG4gICAgICAgICAgICBsZXQgc3BlZWQgPSAzMDtcbiAgICAgICAgICAgIGxldCBwcm9ncmVzc1ZhbHVlID0gMDtcbiAgICAgICAgICAgIGxldCBwcm9ncmVzc0VuZFZhbHVlID0gZGF0YVtwcm9wZXJ0eV0gKiAyMDtcblxuICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHByb2dyZXNzVmFsdWUgKz0gMTtcbiAgICAgICAgICAgICAgICAvL2FxaVZhbHVlLmlubmVySFRNTCA9IGAke3Byb2dyZXNzVmFsdWV9JWBcbiAgICAgICAgICAgICAgICBkaXNwbGF5UmluZy5zdHlsZS5iYWNrZ3JvdW5kID0gYGNvbmljLWdyYWRpZW50KFxuICAgICAgICAgICAgICAgICAgICAjNGQ1YmY5ICR7cHJvZ3Jlc3NWYWx1ZSAqIDMuNn1kZWcsXG4gICAgICAgICAgICAgICAgICAgICNjYWRjZmYgJHtwcm9ncmVzc1ZhbHVlICogMy42fWRlZ1xuICAgICAgICAgICAgICAgIClgO1xuICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzc1ZhbHVlID09IHByb2dyZXNzRW5kVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChwcm9ncmVzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgc3BlZWQpO1xuXG4gICAgICAgICAgICBhcWlWYWx1ZS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XX0gQVFJYDtcblxuICAgICAgICAgICAgYWlyUXVhbGl0eUhlYWRlci5pbm5lckhUTUwgPVxuICAgICAgICAgICAgICAgIGFpclF1YWxpdHlEZXNjaXB0aW9uc1tgJHtkYXRhW3Byb3BlcnR5XX1gXVswXTtcbiAgICAgICAgICAgIGFpclF1YWxpdHlQYXJhLmlubmVySFRNTCA9XG4gICAgICAgICAgICAgICAgYWlyUXVhbGl0eURlc2NpcHRpb25zW2Ake2RhdGFbcHJvcGVydHldfWBdWzFdO1xuICAgICAgICB9IGVsc2UgaWYgKHByb3BlcnR5ID09IFwiY29tcG9uZW50c1wiKSB7XG4gICAgICAgICAgICBvem9uZVZhbHVlLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldLm8zfSAmIzE4MWcvbTxzdXA+Mzwvc3VwPmA7XG4gICAgICAgICAgICBOMlZhbHVlLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldLm5vMn0gJiMxODFnL208c3VwPjM8L3N1cD5gO1xuICAgICAgICAgICAgZmluZVBNVmFsdWUuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV0ucG0yXzV9ICYjMTgxZy9tPHN1cD4zPC9zdXA+YDtcbiAgICAgICAgICAgIFBNVmFsdWUuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV0ucG0xMH0gJiMxODFnL208c3VwPjM8L3N1cD5gO1xuICAgICAgICAgICAgc3VsZnVyRGlveGlkZVZhbHVlLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldLnNvMn0gJiMxODFnL208c3VwPjM8L3N1cD5gO1xuICAgICAgICAgICAgY2FyYm9uTW9ub3hpZGVWYWx1ZS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XS5jb30gJiMxODFnL208c3VwPjM8L3N1cD5gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYWlyUXVhbGl0eUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYWlyUXVhbGl0eUJ0bi5jbGFzc0xpc3QuYWRkKFwiYWlyUXVhbGl0eUJ0blwiKTtcbiAgICBhaXJRdWFsaXR5QnRuLnRleHRDb250ZW50ID0gXCJNb3JlIERldGFpbHNcIjtcblxuICAgIGFpclF1YWxpdHlCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgYWlyUXVhbGl0eUNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKFwiZXhwYW5kQWlyUXVhbGl0eVwiKTtcblxuICAgICAgICBpZiAoYWlyUXVhbGl0eUJ0bi50ZXh0Q29udGVudCA9PSBcIk1vcmUgRGV0YWlsc1wiKSB7XG4gICAgICAgICAgICBhaXJRdWFsaXR5QnRuLnRleHRDb250ZW50ID0gXCJMZXNzIERldGFpbHNcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFpclF1YWxpdHlCdG4udGV4dENvbnRlbnQgPSBcIk1vcmUgRGV0YWlsc1wiO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBkZXRhaWxzQnRuRGl2LmFwcGVuZENoaWxkKGFpclF1YWxpdHlCdG4pO1xufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZUZvcmVjYXN0KGRhdGEpIHtcbiAgICBjb25zdCBmb3JlY2FzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9yZWNhc3RcIik7XG4gICAgZm9yZWNhc3QuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGZvcmVjYXN0VGlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGZvcmVjYXN0VGlsZS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RUaWxlXCIpO1xuXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0VGlsZU1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb25zdCBmb3JlY2FzdFRpbGVEaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY29uc3QgZm9yZWNhc3RUaWxlU3VwcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgZm9yZWNhc3RUaWxlTWFpbi5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RUaWxlTWFpblwiKTtcbiAgICAgICAgZm9yZWNhc3RUaWxlRGlzcGxheS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RUaWxlRGlzcGxheVwiKTtcbiAgICAgICAgZm9yZWNhc3RUaWxlU3VwcC5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RUaWxlU3VwcFwiKTtcblxuICAgICAgICBsZXQgdGlsZURhdGEgPSBkYXRhW2ldO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gdGlsZURhdGEpIHtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PSBcIkRhdGVcIikge1xuICAgICAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUodGlsZURhdGFbcHJvcGVydHldWzBdICogMTAwMCk7XG4gICAgICAgICAgICAgICAgbGV0IGhvdXIgPSBkYXRlLmdldFVUQ0hvdXJzKGRhdGUpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgdGltZS5pbm5lckhUTUwgPSBjb252ZXJ0VGltZSh0aWxlRGF0YVtwcm9wZXJ0eV1bMV0sIGhvdXIpO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUaWxlTWFpbi5hcHBlbmRDaGlsZCh0aW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHkgPT0gXCJDb25kaXRpb25cIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0SWNvblwiKTtcblxuICAgICAgICAgICAgICAgIGljb24uc3JjID0gYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3RpbGVEYXRhW3Byb3BlcnR5XVsxXX1AMngucG5nYDtcblxuICAgICAgICAgICAgICAgIGZvcmVjYXN0VGlsZURpc3BsYXkuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BlcnR5ID09IFwiVGVtcGVyYXR1cmVcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRlbXAuaW5uZXJIVE1MID0gYCR7dGlsZURhdGFbcHJvcGVydHldfWA7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVEaXNwbGF5LmFwcGVuZENoaWxkKGZvcmVjYXN0VGVtcCk7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUaWxlTWFpbi5hcHBlbmRDaGlsZChmb3JlY2FzdFRpbGVEaXNwbGF5KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHkgPT0gXCJQb3BcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgICAgICAgICBwb3AuaW5uZXJIVE1MID0gYCR7dGlsZURhdGFbcHJvcGVydHldfSBwb3BgO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUaWxlTWFpbi5hcHBlbmRDaGlsZChwb3ApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JlY2FzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RJdGVtXCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgaHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIik7XG4gICAgICAgICAgICAgICAgaHIuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0SHJcIik7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmb3JlY2FzdEl0ZW1Qcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9yZWNhc3RJdGVtRGF0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1Qcm9wZXJ0eS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RJdGVtUHJvcGVydHlcIik7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtRGF0YS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RJdGVtRGF0YVwiKTtcblxuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PSBcIldpbmRcIikge1xuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1Qcm9wZXJ0eS5pbm5lckhUTUwgPSBgJHtwcm9wZXJ0eX1gO1xuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1EYXRhLmlubmVySFRNTCA9IGAke1xuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZURhdGFbcHJvcGVydHldLnNwZWVkXG4gICAgICAgICAgICAgICAgICAgIH0gJHtjb252ZXJ0V2luZERpcmVjdGlvbih0aWxlRGF0YVtwcm9wZXJ0eV0uZGlyZWN0aW9uKX1gO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW1Qcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW1EYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmFwcGVuZENoaWxkKGhyKTtcblxuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVTdXBwLmFwcGVuZENoaWxkKGZvcmVjYXN0SXRlbSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtUHJvcGVydHkuaW5uZXJIVE1MID0gYCR7cHJvcGVydHl9YDtcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtRGF0YS5pbm5lckhUTUwgPSBgJHt0aWxlRGF0YVtwcm9wZXJ0eV19YDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uYXBwZW5kQ2hpbGQoZm9yZWNhc3RJdGVtUHJvcGVydHkpO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW1EYXRhKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uYXBwZW5kQ2hpbGQoaHIpO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUaWxlU3VwcC5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZXhwYW5kQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgZXhwYW5kQnRuLmNsYXNzTGlzdC5hZGQoXCJleHBhbmRCdG5cIik7XG4gICAgICAgIGV4cGFuZEJ0bi5pbm5lckhUTUwgPSBcIiYjODk2NFwiO1xuXG4gICAgICAgIGV4cGFuZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZm9yZWNhc3RUaWxlLmNsYXNzTGlzdC50b2dnbGUoXCJleHBhbmRGb3JlY2FzdFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yZWNhc3RUaWxlTWFpbi5hcHBlbmRDaGlsZChleHBhbmRCdG4pO1xuXG4gICAgICAgIGZvcmVjYXN0VGlsZS5hcHBlbmRDaGlsZChmb3JlY2FzdFRpbGVNYWluKTtcbiAgICAgICAgZm9yZWNhc3RUaWxlLmFwcGVuZENoaWxkKGZvcmVjYXN0VGlsZVN1cHApO1xuXG4gICAgICAgIGZvcmVjYXN0LmFwcGVuZENoaWxkKGZvcmVjYXN0VGlsZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBhZGRFcnJvcigpIHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9jYXRpb25cIik7XG4gICAgbG9jYXRpb24uaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIGNvbnN0IG91dGVyV3JhcHBlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm91dGVyV3JhcHBlclwiKTtcblxuICAgIGNvbnN0IGVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lcnJvckNvbnRhaW5lclwiKTtcbiAgICBjb25zdCBlcnJvcldyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVycm9yV3JhcHBlclwiKTtcblxuICAgIG91dGVyV3JhcHBlcnMuZm9yRWFjaCgod3JhcHBlcikgPT4ge1xuICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJoaWRlQ29udGFpbmVyXCIpO1xuICAgIH0pO1xuXG4gICAgZXJyb3JXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlQ29udGFpbmVyXCIpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFcnJvcigpIHtcbiAgICBjb25zdCBvdXRlcldyYXBwZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5vdXRlcldyYXBwZXJcIik7XG4gICAgY29uc3QgZXJyb3JXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lcnJvcldyYXBwZXJcIik7XG5cbiAgICBvdXRlcldyYXBwZXJzLmZvckVhY2goKHdyYXBwZXIpID0+IHtcbiAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZUNvbnRhaW5lclwiKTtcbiAgICB9KTtcblxuICAgIGVycm9yV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiaGlkZUNvbnRhaW5lclwiKTtcbn1cblxuZnVuY3Rpb24gc3RhcnRMb2FkaW5nQW5pbWF0aW9uKCkge1xuICAgIHJlbW92ZUVycm9yKCk7XG5cbiAgICBjb25zdCBjb25kaXRpb25Db250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgXCIuY29uZGl0aW9uQ29udGFpbmVyXCJcbiAgICApO1xuICAgIGNvbnN0IG91dGVyV3JhcHBlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm91dGVyV3JhcHBlclwiKTtcblxuICAgIGNvbmRpdGlvbkNvbnRhaW5lcnMuZm9yRWFjaCgoY29udGFpbmVyKSA9PiB7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaGlkZUNvbnRhaW5lclwiKTtcbiAgICB9KTtcblxuICAgIG91dGVyV3JhcHBlcnMuZm9yRWFjaCgod3JhcHBlcikgPT4ge1xuICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJza2VsZXRvblwiKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZW5kTG9hZGluZ0FuaW1hdGlvbigpIHtcbiAgICBjb25zdCBjb25kaXRpb25Db250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgXCIuY29uZGl0aW9uQ29udGFpbmVyXCJcbiAgICApO1xuXG4gICAgY29uc3Qgb3V0ZXJXcmFwcGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIub3V0ZXJXcmFwcGVyXCIpO1xuXG4gICAgY29uZGl0aW9uQ29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IHtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlQ29udGFpbmVyXCIpO1xuICAgIH0pO1xuXG4gICAgb3V0ZXJXcmFwcGVycy5mb3JFYWNoKCh3cmFwcGVyKSA9PiB7XG4gICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcInNrZWxldG9uXCIpO1xuICAgIH0pO1xufVxuXG5leHBvcnQge1xuICAgIHBvcHVsYXRlTG9jYXRpb24sXG4gICAgcG9wdWxhdGVDdXJyZW50V2VhdGhlcixcbiAgICBwb3B1bGF0ZUFpclF1YWxpdHksXG4gICAgcG9wdWxhdGVGb3JlY2FzdCxcbiAgICBhZGRFcnJvcixcbiAgICBzdGFydExvYWRpbmdBbmltYXRpb24sXG4gICAgZW5kTG9hZGluZ0FuaW1hdGlvbixcbn07XG4iLCIvLyBVdGlsaXR5IGZ1bmN0aW9ucyBmb3IgV2VhdGhlckFwcFxuXG5mdW5jdGlvbiBjb252ZXJ0VGltZSh0aW1lem9uZSwgaG91ciwgbWludXRlKSB7XG4gICAgLy8gVGFrZXMgdGhlIGhvdXIgaW4gMjRociB0aW1lIGFuZCBjb252ZXJ0cyBpdCB0byAxMmhyIHRpbWUgd2l0aCBBTSBvciBQTVxuICAgIGxldCBuZXdUaW1lID0gXCJcIjtcblxuICAgIGNvbnN0IHRpbWV6b25lU2hpZnQgPSBNYXRoLmZsb29yKHRpbWV6b25lIC8gMzYwMCk7XG4gICAgbGV0IGFkanVzdGVkSG91ciA9IGhvdXIgKyB0aW1lem9uZVNoaWZ0O1xuXG4gICAgaWYgKGFkanVzdGVkSG91ciA8IDApIHtcbiAgICAgICAgYWRqdXN0ZWRIb3VyID0gYWRqdXN0ZWRIb3VyICsgMjQ7XG4gICAgfVxuXG4gICAgaWYgKCFtaW51dGUpIHtcbiAgICAgICAgaWYgKGFkanVzdGVkSG91ciA8IDEyKSB7XG4gICAgICAgICAgICBuZXdUaW1lID0gYCR7YWRqdXN0ZWRIb3VyICUgMTIgfHwgMTJ9QU1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3VGltZSA9IGAke2FkanVzdGVkSG91ciAlIDEyIHx8IDEyfVBNYDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChtaW51dGUudG9TdHJpbmcoKS5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgbWludXRlID0gXCIwXCIgKyBtaW51dGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFkanVzdGVkSG91ciA8IDEyKSB7XG4gICAgICAgICAgICBuZXdUaW1lID0gYCR7YWRqdXN0ZWRIb3VyICUgMTIgfHwgMTJ9OiR7bWludXRlfUFNYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1RpbWUgPSBgJHthZGp1c3RlZEhvdXIgJSAxMiB8fCAxMn06JHttaW51dGV9UE1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1RpbWU7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRXaW5kRGlyZWN0aW9uKGRlZykge1xuICAgIC8vIENoYW5nZSBpbiBkaXJlY3Rpb24gZXZlcnkgMjIuNSBkZWdyZWVzXG4gICAgY29uc3QgdmFsID0gTWF0aC5yb3VuZChkZWcgLyAyMi41KTtcbiAgICBjb25zdCBjb21wYXNzRGlyZWN0aW9ucyA9IFtcbiAgICAgICAgXCJOXCIsXG4gICAgICAgIFwiTk5FXCIsXG4gICAgICAgIFwiTkVcIixcbiAgICAgICAgXCJFTkVcIixcbiAgICAgICAgXCJFXCIsXG4gICAgICAgIFwiRVNFXCIsXG4gICAgICAgIFwiU0VcIixcbiAgICAgICAgXCJTU0VcIixcbiAgICAgICAgXCJTXCIsXG4gICAgICAgIFwiU1NXXCIsXG4gICAgICAgIFwiU1dcIixcbiAgICAgICAgXCJXU1dcIixcbiAgICAgICAgXCJXXCIsXG4gICAgICAgIFwiV05XXCIsXG4gICAgICAgIFwiTldcIixcbiAgICAgICAgXCJOTldcIixcbiAgICBdO1xuXG4gICAgY29uc3QgZGlyZWN0aW9uID0gY29tcGFzc0RpcmVjdGlvbnNbdmFsICUgMTZdO1xuXG4gICAgcmV0dXJuIGRpcmVjdGlvbjtcbn1cblxuZnVuY3Rpb24gY2FwaXRhbGl6ZUZpcnN0TGV0dGVycyhwaHJhc2UpIHtcbiAgICBjb25zdCB3b3JkcyA9IHBocmFzZS5zcGxpdChcIiBcIik7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHdvcmRzW2ldID0gd29yZHNbaV1bMF0udG9VcHBlckNhc2UoKSArIHdvcmRzW2ldLnN1YnN0cigxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd29yZHMuam9pbihcIiBcIik7XG59XG5cbmV4cG9ydCB7IGNvbnZlcnRUaW1lLCBjb252ZXJ0V2luZERpcmVjdGlvbiwgY2FwaXRhbGl6ZUZpcnN0TGV0dGVycyB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTb3VyY2UgaW5kZXggc2NyaXB0IGZvciBXZWF0aGVyIEFwcFxuXG5pbXBvcnQge1xuICAgIGdldFdlYXRoZXIsXG4gICAgZ2V0QWlyUXVhbGl0eSxcbiAgICBnZXRGb3JlY2FzdCxcbiAgICBnZXRXZWF0aGVyTWFwLFxuICAgIHVwZGF0ZVdlYXRoZXJNYXAsXG59IGZyb20gXCIuL2FwaUZ1bmN0aW9uc1wiO1xuaW1wb3J0IHtcbiAgICBwb3B1bGF0ZUxvY2F0aW9uLFxuICAgIHBvcHVsYXRlQ3VycmVudFdlYXRoZXIsXG4gICAgcG9wdWxhdGVBaXJRdWFsaXR5LFxuICAgIHBvcHVsYXRlRm9yZWNhc3QsXG4gICAgYWRkRXJyb3IsXG4gICAgc3RhcnRMb2FkaW5nQW5pbWF0aW9uLFxuICAgIGVuZExvYWRpbmdBbmltYXRpb24sXG59IGZyb20gXCIuL2RvbUZ1bmN0aW9uc1wiO1xuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzV2VhdGhlcihsb2NhdGlvbikge1xuICAgIC8vIEdldHMgZGF0YSBmcm9tIGdldCB3ZWF0aGVyIGFwaUZ1bmN0aW9ucyBmdW5jdGlvbiBhbmQgZ2F0aGVycyByZWxhdmVudCBpbmZvIGZvciBkaXNwbGF5XG4gICAgLy8gTmVlZCB0byBhZGQgdHJ5L2NhdGNoIHRvIGhhbmRsZSBlcnJvclxuXG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCBnZXRXZWF0aGVyKGxvY2F0aW9uKTtcblxuICAgIGNvbnNvbGUubG9nKHdlYXRoZXJEYXRhKTtcblxuICAgIGxldCBpbXBvcnRhbnREYXRhID0ge307XG5cbiAgICBpbXBvcnRhbnREYXRhLkxvY2F0aW9uID0gW3dlYXRoZXJEYXRhLm5hbWUsIHdlYXRoZXJEYXRhLnN5cy5jb3VudHJ5XTtcbiAgICBpbXBvcnRhbnREYXRhLkRhdGUgPSBbd2VhdGhlckRhdGEuZHQsIHdlYXRoZXJEYXRhLnRpbWV6b25lXTtcbiAgICBpbXBvcnRhbnREYXRhLlRlbXBlcmF0dXJlID0gYCR7TWF0aC5yb3VuZCh3ZWF0aGVyRGF0YS5tYWluLnRlbXApfSAmIzg0NTFgO1xuICAgIGltcG9ydGFudERhdGFbXCJGZWVscyBMaWtlXCJdID0gYCR7TWF0aC5yb3VuZChcbiAgICAgICAgd2VhdGhlckRhdGEubWFpbi5mZWVsc19saWtlXG4gICAgKX0gJiM4NDUxYDtcbiAgICBpbXBvcnRhbnREYXRhLkh1bWlkaXR5ID0gYCR7d2VhdGhlckRhdGEubWFpbi5odW1pZGl0eX0gJWA7XG4gICAgaW1wb3J0YW50RGF0YS5XaW5kID0gW1xuICAgICAgICBgJHtNYXRoLnJvdW5kKHdlYXRoZXJEYXRhLndpbmQuc3BlZWQgKiAzLjYgKiAxMDApIC8gMTAwfSBrbS9ocmAsXG4gICAgICAgIHdlYXRoZXJEYXRhLndpbmQuZGVnLFxuICAgIF07XG5cbiAgICBpZiAod2VhdGhlckRhdGEud2luZC5ndXN0KSB7XG4gICAgICAgIGltcG9ydGFudERhdGEuR3VzdCA9IGAke1xuICAgICAgICAgICAgTWF0aC5yb3VuZCh3ZWF0aGVyRGF0YS53aW5kLmd1c3QgKiAzLjYgKiAxMDApIC8gMTAwXG4gICAgICAgIH0ga20vaHJgO1xuICAgIH1cblxuICAgIGlmICh3ZWF0aGVyRGF0YS5yYWluKSB7XG4gICAgICAgIGltcG9ydGFudERhdGEuUmFpbiA9IGAke3dlYXRoZXJEYXRhLnJhaW5bXCIxaFwiXX0gbW1gO1xuICAgIH1cblxuICAgIGltcG9ydGFudERhdGEuQ29uZGl0aW9uID0gW1xuICAgICAgICB3ZWF0aGVyRGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICB3ZWF0aGVyRGF0YS53ZWF0aGVyWzBdLmljb24sXG4gICAgXTtcblxuICAgIC8vIEZvcm1hdCB0aGlzIG9iamVjdCBiZXR0ZXJcbiAgICAvLyBPYmplY3QgQ29uc3RydWN0b3IgYW5kIGNyZWF0ZSBtZXRob2QgdG8gY29udmVydCB0byBkaWZmZXJlbnQgdW5pdHNcblxuICAgIHJldHVybiBpbXBvcnRhbnREYXRhO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzQWlyUXVhbGl0eShsb2NhdGlvbikge1xuICAgIC8vIEdldHMgZGF0YSBmcm9tIGFpciBxdWFsaXR5IGFwaUZ1bmN0aW9ucyBmdW5jdGlvbiBhbmQgZ2F0aGVycyByZWxhdmVudCBpbmZvIGZvciBkaXNwbGF5XG5cbiAgICBjb25zdCBhaXJRdWFsaXR5RGF0YSA9IGF3YWl0IGdldEFpclF1YWxpdHkobG9jYXRpb24pO1xuICAgIGNvbnNvbGUubG9nKGFpclF1YWxpdHlEYXRhKTtcblxuICAgIGxldCBpbXBvcnRhbnREYXRhID0ge307XG5cbiAgICBpbXBvcnRhbnREYXRhLkFRSSA9IGFpclF1YWxpdHlEYXRhLmxpc3RbMF0ubWFpbi5hcWk7XG4gICAgaW1wb3J0YW50RGF0YS5jb21wb25lbnRzID0gYWlyUXVhbGl0eURhdGEubGlzdFswXS5jb21wb25lbnRzO1xuXG4gICAgcmV0dXJuIGltcG9ydGFudERhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NGb3JlY2FzdChsb2NhdGlvbikge1xuICAgIC8vIEdldHMgZGF0YSBmcm9tIGZvcmVjYXN0IGFwaUZ1bmN0aW9ucyBmdW5jdGlvbiBhbmQgZ2F0aGVycyByZWxhdmVudCBpbmZvIGZvciBkaXNwbGF5XG5cbiAgICBjb25zdCBmb3JlY2FzdERhdGEgPSBhd2FpdCBnZXRGb3JlY2FzdChsb2NhdGlvbik7XG4gICAgY29uc29sZS5sb2coZm9yZWNhc3REYXRhKTtcblxuICAgIGxldCBpbXBvcnRhbnREYXRhID0gW107XG5cbiAgICBmb3IgKGNvbnN0IGluZGV4IGluIGZvcmVjYXN0RGF0YS5saXN0KSB7XG4gICAgICAgIGltcG9ydGFudERhdGFbaW5kZXhdID0ge307XG4gICAgICAgIGltcG9ydGFudERhdGFbaW5kZXhdLkRhdGUgPSBbXG4gICAgICAgICAgICBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0uZHQsXG4gICAgICAgICAgICBmb3JlY2FzdERhdGEuY2l0eS50aW1lem9uZSxcbiAgICAgICAgXTtcbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF0uQ29uZGl0aW9uID0gW1xuICAgICAgICAgICAgZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ud2VhdGhlclswXS5pY29uLFxuICAgICAgICBdO1xuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XS5UZW1wZXJhdHVyZSA9IGAke01hdGgucm91bmQoXG4gICAgICAgICAgICBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ubWFpbi50ZW1wXG4gICAgICAgICl9ICYjODQ1MWA7XG4gICAgICAgIGltcG9ydGFudERhdGFbaW5kZXhdLlBvcCA9IGAke01hdGgucm91bmQoXG4gICAgICAgICAgICBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ucG9wICogMTAwXG4gICAgICAgICl9ICVgO1xuXG4gICAgICAgIGltcG9ydGFudERhdGFbaW5kZXhdW1wiRmVlbHMgTGlrZVwiXSA9IGAke01hdGgucm91bmQoXG4gICAgICAgICAgICBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ubWFpbi5mZWVsc19saWtlXG4gICAgICAgICl9ICYjODQ1MWA7XG4gICAgICAgIGltcG9ydGFudERhdGFbXG4gICAgICAgICAgICBpbmRleFxuICAgICAgICBdLkh1bWlkaXR5ID0gYCR7Zm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLm1haW4uaHVtaWRpdHl9JWA7XG5cbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF1bXG4gICAgICAgICAgICBcIkNsb3VkIENvdmVyXCJcbiAgICAgICAgXSA9IGAke2ZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS5jbG91ZHMuYWxsfSAlYDtcbiAgICAgICAgaW1wb3J0YW50RGF0YVtcbiAgICAgICAgICAgIGluZGV4XG4gICAgICAgIF0uVmlzaWJpbGl0eSA9IGAke2ZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS52aXNpYmlsaXR5fSBrbWA7XG5cbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF0uV2luZCA9IHtcbiAgICAgICAgICAgIHNwZWVkOiBgJHtcbiAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKGZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS53aW5kLnNwZWVkICogMy42ICogMTAwKSAvXG4gICAgICAgICAgICAgICAgMTAwXG4gICAgICAgICAgICB9IGttL2hyYCxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLndpbmQuZGVnLFxuICAgICAgICB9O1xuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XS5HdXN0ID0gYCR7XG4gICAgICAgICAgICBNYXRoLnJvdW5kKGZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS53aW5kLmd1c3QgKiAzLjYgKiAxMDApIC8gMTAwXG4gICAgICAgIH0ga20vaHJgO1xuICAgIH1cblxuICAgIHJldHVybiBpbXBvcnRhbnREYXRhO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzTWFwKGxvY2F0aW9uKSB7XG4gICAgLy8gR2V0cyBkYXRhIGZyb20gbWFwIGFwaUZ1bmN0aW9ucyBmdW5jdGlvbiBhbmQgZ2F0aGVycyByZWxhdmVudCBpbmZvIGZvciBkaXNwbGF5XG4gICAgdXBkYXRlV2VhdGhlck1hcChsb2NhdGlvbik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWRQYWdlKGxvY2F0aW9uLCBtYXApIHtcbiAgICAvLyBBZGQgc29tZSB2aXN1YWwgaW5kaWNhdGlvbiB0aGF0IHdlJ3JlIHdhaXRpbmcgZm9yIHRoZSBkYXRhIChwcm9taXNlLmFsbCkgYmVmb3JlIGl0IGdldHMgZGlzcGxheWVkIChNYXAgd291bGQgbGlrZXkgdGFrZSB0aGUgbG9uZ2VzdCB0byBkaXNwbGF5KVxuICAgIC8vQ291bGQgYWRkIGEgY2xhc3MgdG8gY2hhbmdlIHRoZSBkaXNwbGF5IHByaW9yIHRvIHByb21pc2UuYWxsIHNob3dpbmcgdGhhdCBpdCdzIGxvYWRpbmcsIGFuZCByZW1vdmUgaXQgdG8gc2hvdyBkYXRhIGlmIHN1Y2Nlc3NmdWwgb3IgZGlzcGxheSBhIG5vIHJlc3VsdHMgZm91bmQgcGFnZSBpZiBlcnJvclxuICAgIHN0YXJ0TG9hZGluZ0FuaW1hdGlvbigpO1xuXG4gICAgLy8gVXNlIGEgcHJvbWlzZS5hbGwgdG8gd2FpdCBmb3IgYWxsIHByb2Nlc3NpbmcgdG8gY29tcGxldGUgYmVmb3JlIGRpc3BsYXlpbmcgZGF0YVxuXG4gICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICBwcm9jZXNzV2VhdGhlcihsb2NhdGlvbiksXG4gICAgICAgIHByb2Nlc3NBaXJRdWFsaXR5KGxvY2F0aW9uKSxcbiAgICAgICAgcHJvY2Vzc0ZvcmVjYXN0KGxvY2F0aW9uKSxcbiAgICAgICAgcHJvY2Vzc01hcChsb2NhdGlvbiksXG4gICAgXSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHBvcHVsYXRlTG9jYXRpb24oZGF0YVswXSk7XG4gICAgICAgICAgICBwb3B1bGF0ZUN1cnJlbnRXZWF0aGVyKGRhdGFbMF0pO1xuICAgICAgICAgICAgcG9wdWxhdGVBaXJRdWFsaXR5KGRhdGFbMV0pO1xuICAgICAgICAgICAgcG9wdWxhdGVGb3JlY2FzdChkYXRhWzJdKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgYWRkRXJyb3IoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgZW5kTG9hZGluZ0FuaW1hdGlvbigpO1xuICAgICAgICB9KTtcbn1cblxuY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWJtaXRCdG5cIik7XG5cbnN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBzZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaFwiKTtcblxuICAgIGxvYWRQYWdlKHNlYXJjaC52YWx1ZSk7XG5cbiAgICBzZWFyY2gudmFsdWUgPSBcIlwiO1xufSk7XG5cbmxldCBtYXAgPSBnZXRXZWF0aGVyTWFwKFwiTG9uZG9uXCIpO1xubG9hZFBhZ2UoXCJMb25kb25cIik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=