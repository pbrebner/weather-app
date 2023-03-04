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
            const date = new Date(data[property] * 1000);
            const hour = date.getHours(date);
            const minute = date.getMinutes(date);

            const time = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.convertTime)(hour, minute);

            currentTime.innerHTML = time;
        } else if (property == "Temperature") {
            currentTemp.innerHTML = `${data[property]}`;
            // U+2109 for Fahrenheit
        } else if (property == "Condition") {
            currentConditionName.innerHTML = `${(0,_utils__WEBPACK_IMPORTED_MODULE_0__.capitalizeFirstLetters)(
                data[property]
            )}`;
            // Update the condition Icon according to name
            currentConditionIcon.src = "assets/cloud.png";
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
    const airQualityDisplay = document.querySelector(".airQualityDisplay");
    const airQualityHeader = document.querySelector(".airQualityHeader");
    const airQualityPara = document.querySelector(".airQualityPara");

    airQualityDisplay.innerHTML = "";
    airQualityHeader.innerHTML = "";
    airQualityPara.innerHTML = "";

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
        }
    }
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
                let date = new Date(tileData[property] * 1000);
                let hour = date.getHours(date);

                const time = document.createElement("div");
                time.innerHTML = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.convertTime)(hour);

                forecastTileMain.appendChild(time);
            } else if (property == "Condition") {
                const icon = document.createElement("img");
                icon.classList.add("forecastIcon");

                icon.src = "assets/cloud.png";

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
            forecastTile.classList.toggle("expand");
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

function convertTime(hour, minute) {
    // Takes the hour in 24hr time and converts it to 12hr time with AM or PM
    let newTime = "";

    if (!minute) {
        if (hour < 12) {
            newTime = `${hour % 12 || 12}AM`;
        } else {
            newTime = `${hour % 12 || 12}PM`;
        }
    } else {
        if (minute.toString().length == 1) {
            minute = "0" + minute;
        }
        if (hour < 12) {
            newTime = `${hour % 12 || 12}:${minute}AM`;
        } else {
            newTime = `${hour % 12 || 12}:${minute}PM`;
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
    importantData.Date = weatherData.dt;
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

    importantData.Condition = weatherData.weather[0].description;

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

    return importantData;
}

async function processForecast(location) {
    // Gets data from forecast apiFunctions function and gathers relavent info for display

    const forecastData = await (0,_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.getForecast)(location);
    console.log(forecastData);

    let importantData = [];

    for (const index in forecastData.list) {
        importantData[index] = {};
        importantData[index].Date = forecastData.list[index].dt;
        importantData[index].Condition =
            forecastData.list[index].weather[0].description;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBRUEsaUNBQWlDLDREQUFhO0FBQzlDOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwrQkFBK0IsMERBQVc7QUFDMUM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsb0NBQW9DO0FBQy9ELHNDQUFzQyxvQ0FBb0M7O0FBRTFFO0FBQ0E7QUFDQSxlQUFlLDBDQUEwQztBQUN6RDtBQUNBO0FBQ0Esd0JBQXdCLHVDQUF1Qzs7QUFFL0Q7QUFDQTtBQUNBLGVBQWUscUNBQXFDO0FBQ3BEO0FBQ0E7QUFDQSwwQkFBMEIscUNBQXFDOztBQUUvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwrREFBZ0I7QUFDeEIsUUFBUSxxRUFBc0I7QUFDOUIsUUFBUSxpRUFBa0I7QUFDMUIsUUFBUSwrREFBZ0I7QUFDeEIsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hcGlGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZG9tRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRnVuY3Rpb25zIHRvIGZldGNoIHdlYXRoZXIgZGF0YSB0aHJvdWdoIEFQSVxuXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyKGxvY2F0aW9uKSB7XG4gICAgY29uc3Qgd2VhdGhlclJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7bG9jYXRpb259JnVuaXRzPW1ldHJpYyZBUFBJRD02OWEwZmU5ZDg5YWEzYzU2MmMwOWE1MGZiZDUwNTA0NmBcbiAgICApO1xuXG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCB3ZWF0aGVyUmVzcG9uc2UuanNvbigpO1xuXG4gICAgcmV0dXJuIHdlYXRoZXJEYXRhO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRBaXJRdWFsaXR5KGxvY2F0aW9uKSB7XG4gICAgY29uc3Qgd2VhdGhlclJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7bG9jYXRpb259JnVuaXRzPW1ldHJpYyZBUFBJRD02OWEwZmU5ZDg5YWEzYzU2MmMwOWE1MGZiZDUwNTA0NmBcbiAgICApO1xuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgd2VhdGhlclJlc3BvbnNlLmpzb24oKTtcblxuICAgIGxldCBsYXQgPSB3ZWF0aGVyRGF0YS5jb29yZC5sYXQ7XG4gICAgbGV0IGxvbiA9IHdlYXRoZXJEYXRhLmNvb3JkLmxvbjtcblxuICAgIGNvbnN0IGFpclF1YWxpdHlSZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2Fpcl9wb2xsdXRpb24/bGF0PSR7bGF0fSZsb249JHtsb259JkFQUElEPTY5YTBmZTlkODlhYTNjNTYyYzA5YTUwZmJkNTA1MDQ2YFxuICAgICk7XG5cbiAgICBjb25zdCBhaXJRdWFsaXR5RGF0YSA9IGF3YWl0IGFpclF1YWxpdHlSZXNwb25zZS5qc29uKCk7XG5cbiAgICByZXR1cm4gYWlyUXVhbGl0eURhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEZvcmVjYXN0KGxvY2F0aW9uKSB7XG4gICAgY29uc3QgZm9yZWNhc3RSZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtsb2NhdGlvbn0mdW5pdHM9bWV0cmljJmFwcGlkPTY5YTBmZTlkODlhYTNjNTYyYzA5YTUwZmJkNTA1MDQ2YFxuICAgICk7XG5cbiAgICBjb25zdCBmb3JlY2FzdERhdGEgPSBhd2FpdCBmb3JlY2FzdFJlc3BvbnNlLmpzb24oKTtcblxuICAgIHJldHVybiBmb3JlY2FzdERhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJNYXAobG9jYXRpb24pIHt9XG5cbmV4cG9ydCB7IGdldFdlYXRoZXIsIGdldEFpclF1YWxpdHksIGdldEZvcmVjYXN0IH07XG4iLCIvLyBGdW5jdGlvbnMgdG8gY3JlYXRlIGFuZCBkaXNwbGF5IERPTSBlbGVtZW50c1xuXG5pbXBvcnQge1xuICAgIGNvbnZlcnRUaW1lLFxuICAgIGNvbnZlcnRXaW5kRGlyZWN0aW9uLFxuICAgIGNhcGl0YWxpemVGaXJzdExldHRlcnMsXG59IGZyb20gXCIuL3V0aWxzXCI7XG5cbmZ1bmN0aW9uIHBvcHVsYXRlTG9jYXRpb24oZGF0YSkge1xuICAgIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2NhdGlvblwiKTtcbiAgICBsb2NhdGlvbi5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBkYXRhKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0eSA9PSBcIkxvY2F0aW9uXCIpIHtcbiAgICAgICAgICAgIGxldCByZWdpb25OYW1lcyA9IG5ldyBJbnRsLkRpc3BsYXlOYW1lcyhbXCJlblwiXSwge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwicmVnaW9uXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBjb3VudHJ5ID0gcmVnaW9uTmFtZXMub2YoYCR7ZGF0YVtwcm9wZXJ0eV1bMV19YCk7XG5cbiAgICAgICAgICAgIGxvY2F0aW9uLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldWzBdfSwgJHtjb3VudHJ5fWA7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlQ3VycmVudFdlYXRoZXIoZGF0YSkge1xuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50VGltZVwiKTtcblxuICAgIGNvbnN0IGN1cnJlbnRXZWF0aGVyRGV0YWlscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIFwiLmN1cnJlbnRXZWF0aGVyRGV0YWlsc1wiXG4gICAgKTtcblxuICAgIGNvbnN0IGN1cnJlbnRDb25kaXRpb25JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgXCIuY3VycmVudENvbmRpdGlvbkljb25cIlxuICAgICk7XG4gICAgY29uc3QgY3VycmVudENvbmRpdGlvbk5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBcIi5jdXJyZW50Q29uZGl0aW9uTmFtZVwiXG4gICAgKTtcbiAgICBjb25zdCBjdXJyZW50VGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudFRlbXBcIik7XG5cbiAgICBjdXJyZW50V2VhdGhlckRldGFpbHMuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBjdXJyZW50VGVtcC5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBkYXRhKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0eSA9PSBcIkRhdGVcIikge1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGFbcHJvcGVydHldICogMTAwMCk7XG4gICAgICAgICAgICBjb25zdCBob3VyID0gZGF0ZS5nZXRIb3VycyhkYXRlKTtcbiAgICAgICAgICAgIGNvbnN0IG1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcyhkYXRlKTtcblxuICAgICAgICAgICAgY29uc3QgdGltZSA9IGNvbnZlcnRUaW1lKGhvdXIsIG1pbnV0ZSk7XG5cbiAgICAgICAgICAgIGN1cnJlbnRUaW1lLmlubmVySFRNTCA9IHRpbWU7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHkgPT0gXCJUZW1wZXJhdHVyZVwiKSB7XG4gICAgICAgICAgICBjdXJyZW50VGVtcC5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XX1gO1xuICAgICAgICAgICAgLy8gVSsyMTA5IGZvciBGYWhyZW5oZWl0XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHkgPT0gXCJDb25kaXRpb25cIikge1xuICAgICAgICAgICAgY3VycmVudENvbmRpdGlvbk5hbWUuaW5uZXJIVE1MID0gYCR7Y2FwaXRhbGl6ZUZpcnN0TGV0dGVycyhcbiAgICAgICAgICAgICAgICBkYXRhW3Byb3BlcnR5XVxuICAgICAgICAgICAgKX1gO1xuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBjb25kaXRpb24gSWNvbiBhY2NvcmRpbmcgdG8gbmFtZVxuICAgICAgICAgICAgY3VycmVudENvbmRpdGlvbkljb24uc3JjID0gXCJhc3NldHMvY2xvdWQucG5nXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB3ZWF0aGVySXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBjb25zdCBociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKTtcbiAgICAgICAgICAgIHdlYXRoZXJJdGVtLmNsYXNzTGlzdC5hZGQoXCJjdXJyZW50V2VhdGhlckl0ZW1cIik7XG5cbiAgICAgICAgICAgIGNvbnN0IHdlYXRoZXJJdGVtUHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgY29uc3Qgd2VhdGhlckl0ZW1EYXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICAgICAgaWYgKHByb3BlcnR5ID09IFwiTG9jYXRpb25cIikge1xuICAgICAgICAgICAgICAgIHdlYXRoZXJJdGVtUHJvcGVydHkuaW5uZXJIVE1MID0gYCR7cHJvcGVydHl9YDtcblxuICAgICAgICAgICAgICAgIGxldCByZWdpb25OYW1lcyA9IG5ldyBJbnRsLkRpc3BsYXlOYW1lcyhbXCJlblwiXSwge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInJlZ2lvblwiLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGxldCBjb3VudHJ5ID0gcmVnaW9uTmFtZXMub2YoYCR7ZGF0YVtwcm9wZXJ0eV1bMV19YCk7XG5cbiAgICAgICAgICAgICAgICB3ZWF0aGVySXRlbURhdGEuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV1bMF19LCAke2NvdW50cnl9YDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHkgPT0gXCJXaW5kXCIpIHtcbiAgICAgICAgICAgICAgICB3ZWF0aGVySXRlbVByb3BlcnR5LmlubmVySFRNTCA9IGAke3Byb3BlcnR5fWA7XG4gICAgICAgICAgICAgICAgd2VhdGhlckl0ZW1EYXRhLmlubmVySFRNTCA9IGAke1xuICAgICAgICAgICAgICAgICAgICBkYXRhW3Byb3BlcnR5XVswXVxuICAgICAgICAgICAgICAgIH0gJHtjb252ZXJ0V2luZERpcmVjdGlvbihkYXRhW3Byb3BlcnR5XVsxXSl9YDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2VhdGhlckl0ZW1Qcm9wZXJ0eS5pbm5lckhUTUwgPSBgJHtwcm9wZXJ0eX1gO1xuICAgICAgICAgICAgICAgIHdlYXRoZXJJdGVtRGF0YS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2VhdGhlckl0ZW0uYXBwZW5kQ2hpbGQod2VhdGhlckl0ZW1Qcm9wZXJ0eSk7XG4gICAgICAgICAgICB3ZWF0aGVySXRlbS5hcHBlbmRDaGlsZCh3ZWF0aGVySXRlbURhdGEpO1xuXG4gICAgICAgICAgICBjdXJyZW50V2VhdGhlckRldGFpbHMuYXBwZW5kQ2hpbGQod2VhdGhlckl0ZW0pO1xuICAgICAgICAgICAgY3VycmVudFdlYXRoZXJEZXRhaWxzLmFwcGVuZENoaWxkKGhyKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVBaXJRdWFsaXR5KGRhdGEpIHtcbiAgICBjb25zdCBhaXJRdWFsaXR5RGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlyUXVhbGl0eURpc3BsYXlcIik7XG4gICAgY29uc3QgYWlyUXVhbGl0eUhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlyUXVhbGl0eUhlYWRlclwiKTtcbiAgICBjb25zdCBhaXJRdWFsaXR5UGFyYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlyUXVhbGl0eVBhcmFcIik7XG5cbiAgICBhaXJRdWFsaXR5RGlzcGxheS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGFpclF1YWxpdHlIZWFkZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBhaXJRdWFsaXR5UGFyYS5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgY29uc3QgYWlyUXVhbGl0eURlc2NpcHRpb25zID0ge1xuICAgICAgICAxOiBbXG4gICAgICAgICAgICBcIkV4Y2VsbGVudFwiLFxuICAgICAgICAgICAgXCJUaGUgYWlyIHF1YWxpdHkgaXMgaWRlYWwgZm9yIG1vc3QgaW5kaXZpZHVhbHM7IEVuam95IHlvdXIgdXN1YWwgb3V0ZG9vciBhY3Rpdml0aWVzLlwiLFxuICAgICAgICBdLFxuICAgICAgICAyOiBbXG4gICAgICAgICAgICBcIkZhaXJcIixcbiAgICAgICAgICAgIFwiQWlyIHF1YWxpdHkgaXMgZmFpciBhbmQgaXMgbm90IGEgY29uY2VybiBmb3IgdGhlIGdlbmVyYWwgcHVibGljLiBObyBuZWVkIHRvIG1vZGlmeSB5b3VyIHVzdWFsIG91dGRvb3IgYWN0aXZpdGllcyB1bmxlc3MgeW91IGV4cGVyaWVuY2Ugc3ltcHRvbXMgc3VjaCBhcyBjb3VnaGluZyBhbmQgdGhyb2F0IGlycml0YXRpb24uXCIsXG4gICAgICAgIF0sXG4gICAgICAgIDM6IFtcbiAgICAgICAgICAgIFwiTW9kZXJhdGVcIixcbiAgICAgICAgICAgIFwiQWlyIHF1YWxpdHkgaXMgbW9kZXJhdGUgYW5kIHR5cGljYWxseSBzYWZlIGZvciB0aGUgZ2VuZXJhbCBwdWJsaWM7IENvbnNpZGVyIHJlZHVjaW5nIG9yIHJlc2NoZWR1bGluZyBzdHJlbnVvdXMgYWN0aXZpdGllcyBvdXRkb29ycyBpZiB5b3UgZXhwZXJpZW5jZSBzeW1wdG9tcyBzdWNoIGFzIGNvdWdoaW5nIGFuZCB0aHJvYXQgaXJyaXRhdGlvbi5cIixcbiAgICAgICAgXSxcbiAgICAgICAgNDogW1xuICAgICAgICAgICAgXCJQb29yXCIsXG4gICAgICAgICAgICBcIkFpciBxdWFsaXR5IGlzIHBvb3IgYW5kIHByZWNhdXRpb25zIHNob3VsZCBiZSBjb25zaWRlcmVkLiBSZWR1Y2Ugb3IgcmVzY2hlZHVsZSBzdHJlbnVvdXMgYWN0aXZpdGllcyBvdXRkb29ycy4gQ2hpbGRyZW4gYW5kIHRoZSBlbGRlcmx5IHNob3VsZCBhbHNvIHRha2UgaXQgZWFzeS5cIixcbiAgICAgICAgXSxcbiAgICAgICAgNTogW1xuICAgICAgICAgICAgXCJWZXJ5IFBvb3JcIixcbiAgICAgICAgICAgIFwiQWlyIHF1YWxpdHkgaXMgdmVyeSBwb29yOyBBdm9pZCBzdHJlbnVvdXMgYWN0aXZpdGllcyBvdXRkb29ycy4gQ2hpbGRyZW4gYW5kIHRoZSBlbGRlcmx5IHNob3VsZCBhbHNvIGF2b2lkIG91dGRvb3IgcGh5c2ljYWwgZXhlcnRpb24uXCIsXG4gICAgICAgIF0sXG4gICAgfTtcblxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZGF0YSkge1xuICAgICAgICBpZiAocHJvcGVydHkgPT0gXCJBUUlcIikge1xuICAgICAgICAgICAgYWlyUXVhbGl0eURpc3BsYXkuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV19IEFRSWA7XG5cbiAgICAgICAgICAgIGFpclF1YWxpdHlIZWFkZXIuaW5uZXJIVE1MID1cbiAgICAgICAgICAgICAgICBhaXJRdWFsaXR5RGVzY2lwdGlvbnNbYCR7ZGF0YVtwcm9wZXJ0eV19YF1bMF07XG4gICAgICAgICAgICBhaXJRdWFsaXR5UGFyYS5pbm5lckhUTUwgPVxuICAgICAgICAgICAgICAgIGFpclF1YWxpdHlEZXNjaXB0aW9uc1tgJHtkYXRhW3Byb3BlcnR5XX1gXVsxXTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVGb3JlY2FzdChkYXRhKSB7XG4gICAgY29uc3QgZm9yZWNhc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcmVjYXN0XCIpO1xuICAgIGZvcmVjYXN0LmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICBjb25zdCBmb3JlY2FzdFRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBmb3JlY2FzdFRpbGUuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0VGlsZVwiKTtcblxuICAgICAgICBjb25zdCBmb3JlY2FzdFRpbGVNYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY29uc3QgZm9yZWNhc3RUaWxlRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IGZvcmVjYXN0VGlsZVN1cHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICAgIGZvcmVjYXN0VGlsZU1haW4uY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0VGlsZU1haW5cIik7XG4gICAgICAgIGZvcmVjYXN0VGlsZURpc3BsYXkuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0VGlsZURpc3BsYXlcIik7XG4gICAgICAgIGZvcmVjYXN0VGlsZVN1cHAuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0VGlsZVN1cHBcIik7XG5cbiAgICAgICAgbGV0IHRpbGVEYXRhID0gZGF0YVtpXTtcblxuICAgICAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIHRpbGVEYXRhKSB7XG4gICAgICAgICAgICBpZiAocHJvcGVydHkgPT0gXCJEYXRlXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHRpbGVEYXRhW3Byb3BlcnR5XSAqIDEwMDApO1xuICAgICAgICAgICAgICAgIGxldCBob3VyID0gZGF0ZS5nZXRIb3VycyhkYXRlKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIHRpbWUuaW5uZXJIVE1MID0gY29udmVydFRpbWUoaG91cik7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVNYWluLmFwcGVuZENoaWxkKHRpbWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eSA9PSBcIkNvbmRpdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RJY29uXCIpO1xuXG4gICAgICAgICAgICAgICAgaWNvbi5zcmMgPSBcImFzc2V0cy9jbG91ZC5wbmdcIjtcblxuICAgICAgICAgICAgICAgIGZvcmVjYXN0VGlsZURpc3BsYXkuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BlcnR5ID09IFwiVGVtcGVyYXR1cmVcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRlbXAuaW5uZXJIVE1MID0gYCR7dGlsZURhdGFbcHJvcGVydHldfWA7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVEaXNwbGF5LmFwcGVuZENoaWxkKGZvcmVjYXN0VGVtcCk7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUaWxlTWFpbi5hcHBlbmRDaGlsZChmb3JlY2FzdFRpbGVEaXNwbGF5KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHkgPT0gXCJQb3BcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgICAgICAgICBwb3AuaW5uZXJIVE1MID0gYCR7dGlsZURhdGFbcHJvcGVydHldfSBwb3BgO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUaWxlTWFpbi5hcHBlbmRDaGlsZChwb3ApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JlY2FzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RJdGVtXCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgaHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIik7XG4gICAgICAgICAgICAgICAgaHIuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0SHJcIik7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmb3JlY2FzdEl0ZW1Qcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9yZWNhc3RJdGVtRGF0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1Qcm9wZXJ0eS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RJdGVtUHJvcGVydHlcIik7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtRGF0YS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RJdGVtRGF0YVwiKTtcblxuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PSBcIldpbmRcIikge1xuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1Qcm9wZXJ0eS5pbm5lckhUTUwgPSBgJHtwcm9wZXJ0eX1gO1xuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1EYXRhLmlubmVySFRNTCA9IGAke1xuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZURhdGFbcHJvcGVydHldLnNwZWVkXG4gICAgICAgICAgICAgICAgICAgIH0gJHtjb252ZXJ0V2luZERpcmVjdGlvbih0aWxlRGF0YVtwcm9wZXJ0eV0uZGlyZWN0aW9uKX1gO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW1Qcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW1EYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmFwcGVuZENoaWxkKGhyKTtcblxuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVTdXBwLmFwcGVuZENoaWxkKGZvcmVjYXN0SXRlbSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtUHJvcGVydHkuaW5uZXJIVE1MID0gYCR7cHJvcGVydHl9YDtcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtRGF0YS5pbm5lckhUTUwgPSBgJHt0aWxlRGF0YVtwcm9wZXJ0eV19YDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uYXBwZW5kQ2hpbGQoZm9yZWNhc3RJdGVtUHJvcGVydHkpO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW1EYXRhKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uYXBwZW5kQ2hpbGQoaHIpO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUaWxlU3VwcC5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZXhwYW5kQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgZXhwYW5kQnRuLmNsYXNzTGlzdC5hZGQoXCJleHBhbmRCdG5cIik7XG4gICAgICAgIGV4cGFuZEJ0bi5pbm5lckhUTUwgPSBcIiYjODk2NFwiO1xuXG4gICAgICAgIGV4cGFuZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZm9yZWNhc3RUaWxlLmNsYXNzTGlzdC50b2dnbGUoXCJleHBhbmRcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvcmVjYXN0VGlsZU1haW4uYXBwZW5kQ2hpbGQoZXhwYW5kQnRuKTtcblxuICAgICAgICBmb3JlY2FzdFRpbGUuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUaWxlTWFpbik7XG4gICAgICAgIGZvcmVjYXN0VGlsZS5hcHBlbmRDaGlsZChmb3JlY2FzdFRpbGVTdXBwKTtcblxuICAgICAgICBmb3JlY2FzdC5hcHBlbmRDaGlsZChmb3JlY2FzdFRpbGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBwb3B1bGF0ZUxvY2F0aW9uLFxuICAgIHBvcHVsYXRlQ3VycmVudFdlYXRoZXIsXG4gICAgcG9wdWxhdGVBaXJRdWFsaXR5LFxuICAgIHBvcHVsYXRlRm9yZWNhc3QsXG59O1xuIiwiLy8gVXRpbGl0eSBmdW5jdGlvbnMgZm9yIFdlYXRoZXJBcHBcblxuZnVuY3Rpb24gY29udmVydFRpbWUoaG91ciwgbWludXRlKSB7XG4gICAgLy8gVGFrZXMgdGhlIGhvdXIgaW4gMjRociB0aW1lIGFuZCBjb252ZXJ0cyBpdCB0byAxMmhyIHRpbWUgd2l0aCBBTSBvciBQTVxuICAgIGxldCBuZXdUaW1lID0gXCJcIjtcblxuICAgIGlmICghbWludXRlKSB7XG4gICAgICAgIGlmIChob3VyIDwgMTIpIHtcbiAgICAgICAgICAgIG5ld1RpbWUgPSBgJHtob3VyICUgMTIgfHwgMTJ9QU1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3VGltZSA9IGAke2hvdXIgJSAxMiB8fCAxMn1QTWA7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobWludXRlLnRvU3RyaW5nKCkubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIG1pbnV0ZSA9IFwiMFwiICsgbWludXRlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3VyIDwgMTIpIHtcbiAgICAgICAgICAgIG5ld1RpbWUgPSBgJHtob3VyICUgMTIgfHwgMTJ9OiR7bWludXRlfUFNYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1RpbWUgPSBgJHtob3VyICUgMTIgfHwgMTJ9OiR7bWludXRlfVBNYDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXdUaW1lO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0V2luZERpcmVjdGlvbihkZWcpIHtcbiAgICAvLyBDaGFuZ2UgaW4gZGlyZWN0aW9uIGV2ZXJ5IDIyLjUgZGVncmVlc1xuICAgIGNvbnN0IHZhbCA9IE1hdGguZmxvb3IoZGVnIC8gMjIuNSArIDAuNSk7XG4gICAgY29uc3QgY29tcGFzc0RpcmVjdGlvbnMgPSBbXG4gICAgICAgIFwiTlwiLFxuICAgICAgICBcIk5ORVwiLFxuICAgICAgICBcIk5FXCIsXG4gICAgICAgIFwiRU5FXCIsXG4gICAgICAgIFwiRVwiLFxuICAgICAgICBcIkVTRVwiLFxuICAgICAgICBcIlNFXCIsXG4gICAgICAgIFwiU1NFXCIsXG4gICAgICAgIFwiU1wiLFxuICAgICAgICBcIlNTV1wiLFxuICAgICAgICBcIlNXXCIsXG4gICAgICAgIFwiV1NXXCIsXG4gICAgICAgIFwiV1wiLFxuICAgICAgICBcIldOV1wiLFxuICAgICAgICBcIk5XXCIsXG4gICAgICAgIFwiTk5XXCIsXG4gICAgXTtcblxuICAgIGNvbnN0IGRpcmVjdGlvbiA9IGNvbXBhc3NEaXJlY3Rpb25zW3ZhbCAlIDE2XTtcblxuICAgIHJldHVybiBkaXJlY3Rpb247XG59XG5cbmZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlcnMocGhyYXNlKSB7XG4gICAgY29uc3Qgd29yZHMgPSBwaHJhc2Uuc3BsaXQoXCIgXCIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB3b3Jkc1tpXSA9IHdvcmRzW2ldWzBdLnRvVXBwZXJDYXNlKCkgKyB3b3Jkc1tpXS5zdWJzdHIoMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdvcmRzLmpvaW4oXCIgXCIpO1xufVxuXG5leHBvcnQgeyBjb252ZXJ0VGltZSwgY29udmVydFdpbmREaXJlY3Rpb24sIGNhcGl0YWxpemVGaXJzdExldHRlcnMgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gU291cmNlIGluZGV4IHNjcmlwdCBmb3IgV2VhdGhlciBBcHBcblxuaW1wb3J0IHsgZ2V0V2VhdGhlciwgZ2V0QWlyUXVhbGl0eSwgZ2V0Rm9yZWNhc3QgfSBmcm9tIFwiLi9hcGlGdW5jdGlvbnNcIjtcbmltcG9ydCB7XG4gICAgcG9wdWxhdGVMb2NhdGlvbixcbiAgICBwb3B1bGF0ZUN1cnJlbnRXZWF0aGVyLFxuICAgIHBvcHVsYXRlQWlyUXVhbGl0eSxcbiAgICBwb3B1bGF0ZUZvcmVjYXN0LFxufSBmcm9tIFwiLi9kb21GdW5jdGlvbnNcIjtcblxuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc1dlYXRoZXIobG9jYXRpb24pIHtcbiAgICAvLyBHZXRzIGRhdGEgZnJvbSBnZXQgd2VhdGhlciBhcGlGdW5jdGlvbnMgZnVuY3Rpb24gYW5kIGdhdGhlcnMgcmVsYXZlbnQgaW5mbyBmb3IgZGlzcGxheVxuICAgIC8vIE5lZWQgdG8gYWRkIHRyeS9jYXRjaCB0byBoYW5kbGUgZXJyb3JzXG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCBnZXRXZWF0aGVyKGxvY2F0aW9uKTtcblxuICAgIGNvbnNvbGUubG9nKHdlYXRoZXJEYXRhKTtcblxuICAgIGxldCBpbXBvcnRhbnREYXRhID0ge307XG5cbiAgICBpbXBvcnRhbnREYXRhLkxvY2F0aW9uID0gW3dlYXRoZXJEYXRhLm5hbWUsIHdlYXRoZXJEYXRhLnN5cy5jb3VudHJ5XTtcbiAgICBpbXBvcnRhbnREYXRhLkRhdGUgPSB3ZWF0aGVyRGF0YS5kdDtcbiAgICBpbXBvcnRhbnREYXRhLlRlbXBlcmF0dXJlID0gYCR7d2VhdGhlckRhdGEubWFpbi50ZW1wfSAmIzg0NTFgO1xuICAgIGltcG9ydGFudERhdGFbXCJGZWVscyBMaWtlXCJdID0gYCR7d2VhdGhlckRhdGEubWFpbi5mZWVsc19saWtlfSAmIzg0NTFgO1xuICAgIGltcG9ydGFudERhdGEuSHVtaWRpdHkgPSBgJHt3ZWF0aGVyRGF0YS5tYWluLmh1bWlkaXR5fSAlYDtcbiAgICBpbXBvcnRhbnREYXRhLldpbmQgPSBbXG4gICAgICAgIGAke01hdGgucm91bmQod2VhdGhlckRhdGEud2luZC5zcGVlZCAqIDMuNiAqIDEwMCkgLyAxMDB9IGttL2hyYCxcbiAgICAgICAgd2VhdGhlckRhdGEud2luZC5kZWcsXG4gICAgXTtcblxuICAgIGlmICh3ZWF0aGVyRGF0YS53aW5kLmd1c3QpIHtcbiAgICAgICAgaW1wb3J0YW50RGF0YS5HdXN0ID0gYCR7XG4gICAgICAgICAgICBNYXRoLnJvdW5kKHdlYXRoZXJEYXRhLndpbmQuZ3VzdCAqIDMuNiAqIDEwMCkgLyAxMDBcbiAgICAgICAgfSBrbS9ocmA7XG4gICAgfVxuXG4gICAgaWYgKHdlYXRoZXJEYXRhLnJhaW4pIHtcbiAgICAgICAgaW1wb3J0YW50RGF0YS5SYWluID0gYCR7d2VhdGhlckRhdGEucmFpbltcIjFoXCJdfSBtbWA7XG4gICAgfVxuXG4gICAgaW1wb3J0YW50RGF0YS5Db25kaXRpb24gPSB3ZWF0aGVyRGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuXG4gICAgLy8gRm9ybWF0IHRoaXMgb2JqZWN0IGJldHRlclxuICAgIC8vIE9iamVjdCBDb25zdHJ1Y3RvciBhbmQgY3JlYXRlIG1ldGhvZCB0byBjb252ZXJ0IHRvIGRpZmZlcmVudCB1bml0c1xuXG4gICAgcmV0dXJuIGltcG9ydGFudERhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NBaXJRdWFsaXR5KGxvY2F0aW9uKSB7XG4gICAgLy8gR2V0cyBkYXRhIGZyb20gYWlyIHF1YWxpdHkgYXBpRnVuY3Rpb25zIGZ1bmN0aW9uIGFuZCBnYXRoZXJzIHJlbGF2ZW50IGluZm8gZm9yIGRpc3BsYXlcblxuICAgIGNvbnN0IGFpclF1YWxpdHlEYXRhID0gYXdhaXQgZ2V0QWlyUXVhbGl0eShsb2NhdGlvbik7XG4gICAgY29uc29sZS5sb2coYWlyUXVhbGl0eURhdGEpO1xuXG4gICAgbGV0IGltcG9ydGFudERhdGEgPSB7fTtcblxuICAgIGltcG9ydGFudERhdGEuQVFJID0gYWlyUXVhbGl0eURhdGEubGlzdFswXS5tYWluLmFxaTtcblxuICAgIHJldHVybiBpbXBvcnRhbnREYXRhO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzRm9yZWNhc3QobG9jYXRpb24pIHtcbiAgICAvLyBHZXRzIGRhdGEgZnJvbSBmb3JlY2FzdCBhcGlGdW5jdGlvbnMgZnVuY3Rpb24gYW5kIGdhdGhlcnMgcmVsYXZlbnQgaW5mbyBmb3IgZGlzcGxheVxuXG4gICAgY29uc3QgZm9yZWNhc3REYXRhID0gYXdhaXQgZ2V0Rm9yZWNhc3QobG9jYXRpb24pO1xuICAgIGNvbnNvbGUubG9nKGZvcmVjYXN0RGF0YSk7XG5cbiAgICBsZXQgaW1wb3J0YW50RGF0YSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBpbmRleCBpbiBmb3JlY2FzdERhdGEubGlzdCkge1xuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XSA9IHt9O1xuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XS5EYXRlID0gZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLmR0O1xuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XS5Db25kaXRpb24gPVxuICAgICAgICAgICAgZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG4gICAgICAgIGltcG9ydGFudERhdGFbXG4gICAgICAgICAgICBpbmRleFxuICAgICAgICBdLlRlbXBlcmF0dXJlID0gYCR7Zm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLm1haW4udGVtcH0gJiM4NDUxYDtcbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF0uUG9wID0gYCR7Zm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLnBvcCAqIDEwMH0gJWA7XG5cbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF1bXG4gICAgICAgICAgICBcIkZlZWxzIExpa2VcIlxuICAgICAgICBdID0gYCR7Zm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLm1haW4uZmVlbHNfbGlrZX0gJiM4NDUxYDtcbiAgICAgICAgaW1wb3J0YW50RGF0YVtcbiAgICAgICAgICAgIGluZGV4XG4gICAgICAgIF0uSHVtaWRpdHkgPSBgJHtmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ubWFpbi5odW1pZGl0eX0lYDtcblxuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XVtcbiAgICAgICAgICAgIFwiQ2xvdWQgQ292ZXJcIlxuICAgICAgICBdID0gYCR7Zm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLmNsb3Vkcy5hbGx9ICVgO1xuICAgICAgICBpbXBvcnRhbnREYXRhW1xuICAgICAgICAgICAgaW5kZXhcbiAgICAgICAgXS5WaXNpYmlsaXR5ID0gYCR7Zm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLnZpc2liaWxpdHl9IGttYDtcblxuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XS5XaW5kID0ge1xuICAgICAgICAgICAgc3BlZWQ6IGAke1xuICAgICAgICAgICAgICAgIE1hdGgucm91bmQoZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLndpbmQuc3BlZWQgKiAzLjYgKiAxMDApIC9cbiAgICAgICAgICAgICAgICAxMDBcbiAgICAgICAgICAgIH0ga20vaHJgLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ud2luZC5kZWcsXG4gICAgICAgIH07XG4gICAgICAgIGltcG9ydGFudERhdGFbaW5kZXhdLkd1c3QgPSBgJHtcbiAgICAgICAgICAgIE1hdGgucm91bmQoZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLndpbmQuZ3VzdCAqIDMuNiAqIDEwMCkgLyAxMDBcbiAgICAgICAgfSBrbS9ocmA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGltcG9ydGFudERhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NNYXAoKSB7XG4gICAgLy8gR2V0cyBkYXRhIGZyb20gbWFwIGFwaUZ1bmN0aW9ucyBmdW5jdGlvbiBhbmQgZ2F0aGVycyByZWxhdmVudCBpbmZvIGZvciBkaXNwbGF5XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWRQYWdlKGxvY2F0aW9uKSB7XG4gICAgLy8gQWRkIHNvbWUgdmlzdWFsIGluZGljYXRpb24gdGhhdCB3ZSdyZSB3YWl0aW5nIGZvciB0aGUgZGF0YSAocHJvbWlzZS5hbGwpIGJlZm9yZSBpdCBnZXRzIGRpc3BsYXllZCAoTWFwIHdvdWxkIGxpa2V5IHRha2UgdGhlIGxvbmdlc3QgdG8gZGlzcGxheSlcbiAgICAvL0NvdWxkIGFkZCBhIGNsYXNzIHRvIGNoYW5nZSB0aGUgZGlzcGxheSBwcmlvciB0byBwcm9taXNlLmFsbCBzaG93aW5nIHRoYXQgaXQncyBsb2FkaW5nLCBhbmQgcmVtb3ZlIGl0IHRvIHNob3cgZGF0YSBpZiBzdWNjZXNzZnVsIG9yIGRpc3BsYXkgYSBubyByZXN1bHRzIGZvdW5kIHBhZ2UgaWYgZXJyb3JcblxuICAgIC8vIFVzZSBhIHByb21pc2UuYWxsIHRvIHdhaXQgZm9yIGFsbCBwcm9jZXNzaW5nIHRvIGNvbXBsZXRlIGJlZm9yZSBkaXNwbGF5aW5nIGRhdGFcblxuICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgcHJvY2Vzc1dlYXRoZXIobG9jYXRpb24pLFxuICAgICAgICBwcm9jZXNzQWlyUXVhbGl0eShsb2NhdGlvbiksXG4gICAgICAgIHByb2Nlc3NGb3JlY2FzdChsb2NhdGlvbiksXG4gICAgXSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICBwb3B1bGF0ZUxvY2F0aW9uKGRhdGFbMF0pO1xuICAgICAgICBwb3B1bGF0ZUN1cnJlbnRXZWF0aGVyKGRhdGFbMF0pO1xuICAgICAgICBwb3B1bGF0ZUFpclF1YWxpdHkoZGF0YVsxXSk7XG4gICAgICAgIHBvcHVsYXRlRm9yZWNhc3QoZGF0YVsyXSk7XG4gICAgfSk7XG59XG5cbmNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VibWl0QnRuXCIpO1xuXG5zdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2hcIik7XG5cbiAgICBsb2FkUGFnZShzZWFyY2gudmFsdWUpO1xuXG4gICAgc2VhcmNoLnZhbHVlID0gXCJcIjtcbn0pO1xuXG5sb2FkUGFnZShcIkxvbmRvblwiKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==