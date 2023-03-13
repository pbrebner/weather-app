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
/* harmony export */   "populateAirQuality": () => (/* binding */ populateAirQuality),
/* harmony export */   "populateCurrentWeather": () => (/* binding */ populateCurrentWeather),
/* harmony export */   "populateForecast": () => (/* binding */ populateForecast),
/* harmony export */   "populateLocation": () => (/* binding */ populateLocation)
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
    const airQualityHeader = document.querySelector(".airQualityHeader");
    const airQualityPara = document.querySelector(".airQualityPara");

    airQualityDisplay.innerHTML = "";
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
            airQualityDisplay.innerHTML = `${data[property]} AQI`;

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

    if (!minute) {
        if (hour < 12) {
            newTime = `${(hour + timezoneShift) % 12 || 12}AM`;
        } else {
            newTime = `${(hour + timezoneShift) % 12 || 12}PM`;
        }
    } else {
        if (minute.toString().length == 1) {
            minute = "0" + minute;
        }
        if (hour < 12) {
            newTime = `${(hour + timezoneShift) % 12 || 12}:${minute}AM`;
        } else {
            newTime = `${(hour + timezoneShift) % 12 || 12}:${minute}PM`;
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
    // Need to add try/catch to handle errors
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
        importantData[index].Pop = `${forecastData.list[index].pop * 100} %`;

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

    // Use a promise.all to wait for all processing to complete before displaying data

    Promise.all([
        processWeather(location),
        processAirQuality(location),
        processForecast(location),
    ]).then((data) => {
        //console.log(data);
        (0,_domFunctions__WEBPACK_IMPORTED_MODULE_1__.populateLocation)(data[0]);
        (0,_domFunctions__WEBPACK_IMPORTED_MODULE_1__.populateCurrentWeather)(data[0]);
        (0,_domFunctions__WEBPACK_IMPORTED_MODULE_1__.populateAirQuality)(data[1]);
        (0,_domFunctions__WEBPACK_IMPORTED_MODULE_1__.populateForecast)(data[2]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2FwaUZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9kb21GdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGdW5jdGlvbnMgdG8gZmV0Y2ggd2VhdGhlciBkYXRhIHRocm91Z2ggQVBJXG5cbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXIobG9jYXRpb24pIHtcbiAgICBjb25zdCB3ZWF0aGVyUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtsb2NhdGlvbn0mdW5pdHM9bWV0cmljJkFQUElEPTY5YTBmZTlkODlhYTNjNTYyYzA5YTUwZmJkNTA1MDQ2YFxuICAgICk7XG5cbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHdlYXRoZXJSZXNwb25zZS5qc29uKCk7XG5cbiAgICByZXR1cm4gd2VhdGhlckRhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEFpclF1YWxpdHkobG9jYXRpb24pIHtcbiAgICBjb25zdCB3ZWF0aGVyUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtsb2NhdGlvbn0mdW5pdHM9bWV0cmljJkFQUElEPTY5YTBmZTlkODlhYTNjNTYyYzA5YTUwZmJkNTA1MDQ2YFxuICAgICk7XG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCB3ZWF0aGVyUmVzcG9uc2UuanNvbigpO1xuXG4gICAgbGV0IGxhdCA9IHdlYXRoZXJEYXRhLmNvb3JkLmxhdDtcbiAgICBsZXQgbG9uID0gd2VhdGhlckRhdGEuY29vcmQubG9uO1xuXG4gICAgY29uc3QgYWlyUXVhbGl0eVJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvYWlyX3BvbGx1dGlvbj9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mQVBQSUQ9NjlhMGZlOWQ4OWFhM2M1NjJjMDlhNTBmYmQ1MDUwNDZgXG4gICAgKTtcblxuICAgIGNvbnN0IGFpclF1YWxpdHlEYXRhID0gYXdhaXQgYWlyUXVhbGl0eVJlc3BvbnNlLmpzb24oKTtcblxuICAgIHJldHVybiBhaXJRdWFsaXR5RGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0Rm9yZWNhc3QobG9jYXRpb24pIHtcbiAgICBjb25zdCBmb3JlY2FzdFJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT0ke2xvY2F0aW9ufSZ1bml0cz1tZXRyaWMmYXBwaWQ9NjlhMGZlOWQ4OWFhM2M1NjJjMDlhNTBmYmQ1MDUwNDZgXG4gICAgKTtcblxuICAgIGNvbnN0IGZvcmVjYXN0RGF0YSA9IGF3YWl0IGZvcmVjYXN0UmVzcG9uc2UuanNvbigpO1xuXG4gICAgcmV0dXJuIGZvcmVjYXN0RGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlck1hcChsb2NhdGlvbikge31cblxuZXhwb3J0IHsgZ2V0V2VhdGhlciwgZ2V0QWlyUXVhbGl0eSwgZ2V0Rm9yZWNhc3QgfTtcbiIsIi8vIEZ1bmN0aW9ucyB0byBjcmVhdGUgYW5kIGRpc3BsYXkgRE9NIGVsZW1lbnRzXG5cbmltcG9ydCB7XG4gICAgY29udmVydFRpbWUsXG4gICAgY29udmVydFdpbmREaXJlY3Rpb24sXG4gICAgY2FwaXRhbGl6ZUZpcnN0TGV0dGVycyxcbn0gZnJvbSBcIi4vdXRpbHNcIjtcblxuZnVuY3Rpb24gcG9wdWxhdGVMb2NhdGlvbihkYXRhKSB7XG4gICAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvY2F0aW9uXCIpO1xuICAgIGxvY2F0aW9uLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGRhdGEpIHtcbiAgICAgICAgaWYgKHByb3BlcnR5ID09IFwiTG9jYXRpb25cIikge1xuICAgICAgICAgICAgbGV0IHJlZ2lvbk5hbWVzID0gbmV3IEludGwuRGlzcGxheU5hbWVzKFtcImVuXCJdLCB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJyZWdpb25cIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IGNvdW50cnkgPSByZWdpb25OYW1lcy5vZihgJHtkYXRhW3Byb3BlcnR5XVsxXX1gKTtcblxuICAgICAgICAgICAgbG9jYXRpb24uaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV1bMF19LCAke2NvdW50cnl9YDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVDdXJyZW50V2VhdGhlcihkYXRhKSB7XG4gICAgY29uc3QgY3VycmVudFRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnRUaW1lXCIpO1xuXG4gICAgY29uc3QgY3VycmVudFdlYXRoZXJEZXRhaWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgXCIuY3VycmVudFdlYXRoZXJEZXRhaWxzXCJcbiAgICApO1xuXG4gICAgY29uc3QgY3VycmVudENvbmRpdGlvbkljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBcIi5jdXJyZW50Q29uZGl0aW9uSWNvblwiXG4gICAgKTtcbiAgICBjb25zdCBjdXJyZW50Q29uZGl0aW9uTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIFwiLmN1cnJlbnRDb25kaXRpb25OYW1lXCJcbiAgICApO1xuICAgIGNvbnN0IGN1cnJlbnRUZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50VGVtcFwiKTtcblxuICAgIGN1cnJlbnRXZWF0aGVyRGV0YWlscy5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGN1cnJlbnRUZW1wLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGRhdGEpIHtcbiAgICAgICAgaWYgKHByb3BlcnR5ID09IFwiRGF0ZVwiKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0YVtwcm9wZXJ0eV1bMF0gKiAxMDAwKTtcblxuICAgICAgICAgICAgY29uc3QgaG91ciA9IGRhdGUuZ2V0VVRDSG91cnMoZGF0ZSk7XG4gICAgICAgICAgICBjb25zdCBtaW51dGUgPSBkYXRlLmdldFVUQ01pbnV0ZXMoZGF0ZSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBjb252ZXJ0VGltZShkYXRhW3Byb3BlcnR5XVsxXSwgaG91ciwgbWludXRlKTtcblxuICAgICAgICAgICAgY3VycmVudFRpbWUuaW5uZXJIVE1MID0gdGltZTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eSA9PSBcIlRlbXBlcmF0dXJlXCIpIHtcbiAgICAgICAgICAgIGN1cnJlbnRUZW1wLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldfWA7XG4gICAgICAgICAgICAvLyBVKzIxMDkgZm9yIEZhaHJlbmhlaXRcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eSA9PSBcIkNvbmRpdGlvblwiKSB7XG4gICAgICAgICAgICBjdXJyZW50Q29uZGl0aW9uTmFtZS5pbm5lckhUTUwgPSBgJHtjYXBpdGFsaXplRmlyc3RMZXR0ZXJzKFxuICAgICAgICAgICAgICAgIGRhdGFbcHJvcGVydHldWzBdXG4gICAgICAgICAgICApfWA7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGNvbmRpdGlvbiBJY29uIGFjY29yZGluZyB0byBuYW1lXG4gICAgICAgICAgICBjdXJyZW50Q29uZGl0aW9uSWNvbi5zcmMgPSBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7ZGF0YVtwcm9wZXJ0eV1bMV19QDJ4LnBuZ2A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB3ZWF0aGVySXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBjb25zdCBociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKTtcbiAgICAgICAgICAgIHdlYXRoZXJJdGVtLmNsYXNzTGlzdC5hZGQoXCJjdXJyZW50V2VhdGhlckl0ZW1cIik7XG5cbiAgICAgICAgICAgIGNvbnN0IHdlYXRoZXJJdGVtUHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgY29uc3Qgd2VhdGhlckl0ZW1EYXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICAgICAgaWYgKHByb3BlcnR5ID09IFwiTG9jYXRpb25cIikge1xuICAgICAgICAgICAgICAgIHdlYXRoZXJJdGVtUHJvcGVydHkuaW5uZXJIVE1MID0gYCR7cHJvcGVydHl9YDtcblxuICAgICAgICAgICAgICAgIGxldCByZWdpb25OYW1lcyA9IG5ldyBJbnRsLkRpc3BsYXlOYW1lcyhbXCJlblwiXSwge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInJlZ2lvblwiLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGxldCBjb3VudHJ5ID0gcmVnaW9uTmFtZXMub2YoYCR7ZGF0YVtwcm9wZXJ0eV1bMV19YCk7XG5cbiAgICAgICAgICAgICAgICB3ZWF0aGVySXRlbURhdGEuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV1bMF19LCAke2NvdW50cnl9YDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHkgPT0gXCJXaW5kXCIpIHtcbiAgICAgICAgICAgICAgICB3ZWF0aGVySXRlbVByb3BlcnR5LmlubmVySFRNTCA9IGAke3Byb3BlcnR5fWA7XG4gICAgICAgICAgICAgICAgd2VhdGhlckl0ZW1EYXRhLmlubmVySFRNTCA9IGAke1xuICAgICAgICAgICAgICAgICAgICBkYXRhW3Byb3BlcnR5XVswXVxuICAgICAgICAgICAgICAgIH0gJHtjb252ZXJ0V2luZERpcmVjdGlvbihkYXRhW3Byb3BlcnR5XVsxXSl9YDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2VhdGhlckl0ZW1Qcm9wZXJ0eS5pbm5lckhUTUwgPSBgJHtwcm9wZXJ0eX1gO1xuICAgICAgICAgICAgICAgIHdlYXRoZXJJdGVtRGF0YS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2VhdGhlckl0ZW0uYXBwZW5kQ2hpbGQod2VhdGhlckl0ZW1Qcm9wZXJ0eSk7XG4gICAgICAgICAgICB3ZWF0aGVySXRlbS5hcHBlbmRDaGlsZCh3ZWF0aGVySXRlbURhdGEpO1xuXG4gICAgICAgICAgICBjdXJyZW50V2VhdGhlckRldGFpbHMuYXBwZW5kQ2hpbGQod2VhdGhlckl0ZW0pO1xuICAgICAgICAgICAgY3VycmVudFdlYXRoZXJEZXRhaWxzLmFwcGVuZENoaWxkKGhyKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVBaXJRdWFsaXR5KGRhdGEpIHtcbiAgICBjb25zdCBhaXJRdWFsaXR5Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5haXJRdWFsaXR5Q29udGFpbmVyXCIpO1xuXG4gICAgY29uc3QgYWlyUXVhbGl0eURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpclF1YWxpdHlEaXNwbGF5XCIpO1xuICAgIGNvbnN0IGFpclF1YWxpdHlIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpclF1YWxpdHlIZWFkZXJcIik7XG4gICAgY29uc3QgYWlyUXVhbGl0eVBhcmEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpclF1YWxpdHlQYXJhXCIpO1xuXG4gICAgYWlyUXVhbGl0eURpc3BsYXkuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBhaXJRdWFsaXR5SGVhZGVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgYWlyUXVhbGl0eVBhcmEuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIGNvbnN0IG96b25lVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXBvbmVudE96b25lIC52YWx1ZVwiKTtcbiAgICBjb25zdCBOMlZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wb25lbnROaXRyb2dlbkRpb3hpZGUgLnZhbHVlXCIpO1xuICAgIGNvbnN0IGZpbmVQTVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wb25lbnRGaW5lUE0gLnZhbHVlXCIpO1xuICAgIGNvbnN0IFBNVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXBvbmVudFBNIC52YWx1ZVwiKTtcbiAgICBjb25zdCBzdWxmdXJEaW94aWRlVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBcIi5jb21wb25lbnRTdWxmdXJEaW94aWRlIC52YWx1ZVwiXG4gICAgKTtcbiAgICBjb25zdCBjYXJib25Nb25veGlkZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgXCIuY29tcG9uZW50Q2FyYm9uTW9ub3hpZGUgLnZhbHVlXCJcbiAgICApO1xuXG4gICAgb3pvbmVWYWx1ZS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIE4yVmFsdWUuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBmaW5lUE1WYWx1ZS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIFBNVmFsdWUuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBzdWxmdXJEaW94aWRlVmFsdWUuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBjYXJib25Nb25veGlkZVZhbHVlLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBjb25zdCBhaXJRdWFsaXR5RGVzY2lwdGlvbnMgPSB7XG4gICAgICAgIDE6IFtcbiAgICAgICAgICAgIFwiRXhjZWxsZW50XCIsXG4gICAgICAgICAgICBcIlRoZSBhaXIgcXVhbGl0eSBpcyBpZGVhbCBmb3IgbW9zdCBpbmRpdmlkdWFsczsgRW5qb3kgeW91ciB1c3VhbCBvdXRkb29yIGFjdGl2aXRpZXMuXCIsXG4gICAgICAgIF0sXG4gICAgICAgIDI6IFtcbiAgICAgICAgICAgIFwiRmFpclwiLFxuICAgICAgICAgICAgXCJBaXIgcXVhbGl0eSBpcyBmYWlyIGFuZCBpcyBub3QgYSBjb25jZXJuIGZvciB0aGUgZ2VuZXJhbCBwdWJsaWMuIE5vIG5lZWQgdG8gbW9kaWZ5IHlvdXIgdXN1YWwgb3V0ZG9vciBhY3Rpdml0aWVzIHVubGVzcyB5b3UgZXhwZXJpZW5jZSBzeW1wdG9tcyBzdWNoIGFzIGNvdWdoaW5nIGFuZCB0aHJvYXQgaXJyaXRhdGlvbi5cIixcbiAgICAgICAgXSxcbiAgICAgICAgMzogW1xuICAgICAgICAgICAgXCJNb2RlcmF0ZVwiLFxuICAgICAgICAgICAgXCJBaXIgcXVhbGl0eSBpcyBtb2RlcmF0ZSBhbmQgdHlwaWNhbGx5IHNhZmUgZm9yIHRoZSBnZW5lcmFsIHB1YmxpYzsgQ29uc2lkZXIgcmVkdWNpbmcgb3IgcmVzY2hlZHVsaW5nIHN0cmVudW91cyBhY3Rpdml0aWVzIG91dGRvb3JzIGlmIHlvdSBleHBlcmllbmNlIHN5bXB0b21zIHN1Y2ggYXMgY291Z2hpbmcgYW5kIHRocm9hdCBpcnJpdGF0aW9uLlwiLFxuICAgICAgICBdLFxuICAgICAgICA0OiBbXG4gICAgICAgICAgICBcIlBvb3JcIixcbiAgICAgICAgICAgIFwiQWlyIHF1YWxpdHkgaXMgcG9vciBhbmQgcHJlY2F1dGlvbnMgc2hvdWxkIGJlIGNvbnNpZGVyZWQuIFJlZHVjZSBvciByZXNjaGVkdWxlIHN0cmVudW91cyBhY3Rpdml0aWVzIG91dGRvb3JzLiBDaGlsZHJlbiBhbmQgdGhlIGVsZGVybHkgc2hvdWxkIGFsc28gdGFrZSBpdCBlYXN5LlwiLFxuICAgICAgICBdLFxuICAgICAgICA1OiBbXG4gICAgICAgICAgICBcIlZlcnkgUG9vclwiLFxuICAgICAgICAgICAgXCJBaXIgcXVhbGl0eSBpcyB2ZXJ5IHBvb3I7IEF2b2lkIHN0cmVudW91cyBhY3Rpdml0aWVzIG91dGRvb3JzLiBDaGlsZHJlbiBhbmQgdGhlIGVsZGVybHkgc2hvdWxkIGFsc28gYXZvaWQgb3V0ZG9vciBwaHlzaWNhbCBleGVydGlvbi5cIixcbiAgICAgICAgXSxcbiAgICB9O1xuXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBkYXRhKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0eSA9PSBcIkFRSVwiKSB7XG4gICAgICAgICAgICBhaXJRdWFsaXR5RGlzcGxheS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XX0gQVFJYDtcblxuICAgICAgICAgICAgYWlyUXVhbGl0eUhlYWRlci5pbm5lckhUTUwgPVxuICAgICAgICAgICAgICAgIGFpclF1YWxpdHlEZXNjaXB0aW9uc1tgJHtkYXRhW3Byb3BlcnR5XX1gXVswXTtcbiAgICAgICAgICAgIGFpclF1YWxpdHlQYXJhLmlubmVySFRNTCA9XG4gICAgICAgICAgICAgICAgYWlyUXVhbGl0eURlc2NpcHRpb25zW2Ake2RhdGFbcHJvcGVydHldfWBdWzFdO1xuICAgICAgICB9IGVsc2UgaWYgKHByb3BlcnR5ID09IFwiY29tcG9uZW50c1wiKSB7XG4gICAgICAgICAgICBvem9uZVZhbHVlLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldLm8zfSAmIzE4MWcvbTxzdXA+Mzwvc3VwPmA7XG4gICAgICAgICAgICBOMlZhbHVlLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldLm5vMn0gJiMxODFnL208c3VwPjM8L3N1cD5gO1xuICAgICAgICAgICAgZmluZVBNVmFsdWUuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV0ucG0yXzV9ICYjMTgxZy9tPHN1cD4zPC9zdXA+YDtcbiAgICAgICAgICAgIFBNVmFsdWUuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV0ucG0xMH0gJiMxODFnL208c3VwPjM8L3N1cD5gO1xuICAgICAgICAgICAgc3VsZnVyRGlveGlkZVZhbHVlLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldLnNvMn0gJiMxODFnL208c3VwPjM8L3N1cD5gO1xuICAgICAgICAgICAgY2FyYm9uTW9ub3hpZGVWYWx1ZS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XS5jb30gJiMxODFnL208c3VwPjM8L3N1cD5gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYWlyUXVhbGl0eUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlyUXVhbGl0eUJ0blwiKTtcbiAgICBhaXJRdWFsaXR5QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGFpclF1YWxpdHlDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZShcImV4cGFuZEFpclF1YWxpdHlcIik7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlRm9yZWNhc3QoZGF0YSkge1xuICAgIGNvbnN0IGZvcmVjYXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JlY2FzdFwiKTtcbiAgICBmb3JlY2FzdC5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgY29uc3QgZm9yZWNhc3RUaWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZm9yZWNhc3RUaWxlLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdFRpbGVcIik7XG5cbiAgICAgICAgY29uc3QgZm9yZWNhc3RUaWxlTWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IGZvcmVjYXN0VGlsZURpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb25zdCBmb3JlY2FzdFRpbGVTdXBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICBmb3JlY2FzdFRpbGVNYWluLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdFRpbGVNYWluXCIpO1xuICAgICAgICBmb3JlY2FzdFRpbGVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdFRpbGVEaXNwbGF5XCIpO1xuICAgICAgICBmb3JlY2FzdFRpbGVTdXBwLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdFRpbGVTdXBwXCIpO1xuXG4gICAgICAgIGxldCB0aWxlRGF0YSA9IGRhdGFbaV07XG5cbiAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiB0aWxlRGF0YSkge1xuICAgICAgICAgICAgaWYgKHByb3BlcnR5ID09IFwiRGF0ZVwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSh0aWxlRGF0YVtwcm9wZXJ0eV1bMF0gKiAxMDAwKTtcbiAgICAgICAgICAgICAgICBsZXQgaG91ciA9IGRhdGUuZ2V0VVRDSG91cnMoZGF0ZSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICB0aW1lLmlubmVySFRNTCA9IGNvbnZlcnRUaW1lKHRpbGVEYXRhW3Byb3BlcnR5XVsxXSwgaG91cik7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVNYWluLmFwcGVuZENoaWxkKHRpbWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eSA9PSBcIkNvbmRpdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RJY29uXCIpO1xuXG4gICAgICAgICAgICAgICAgaWNvbi5zcmMgPSBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7dGlsZURhdGFbcHJvcGVydHldWzFdfUAyeC5wbmdgO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUaWxlRGlzcGxheS5hcHBlbmRDaGlsZChpY29uKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHkgPT0gXCJUZW1wZXJhdHVyZVwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9yZWNhc3RUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICAgICAgICAgIGZvcmVjYXN0VGVtcC5pbm5lckhUTUwgPSBgJHt0aWxlRGF0YVtwcm9wZXJ0eV19YDtcblxuICAgICAgICAgICAgICAgIGZvcmVjYXN0VGlsZURpc3BsYXkuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUZW1wKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVNYWluLmFwcGVuZENoaWxkKGZvcmVjYXN0VGlsZURpc3BsYXkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eSA9PSBcIlBvcFwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICAgICAgICAgIHBvcC5pbm5lckhUTUwgPSBgJHt0aWxlRGF0YVtwcm9wZXJ0eV19IHBvcGA7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVNYWluLmFwcGVuZENoaWxkKHBvcCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdEl0ZW1cIik7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKTtcbiAgICAgICAgICAgICAgICBoci5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RIclwiKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0SXRlbVByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JlY2FzdEl0ZW1EYXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbVByb3BlcnR5LmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdEl0ZW1Qcm9wZXJ0eVwiKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1EYXRhLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdEl0ZW1EYXRhXCIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5ID09IFwiV2luZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbVByb3BlcnR5LmlubmVySFRNTCA9IGAke3Byb3BlcnR5fWA7XG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbURhdGEuaW5uZXJIVE1MID0gYCR7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlRGF0YVtwcm9wZXJ0eV0uc3BlZWRcbiAgICAgICAgICAgICAgICAgICAgfSAke2NvbnZlcnRXaW5kRGlyZWN0aW9uKHRpbGVEYXRhW3Byb3BlcnR5XS5kaXJlY3Rpb24pfWA7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmFwcGVuZENoaWxkKGZvcmVjYXN0SXRlbVByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmFwcGVuZENoaWxkKGZvcmVjYXN0SXRlbURhdGEpO1xuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uYXBwZW5kQ2hpbGQoaHIpO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0VGlsZVN1cHAuYXBwZW5kQ2hpbGQoZm9yZWNhc3RJdGVtKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1Qcm9wZXJ0eS5pbm5lckhUTUwgPSBgJHtwcm9wZXJ0eX1gO1xuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1EYXRhLmlubmVySFRNTCA9IGAke3RpbGVEYXRhW3Byb3BlcnR5XX1gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW1Qcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmFwcGVuZENoaWxkKGZvcmVjYXN0SXRlbURhdGEpO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChocik7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVTdXBwLmFwcGVuZENoaWxkKGZvcmVjYXN0SXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBleHBhbmRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBleHBhbmRCdG4uY2xhc3NMaXN0LmFkZChcImV4cGFuZEJ0blwiKTtcbiAgICAgICAgZXhwYW5kQnRuLmlubmVySFRNTCA9IFwiJiM4OTY0XCI7XG5cbiAgICAgICAgZXhwYW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBmb3JlY2FzdFRpbGUuY2xhc3NMaXN0LnRvZ2dsZShcImV4cGFuZEZvcmVjYXN0XCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3JlY2FzdFRpbGVNYWluLmFwcGVuZENoaWxkKGV4cGFuZEJ0bik7XG5cbiAgICAgICAgZm9yZWNhc3RUaWxlLmFwcGVuZENoaWxkKGZvcmVjYXN0VGlsZU1haW4pO1xuICAgICAgICBmb3JlY2FzdFRpbGUuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUaWxlU3VwcCk7XG5cbiAgICAgICAgZm9yZWNhc3QuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUaWxlKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7XG4gICAgcG9wdWxhdGVMb2NhdGlvbixcbiAgICBwb3B1bGF0ZUN1cnJlbnRXZWF0aGVyLFxuICAgIHBvcHVsYXRlQWlyUXVhbGl0eSxcbiAgICBwb3B1bGF0ZUZvcmVjYXN0LFxufTtcbiIsIi8vIFV0aWxpdHkgZnVuY3Rpb25zIGZvciBXZWF0aGVyQXBwXG5cbmZ1bmN0aW9uIGNvbnZlcnRUaW1lKHRpbWV6b25lLCBob3VyLCBtaW51dGUpIHtcbiAgICAvLyBUYWtlcyB0aGUgaG91ciBpbiAyNGhyIHRpbWUgYW5kIGNvbnZlcnRzIGl0IHRvIDEyaHIgdGltZSB3aXRoIEFNIG9yIFBNXG4gICAgbGV0IG5ld1RpbWUgPSBcIlwiO1xuXG4gICAgY29uc3QgdGltZXpvbmVTaGlmdCA9IE1hdGguZmxvb3IodGltZXpvbmUgLyAzNjAwKTtcblxuICAgIGlmICghbWludXRlKSB7XG4gICAgICAgIGlmIChob3VyIDwgMTIpIHtcbiAgICAgICAgICAgIG5ld1RpbWUgPSBgJHsoaG91ciArIHRpbWV6b25lU2hpZnQpICUgMTIgfHwgMTJ9QU1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3VGltZSA9IGAkeyhob3VyICsgdGltZXpvbmVTaGlmdCkgJSAxMiB8fCAxMn1QTWA7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobWludXRlLnRvU3RyaW5nKCkubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIG1pbnV0ZSA9IFwiMFwiICsgbWludXRlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3VyIDwgMTIpIHtcbiAgICAgICAgICAgIG5ld1RpbWUgPSBgJHsoaG91ciArIHRpbWV6b25lU2hpZnQpICUgMTIgfHwgMTJ9OiR7bWludXRlfUFNYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1RpbWUgPSBgJHsoaG91ciArIHRpbWV6b25lU2hpZnQpICUgMTIgfHwgMTJ9OiR7bWludXRlfVBNYDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXdUaW1lO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0V2luZERpcmVjdGlvbihkZWcpIHtcbiAgICAvLyBDaGFuZ2UgaW4gZGlyZWN0aW9uIGV2ZXJ5IDIyLjUgZGVncmVlc1xuICAgIGNvbnN0IHZhbCA9IE1hdGguZmxvb3IoZGVnIC8gMjIuNSArIDAuNSk7XG4gICAgY29uc3QgY29tcGFzc0RpcmVjdGlvbnMgPSBbXG4gICAgICAgIFwiTlwiLFxuICAgICAgICBcIk5ORVwiLFxuICAgICAgICBcIk5FXCIsXG4gICAgICAgIFwiRU5FXCIsXG4gICAgICAgIFwiRVwiLFxuICAgICAgICBcIkVTRVwiLFxuICAgICAgICBcIlNFXCIsXG4gICAgICAgIFwiU1NFXCIsXG4gICAgICAgIFwiU1wiLFxuICAgICAgICBcIlNTV1wiLFxuICAgICAgICBcIlNXXCIsXG4gICAgICAgIFwiV1NXXCIsXG4gICAgICAgIFwiV1wiLFxuICAgICAgICBcIldOV1wiLFxuICAgICAgICBcIk5XXCIsXG4gICAgICAgIFwiTk5XXCIsXG4gICAgXTtcblxuICAgIGNvbnN0IGRpcmVjdGlvbiA9IGNvbXBhc3NEaXJlY3Rpb25zW3ZhbCAlIDE2XTtcblxuICAgIHJldHVybiBkaXJlY3Rpb247XG59XG5cbmZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlcnMocGhyYXNlKSB7XG4gICAgY29uc3Qgd29yZHMgPSBwaHJhc2Uuc3BsaXQoXCIgXCIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB3b3Jkc1tpXSA9IHdvcmRzW2ldWzBdLnRvVXBwZXJDYXNlKCkgKyB3b3Jkc1tpXS5zdWJzdHIoMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdvcmRzLmpvaW4oXCIgXCIpO1xufVxuXG5leHBvcnQgeyBjb252ZXJ0VGltZSwgY29udmVydFdpbmREaXJlY3Rpb24sIGNhcGl0YWxpemVGaXJzdExldHRlcnMgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gU291cmNlIGluZGV4IHNjcmlwdCBmb3IgV2VhdGhlciBBcHBcblxuaW1wb3J0IHsgZ2V0V2VhdGhlciwgZ2V0QWlyUXVhbGl0eSwgZ2V0Rm9yZWNhc3QgfSBmcm9tIFwiLi9hcGlGdW5jdGlvbnNcIjtcbmltcG9ydCB7XG4gICAgcG9wdWxhdGVMb2NhdGlvbixcbiAgICBwb3B1bGF0ZUN1cnJlbnRXZWF0aGVyLFxuICAgIHBvcHVsYXRlQWlyUXVhbGl0eSxcbiAgICBwb3B1bGF0ZUZvcmVjYXN0LFxufSBmcm9tIFwiLi9kb21GdW5jdGlvbnNcIjtcblxuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc1dlYXRoZXIobG9jYXRpb24pIHtcbiAgICAvLyBHZXRzIGRhdGEgZnJvbSBnZXQgd2VhdGhlciBhcGlGdW5jdGlvbnMgZnVuY3Rpb24gYW5kIGdhdGhlcnMgcmVsYXZlbnQgaW5mbyBmb3IgZGlzcGxheVxuICAgIC8vIE5lZWQgdG8gYWRkIHRyeS9jYXRjaCB0byBoYW5kbGUgZXJyb3JzXG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCBnZXRXZWF0aGVyKGxvY2F0aW9uKTtcblxuICAgIGNvbnNvbGUubG9nKHdlYXRoZXJEYXRhKTtcblxuICAgIGxldCBpbXBvcnRhbnREYXRhID0ge307XG5cbiAgICBpbXBvcnRhbnREYXRhLkxvY2F0aW9uID0gW3dlYXRoZXJEYXRhLm5hbWUsIHdlYXRoZXJEYXRhLnN5cy5jb3VudHJ5XTtcbiAgICBpbXBvcnRhbnREYXRhLkRhdGUgPSBbd2VhdGhlckRhdGEuZHQsIHdlYXRoZXJEYXRhLnRpbWV6b25lXTtcbiAgICBpbXBvcnRhbnREYXRhLlRlbXBlcmF0dXJlID0gYCR7d2VhdGhlckRhdGEubWFpbi50ZW1wfSAmIzg0NTFgO1xuICAgIGltcG9ydGFudERhdGFbXCJGZWVscyBMaWtlXCJdID0gYCR7d2VhdGhlckRhdGEubWFpbi5mZWVsc19saWtlfSAmIzg0NTFgO1xuICAgIGltcG9ydGFudERhdGEuSHVtaWRpdHkgPSBgJHt3ZWF0aGVyRGF0YS5tYWluLmh1bWlkaXR5fSAlYDtcbiAgICBpbXBvcnRhbnREYXRhLldpbmQgPSBbXG4gICAgICAgIGAke01hdGgucm91bmQod2VhdGhlckRhdGEud2luZC5zcGVlZCAqIDMuNiAqIDEwMCkgLyAxMDB9IGttL2hyYCxcbiAgICAgICAgd2VhdGhlckRhdGEud2luZC5kZWcsXG4gICAgXTtcblxuICAgIGlmICh3ZWF0aGVyRGF0YS53aW5kLmd1c3QpIHtcbiAgICAgICAgaW1wb3J0YW50RGF0YS5HdXN0ID0gYCR7XG4gICAgICAgICAgICBNYXRoLnJvdW5kKHdlYXRoZXJEYXRhLndpbmQuZ3VzdCAqIDMuNiAqIDEwMCkgLyAxMDBcbiAgICAgICAgfSBrbS9ocmA7XG4gICAgfVxuXG4gICAgaWYgKHdlYXRoZXJEYXRhLnJhaW4pIHtcbiAgICAgICAgaW1wb3J0YW50RGF0YS5SYWluID0gYCR7d2VhdGhlckRhdGEucmFpbltcIjFoXCJdfSBtbWA7XG4gICAgfVxuXG4gICAgaW1wb3J0YW50RGF0YS5Db25kaXRpb24gPSBbXG4gICAgICAgIHdlYXRoZXJEYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICAgIHdlYXRoZXJEYXRhLndlYXRoZXJbMF0uaWNvbixcbiAgICBdO1xuXG4gICAgLy8gRm9ybWF0IHRoaXMgb2JqZWN0IGJldHRlclxuICAgIC8vIE9iamVjdCBDb25zdHJ1Y3RvciBhbmQgY3JlYXRlIG1ldGhvZCB0byBjb252ZXJ0IHRvIGRpZmZlcmVudCB1bml0c1xuXG4gICAgcmV0dXJuIGltcG9ydGFudERhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NBaXJRdWFsaXR5KGxvY2F0aW9uKSB7XG4gICAgLy8gR2V0cyBkYXRhIGZyb20gYWlyIHF1YWxpdHkgYXBpRnVuY3Rpb25zIGZ1bmN0aW9uIGFuZCBnYXRoZXJzIHJlbGF2ZW50IGluZm8gZm9yIGRpc3BsYXlcblxuICAgIGNvbnN0IGFpclF1YWxpdHlEYXRhID0gYXdhaXQgZ2V0QWlyUXVhbGl0eShsb2NhdGlvbik7XG4gICAgY29uc29sZS5sb2coYWlyUXVhbGl0eURhdGEpO1xuXG4gICAgbGV0IGltcG9ydGFudERhdGEgPSB7fTtcblxuICAgIGltcG9ydGFudERhdGEuQVFJID0gYWlyUXVhbGl0eURhdGEubGlzdFswXS5tYWluLmFxaTtcbiAgICBpbXBvcnRhbnREYXRhLmNvbXBvbmVudHMgPSBhaXJRdWFsaXR5RGF0YS5saXN0WzBdLmNvbXBvbmVudHM7XG5cbiAgICByZXR1cm4gaW1wb3J0YW50RGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc0ZvcmVjYXN0KGxvY2F0aW9uKSB7XG4gICAgLy8gR2V0cyBkYXRhIGZyb20gZm9yZWNhc3QgYXBpRnVuY3Rpb25zIGZ1bmN0aW9uIGFuZCBnYXRoZXJzIHJlbGF2ZW50IGluZm8gZm9yIGRpc3BsYXlcblxuICAgIGNvbnN0IGZvcmVjYXN0RGF0YSA9IGF3YWl0IGdldEZvcmVjYXN0KGxvY2F0aW9uKTtcbiAgICBjb25zb2xlLmxvZyhmb3JlY2FzdERhdGEpO1xuXG4gICAgbGV0IGltcG9ydGFudERhdGEgPSBbXTtcblxuICAgIGZvciAoY29uc3QgaW5kZXggaW4gZm9yZWNhc3REYXRhLmxpc3QpIHtcbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF0gPSB7fTtcbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF0uRGF0ZSA9IFtcbiAgICAgICAgICAgIGZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS5kdCxcbiAgICAgICAgICAgIGZvcmVjYXN0RGF0YS5jaXR5LnRpbWV6b25lLFxuICAgICAgICBdO1xuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XS5Db25kaXRpb24gPSBbXG4gICAgICAgICAgICBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS53ZWF0aGVyWzBdLmljb24sXG4gICAgICAgIF07XG4gICAgICAgIGltcG9ydGFudERhdGFbXG4gICAgICAgICAgICBpbmRleFxuICAgICAgICBdLlRlbXBlcmF0dXJlID0gYCR7Zm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLm1haW4udGVtcH0gJiM4NDUxYDtcbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF0uUG9wID0gYCR7Zm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLnBvcCAqIDEwMH0gJWA7XG5cbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF1bXG4gICAgICAgICAgICBcIkZlZWxzIExpa2VcIlxuICAgICAgICBdID0gYCR7Zm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLm1haW4uZmVlbHNfbGlrZX0gJiM4NDUxYDtcbiAgICAgICAgaW1wb3J0YW50RGF0YVtcbiAgICAgICAgICAgIGluZGV4XG4gICAgICAgIF0uSHVtaWRpdHkgPSBgJHtmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ubWFpbi5odW1pZGl0eX0lYDtcblxuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XVtcbiAgICAgICAgICAgIFwiQ2xvdWQgQ292ZXJcIlxuICAgICAgICBdID0gYCR7Zm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLmNsb3Vkcy5hbGx9ICVgO1xuICAgICAgICBpbXBvcnRhbnREYXRhW1xuICAgICAgICAgICAgaW5kZXhcbiAgICAgICAgXS5WaXNpYmlsaXR5ID0gYCR7Zm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLnZpc2liaWxpdHl9IGttYDtcblxuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XS5XaW5kID0ge1xuICAgICAgICAgICAgc3BlZWQ6IGAke1xuICAgICAgICAgICAgICAgIE1hdGgucm91bmQoZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLndpbmQuc3BlZWQgKiAzLjYgKiAxMDApIC9cbiAgICAgICAgICAgICAgICAxMDBcbiAgICAgICAgICAgIH0ga20vaHJgLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ud2luZC5kZWcsXG4gICAgICAgIH07XG4gICAgICAgIGltcG9ydGFudERhdGFbaW5kZXhdLkd1c3QgPSBgJHtcbiAgICAgICAgICAgIE1hdGgucm91bmQoZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLndpbmQuZ3VzdCAqIDMuNiAqIDEwMCkgLyAxMDBcbiAgICAgICAgfSBrbS9ocmA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGltcG9ydGFudERhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NNYXAoKSB7XG4gICAgLy8gR2V0cyBkYXRhIGZyb20gbWFwIGFwaUZ1bmN0aW9ucyBmdW5jdGlvbiBhbmQgZ2F0aGVycyByZWxhdmVudCBpbmZvIGZvciBkaXNwbGF5XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWRQYWdlKGxvY2F0aW9uKSB7XG4gICAgLy8gQWRkIHNvbWUgdmlzdWFsIGluZGljYXRpb24gdGhhdCB3ZSdyZSB3YWl0aW5nIGZvciB0aGUgZGF0YSAocHJvbWlzZS5hbGwpIGJlZm9yZSBpdCBnZXRzIGRpc3BsYXllZCAoTWFwIHdvdWxkIGxpa2V5IHRha2UgdGhlIGxvbmdlc3QgdG8gZGlzcGxheSlcbiAgICAvL0NvdWxkIGFkZCBhIGNsYXNzIHRvIGNoYW5nZSB0aGUgZGlzcGxheSBwcmlvciB0byBwcm9taXNlLmFsbCBzaG93aW5nIHRoYXQgaXQncyBsb2FkaW5nLCBhbmQgcmVtb3ZlIGl0IHRvIHNob3cgZGF0YSBpZiBzdWNjZXNzZnVsIG9yIGRpc3BsYXkgYSBubyByZXN1bHRzIGZvdW5kIHBhZ2UgaWYgZXJyb3JcblxuICAgIC8vIFVzZSBhIHByb21pc2UuYWxsIHRvIHdhaXQgZm9yIGFsbCBwcm9jZXNzaW5nIHRvIGNvbXBsZXRlIGJlZm9yZSBkaXNwbGF5aW5nIGRhdGFcblxuICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgcHJvY2Vzc1dlYXRoZXIobG9jYXRpb24pLFxuICAgICAgICBwcm9jZXNzQWlyUXVhbGl0eShsb2NhdGlvbiksXG4gICAgICAgIHByb2Nlc3NGb3JlY2FzdChsb2NhdGlvbiksXG4gICAgXSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICBwb3B1bGF0ZUxvY2F0aW9uKGRhdGFbMF0pO1xuICAgICAgICBwb3B1bGF0ZUN1cnJlbnRXZWF0aGVyKGRhdGFbMF0pO1xuICAgICAgICBwb3B1bGF0ZUFpclF1YWxpdHkoZGF0YVsxXSk7XG4gICAgICAgIHBvcHVsYXRlRm9yZWNhc3QoZGF0YVsyXSk7XG4gICAgfSk7XG59XG5cbmNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VibWl0QnRuXCIpO1xuXG5zdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2hcIik7XG5cbiAgICBsb2FkUGFnZShzZWFyY2gudmFsdWUpO1xuXG4gICAgc2VhcmNoLnZhbHVlID0gXCJcIjtcbn0pO1xuXG5sb2FkUGFnZShcIkxvbmRvblwiKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==