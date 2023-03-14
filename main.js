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

    //airQualityDisplay.innerHTML = "";
    //innerRing.innerHTML = "";
    aqiValue.innerHTML = "";
    airQualityHeader.innerHTML = "";
    airQualityPara.innerHTML = "";

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

    const airQualityBtn = document.querySelector(".airQualityBtn");
    airQualityBtn.addEventListener("click", () => {
        airQualityContainer.classList.toggle("expandAirQuality");

        if (airQualityBtn.textContent == "More Details") {
            airQualityBtn.textContent = "Less Details";
        } else {
            airQualityBtn.textContent = "More Details";
        }
    });
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
    const val = Math.floor(deg / 22.5 + 0.5);
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
    importantData.Temperature = `${weatherData.main.temp} &#8451`;
    importantData["Feels Like"] = `${weatherData.main.feels_like} &#8451`;
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
        importantData[
            index
        ].Temperature = `${forecastData.list[index].main.temp} &#8451`;
        importantData[index].Pop = `${Math.round(
            forecastData.list[index].pop * 100
        )} %`;

        importantData[index][
            "Feels Like"
        ] = `${forecastData.list[index].main.feels_like} &#8451`;
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

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const search = document.querySelector(".search");

    loadPage(search.value);

    search.value = "";
});

loadPage("London");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLG9DQUFvQztBQUMvRCxzQ0FBc0M7QUFDdEM7QUFDQSxXQUFXOztBQUVYO0FBQ0E7QUFDQSxlQUFlLDBDQUEwQztBQUN6RDtBQUNBO0FBQ0Esd0JBQXdCLHVDQUF1Qzs7QUFFL0Q7QUFDQTtBQUNBLGVBQWUscUNBQXFDO0FBQ3BEO0FBQ0E7QUFDQSwwQkFBMEIscUNBQXFDOztBQUUvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLG9FQUFxQjs7QUFFekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwrREFBZ0I7QUFDNUIsWUFBWSxxRUFBc0I7QUFDbEMsWUFBWSxpRUFBa0I7QUFDOUIsWUFBWSwrREFBZ0I7QUFDNUIsU0FBUztBQUNUO0FBQ0E7QUFDQSxZQUFZLHVEQUFRO0FBQ3BCLFNBQVM7QUFDVDtBQUNBLFlBQVksa0VBQW1CO0FBQy9CLFNBQVM7QUFDVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDQUFDOztBQUVEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYXBpRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2RvbUZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEZ1bmN0aW9ucyB0byBmZXRjaCB3ZWF0aGVyIGRhdGEgdGhyb3VnaCBBUElcblxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlcihsb2NhdGlvbikge1xuICAgIGNvbnN0IHdlYXRoZXJSZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2xvY2F0aW9ufSZ1bml0cz1tZXRyaWMmQVBQSUQ9NjlhMGZlOWQ4OWFhM2M1NjJjMDlhNTBmYmQ1MDUwNDZgXG4gICAgKTtcblxuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgd2VhdGhlclJlc3BvbnNlLmpzb24oKTtcblxuICAgIHJldHVybiB3ZWF0aGVyRGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0QWlyUXVhbGl0eShsb2NhdGlvbikge1xuICAgIGNvbnN0IHdlYXRoZXJSZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2xvY2F0aW9ufSZ1bml0cz1tZXRyaWMmQVBQSUQ9NjlhMGZlOWQ4OWFhM2M1NjJjMDlhNTBmYmQ1MDUwNDZgXG4gICAgKTtcbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHdlYXRoZXJSZXNwb25zZS5qc29uKCk7XG5cbiAgICBsZXQgbGF0ID0gd2VhdGhlckRhdGEuY29vcmQubGF0O1xuICAgIGxldCBsb24gPSB3ZWF0aGVyRGF0YS5jb29yZC5sb247XG5cbiAgICBjb25zdCBhaXJRdWFsaXR5UmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9haXJfcG9sbHV0aW9uP2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZBUFBJRD02OWEwZmU5ZDg5YWEzYzU2MmMwOWE1MGZiZDUwNTA0NmBcbiAgICApO1xuXG4gICAgY29uc3QgYWlyUXVhbGl0eURhdGEgPSBhd2FpdCBhaXJRdWFsaXR5UmVzcG9uc2UuanNvbigpO1xuXG4gICAgcmV0dXJuIGFpclF1YWxpdHlEYXRhO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRGb3JlY2FzdChsb2NhdGlvbikge1xuICAgIGNvbnN0IGZvcmVjYXN0UmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9xPSR7bG9jYXRpb259JnVuaXRzPW1ldHJpYyZhcHBpZD02OWEwZmU5ZDg5YWEzYzU2MmMwOWE1MGZiZDUwNTA0NmBcbiAgICApO1xuXG4gICAgY29uc3QgZm9yZWNhc3REYXRhID0gYXdhaXQgZm9yZWNhc3RSZXNwb25zZS5qc29uKCk7XG5cbiAgICByZXR1cm4gZm9yZWNhc3REYXRhO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyTWFwKGxvY2F0aW9uKSB7fVxuXG5leHBvcnQgeyBnZXRXZWF0aGVyLCBnZXRBaXJRdWFsaXR5LCBnZXRGb3JlY2FzdCB9O1xuIiwiLy8gRnVuY3Rpb25zIHRvIGNyZWF0ZSBhbmQgZGlzcGxheSBET00gZWxlbWVudHNcblxuaW1wb3J0IHtcbiAgICBjb252ZXJ0VGltZSxcbiAgICBjb252ZXJ0V2luZERpcmVjdGlvbixcbiAgICBjYXBpdGFsaXplRmlyc3RMZXR0ZXJzLFxufSBmcm9tIFwiLi91dGlsc1wiO1xuXG5mdW5jdGlvbiBwb3B1bGF0ZUxvY2F0aW9uKGRhdGEpIHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9jYXRpb25cIik7XG4gICAgbG9jYXRpb24uaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZGF0YSkge1xuICAgICAgICBpZiAocHJvcGVydHkgPT0gXCJMb2NhdGlvblwiKSB7XG4gICAgICAgICAgICBsZXQgcmVnaW9uTmFtZXMgPSBuZXcgSW50bC5EaXNwbGF5TmFtZXMoW1wiZW5cIl0sIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInJlZ2lvblwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgY291bnRyeSA9IHJlZ2lvbk5hbWVzLm9mKGAke2RhdGFbcHJvcGVydHldWzFdfWApO1xuXG4gICAgICAgICAgICBsb2NhdGlvbi5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XVswXX0sICR7Y291bnRyeX1gO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZUN1cnJlbnRXZWF0aGVyKGRhdGEpIHtcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudFRpbWVcIik7XG5cbiAgICBjb25zdCBjdXJyZW50V2VhdGhlckRldGFpbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBcIi5jdXJyZW50V2VhdGhlckRldGFpbHNcIlxuICAgICk7XG5cbiAgICBjb25zdCBjdXJyZW50Q29uZGl0aW9uSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIFwiLmN1cnJlbnRDb25kaXRpb25JY29uXCJcbiAgICApO1xuICAgIGNvbnN0IGN1cnJlbnRDb25kaXRpb25OYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgXCIuY3VycmVudENvbmRpdGlvbk5hbWVcIlxuICAgICk7XG4gICAgY29uc3QgY3VycmVudFRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnRUZW1wXCIpO1xuXG4gICAgY3VycmVudFdlYXRoZXJEZXRhaWxzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgY3VycmVudFRlbXAuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZGF0YSkge1xuICAgICAgICBpZiAocHJvcGVydHkgPT0gXCJEYXRlXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRhW3Byb3BlcnR5XVswXSAqIDEwMDApO1xuXG4gICAgICAgICAgICBjb25zdCBob3VyID0gZGF0ZS5nZXRVVENIb3VycyhkYXRlKTtcbiAgICAgICAgICAgIGNvbnN0IG1pbnV0ZSA9IGRhdGUuZ2V0VVRDTWludXRlcyhkYXRlKTtcblxuICAgICAgICAgICAgY29uc3QgdGltZSA9IGNvbnZlcnRUaW1lKGRhdGFbcHJvcGVydHldWzFdLCBob3VyLCBtaW51dGUpO1xuXG4gICAgICAgICAgICBjdXJyZW50VGltZS5pbm5lckhUTUwgPSB0aW1lO1xuICAgICAgICB9IGVsc2UgaWYgKHByb3BlcnR5ID09IFwiVGVtcGVyYXR1cmVcIikge1xuICAgICAgICAgICAgY3VycmVudFRlbXAuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV19YDtcbiAgICAgICAgICAgIC8vIFUrMjEwOSBmb3IgRmFocmVuaGVpdFxuICAgICAgICB9IGVsc2UgaWYgKHByb3BlcnR5ID09IFwiQ29uZGl0aW9uXCIpIHtcbiAgICAgICAgICAgIGN1cnJlbnRDb25kaXRpb25OYW1lLmlubmVySFRNTCA9IGAke2NhcGl0YWxpemVGaXJzdExldHRlcnMoXG4gICAgICAgICAgICAgICAgZGF0YVtwcm9wZXJ0eV1bMF1cbiAgICAgICAgICAgICl9YDtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgY29uZGl0aW9uIEljb24gYWNjb3JkaW5nIHRvIG5hbWVcbiAgICAgICAgICAgIGN1cnJlbnRDb25kaXRpb25JY29uLnNyYyA9IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXRhW3Byb3BlcnR5XVsxXX1AMngucG5nYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHdlYXRoZXJJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGNvbnN0IGhyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhyXCIpO1xuICAgICAgICAgICAgd2VhdGhlckl0ZW0uY2xhc3NMaXN0LmFkZChcImN1cnJlbnRXZWF0aGVySXRlbVwiKTtcblxuICAgICAgICAgICAgY29uc3Qgd2VhdGhlckl0ZW1Qcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBjb25zdCB3ZWF0aGVySXRlbURhdGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICAgICAgICBpZiAocHJvcGVydHkgPT0gXCJMb2NhdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgd2VhdGhlckl0ZW1Qcm9wZXJ0eS5pbm5lckhUTUwgPSBgJHtwcm9wZXJ0eX1gO1xuXG4gICAgICAgICAgICAgICAgbGV0IHJlZ2lvbk5hbWVzID0gbmV3IEludGwuRGlzcGxheU5hbWVzKFtcImVuXCJdLCB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicmVnaW9uXCIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbGV0IGNvdW50cnkgPSByZWdpb25OYW1lcy5vZihgJHtkYXRhW3Byb3BlcnR5XVsxXX1gKTtcblxuICAgICAgICAgICAgICAgIHdlYXRoZXJJdGVtRGF0YS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XVswXX0sICR7Y291bnRyeX1gO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eSA9PSBcIldpbmRcIikge1xuICAgICAgICAgICAgICAgIHdlYXRoZXJJdGVtUHJvcGVydHkuaW5uZXJIVE1MID0gYCR7cHJvcGVydHl9YDtcbiAgICAgICAgICAgICAgICB3ZWF0aGVySXRlbURhdGEuaW5uZXJIVE1MID0gYCR7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFbcHJvcGVydHldWzBdXG4gICAgICAgICAgICAgICAgfSAke2NvbnZlcnRXaW5kRGlyZWN0aW9uKGRhdGFbcHJvcGVydHldWzFdKX1gO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3ZWF0aGVySXRlbVByb3BlcnR5LmlubmVySFRNTCA9IGAke3Byb3BlcnR5fWA7XG4gICAgICAgICAgICAgICAgd2VhdGhlckl0ZW1EYXRhLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3ZWF0aGVySXRlbS5hcHBlbmRDaGlsZCh3ZWF0aGVySXRlbVByb3BlcnR5KTtcbiAgICAgICAgICAgIHdlYXRoZXJJdGVtLmFwcGVuZENoaWxkKHdlYXRoZXJJdGVtRGF0YSk7XG5cbiAgICAgICAgICAgIGN1cnJlbnRXZWF0aGVyRGV0YWlscy5hcHBlbmRDaGlsZCh3ZWF0aGVySXRlbSk7XG4gICAgICAgICAgICBjdXJyZW50V2VhdGhlckRldGFpbHMuYXBwZW5kQ2hpbGQoaHIpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZUFpclF1YWxpdHkoZGF0YSkge1xuICAgIGNvbnN0IGFpclF1YWxpdHlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpclF1YWxpdHlDb250YWluZXJcIik7XG5cbiAgICBjb25zdCBhaXJRdWFsaXR5RGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlyUXVhbGl0eURpc3BsYXlcIik7XG4gICAgLy9jb25zdCBpbm5lclJpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmlubmVyUmluZ1wiKTtcbiAgICBjb25zdCBkaXNwbGF5UmluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGlzcGxheVJpbmdcIik7XG4gICAgY29uc3QgYXFpVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFxaVZhbHVlXCIpO1xuICAgIGNvbnN0IGFpclF1YWxpdHlIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpclF1YWxpdHlIZWFkZXJcIik7XG4gICAgY29uc3QgYWlyUXVhbGl0eVBhcmEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpclF1YWxpdHlQYXJhXCIpO1xuXG4gICAgLy9haXJRdWFsaXR5RGlzcGxheS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIC8vaW5uZXJSaW5nLmlubmVySFRNTCA9IFwiXCI7XG4gICAgYXFpVmFsdWUuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBhaXJRdWFsaXR5SGVhZGVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgYWlyUXVhbGl0eVBhcmEuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIGNvbnN0IG96b25lVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXBvbmVudE96b25lIC52YWx1ZVwiKTtcbiAgICBjb25zdCBOMlZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wb25lbnROaXRyb2dlbkRpb3hpZGUgLnZhbHVlXCIpO1xuICAgIGNvbnN0IGZpbmVQTVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wb25lbnRGaW5lUE0gLnZhbHVlXCIpO1xuICAgIGNvbnN0IFBNVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXBvbmVudFBNIC52YWx1ZVwiKTtcbiAgICBjb25zdCBzdWxmdXJEaW94aWRlVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBcIi5jb21wb25lbnRTdWxmdXJEaW94aWRlIC52YWx1ZVwiXG4gICAgKTtcbiAgICBjb25zdCBjYXJib25Nb25veGlkZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgXCIuY29tcG9uZW50Q2FyYm9uTW9ub3hpZGUgLnZhbHVlXCJcbiAgICApO1xuXG4gICAgb3pvbmVWYWx1ZS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIE4yVmFsdWUuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBmaW5lUE1WYWx1ZS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIFBNVmFsdWUuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBzdWxmdXJEaW94aWRlVmFsdWUuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBjYXJib25Nb25veGlkZVZhbHVlLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBjb25zdCBhaXJRdWFsaXR5RGVzY2lwdGlvbnMgPSB7XG4gICAgICAgIDE6IFtcbiAgICAgICAgICAgIFwiRXhjZWxsZW50XCIsXG4gICAgICAgICAgICBcIlRoZSBhaXIgcXVhbGl0eSBpcyBpZGVhbCBmb3IgbW9zdCBpbmRpdmlkdWFsczsgRW5qb3kgeW91ciB1c3VhbCBvdXRkb29yIGFjdGl2aXRpZXMuXCIsXG4gICAgICAgIF0sXG4gICAgICAgIDI6IFtcbiAgICAgICAgICAgIFwiRmFpclwiLFxuICAgICAgICAgICAgXCJBaXIgcXVhbGl0eSBpcyBmYWlyIGFuZCBpcyBub3QgYSBjb25jZXJuIGZvciB0aGUgZ2VuZXJhbCBwdWJsaWMuIE5vIG5lZWQgdG8gbW9kaWZ5IHlvdXIgdXN1YWwgb3V0ZG9vciBhY3Rpdml0aWVzIHVubGVzcyB5b3UgZXhwZXJpZW5jZSBzeW1wdG9tcyBzdWNoIGFzIGNvdWdoaW5nIGFuZCB0aHJvYXQgaXJyaXRhdGlvbi5cIixcbiAgICAgICAgXSxcbiAgICAgICAgMzogW1xuICAgICAgICAgICAgXCJNb2RlcmF0ZVwiLFxuICAgICAgICAgICAgXCJBaXIgcXVhbGl0eSBpcyBtb2RlcmF0ZSBhbmQgdHlwaWNhbGx5IHNhZmUgZm9yIHRoZSBnZW5lcmFsIHB1YmxpYzsgQ29uc2lkZXIgcmVkdWNpbmcgb3IgcmVzY2hlZHVsaW5nIHN0cmVudW91cyBhY3Rpdml0aWVzIG91dGRvb3JzIGlmIHlvdSBleHBlcmllbmNlIHN5bXB0b21zIHN1Y2ggYXMgY291Z2hpbmcgYW5kIHRocm9hdCBpcnJpdGF0aW9uLlwiLFxuICAgICAgICBdLFxuICAgICAgICA0OiBbXG4gICAgICAgICAgICBcIlBvb3JcIixcbiAgICAgICAgICAgIFwiQWlyIHF1YWxpdHkgaXMgcG9vciBhbmQgcHJlY2F1dGlvbnMgc2hvdWxkIGJlIGNvbnNpZGVyZWQuIFJlZHVjZSBvciByZXNjaGVkdWxlIHN0cmVudW91cyBhY3Rpdml0aWVzIG91dGRvb3JzLiBDaGlsZHJlbiBhbmQgdGhlIGVsZGVybHkgc2hvdWxkIGFsc28gdGFrZSBpdCBlYXN5LlwiLFxuICAgICAgICBdLFxuICAgICAgICA1OiBbXG4gICAgICAgICAgICBcIlZlcnkgUG9vclwiLFxuICAgICAgICAgICAgXCJBaXIgcXVhbGl0eSBpcyB2ZXJ5IHBvb3I7IEF2b2lkIHN0cmVudW91cyBhY3Rpdml0aWVzIG91dGRvb3JzLiBDaGlsZHJlbiBhbmQgdGhlIGVsZGVybHkgc2hvdWxkIGFsc28gYXZvaWQgb3V0ZG9vciBwaHlzaWNhbCBleGVydGlvbi5cIixcbiAgICAgICAgXSxcbiAgICB9O1xuXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBkYXRhKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0eSA9PSBcIkFRSVwiKSB7XG4gICAgICAgICAgICBsZXQgc3BlZWQgPSAzMDtcbiAgICAgICAgICAgIGxldCBwcm9ncmVzc1ZhbHVlID0gMDtcbiAgICAgICAgICAgIGxldCBwcm9ncmVzc0VuZFZhbHVlID0gZGF0YVtwcm9wZXJ0eV0gKiAyMDtcblxuICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHByb2dyZXNzVmFsdWUgKz0gMTtcbiAgICAgICAgICAgICAgICAvL2FxaVZhbHVlLmlubmVySFRNTCA9IGAke3Byb2dyZXNzVmFsdWV9JWBcbiAgICAgICAgICAgICAgICBkaXNwbGF5UmluZy5zdHlsZS5iYWNrZ3JvdW5kID0gYGNvbmljLWdyYWRpZW50KFxuICAgICAgICAgICAgICAgICAgICAjNGQ1YmY5ICR7cHJvZ3Jlc3NWYWx1ZSAqIDMuNn1kZWcsXG4gICAgICAgICAgICAgICAgICAgICNjYWRjZmYgJHtwcm9ncmVzc1ZhbHVlICogMy42fWRlZ1xuICAgICAgICAgICAgICAgIClgO1xuICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzc1ZhbHVlID09IHByb2dyZXNzRW5kVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChwcm9ncmVzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgc3BlZWQpO1xuXG4gICAgICAgICAgICBhcWlWYWx1ZS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XX0gQVFJYDtcblxuICAgICAgICAgICAgYWlyUXVhbGl0eUhlYWRlci5pbm5lckhUTUwgPVxuICAgICAgICAgICAgICAgIGFpclF1YWxpdHlEZXNjaXB0aW9uc1tgJHtkYXRhW3Byb3BlcnR5XX1gXVswXTtcbiAgICAgICAgICAgIGFpclF1YWxpdHlQYXJhLmlubmVySFRNTCA9XG4gICAgICAgICAgICAgICAgYWlyUXVhbGl0eURlc2NpcHRpb25zW2Ake2RhdGFbcHJvcGVydHldfWBdWzFdO1xuICAgICAgICB9IGVsc2UgaWYgKHByb3BlcnR5ID09IFwiY29tcG9uZW50c1wiKSB7XG4gICAgICAgICAgICBvem9uZVZhbHVlLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldLm8zfSAmIzE4MWcvbTxzdXA+Mzwvc3VwPmA7XG4gICAgICAgICAgICBOMlZhbHVlLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldLm5vMn0gJiMxODFnL208c3VwPjM8L3N1cD5gO1xuICAgICAgICAgICAgZmluZVBNVmFsdWUuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV0ucG0yXzV9ICYjMTgxZy9tPHN1cD4zPC9zdXA+YDtcbiAgICAgICAgICAgIFBNVmFsdWUuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV0ucG0xMH0gJiMxODFnL208c3VwPjM8L3N1cD5gO1xuICAgICAgICAgICAgc3VsZnVyRGlveGlkZVZhbHVlLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldLnNvMn0gJiMxODFnL208c3VwPjM8L3N1cD5gO1xuICAgICAgICAgICAgY2FyYm9uTW9ub3hpZGVWYWx1ZS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XS5jb30gJiMxODFnL208c3VwPjM8L3N1cD5gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYWlyUXVhbGl0eUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlyUXVhbGl0eUJ0blwiKTtcbiAgICBhaXJRdWFsaXR5QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGFpclF1YWxpdHlDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZShcImV4cGFuZEFpclF1YWxpdHlcIik7XG5cbiAgICAgICAgaWYgKGFpclF1YWxpdHlCdG4udGV4dENvbnRlbnQgPT0gXCJNb3JlIERldGFpbHNcIikge1xuICAgICAgICAgICAgYWlyUXVhbGl0eUJ0bi50ZXh0Q29udGVudCA9IFwiTGVzcyBEZXRhaWxzXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhaXJRdWFsaXR5QnRuLnRleHRDb250ZW50ID0gXCJNb3JlIERldGFpbHNcIjtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZUZvcmVjYXN0KGRhdGEpIHtcbiAgICBjb25zdCBmb3JlY2FzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9yZWNhc3RcIik7XG4gICAgZm9yZWNhc3QuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGZvcmVjYXN0VGlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGZvcmVjYXN0VGlsZS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RUaWxlXCIpO1xuXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0VGlsZU1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb25zdCBmb3JlY2FzdFRpbGVEaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY29uc3QgZm9yZWNhc3RUaWxlU3VwcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgZm9yZWNhc3RUaWxlTWFpbi5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RUaWxlTWFpblwiKTtcbiAgICAgICAgZm9yZWNhc3RUaWxlRGlzcGxheS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RUaWxlRGlzcGxheVwiKTtcbiAgICAgICAgZm9yZWNhc3RUaWxlU3VwcC5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RUaWxlU3VwcFwiKTtcblxuICAgICAgICBsZXQgdGlsZURhdGEgPSBkYXRhW2ldO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gdGlsZURhdGEpIHtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PSBcIkRhdGVcIikge1xuICAgICAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUodGlsZURhdGFbcHJvcGVydHldWzBdICogMTAwMCk7XG4gICAgICAgICAgICAgICAgbGV0IGhvdXIgPSBkYXRlLmdldFVUQ0hvdXJzKGRhdGUpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgdGltZS5pbm5lckhUTUwgPSBjb252ZXJ0VGltZSh0aWxlRGF0YVtwcm9wZXJ0eV1bMV0sIGhvdXIpO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUaWxlTWFpbi5hcHBlbmRDaGlsZCh0aW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHkgPT0gXCJDb25kaXRpb25cIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0SWNvblwiKTtcblxuICAgICAgICAgICAgICAgIGljb24uc3JjID0gYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3RpbGVEYXRhW3Byb3BlcnR5XVsxXX1AMngucG5nYDtcblxuICAgICAgICAgICAgICAgIGZvcmVjYXN0VGlsZURpc3BsYXkuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BlcnR5ID09IFwiVGVtcGVyYXR1cmVcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRlbXAuaW5uZXJIVE1MID0gYCR7dGlsZURhdGFbcHJvcGVydHldfWA7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVEaXNwbGF5LmFwcGVuZENoaWxkKGZvcmVjYXN0VGVtcCk7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUaWxlTWFpbi5hcHBlbmRDaGlsZChmb3JlY2FzdFRpbGVEaXNwbGF5KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHkgPT0gXCJQb3BcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgICAgICAgICBwb3AuaW5uZXJIVE1MID0gYCR7dGlsZURhdGFbcHJvcGVydHldfSBwb3BgO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUaWxlTWFpbi5hcHBlbmRDaGlsZChwb3ApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JlY2FzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RJdGVtXCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgaHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIik7XG4gICAgICAgICAgICAgICAgaHIuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0SHJcIik7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmb3JlY2FzdEl0ZW1Qcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9yZWNhc3RJdGVtRGF0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1Qcm9wZXJ0eS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RJdGVtUHJvcGVydHlcIik7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtRGF0YS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RJdGVtRGF0YVwiKTtcblxuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PSBcIldpbmRcIikge1xuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1Qcm9wZXJ0eS5pbm5lckhUTUwgPSBgJHtwcm9wZXJ0eX1gO1xuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1EYXRhLmlubmVySFRNTCA9IGAke1xuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZURhdGFbcHJvcGVydHldLnNwZWVkXG4gICAgICAgICAgICAgICAgICAgIH0gJHtjb252ZXJ0V2luZERpcmVjdGlvbih0aWxlRGF0YVtwcm9wZXJ0eV0uZGlyZWN0aW9uKX1gO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW1Qcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW1EYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmFwcGVuZENoaWxkKGhyKTtcblxuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVTdXBwLmFwcGVuZENoaWxkKGZvcmVjYXN0SXRlbSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtUHJvcGVydHkuaW5uZXJIVE1MID0gYCR7cHJvcGVydHl9YDtcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtRGF0YS5pbm5lckhUTUwgPSBgJHt0aWxlRGF0YVtwcm9wZXJ0eV19YDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uYXBwZW5kQ2hpbGQoZm9yZWNhc3RJdGVtUHJvcGVydHkpO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW1EYXRhKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uYXBwZW5kQ2hpbGQoaHIpO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUaWxlU3VwcC5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZXhwYW5kQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgZXhwYW5kQnRuLmNsYXNzTGlzdC5hZGQoXCJleHBhbmRCdG5cIik7XG4gICAgICAgIGV4cGFuZEJ0bi5pbm5lckhUTUwgPSBcIiYjODk2NFwiO1xuXG4gICAgICAgIGV4cGFuZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZm9yZWNhc3RUaWxlLmNsYXNzTGlzdC50b2dnbGUoXCJleHBhbmRGb3JlY2FzdFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yZWNhc3RUaWxlTWFpbi5hcHBlbmRDaGlsZChleHBhbmRCdG4pO1xuXG4gICAgICAgIGZvcmVjYXN0VGlsZS5hcHBlbmRDaGlsZChmb3JlY2FzdFRpbGVNYWluKTtcbiAgICAgICAgZm9yZWNhc3RUaWxlLmFwcGVuZENoaWxkKGZvcmVjYXN0VGlsZVN1cHApO1xuXG4gICAgICAgIGZvcmVjYXN0LmFwcGVuZENoaWxkKGZvcmVjYXN0VGlsZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBhZGRFcnJvcigpIHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9jYXRpb25cIik7XG4gICAgbG9jYXRpb24uaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIGNvbnN0IG91dGVyV3JhcHBlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm91dGVyV3JhcHBlclwiKTtcblxuICAgIGNvbnN0IGVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lcnJvckNvbnRhaW5lclwiKTtcbiAgICBjb25zdCBlcnJvcldyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVycm9yV3JhcHBlclwiKTtcblxuICAgIG91dGVyV3JhcHBlcnMuZm9yRWFjaCgod3JhcHBlcikgPT4ge1xuICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJoaWRlQ29udGFpbmVyXCIpO1xuICAgIH0pO1xuXG4gICAgZXJyb3JXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlQ29udGFpbmVyXCIpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFcnJvcigpIHtcbiAgICBjb25zdCBvdXRlcldyYXBwZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5vdXRlcldyYXBwZXJcIik7XG4gICAgY29uc3QgZXJyb3JXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lcnJvcldyYXBwZXJcIik7XG5cbiAgICBvdXRlcldyYXBwZXJzLmZvckVhY2goKHdyYXBwZXIpID0+IHtcbiAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZUNvbnRhaW5lclwiKTtcbiAgICB9KTtcblxuICAgIGVycm9yV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiaGlkZUNvbnRhaW5lclwiKTtcbn1cblxuZnVuY3Rpb24gc3RhcnRMb2FkaW5nQW5pbWF0aW9uKCkge1xuICAgIHJlbW92ZUVycm9yKCk7XG5cbiAgICBjb25zdCBjb25kaXRpb25Db250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgXCIuY29uZGl0aW9uQ29udGFpbmVyXCJcbiAgICApO1xuICAgIGNvbnN0IG91dGVyV3JhcHBlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm91dGVyV3JhcHBlclwiKTtcblxuICAgIGNvbmRpdGlvbkNvbnRhaW5lcnMuZm9yRWFjaCgoY29udGFpbmVyKSA9PiB7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaGlkZUNvbnRhaW5lclwiKTtcbiAgICB9KTtcblxuICAgIG91dGVyV3JhcHBlcnMuZm9yRWFjaCgod3JhcHBlcikgPT4ge1xuICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJza2VsZXRvblwiKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZW5kTG9hZGluZ0FuaW1hdGlvbigpIHtcbiAgICBjb25zdCBjb25kaXRpb25Db250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgXCIuY29uZGl0aW9uQ29udGFpbmVyXCJcbiAgICApO1xuXG4gICAgY29uc3Qgb3V0ZXJXcmFwcGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIub3V0ZXJXcmFwcGVyXCIpO1xuXG4gICAgY29uZGl0aW9uQ29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IHtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlQ29udGFpbmVyXCIpO1xuICAgIH0pO1xuXG4gICAgb3V0ZXJXcmFwcGVycy5mb3JFYWNoKCh3cmFwcGVyKSA9PiB7XG4gICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcInNrZWxldG9uXCIpO1xuICAgIH0pO1xufVxuXG5leHBvcnQge1xuICAgIHBvcHVsYXRlTG9jYXRpb24sXG4gICAgcG9wdWxhdGVDdXJyZW50V2VhdGhlcixcbiAgICBwb3B1bGF0ZUFpclF1YWxpdHksXG4gICAgcG9wdWxhdGVGb3JlY2FzdCxcbiAgICBhZGRFcnJvcixcbiAgICBzdGFydExvYWRpbmdBbmltYXRpb24sXG4gICAgZW5kTG9hZGluZ0FuaW1hdGlvbixcbn07XG4iLCIvLyBVdGlsaXR5IGZ1bmN0aW9ucyBmb3IgV2VhdGhlckFwcFxuXG5mdW5jdGlvbiBjb252ZXJ0VGltZSh0aW1lem9uZSwgaG91ciwgbWludXRlKSB7XG4gICAgLy8gVGFrZXMgdGhlIGhvdXIgaW4gMjRociB0aW1lIGFuZCBjb252ZXJ0cyBpdCB0byAxMmhyIHRpbWUgd2l0aCBBTSBvciBQTVxuICAgIGxldCBuZXdUaW1lID0gXCJcIjtcblxuICAgIGNvbnN0IHRpbWV6b25lU2hpZnQgPSBNYXRoLmZsb29yKHRpbWV6b25lIC8gMzYwMCk7XG4gICAgbGV0IGFkanVzdGVkSG91ciA9IGhvdXIgKyB0aW1lem9uZVNoaWZ0O1xuXG4gICAgaWYgKGFkanVzdGVkSG91ciA8IDApIHtcbiAgICAgICAgYWRqdXN0ZWRIb3VyID0gYWRqdXN0ZWRIb3VyICsgMjQ7XG4gICAgfVxuXG4gICAgaWYgKCFtaW51dGUpIHtcbiAgICAgICAgaWYgKGFkanVzdGVkSG91ciA8IDEyKSB7XG4gICAgICAgICAgICBuZXdUaW1lID0gYCR7YWRqdXN0ZWRIb3VyICUgMTIgfHwgMTJ9QU1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3VGltZSA9IGAke2FkanVzdGVkSG91ciAlIDEyIHx8IDEyfVBNYDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChtaW51dGUudG9TdHJpbmcoKS5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgbWludXRlID0gXCIwXCIgKyBtaW51dGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFkanVzdGVkSG91ciA8IDEyKSB7XG4gICAgICAgICAgICBuZXdUaW1lID0gYCR7YWRqdXN0ZWRIb3VyICUgMTIgfHwgMTJ9OiR7bWludXRlfUFNYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1RpbWUgPSBgJHthZGp1c3RlZEhvdXIgJSAxMiB8fCAxMn06JHttaW51dGV9UE1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1RpbWU7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRXaW5kRGlyZWN0aW9uKGRlZykge1xuICAgIC8vIENoYW5nZSBpbiBkaXJlY3Rpb24gZXZlcnkgMjIuNSBkZWdyZWVzXG4gICAgY29uc3QgdmFsID0gTWF0aC5mbG9vcihkZWcgLyAyMi41ICsgMC41KTtcbiAgICBjb25zdCBjb21wYXNzRGlyZWN0aW9ucyA9IFtcbiAgICAgICAgXCJOXCIsXG4gICAgICAgIFwiTk5FXCIsXG4gICAgICAgIFwiTkVcIixcbiAgICAgICAgXCJFTkVcIixcbiAgICAgICAgXCJFXCIsXG4gICAgICAgIFwiRVNFXCIsXG4gICAgICAgIFwiU0VcIixcbiAgICAgICAgXCJTU0VcIixcbiAgICAgICAgXCJTXCIsXG4gICAgICAgIFwiU1NXXCIsXG4gICAgICAgIFwiU1dcIixcbiAgICAgICAgXCJXU1dcIixcbiAgICAgICAgXCJXXCIsXG4gICAgICAgIFwiV05XXCIsXG4gICAgICAgIFwiTldcIixcbiAgICAgICAgXCJOTldcIixcbiAgICBdO1xuXG4gICAgY29uc3QgZGlyZWN0aW9uID0gY29tcGFzc0RpcmVjdGlvbnNbdmFsICUgMTZdO1xuXG4gICAgcmV0dXJuIGRpcmVjdGlvbjtcbn1cblxuZnVuY3Rpb24gY2FwaXRhbGl6ZUZpcnN0TGV0dGVycyhwaHJhc2UpIHtcbiAgICBjb25zdCB3b3JkcyA9IHBocmFzZS5zcGxpdChcIiBcIik7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHdvcmRzW2ldID0gd29yZHNbaV1bMF0udG9VcHBlckNhc2UoKSArIHdvcmRzW2ldLnN1YnN0cigxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd29yZHMuam9pbihcIiBcIik7XG59XG5cbmV4cG9ydCB7IGNvbnZlcnRUaW1lLCBjb252ZXJ0V2luZERpcmVjdGlvbiwgY2FwaXRhbGl6ZUZpcnN0TGV0dGVycyB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTb3VyY2UgaW5kZXggc2NyaXB0IGZvciBXZWF0aGVyIEFwcFxuXG5pbXBvcnQgeyBnZXRXZWF0aGVyLCBnZXRBaXJRdWFsaXR5LCBnZXRGb3JlY2FzdCB9IGZyb20gXCIuL2FwaUZ1bmN0aW9uc1wiO1xuaW1wb3J0IHtcbiAgICBwb3B1bGF0ZUxvY2F0aW9uLFxuICAgIHBvcHVsYXRlQ3VycmVudFdlYXRoZXIsXG4gICAgcG9wdWxhdGVBaXJRdWFsaXR5LFxuICAgIHBvcHVsYXRlRm9yZWNhc3QsXG4gICAgYWRkRXJyb3IsXG4gICAgc3RhcnRMb2FkaW5nQW5pbWF0aW9uLFxuICAgIGVuZExvYWRpbmdBbmltYXRpb24sXG59IGZyb20gXCIuL2RvbUZ1bmN0aW9uc1wiO1xuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzV2VhdGhlcihsb2NhdGlvbikge1xuICAgIC8vIEdldHMgZGF0YSBmcm9tIGdldCB3ZWF0aGVyIGFwaUZ1bmN0aW9ucyBmdW5jdGlvbiBhbmQgZ2F0aGVycyByZWxhdmVudCBpbmZvIGZvciBkaXNwbGF5XG4gICAgLy8gTmVlZCB0byBhZGQgdHJ5L2NhdGNoIHRvIGhhbmRsZSBlcnJvclxuXG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCBnZXRXZWF0aGVyKGxvY2F0aW9uKTtcblxuICAgIGNvbnNvbGUubG9nKHdlYXRoZXJEYXRhKTtcblxuICAgIGxldCBpbXBvcnRhbnREYXRhID0ge307XG5cbiAgICBpbXBvcnRhbnREYXRhLkxvY2F0aW9uID0gW3dlYXRoZXJEYXRhLm5hbWUsIHdlYXRoZXJEYXRhLnN5cy5jb3VudHJ5XTtcbiAgICBpbXBvcnRhbnREYXRhLkRhdGUgPSBbd2VhdGhlckRhdGEuZHQsIHdlYXRoZXJEYXRhLnRpbWV6b25lXTtcbiAgICBpbXBvcnRhbnREYXRhLlRlbXBlcmF0dXJlID0gYCR7d2VhdGhlckRhdGEubWFpbi50ZW1wfSAmIzg0NTFgO1xuICAgIGltcG9ydGFudERhdGFbXCJGZWVscyBMaWtlXCJdID0gYCR7d2VhdGhlckRhdGEubWFpbi5mZWVsc19saWtlfSAmIzg0NTFgO1xuICAgIGltcG9ydGFudERhdGEuSHVtaWRpdHkgPSBgJHt3ZWF0aGVyRGF0YS5tYWluLmh1bWlkaXR5fSAlYDtcbiAgICBpbXBvcnRhbnREYXRhLldpbmQgPSBbXG4gICAgICAgIGAke01hdGgucm91bmQod2VhdGhlckRhdGEud2luZC5zcGVlZCAqIDMuNiAqIDEwMCkgLyAxMDB9IGttL2hyYCxcbiAgICAgICAgd2VhdGhlckRhdGEud2luZC5kZWcsXG4gICAgXTtcblxuICAgIGlmICh3ZWF0aGVyRGF0YS53aW5kLmd1c3QpIHtcbiAgICAgICAgaW1wb3J0YW50RGF0YS5HdXN0ID0gYCR7XG4gICAgICAgICAgICBNYXRoLnJvdW5kKHdlYXRoZXJEYXRhLndpbmQuZ3VzdCAqIDMuNiAqIDEwMCkgLyAxMDBcbiAgICAgICAgfSBrbS9ocmA7XG4gICAgfVxuXG4gICAgaWYgKHdlYXRoZXJEYXRhLnJhaW4pIHtcbiAgICAgICAgaW1wb3J0YW50RGF0YS5SYWluID0gYCR7d2VhdGhlckRhdGEucmFpbltcIjFoXCJdfSBtbWA7XG4gICAgfVxuXG4gICAgaW1wb3J0YW50RGF0YS5Db25kaXRpb24gPSBbXG4gICAgICAgIHdlYXRoZXJEYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICAgIHdlYXRoZXJEYXRhLndlYXRoZXJbMF0uaWNvbixcbiAgICBdO1xuXG4gICAgLy8gRm9ybWF0IHRoaXMgb2JqZWN0IGJldHRlclxuICAgIC8vIE9iamVjdCBDb25zdHJ1Y3RvciBhbmQgY3JlYXRlIG1ldGhvZCB0byBjb252ZXJ0IHRvIGRpZmZlcmVudCB1bml0c1xuXG4gICAgcmV0dXJuIGltcG9ydGFudERhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NBaXJRdWFsaXR5KGxvY2F0aW9uKSB7XG4gICAgLy8gR2V0cyBkYXRhIGZyb20gYWlyIHF1YWxpdHkgYXBpRnVuY3Rpb25zIGZ1bmN0aW9uIGFuZCBnYXRoZXJzIHJlbGF2ZW50IGluZm8gZm9yIGRpc3BsYXlcblxuICAgIGNvbnN0IGFpclF1YWxpdHlEYXRhID0gYXdhaXQgZ2V0QWlyUXVhbGl0eShsb2NhdGlvbik7XG4gICAgY29uc29sZS5sb2coYWlyUXVhbGl0eURhdGEpO1xuXG4gICAgbGV0IGltcG9ydGFudERhdGEgPSB7fTtcblxuICAgIGltcG9ydGFudERhdGEuQVFJID0gYWlyUXVhbGl0eURhdGEubGlzdFswXS5tYWluLmFxaTtcbiAgICBpbXBvcnRhbnREYXRhLmNvbXBvbmVudHMgPSBhaXJRdWFsaXR5RGF0YS5saXN0WzBdLmNvbXBvbmVudHM7XG5cbiAgICByZXR1cm4gaW1wb3J0YW50RGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc0ZvcmVjYXN0KGxvY2F0aW9uKSB7XG4gICAgLy8gR2V0cyBkYXRhIGZyb20gZm9yZWNhc3QgYXBpRnVuY3Rpb25zIGZ1bmN0aW9uIGFuZCBnYXRoZXJzIHJlbGF2ZW50IGluZm8gZm9yIGRpc3BsYXlcblxuICAgIGNvbnN0IGZvcmVjYXN0RGF0YSA9IGF3YWl0IGdldEZvcmVjYXN0KGxvY2F0aW9uKTtcbiAgICBjb25zb2xlLmxvZyhmb3JlY2FzdERhdGEpO1xuXG4gICAgbGV0IGltcG9ydGFudERhdGEgPSBbXTtcblxuICAgIGZvciAoY29uc3QgaW5kZXggaW4gZm9yZWNhc3REYXRhLmxpc3QpIHtcbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF0gPSB7fTtcbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF0uRGF0ZSA9IFtcbiAgICAgICAgICAgIGZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS5kdCxcbiAgICAgICAgICAgIGZvcmVjYXN0RGF0YS5jaXR5LnRpbWV6b25lLFxuICAgICAgICBdO1xuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XS5Db25kaXRpb24gPSBbXG4gICAgICAgICAgICBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS53ZWF0aGVyWzBdLmljb24sXG4gICAgICAgIF07XG4gICAgICAgIGltcG9ydGFudERhdGFbXG4gICAgICAgICAgICBpbmRleFxuICAgICAgICBdLlRlbXBlcmF0dXJlID0gYCR7Zm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLm1haW4udGVtcH0gJiM4NDUxYDtcbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF0uUG9wID0gYCR7TWF0aC5yb3VuZChcbiAgICAgICAgICAgIGZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS5wb3AgKiAxMDBcbiAgICAgICAgKX0gJWA7XG5cbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF1bXG4gICAgICAgICAgICBcIkZlZWxzIExpa2VcIlxuICAgICAgICBdID0gYCR7Zm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLm1haW4uZmVlbHNfbGlrZX0gJiM4NDUxYDtcbiAgICAgICAgaW1wb3J0YW50RGF0YVtcbiAgICAgICAgICAgIGluZGV4XG4gICAgICAgIF0uSHVtaWRpdHkgPSBgJHtmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ubWFpbi5odW1pZGl0eX0lYDtcblxuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XVtcbiAgICAgICAgICAgIFwiQ2xvdWQgQ292ZXJcIlxuICAgICAgICBdID0gYCR7Zm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLmNsb3Vkcy5hbGx9ICVgO1xuICAgICAgICBpbXBvcnRhbnREYXRhW1xuICAgICAgICAgICAgaW5kZXhcbiAgICAgICAgXS5WaXNpYmlsaXR5ID0gYCR7Zm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLnZpc2liaWxpdHl9IGttYDtcblxuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XS5XaW5kID0ge1xuICAgICAgICAgICAgc3BlZWQ6IGAke1xuICAgICAgICAgICAgICAgIE1hdGgucm91bmQoZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLndpbmQuc3BlZWQgKiAzLjYgKiAxMDApIC9cbiAgICAgICAgICAgICAgICAxMDBcbiAgICAgICAgICAgIH0ga20vaHJgLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ud2luZC5kZWcsXG4gICAgICAgIH07XG4gICAgICAgIGltcG9ydGFudERhdGFbaW5kZXhdLkd1c3QgPSBgJHtcbiAgICAgICAgICAgIE1hdGgucm91bmQoZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLndpbmQuZ3VzdCAqIDMuNiAqIDEwMCkgLyAxMDBcbiAgICAgICAgfSBrbS9ocmA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGltcG9ydGFudERhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NNYXAoKSB7XG4gICAgLy8gR2V0cyBkYXRhIGZyb20gbWFwIGFwaUZ1bmN0aW9ucyBmdW5jdGlvbiBhbmQgZ2F0aGVycyByZWxhdmVudCBpbmZvIGZvciBkaXNwbGF5XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWRQYWdlKGxvY2F0aW9uKSB7XG4gICAgLy8gQWRkIHNvbWUgdmlzdWFsIGluZGljYXRpb24gdGhhdCB3ZSdyZSB3YWl0aW5nIGZvciB0aGUgZGF0YSAocHJvbWlzZS5hbGwpIGJlZm9yZSBpdCBnZXRzIGRpc3BsYXllZCAoTWFwIHdvdWxkIGxpa2V5IHRha2UgdGhlIGxvbmdlc3QgdG8gZGlzcGxheSlcbiAgICAvL0NvdWxkIGFkZCBhIGNsYXNzIHRvIGNoYW5nZSB0aGUgZGlzcGxheSBwcmlvciB0byBwcm9taXNlLmFsbCBzaG93aW5nIHRoYXQgaXQncyBsb2FkaW5nLCBhbmQgcmVtb3ZlIGl0IHRvIHNob3cgZGF0YSBpZiBzdWNjZXNzZnVsIG9yIGRpc3BsYXkgYSBubyByZXN1bHRzIGZvdW5kIHBhZ2UgaWYgZXJyb3JcbiAgICBzdGFydExvYWRpbmdBbmltYXRpb24oKTtcblxuICAgIC8vIFVzZSBhIHByb21pc2UuYWxsIHRvIHdhaXQgZm9yIGFsbCBwcm9jZXNzaW5nIHRvIGNvbXBsZXRlIGJlZm9yZSBkaXNwbGF5aW5nIGRhdGFcblxuICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgcHJvY2Vzc1dlYXRoZXIobG9jYXRpb24pLFxuICAgICAgICBwcm9jZXNzQWlyUXVhbGl0eShsb2NhdGlvbiksXG4gICAgICAgIHByb2Nlc3NGb3JlY2FzdChsb2NhdGlvbiksXG4gICAgXSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHBvcHVsYXRlTG9jYXRpb24oZGF0YVswXSk7XG4gICAgICAgICAgICBwb3B1bGF0ZUN1cnJlbnRXZWF0aGVyKGRhdGFbMF0pO1xuICAgICAgICAgICAgcG9wdWxhdGVBaXJRdWFsaXR5KGRhdGFbMV0pO1xuICAgICAgICAgICAgcG9wdWxhdGVGb3JlY2FzdChkYXRhWzJdKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgYWRkRXJyb3IoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgZW5kTG9hZGluZ0FuaW1hdGlvbigpO1xuICAgICAgICB9KTtcbn1cblxuY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWJtaXRCdG5cIik7XG5cbnN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBzZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaFwiKTtcblxuICAgIGxvYWRQYWdlKHNlYXJjaC52YWx1ZSk7XG5cbiAgICBzZWFyY2gudmFsdWUgPSBcIlwiO1xufSk7XG5cbmxvYWRQYWdlKFwiTG9uZG9uXCIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9