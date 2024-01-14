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
/* harmony export */   "getWeather": () => (/* binding */ getWeather)
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

async function getWeatherMap(location) {}




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

async function processMap() {
    // Gets data from map apiFunctions function and gathers relavent info for display
}

async function loadPage(location) {
    // Add some visual indication that we're waiting for the data (promise.all) before it gets displayed (Map would likey take the longest to display)
    //Could add a class to change the display prior to promise.all showing that it's loading, and remove it to show data if successful or display a no results found page if error
    (0,_domFunctions__WEBPACK_IMPORTED_MODULE_1__.startLoadingAnimation)();

    // Use a promise.all to wait for all processing to complete before displaying data

    Promise.all([
        processWeather(location),
        processAirQuality(location),
        processForecast(location),
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

submitBtn.addEventListener("click", () => {
    const search = document.querySelector(".search");

    if (search.value != "") {
        loadPage(search.value);
    }

    search.value = "";
});

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

loadPage("London");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0EsV0FBVztBQUNYLHNDQUFzQztBQUN0QztBQUNBLFdBQVc7O0FBRVgsZ0RBQWdEO0FBQ2hEO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSx3QkFBd0IsdUNBQXVDOztBQUUvRDtBQUNBO0FBQ0EsZUFBZSxxQ0FBcUM7QUFDcEQ7QUFDQTtBQUNBLDBCQUEwQixxQ0FBcUM7O0FBRS9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUksb0VBQXFCOztBQUV6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLCtEQUFnQjtBQUM1QixZQUFZLHFFQUFzQjtBQUNsQyxZQUFZLGlFQUFrQjtBQUM5QixZQUFZLCtEQUFnQjtBQUM1QixTQUFTO0FBQ1Q7QUFDQTtBQUNBLFlBQVksdURBQVE7QUFDcEIsU0FBUztBQUNUO0FBQ0EsWUFBWSxrRUFBbUI7QUFDL0IsU0FBUztBQUNUOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hcGlGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZG9tRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRnVuY3Rpb25zIHRvIGZldGNoIHdlYXRoZXIgZGF0YSB0aHJvdWdoIEFQSVxuXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyKGxvY2F0aW9uKSB7XG4gICAgY29uc3Qgd2VhdGhlclJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7bG9jYXRpb259JnVuaXRzPW1ldHJpYyZBUFBJRD02OWEwZmU5ZDg5YWEzYzU2MmMwOWE1MGZiZDUwNTA0NmBcbiAgICApO1xuXG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCB3ZWF0aGVyUmVzcG9uc2UuanNvbigpO1xuXG4gICAgcmV0dXJuIHdlYXRoZXJEYXRhO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRBaXJRdWFsaXR5KGxvY2F0aW9uKSB7XG4gICAgY29uc3Qgd2VhdGhlclJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7bG9jYXRpb259JnVuaXRzPW1ldHJpYyZBUFBJRD02OWEwZmU5ZDg5YWEzYzU2MmMwOWE1MGZiZDUwNTA0NmBcbiAgICApO1xuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgd2VhdGhlclJlc3BvbnNlLmpzb24oKTtcblxuICAgIGxldCBsYXQgPSB3ZWF0aGVyRGF0YS5jb29yZC5sYXQ7XG4gICAgbGV0IGxvbiA9IHdlYXRoZXJEYXRhLmNvb3JkLmxvbjtcblxuICAgIGNvbnN0IGFpclF1YWxpdHlSZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2Fpcl9wb2xsdXRpb24/bGF0PSR7bGF0fSZsb249JHtsb259JkFQUElEPTY5YTBmZTlkODlhYTNjNTYyYzA5YTUwZmJkNTA1MDQ2YFxuICAgICk7XG5cbiAgICBjb25zdCBhaXJRdWFsaXR5RGF0YSA9IGF3YWl0IGFpclF1YWxpdHlSZXNwb25zZS5qc29uKCk7XG5cbiAgICByZXR1cm4gYWlyUXVhbGl0eURhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEZvcmVjYXN0KGxvY2F0aW9uKSB7XG4gICAgY29uc3QgZm9yZWNhc3RSZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtsb2NhdGlvbn0mdW5pdHM9bWV0cmljJmFwcGlkPTY5YTBmZTlkODlhYTNjNTYyYzA5YTUwZmJkNTA1MDQ2YFxuICAgICk7XG5cbiAgICBjb25zdCBmb3JlY2FzdERhdGEgPSBhd2FpdCBmb3JlY2FzdFJlc3BvbnNlLmpzb24oKTtcblxuICAgIHJldHVybiBmb3JlY2FzdERhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJNYXAobG9jYXRpb24pIHt9XG5cbmV4cG9ydCB7IGdldFdlYXRoZXIsIGdldEFpclF1YWxpdHksIGdldEZvcmVjYXN0IH07XG4iLCIvLyBGdW5jdGlvbnMgdG8gY3JlYXRlIGFuZCBkaXNwbGF5IERPTSBlbGVtZW50c1xuXG5pbXBvcnQge1xuICAgIGNvbnZlcnRUaW1lLFxuICAgIGNvbnZlcnRXaW5kRGlyZWN0aW9uLFxuICAgIGNhcGl0YWxpemVGaXJzdExldHRlcnMsXG59IGZyb20gXCIuL3V0aWxzXCI7XG5cbmZ1bmN0aW9uIHBvcHVsYXRlTG9jYXRpb24oZGF0YSkge1xuICAgIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2NhdGlvblwiKTtcbiAgICBsb2NhdGlvbi5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBkYXRhKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0eSA9PSBcIkxvY2F0aW9uXCIpIHtcbiAgICAgICAgICAgIGxldCByZWdpb25OYW1lcyA9IG5ldyBJbnRsLkRpc3BsYXlOYW1lcyhbXCJlblwiXSwge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwicmVnaW9uXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBjb3VudHJ5ID0gcmVnaW9uTmFtZXMub2YoYCR7ZGF0YVtwcm9wZXJ0eV1bMV19YCk7XG5cbiAgICAgICAgICAgIGxvY2F0aW9uLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldWzBdfSwgJHtjb3VudHJ5fWA7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlQ3VycmVudFdlYXRoZXIoZGF0YSkge1xuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50VGltZVwiKTtcblxuICAgIGNvbnN0IGN1cnJlbnRXZWF0aGVyRGV0YWlscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIFwiLmN1cnJlbnRXZWF0aGVyRGV0YWlsc1wiXG4gICAgKTtcblxuICAgIGNvbnN0IGN1cnJlbnRDb25kaXRpb25JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgXCIuY3VycmVudENvbmRpdGlvbkljb25cIlxuICAgICk7XG4gICAgY29uc3QgY3VycmVudENvbmRpdGlvbk5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBcIi5jdXJyZW50Q29uZGl0aW9uTmFtZVwiXG4gICAgKTtcbiAgICBjb25zdCBjdXJyZW50VGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudFRlbXBcIik7XG5cbiAgICBjdXJyZW50V2VhdGhlckRldGFpbHMuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBjdXJyZW50VGVtcC5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBkYXRhKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0eSA9PSBcIkRhdGVcIikge1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGFbcHJvcGVydHldWzBdICogMTAwMCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGhvdXIgPSBkYXRlLmdldFVUQ0hvdXJzKGRhdGUpO1xuICAgICAgICAgICAgY29uc3QgbWludXRlID0gZGF0ZS5nZXRVVENNaW51dGVzKGRhdGUpO1xuXG4gICAgICAgICAgICBjb25zdCB0aW1lID0gY29udmVydFRpbWUoZGF0YVtwcm9wZXJ0eV1bMV0sIGhvdXIsIG1pbnV0ZSk7XG5cbiAgICAgICAgICAgIGN1cnJlbnRUaW1lLmlubmVySFRNTCA9IHRpbWU7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHkgPT0gXCJUZW1wZXJhdHVyZVwiKSB7XG4gICAgICAgICAgICBjdXJyZW50VGVtcC5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XX1gO1xuICAgICAgICAgICAgLy8gVSsyMTA5IGZvciBGYWhyZW5oZWl0XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHkgPT0gXCJDb25kaXRpb25cIikge1xuICAgICAgICAgICAgY3VycmVudENvbmRpdGlvbk5hbWUuaW5uZXJIVE1MID0gYCR7Y2FwaXRhbGl6ZUZpcnN0TGV0dGVycyhcbiAgICAgICAgICAgICAgICBkYXRhW3Byb3BlcnR5XVswXVxuICAgICAgICAgICAgKX1gO1xuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBjb25kaXRpb24gSWNvbiBhY2NvcmRpbmcgdG8gbmFtZVxuICAgICAgICAgICAgY3VycmVudENvbmRpdGlvbkljb24uc3JjID0gYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2RhdGFbcHJvcGVydHldWzFdfUAyeC5wbmdgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgd2VhdGhlckl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgY29uc3QgaHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIik7XG4gICAgICAgICAgICB3ZWF0aGVySXRlbS5jbGFzc0xpc3QuYWRkKFwiY3VycmVudFdlYXRoZXJJdGVtXCIpO1xuXG4gICAgICAgICAgICBjb25zdCB3ZWF0aGVySXRlbVByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGNvbnN0IHdlYXRoZXJJdGVtRGF0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICB3ZWF0aGVySXRlbURhdGEuY2xhc3NMaXN0LmFkZChcIndlYXRoZXJJdGVtRGF0YVwiKTtcblxuICAgICAgICAgICAgaWYgKHByb3BlcnR5ID09IFwiTG9jYXRpb25cIikge1xuICAgICAgICAgICAgICAgIHdlYXRoZXJJdGVtUHJvcGVydHkuaW5uZXJIVE1MID0gYCR7cHJvcGVydHl9YDtcblxuICAgICAgICAgICAgICAgIGxldCByZWdpb25OYW1lcyA9IG5ldyBJbnRsLkRpc3BsYXlOYW1lcyhbXCJlblwiXSwge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInJlZ2lvblwiLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGxldCBjb3VudHJ5ID0gcmVnaW9uTmFtZXMub2YoYCR7ZGF0YVtwcm9wZXJ0eV1bMV19YCk7XG5cbiAgICAgICAgICAgICAgICB3ZWF0aGVySXRlbURhdGEuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV1bMF19LCAke2NvdW50cnl9YDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHkgPT0gXCJXaW5kXCIpIHtcbiAgICAgICAgICAgICAgICB3ZWF0aGVySXRlbVByb3BlcnR5LmlubmVySFRNTCA9IGAke3Byb3BlcnR5fWA7XG4gICAgICAgICAgICAgICAgd2VhdGhlckl0ZW1EYXRhLmlubmVySFRNTCA9IGAke1xuICAgICAgICAgICAgICAgICAgICBkYXRhW3Byb3BlcnR5XVswXVxuICAgICAgICAgICAgICAgIH0gJHtjb252ZXJ0V2luZERpcmVjdGlvbihkYXRhW3Byb3BlcnR5XVsxXSl9YDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2VhdGhlckl0ZW1Qcm9wZXJ0eS5pbm5lckhUTUwgPSBgJHtwcm9wZXJ0eX1gO1xuICAgICAgICAgICAgICAgIHdlYXRoZXJJdGVtRGF0YS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2VhdGhlckl0ZW0uYXBwZW5kQ2hpbGQod2VhdGhlckl0ZW1Qcm9wZXJ0eSk7XG4gICAgICAgICAgICB3ZWF0aGVySXRlbS5hcHBlbmRDaGlsZCh3ZWF0aGVySXRlbURhdGEpO1xuXG4gICAgICAgICAgICBjdXJyZW50V2VhdGhlckRldGFpbHMuYXBwZW5kQ2hpbGQod2VhdGhlckl0ZW0pO1xuICAgICAgICAgICAgY3VycmVudFdlYXRoZXJEZXRhaWxzLmFwcGVuZENoaWxkKGhyKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVBaXJRdWFsaXR5KGRhdGEpIHtcbiAgICBjb25zdCBhaXJRdWFsaXR5Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5haXJRdWFsaXR5Q29udGFpbmVyXCIpO1xuXG4gICAgY29uc3QgYWlyUXVhbGl0eURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpclF1YWxpdHlEaXNwbGF5XCIpO1xuICAgIC8vY29uc3QgaW5uZXJSaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbm5lclJpbmdcIik7XG4gICAgY29uc3QgZGlzcGxheVJpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpc3BsYXlSaW5nXCIpO1xuICAgIGNvbnN0IGFxaVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hcWlWYWx1ZVwiKTtcbiAgICBjb25zdCBhaXJRdWFsaXR5SGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5haXJRdWFsaXR5SGVhZGVyXCIpO1xuICAgIGNvbnN0IGFpclF1YWxpdHlQYXJhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5haXJRdWFsaXR5UGFyYVwiKTtcbiAgICBjb25zdCBkZXRhaWxzQnRuRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXRhaWxzQnRuRGl2XCIpO1xuXG4gICAgLy9haXJRdWFsaXR5RGlzcGxheS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIC8vaW5uZXJSaW5nLmlubmVySFRNTCA9IFwiXCI7XG4gICAgYXFpVmFsdWUuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBhaXJRdWFsaXR5SGVhZGVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgYWlyUXVhbGl0eVBhcmEuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBkZXRhaWxzQnRuRGl2LmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBjb25zdCBvem9uZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wb25lbnRPem9uZSAudmFsdWVcIik7XG4gICAgY29uc3QgTjJWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcG9uZW50Tml0cm9nZW5EaW94aWRlIC52YWx1ZVwiKTtcbiAgICBjb25zdCBmaW5lUE1WYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcG9uZW50RmluZVBNIC52YWx1ZVwiKTtcbiAgICBjb25zdCBQTVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wb25lbnRQTSAudmFsdWVcIik7XG4gICAgY29uc3Qgc3VsZnVyRGlveGlkZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgXCIuY29tcG9uZW50U3VsZnVyRGlveGlkZSAudmFsdWVcIlxuICAgICk7XG4gICAgY29uc3QgY2FyYm9uTW9ub3hpZGVWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIFwiLmNvbXBvbmVudENhcmJvbk1vbm94aWRlIC52YWx1ZVwiXG4gICAgKTtcblxuICAgIG96b25lVmFsdWUuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBOMlZhbHVlLmlubmVySFRNTCA9IFwiXCI7XG4gICAgZmluZVBNVmFsdWUuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBQTVZhbHVlLmlubmVySFRNTCA9IFwiXCI7XG4gICAgc3VsZnVyRGlveGlkZVZhbHVlLmlubmVySFRNTCA9IFwiXCI7XG4gICAgY2FyYm9uTW9ub3hpZGVWYWx1ZS5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgY29uc3QgYWlyUXVhbGl0eURlc2NpcHRpb25zID0ge1xuICAgICAgICAxOiBbXG4gICAgICAgICAgICBcIkV4Y2VsbGVudFwiLFxuICAgICAgICAgICAgXCJUaGUgYWlyIHF1YWxpdHkgaXMgaWRlYWwgZm9yIG1vc3QgaW5kaXZpZHVhbHM7IEVuam95IHlvdXIgdXN1YWwgb3V0ZG9vciBhY3Rpdml0aWVzLlwiLFxuICAgICAgICBdLFxuICAgICAgICAyOiBbXG4gICAgICAgICAgICBcIkZhaXJcIixcbiAgICAgICAgICAgIFwiQWlyIHF1YWxpdHkgaXMgZmFpciBhbmQgaXMgbm90IGEgY29uY2VybiBmb3IgdGhlIGdlbmVyYWwgcHVibGljLiBObyBuZWVkIHRvIG1vZGlmeSB5b3VyIHVzdWFsIG91dGRvb3IgYWN0aXZpdGllcyB1bmxlc3MgeW91IGV4cGVyaWVuY2Ugc3ltcHRvbXMgc3VjaCBhcyBjb3VnaGluZyBhbmQgdGhyb2F0IGlycml0YXRpb24uXCIsXG4gICAgICAgIF0sXG4gICAgICAgIDM6IFtcbiAgICAgICAgICAgIFwiTW9kZXJhdGVcIixcbiAgICAgICAgICAgIFwiQWlyIHF1YWxpdHkgaXMgbW9kZXJhdGUgYW5kIHR5cGljYWxseSBzYWZlIGZvciB0aGUgZ2VuZXJhbCBwdWJsaWM7IENvbnNpZGVyIHJlZHVjaW5nIG9yIHJlc2NoZWR1bGluZyBzdHJlbnVvdXMgYWN0aXZpdGllcyBvdXRkb29ycyBpZiB5b3UgZXhwZXJpZW5jZSBzeW1wdG9tcyBzdWNoIGFzIGNvdWdoaW5nIGFuZCB0aHJvYXQgaXJyaXRhdGlvbi5cIixcbiAgICAgICAgXSxcbiAgICAgICAgNDogW1xuICAgICAgICAgICAgXCJQb29yXCIsXG4gICAgICAgICAgICBcIkFpciBxdWFsaXR5IGlzIHBvb3IgYW5kIHByZWNhdXRpb25zIHNob3VsZCBiZSBjb25zaWRlcmVkLiBSZWR1Y2Ugb3IgcmVzY2hlZHVsZSBzdHJlbnVvdXMgYWN0aXZpdGllcyBvdXRkb29ycy4gQ2hpbGRyZW4gYW5kIHRoZSBlbGRlcmx5IHNob3VsZCBhbHNvIHRha2UgaXQgZWFzeS5cIixcbiAgICAgICAgXSxcbiAgICAgICAgNTogW1xuICAgICAgICAgICAgXCJWZXJ5IFBvb3JcIixcbiAgICAgICAgICAgIFwiQWlyIHF1YWxpdHkgaXMgdmVyeSBwb29yOyBBdm9pZCBzdHJlbnVvdXMgYWN0aXZpdGllcyBvdXRkb29ycy4gQ2hpbGRyZW4gYW5kIHRoZSBlbGRlcmx5IHNob3VsZCBhbHNvIGF2b2lkIG91dGRvb3IgcGh5c2ljYWwgZXhlcnRpb24uXCIsXG4gICAgICAgIF0sXG4gICAgfTtcblxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZGF0YSkge1xuICAgICAgICBpZiAocHJvcGVydHkgPT0gXCJBUUlcIikge1xuICAgICAgICAgICAgbGV0IHNwZWVkID0gMzA7XG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3NWYWx1ZSA9IDA7XG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3NFbmRWYWx1ZSA9IGRhdGFbcHJvcGVydHldICogMjA7XG5cbiAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc1ZhbHVlICs9IDE7XG4gICAgICAgICAgICAgICAgLy9hcWlWYWx1ZS5pbm5lckhUTUwgPSBgJHtwcm9ncmVzc1ZhbHVlfSVgXG4gICAgICAgICAgICAgICAgZGlzcGxheVJpbmcuc3R5bGUuYmFja2dyb3VuZCA9IGBjb25pYy1ncmFkaWVudChcbiAgICAgICAgICAgICAgICAgICAgIzRkNWJmOSAke3Byb2dyZXNzVmFsdWUgKiAzLjZ9ZGVnLFxuICAgICAgICAgICAgICAgICAgICAjY2FkY2ZmICR7cHJvZ3Jlc3NWYWx1ZSAqIDMuNn1kZWdcbiAgICAgICAgICAgICAgICApYDtcbiAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3NWYWx1ZSA9PSBwcm9ncmVzc0VuZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocHJvZ3Jlc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHNwZWVkKTtcblxuICAgICAgICAgICAgYXFpVmFsdWUuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV19IEFRSWA7XG5cbiAgICAgICAgICAgIGFpclF1YWxpdHlIZWFkZXIuaW5uZXJIVE1MID1cbiAgICAgICAgICAgICAgICBhaXJRdWFsaXR5RGVzY2lwdGlvbnNbYCR7ZGF0YVtwcm9wZXJ0eV19YF1bMF07XG4gICAgICAgICAgICBhaXJRdWFsaXR5UGFyYS5pbm5lckhUTUwgPVxuICAgICAgICAgICAgICAgIGFpclF1YWxpdHlEZXNjaXB0aW9uc1tgJHtkYXRhW3Byb3BlcnR5XX1gXVsxXTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eSA9PSBcImNvbXBvbmVudHNcIikge1xuICAgICAgICAgICAgb3pvbmVWYWx1ZS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XS5vM30gJiMxODFnL208c3VwPjM8L3N1cD5gO1xuICAgICAgICAgICAgTjJWYWx1ZS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XS5ubzJ9ICYjMTgxZy9tPHN1cD4zPC9zdXA+YDtcbiAgICAgICAgICAgIGZpbmVQTVZhbHVlLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldLnBtMl81fSAmIzE4MWcvbTxzdXA+Mzwvc3VwPmA7XG4gICAgICAgICAgICBQTVZhbHVlLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldLnBtMTB9ICYjMTgxZy9tPHN1cD4zPC9zdXA+YDtcbiAgICAgICAgICAgIHN1bGZ1ckRpb3hpZGVWYWx1ZS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XS5zbzJ9ICYjMTgxZy9tPHN1cD4zPC9zdXA+YDtcbiAgICAgICAgICAgIGNhcmJvbk1vbm94aWRlVmFsdWUuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV0uY299ICYjMTgxZy9tPHN1cD4zPC9zdXA+YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGFpclF1YWxpdHlCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGFpclF1YWxpdHlCdG4uY2xhc3NMaXN0LmFkZChcImFpclF1YWxpdHlCdG5cIik7XG4gICAgYWlyUXVhbGl0eUJ0bi50ZXh0Q29udGVudCA9IFwiTW9yZSBEZXRhaWxzXCI7XG5cbiAgICBhaXJRdWFsaXR5QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGFpclF1YWxpdHlDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZShcImV4cGFuZEFpclF1YWxpdHlcIik7XG5cbiAgICAgICAgaWYgKGFpclF1YWxpdHlCdG4udGV4dENvbnRlbnQgPT0gXCJNb3JlIERldGFpbHNcIikge1xuICAgICAgICAgICAgYWlyUXVhbGl0eUJ0bi50ZXh0Q29udGVudCA9IFwiTGVzcyBEZXRhaWxzXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhaXJRdWFsaXR5QnRuLnRleHRDb250ZW50ID0gXCJNb3JlIERldGFpbHNcIjtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZGV0YWlsc0J0bkRpdi5hcHBlbmRDaGlsZChhaXJRdWFsaXR5QnRuKTtcbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVGb3JlY2FzdChkYXRhKSB7XG4gICAgY29uc3QgZm9yZWNhc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcmVjYXN0XCIpO1xuICAgIGZvcmVjYXN0LmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICBjb25zdCBmb3JlY2FzdFRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBmb3JlY2FzdFRpbGUuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0VGlsZVwiKTtcblxuICAgICAgICBjb25zdCBmb3JlY2FzdFRpbGVNYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY29uc3QgZm9yZWNhc3RUaWxlRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IGZvcmVjYXN0VGlsZVN1cHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICAgIGZvcmVjYXN0VGlsZU1haW4uY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0VGlsZU1haW5cIik7XG4gICAgICAgIGZvcmVjYXN0VGlsZURpc3BsYXkuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0VGlsZURpc3BsYXlcIik7XG4gICAgICAgIGZvcmVjYXN0VGlsZVN1cHAuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0VGlsZVN1cHBcIik7XG5cbiAgICAgICAgbGV0IHRpbGVEYXRhID0gZGF0YVtpXTtcblxuICAgICAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIHRpbGVEYXRhKSB7XG4gICAgICAgICAgICBpZiAocHJvcGVydHkgPT0gXCJEYXRlXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHRpbGVEYXRhW3Byb3BlcnR5XVswXSAqIDEwMDApO1xuICAgICAgICAgICAgICAgIGxldCBob3VyID0gZGF0ZS5nZXRVVENIb3VycyhkYXRlKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIHRpbWUuaW5uZXJIVE1MID0gY29udmVydFRpbWUodGlsZURhdGFbcHJvcGVydHldWzFdLCBob3VyKTtcblxuICAgICAgICAgICAgICAgIGZvcmVjYXN0VGlsZU1haW4uYXBwZW5kQ2hpbGQodGltZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BlcnR5ID09IFwiQ29uZGl0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdEljb25cIik7XG5cbiAgICAgICAgICAgICAgICBpY29uLnNyYyA9IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHt0aWxlRGF0YVtwcm9wZXJ0eV1bMV19QDJ4LnBuZ2A7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVEaXNwbGF5LmFwcGVuZENoaWxkKGljb24pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eSA9PSBcIlRlbXBlcmF0dXJlXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JlY2FzdFRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUZW1wLmlubmVySFRNTCA9IGAke3RpbGVEYXRhW3Byb3BlcnR5XX1gO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUaWxlRGlzcGxheS5hcHBlbmRDaGlsZChmb3JlY2FzdFRlbXApO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0VGlsZU1haW4uYXBwZW5kQ2hpbGQoZm9yZWNhc3RUaWxlRGlzcGxheSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BlcnR5ID09IFwiUG9wXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICAgICAgICAgICAgcG9wLmlubmVySFRNTCA9IGAke3RpbGVEYXRhW3Byb3BlcnR5XX0gcG9wYDtcblxuICAgICAgICAgICAgICAgIGZvcmVjYXN0VGlsZU1haW4uYXBwZW5kQ2hpbGQocG9wKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9yZWNhc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0SXRlbVwiKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGhyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhyXCIpO1xuICAgICAgICAgICAgICAgIGhyLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdEhyXCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZm9yZWNhc3RJdGVtUHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0SXRlbURhdGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtUHJvcGVydHkuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0SXRlbVByb3BlcnR5XCIpO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbURhdGEuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0SXRlbURhdGFcIik7XG5cbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydHkgPT0gXCJXaW5kXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtUHJvcGVydHkuaW5uZXJIVE1MID0gYCR7cHJvcGVydHl9YDtcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtRGF0YS5pbm5lckhUTUwgPSBgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVEYXRhW3Byb3BlcnR5XS5zcGVlZFxuICAgICAgICAgICAgICAgICAgICB9ICR7Y29udmVydFdpbmREaXJlY3Rpb24odGlsZURhdGFbcHJvcGVydHldLmRpcmVjdGlvbil9YDtcblxuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uYXBwZW5kQ2hpbGQoZm9yZWNhc3RJdGVtUHJvcGVydHkpO1xuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uYXBwZW5kQ2hpbGQoZm9yZWNhc3RJdGVtRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChocik7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RUaWxlU3VwcC5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbVByb3BlcnR5LmlubmVySFRNTCA9IGAke3Byb3BlcnR5fWA7XG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbURhdGEuaW5uZXJIVE1MID0gYCR7dGlsZURhdGFbcHJvcGVydHldfWA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmFwcGVuZENoaWxkKGZvcmVjYXN0SXRlbVByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uYXBwZW5kQ2hpbGQoZm9yZWNhc3RJdGVtRGF0YSk7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmFwcGVuZENoaWxkKGhyKTtcblxuICAgICAgICAgICAgICAgIGZvcmVjYXN0VGlsZVN1cHAuYXBwZW5kQ2hpbGQoZm9yZWNhc3RJdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGV4cGFuZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGV4cGFuZEJ0bi5jbGFzc0xpc3QuYWRkKFwiZXhwYW5kQnRuXCIpO1xuICAgICAgICBleHBhbmRCdG4uaW5uZXJIVE1MID0gXCImIzg5NjRcIjtcblxuICAgICAgICBleHBhbmRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGZvcmVjYXN0VGlsZS5jbGFzc0xpc3QudG9nZ2xlKFwiZXhwYW5kRm9yZWNhc3RcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvcmVjYXN0VGlsZU1haW4uYXBwZW5kQ2hpbGQoZXhwYW5kQnRuKTtcblxuICAgICAgICBmb3JlY2FzdFRpbGUuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUaWxlTWFpbik7XG4gICAgICAgIGZvcmVjYXN0VGlsZS5hcHBlbmRDaGlsZChmb3JlY2FzdFRpbGVTdXBwKTtcblxuICAgICAgICBmb3JlY2FzdC5hcHBlbmRDaGlsZChmb3JlY2FzdFRpbGUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYWRkRXJyb3IoKSB7XG4gICAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvY2F0aW9uXCIpO1xuICAgIGxvY2F0aW9uLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBjb25zdCBvdXRlcldyYXBwZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5vdXRlcldyYXBwZXJcIik7XG5cbiAgICBjb25zdCBlcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZXJyb3JDb250YWluZXJcIik7XG4gICAgY29uc3QgZXJyb3JXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lcnJvcldyYXBwZXJcIik7XG5cbiAgICBvdXRlcldyYXBwZXJzLmZvckVhY2goKHdyYXBwZXIpID0+IHtcbiAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiaGlkZUNvbnRhaW5lclwiKTtcbiAgICB9KTtcblxuICAgIGVycm9yV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZUNvbnRhaW5lclwiKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXJyb3IoKSB7XG4gICAgY29uc3Qgb3V0ZXJXcmFwcGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIub3V0ZXJXcmFwcGVyXCIpO1xuICAgIGNvbnN0IGVycm9yV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZXJyb3JXcmFwcGVyXCIpO1xuXG4gICAgb3V0ZXJXcmFwcGVycy5mb3JFYWNoKCh3cmFwcGVyKSA9PiB7XG4gICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVDb250YWluZXJcIik7XG4gICAgfSk7XG5cbiAgICBlcnJvcldyYXBwZXIuY2xhc3NMaXN0LmFkZChcImhpZGVDb250YWluZXJcIik7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0TG9hZGluZ0FuaW1hdGlvbigpIHtcbiAgICByZW1vdmVFcnJvcigpO1xuXG4gICAgY29uc3QgY29uZGl0aW9uQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgIFwiLmNvbmRpdGlvbkNvbnRhaW5lclwiXG4gICAgKTtcbiAgICBjb25zdCBvdXRlcldyYXBwZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5vdXRlcldyYXBwZXJcIik7XG5cbiAgICBjb25kaXRpb25Db250YWluZXJzLmZvckVhY2goKGNvbnRhaW5lcikgPT4ge1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChcImhpZGVDb250YWluZXJcIik7XG4gICAgfSk7XG5cbiAgICBvdXRlcldyYXBwZXJzLmZvckVhY2goKHdyYXBwZXIpID0+IHtcbiAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKFwic2tlbGV0b25cIik7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGVuZExvYWRpbmdBbmltYXRpb24oKSB7XG4gICAgY29uc3QgY29uZGl0aW9uQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgIFwiLmNvbmRpdGlvbkNvbnRhaW5lclwiXG4gICAgKTtcblxuICAgIGNvbnN0IG91dGVyV3JhcHBlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm91dGVyV3JhcHBlclwiKTtcblxuICAgIGNvbmRpdGlvbkNvbnRhaW5lcnMuZm9yRWFjaCgoY29udGFpbmVyKSA9PiB7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZUNvbnRhaW5lclwiKTtcbiAgICB9KTtcblxuICAgIG91dGVyV3JhcHBlcnMuZm9yRWFjaCgod3JhcHBlcikgPT4ge1xuICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJza2VsZXRvblwiKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IHtcbiAgICBwb3B1bGF0ZUxvY2F0aW9uLFxuICAgIHBvcHVsYXRlQ3VycmVudFdlYXRoZXIsXG4gICAgcG9wdWxhdGVBaXJRdWFsaXR5LFxuICAgIHBvcHVsYXRlRm9yZWNhc3QsXG4gICAgYWRkRXJyb3IsXG4gICAgc3RhcnRMb2FkaW5nQW5pbWF0aW9uLFxuICAgIGVuZExvYWRpbmdBbmltYXRpb24sXG59O1xuIiwiLy8gVXRpbGl0eSBmdW5jdGlvbnMgZm9yIFdlYXRoZXJBcHBcblxuZnVuY3Rpb24gY29udmVydFRpbWUodGltZXpvbmUsIGhvdXIsIG1pbnV0ZSkge1xuICAgIC8vIFRha2VzIHRoZSBob3VyIGluIDI0aHIgdGltZSBhbmQgY29udmVydHMgaXQgdG8gMTJociB0aW1lIHdpdGggQU0gb3IgUE1cbiAgICBsZXQgbmV3VGltZSA9IFwiXCI7XG5cbiAgICBjb25zdCB0aW1lem9uZVNoaWZ0ID0gTWF0aC5mbG9vcih0aW1lem9uZSAvIDM2MDApO1xuICAgIGxldCBhZGp1c3RlZEhvdXIgPSBob3VyICsgdGltZXpvbmVTaGlmdDtcblxuICAgIGlmIChhZGp1c3RlZEhvdXIgPCAwKSB7XG4gICAgICAgIGFkanVzdGVkSG91ciA9IGFkanVzdGVkSG91ciArIDI0O1xuICAgIH1cblxuICAgIGlmICghbWludXRlKSB7XG4gICAgICAgIGlmIChhZGp1c3RlZEhvdXIgPCAxMikge1xuICAgICAgICAgICAgbmV3VGltZSA9IGAke2FkanVzdGVkSG91ciAlIDEyIHx8IDEyfUFNYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1RpbWUgPSBgJHthZGp1c3RlZEhvdXIgJSAxMiB8fCAxMn1QTWA7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobWludXRlLnRvU3RyaW5nKCkubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIG1pbnV0ZSA9IFwiMFwiICsgbWludXRlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhZGp1c3RlZEhvdXIgPCAxMikge1xuICAgICAgICAgICAgbmV3VGltZSA9IGAke2FkanVzdGVkSG91ciAlIDEyIHx8IDEyfToke21pbnV0ZX1BTWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdUaW1lID0gYCR7YWRqdXN0ZWRIb3VyICUgMTIgfHwgMTJ9OiR7bWludXRlfVBNYDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXdUaW1lO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0V2luZERpcmVjdGlvbihkZWcpIHtcbiAgICAvLyBDaGFuZ2UgaW4gZGlyZWN0aW9uIGV2ZXJ5IDIyLjUgZGVncmVlc1xuICAgIGNvbnN0IHZhbCA9IE1hdGgucm91bmQoZGVnIC8gMjIuNSk7XG4gICAgY29uc3QgY29tcGFzc0RpcmVjdGlvbnMgPSBbXG4gICAgICAgIFwiTlwiLFxuICAgICAgICBcIk5ORVwiLFxuICAgICAgICBcIk5FXCIsXG4gICAgICAgIFwiRU5FXCIsXG4gICAgICAgIFwiRVwiLFxuICAgICAgICBcIkVTRVwiLFxuICAgICAgICBcIlNFXCIsXG4gICAgICAgIFwiU1NFXCIsXG4gICAgICAgIFwiU1wiLFxuICAgICAgICBcIlNTV1wiLFxuICAgICAgICBcIlNXXCIsXG4gICAgICAgIFwiV1NXXCIsXG4gICAgICAgIFwiV1wiLFxuICAgICAgICBcIldOV1wiLFxuICAgICAgICBcIk5XXCIsXG4gICAgICAgIFwiTk5XXCIsXG4gICAgXTtcblxuICAgIGNvbnN0IGRpcmVjdGlvbiA9IGNvbXBhc3NEaXJlY3Rpb25zW3ZhbCAlIDE2XTtcblxuICAgIHJldHVybiBkaXJlY3Rpb247XG59XG5cbmZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlcnMocGhyYXNlKSB7XG4gICAgY29uc3Qgd29yZHMgPSBwaHJhc2Uuc3BsaXQoXCIgXCIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB3b3Jkc1tpXSA9IHdvcmRzW2ldWzBdLnRvVXBwZXJDYXNlKCkgKyB3b3Jkc1tpXS5zdWJzdHIoMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdvcmRzLmpvaW4oXCIgXCIpO1xufVxuXG5leHBvcnQgeyBjb252ZXJ0VGltZSwgY29udmVydFdpbmREaXJlY3Rpb24sIGNhcGl0YWxpemVGaXJzdExldHRlcnMgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gU291cmNlIGluZGV4IHNjcmlwdCBmb3IgV2VhdGhlciBBcHBcblxuaW1wb3J0IHsgZ2V0V2VhdGhlciwgZ2V0QWlyUXVhbGl0eSwgZ2V0Rm9yZWNhc3QgfSBmcm9tIFwiLi9hcGlGdW5jdGlvbnNcIjtcbmltcG9ydCB7XG4gICAgcG9wdWxhdGVMb2NhdGlvbixcbiAgICBwb3B1bGF0ZUN1cnJlbnRXZWF0aGVyLFxuICAgIHBvcHVsYXRlQWlyUXVhbGl0eSxcbiAgICBwb3B1bGF0ZUZvcmVjYXN0LFxuICAgIGFkZEVycm9yLFxuICAgIHN0YXJ0TG9hZGluZ0FuaW1hdGlvbixcbiAgICBlbmRMb2FkaW5nQW5pbWF0aW9uLFxufSBmcm9tIFwiLi9kb21GdW5jdGlvbnNcIjtcblxuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc1dlYXRoZXIobG9jYXRpb24pIHtcbiAgICAvLyBHZXRzIGRhdGEgZnJvbSBnZXQgd2VhdGhlciBhcGlGdW5jdGlvbnMgZnVuY3Rpb24gYW5kIGdhdGhlcnMgcmVsYXZlbnQgaW5mbyBmb3IgZGlzcGxheVxuICAgIC8vIE5lZWQgdG8gYWRkIHRyeS9jYXRjaCB0byBoYW5kbGUgZXJyb3JcblxuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgZ2V0V2VhdGhlcihsb2NhdGlvbik7XG5cbiAgICBjb25zb2xlLmxvZyh3ZWF0aGVyRGF0YSk7XG5cbiAgICBsZXQgaW1wb3J0YW50RGF0YSA9IHt9O1xuXG4gICAgaW1wb3J0YW50RGF0YS5Mb2NhdGlvbiA9IFt3ZWF0aGVyRGF0YS5uYW1lLCB3ZWF0aGVyRGF0YS5zeXMuY291bnRyeV07XG4gICAgaW1wb3J0YW50RGF0YS5EYXRlID0gW3dlYXRoZXJEYXRhLmR0LCB3ZWF0aGVyRGF0YS50aW1lem9uZV07XG4gICAgaW1wb3J0YW50RGF0YS5UZW1wZXJhdHVyZSA9IGAke01hdGgucm91bmQod2VhdGhlckRhdGEubWFpbi50ZW1wKX0gJiM4NDUxYDtcbiAgICBpbXBvcnRhbnREYXRhW1wiRmVlbHMgTGlrZVwiXSA9IGAke01hdGgucm91bmQoXG4gICAgICAgIHdlYXRoZXJEYXRhLm1haW4uZmVlbHNfbGlrZVxuICAgICl9ICYjODQ1MWA7XG4gICAgaW1wb3J0YW50RGF0YS5IdW1pZGl0eSA9IGAke3dlYXRoZXJEYXRhLm1haW4uaHVtaWRpdHl9ICVgO1xuICAgIGltcG9ydGFudERhdGEuV2luZCA9IFtcbiAgICAgICAgYCR7TWF0aC5yb3VuZCh3ZWF0aGVyRGF0YS53aW5kLnNwZWVkICogMy42ICogMTAwKSAvIDEwMH0ga20vaHJgLFxuICAgICAgICB3ZWF0aGVyRGF0YS53aW5kLmRlZyxcbiAgICBdO1xuXG4gICAgaWYgKHdlYXRoZXJEYXRhLndpbmQuZ3VzdCkge1xuICAgICAgICBpbXBvcnRhbnREYXRhLkd1c3QgPSBgJHtcbiAgICAgICAgICAgIE1hdGgucm91bmQod2VhdGhlckRhdGEud2luZC5ndXN0ICogMy42ICogMTAwKSAvIDEwMFxuICAgICAgICB9IGttL2hyYDtcbiAgICB9XG5cbiAgICBpZiAod2VhdGhlckRhdGEucmFpbikge1xuICAgICAgICBpbXBvcnRhbnREYXRhLlJhaW4gPSBgJHt3ZWF0aGVyRGF0YS5yYWluW1wiMWhcIl19IG1tYDtcbiAgICB9XG5cbiAgICBpbXBvcnRhbnREYXRhLkNvbmRpdGlvbiA9IFtcbiAgICAgICAgd2VhdGhlckRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgICAgd2VhdGhlckRhdGEud2VhdGhlclswXS5pY29uLFxuICAgIF07XG5cbiAgICAvLyBGb3JtYXQgdGhpcyBvYmplY3QgYmV0dGVyXG4gICAgLy8gT2JqZWN0IENvbnN0cnVjdG9yIGFuZCBjcmVhdGUgbWV0aG9kIHRvIGNvbnZlcnQgdG8gZGlmZmVyZW50IHVuaXRzXG5cbiAgICByZXR1cm4gaW1wb3J0YW50RGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc0FpclF1YWxpdHkobG9jYXRpb24pIHtcbiAgICAvLyBHZXRzIGRhdGEgZnJvbSBhaXIgcXVhbGl0eSBhcGlGdW5jdGlvbnMgZnVuY3Rpb24gYW5kIGdhdGhlcnMgcmVsYXZlbnQgaW5mbyBmb3IgZGlzcGxheVxuXG4gICAgY29uc3QgYWlyUXVhbGl0eURhdGEgPSBhd2FpdCBnZXRBaXJRdWFsaXR5KGxvY2F0aW9uKTtcbiAgICBjb25zb2xlLmxvZyhhaXJRdWFsaXR5RGF0YSk7XG5cbiAgICBsZXQgaW1wb3J0YW50RGF0YSA9IHt9O1xuXG4gICAgaW1wb3J0YW50RGF0YS5BUUkgPSBhaXJRdWFsaXR5RGF0YS5saXN0WzBdLm1haW4uYXFpO1xuICAgIGltcG9ydGFudERhdGEuY29tcG9uZW50cyA9IGFpclF1YWxpdHlEYXRhLmxpc3RbMF0uY29tcG9uZW50cztcblxuICAgIHJldHVybiBpbXBvcnRhbnREYXRhO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzRm9yZWNhc3QobG9jYXRpb24pIHtcbiAgICAvLyBHZXRzIGRhdGEgZnJvbSBmb3JlY2FzdCBhcGlGdW5jdGlvbnMgZnVuY3Rpb24gYW5kIGdhdGhlcnMgcmVsYXZlbnQgaW5mbyBmb3IgZGlzcGxheVxuXG4gICAgY29uc3QgZm9yZWNhc3REYXRhID0gYXdhaXQgZ2V0Rm9yZWNhc3QobG9jYXRpb24pO1xuICAgIGNvbnNvbGUubG9nKGZvcmVjYXN0RGF0YSk7XG5cbiAgICBsZXQgaW1wb3J0YW50RGF0YSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBpbmRleCBpbiBmb3JlY2FzdERhdGEubGlzdCkge1xuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XSA9IHt9O1xuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XS5EYXRlID0gW1xuICAgICAgICAgICAgZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLmR0LFxuICAgICAgICAgICAgZm9yZWNhc3REYXRhLmNpdHkudGltZXpvbmUsXG4gICAgICAgIF07XG4gICAgICAgIGltcG9ydGFudERhdGFbaW5kZXhdLkNvbmRpdGlvbiA9IFtcbiAgICAgICAgICAgIGZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLndlYXRoZXJbMF0uaWNvbixcbiAgICAgICAgXTtcbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF0uVGVtcGVyYXR1cmUgPSBgJHtNYXRoLnJvdW5kKFxuICAgICAgICAgICAgZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLm1haW4udGVtcFxuICAgICAgICApfSAmIzg0NTFgO1xuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XS5Qb3AgPSBgJHtNYXRoLnJvdW5kKFxuICAgICAgICAgICAgZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLnBvcCAqIDEwMFxuICAgICAgICApfSAlYDtcblxuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XVtcIkZlZWxzIExpa2VcIl0gPSBgJHtNYXRoLnJvdW5kKFxuICAgICAgICAgICAgZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLm1haW4uZmVlbHNfbGlrZVxuICAgICAgICApfSAmIzg0NTFgO1xuICAgICAgICBpbXBvcnRhbnREYXRhW1xuICAgICAgICAgICAgaW5kZXhcbiAgICAgICAgXS5IdW1pZGl0eSA9IGAke2ZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS5tYWluLmh1bWlkaXR5fSVgO1xuXG4gICAgICAgIGltcG9ydGFudERhdGFbaW5kZXhdW1xuICAgICAgICAgICAgXCJDbG91ZCBDb3ZlclwiXG4gICAgICAgIF0gPSBgJHtmb3JlY2FzdERhdGEubGlzdFtpbmRleF0uY2xvdWRzLmFsbH0gJWA7XG4gICAgICAgIGltcG9ydGFudERhdGFbXG4gICAgICAgICAgICBpbmRleFxuICAgICAgICBdLlZpc2liaWxpdHkgPSBgJHtmb3JlY2FzdERhdGEubGlzdFtpbmRleF0udmlzaWJpbGl0eX0ga21gO1xuXG4gICAgICAgIGltcG9ydGFudERhdGFbaW5kZXhdLldpbmQgPSB7XG4gICAgICAgICAgICBzcGVlZDogYCR7XG4gICAgICAgICAgICAgICAgTWF0aC5yb3VuZChmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ud2luZC5zcGVlZCAqIDMuNiAqIDEwMCkgL1xuICAgICAgICAgICAgICAgIDEwMFxuICAgICAgICAgICAgfSBrbS9ocmAsXG4gICAgICAgICAgICBkaXJlY3Rpb246IGZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS53aW5kLmRlZyxcbiAgICAgICAgfTtcbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF0uR3VzdCA9IGAke1xuICAgICAgICAgICAgTWF0aC5yb3VuZChmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ud2luZC5ndXN0ICogMy42ICogMTAwKSAvIDEwMFxuICAgICAgICB9IGttL2hyYDtcbiAgICB9XG5cbiAgICByZXR1cm4gaW1wb3J0YW50RGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc01hcCgpIHtcbiAgICAvLyBHZXRzIGRhdGEgZnJvbSBtYXAgYXBpRnVuY3Rpb25zIGZ1bmN0aW9uIGFuZCBnYXRoZXJzIHJlbGF2ZW50IGluZm8gZm9yIGRpc3BsYXlcbn1cblxuYXN5bmMgZnVuY3Rpb24gbG9hZFBhZ2UobG9jYXRpb24pIHtcbiAgICAvLyBBZGQgc29tZSB2aXN1YWwgaW5kaWNhdGlvbiB0aGF0IHdlJ3JlIHdhaXRpbmcgZm9yIHRoZSBkYXRhIChwcm9taXNlLmFsbCkgYmVmb3JlIGl0IGdldHMgZGlzcGxheWVkIChNYXAgd291bGQgbGlrZXkgdGFrZSB0aGUgbG9uZ2VzdCB0byBkaXNwbGF5KVxuICAgIC8vQ291bGQgYWRkIGEgY2xhc3MgdG8gY2hhbmdlIHRoZSBkaXNwbGF5IHByaW9yIHRvIHByb21pc2UuYWxsIHNob3dpbmcgdGhhdCBpdCdzIGxvYWRpbmcsIGFuZCByZW1vdmUgaXQgdG8gc2hvdyBkYXRhIGlmIHN1Y2Nlc3NmdWwgb3IgZGlzcGxheSBhIG5vIHJlc3VsdHMgZm91bmQgcGFnZSBpZiBlcnJvclxuICAgIHN0YXJ0TG9hZGluZ0FuaW1hdGlvbigpO1xuXG4gICAgLy8gVXNlIGEgcHJvbWlzZS5hbGwgdG8gd2FpdCBmb3IgYWxsIHByb2Nlc3NpbmcgdG8gY29tcGxldGUgYmVmb3JlIGRpc3BsYXlpbmcgZGF0YVxuXG4gICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICBwcm9jZXNzV2VhdGhlcihsb2NhdGlvbiksXG4gICAgICAgIHByb2Nlc3NBaXJRdWFsaXR5KGxvY2F0aW9uKSxcbiAgICAgICAgcHJvY2Vzc0ZvcmVjYXN0KGxvY2F0aW9uKSxcbiAgICBdKVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgcG9wdWxhdGVMb2NhdGlvbihkYXRhWzBdKTtcbiAgICAgICAgICAgIHBvcHVsYXRlQ3VycmVudFdlYXRoZXIoZGF0YVswXSk7XG4gICAgICAgICAgICBwb3B1bGF0ZUFpclF1YWxpdHkoZGF0YVsxXSk7XG4gICAgICAgICAgICBwb3B1bGF0ZUZvcmVjYXN0KGRhdGFbMl0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICBhZGRFcnJvcigpO1xuICAgICAgICB9KVxuICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICBlbmRMb2FkaW5nQW5pbWF0aW9uKCk7XG4gICAgICAgIH0pO1xufVxuXG5jb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Ym1pdEJ0blwiKTtcblxuc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2hcIik7XG5cbiAgICBpZiAoc2VhcmNoLnZhbHVlICE9IFwiXCIpIHtcbiAgICAgICAgbG9hZFBhZ2Uoc2VhcmNoLnZhbHVlKTtcbiAgICB9XG5cbiAgICBzZWFyY2gudmFsdWUgPSBcIlwiO1xufSk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBpbml0aWFsaXplKTtcblxuZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2hGb3JtXCIpO1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBzZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaFwiKTtcbiAgICBjb25zdCBhdXRvY29tcGxldGUgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLkF1dG9jb21wbGV0ZShzZWFyY2gpO1xuXG4gICAgYXV0b2NvbXBsZXRlLmFkZExpc3RlbmVyKFwicGxhY2VfY2hhbmdlZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHBsYWNlID0gYXV0b2NvbXBsZXRlLmdldFBsYWNlKCk7XG5cbiAgICAgICAgbG9hZFBhZ2UocGxhY2UubmFtZSk7XG4gICAgICAgIHNlYXJjaC52YWx1ZSA9IFwiXCI7XG4gICAgfSk7XG59XG5cbmxvYWRQYWdlKFwiTG9uZG9uXCIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9