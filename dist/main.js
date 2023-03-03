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
            currentTemp.innerHTML = `${data[property]} &#8451`;
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

                forecastTemp.innerHTML = `${tileData[property]} &#8451`;

                forecastTileDisplay.appendChild(forecastTemp);
                forecastTileMain.appendChild(forecastTileDisplay);
            } else if (property == "Pop") {
                const pop = document.createElement("div");

                pop.innerHTML = `${tileData[property]}% pop`;

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
    // Need to add try/catch to handle errors
    const weatherData = await (0,_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.getWeather)(location);

    console.log(weatherData);

    let importantData = {};

    importantData.Location = [weatherData.name, weatherData.sys.country];
    importantData.Date = weatherData.dt;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsK0RBQWdCO0FBQ3hCLFFBQVEscUVBQXNCO0FBQzlCLFFBQVEsaUVBQWtCO0FBQzFCLFFBQVEsK0RBQWdCO0FBQ3hCLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDQUFDOztBQUVEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYXBpRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2RvbUZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEZ1bmN0aW9ucyB0byBmZXRjaCB3ZWF0aGVyIGRhdGEgdGhyb3VnaCBBUElcblxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlcihsb2NhdGlvbikge1xuICAgIGNvbnN0IHdlYXRoZXJSZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2xvY2F0aW9ufSZ1bml0cz1tZXRyaWMmQVBQSUQ9NjlhMGZlOWQ4OWFhM2M1NjJjMDlhNTBmYmQ1MDUwNDZgXG4gICAgKTtcblxuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgd2VhdGhlclJlc3BvbnNlLmpzb24oKTtcblxuICAgIHJldHVybiB3ZWF0aGVyRGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0QWlyUXVhbGl0eShsb2NhdGlvbikge1xuICAgIGNvbnN0IHdlYXRoZXJSZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2xvY2F0aW9ufSZ1bml0cz1tZXRyaWMmQVBQSUQ9NjlhMGZlOWQ4OWFhM2M1NjJjMDlhNTBmYmQ1MDUwNDZgXG4gICAgKTtcbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHdlYXRoZXJSZXNwb25zZS5qc29uKCk7XG5cbiAgICBsZXQgbGF0ID0gd2VhdGhlckRhdGEuY29vcmQubGF0O1xuICAgIGxldCBsb24gPSB3ZWF0aGVyRGF0YS5jb29yZC5sb247XG5cbiAgICBjb25zdCBhaXJRdWFsaXR5UmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9haXJfcG9sbHV0aW9uP2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZBUFBJRD02OWEwZmU5ZDg5YWEzYzU2MmMwOWE1MGZiZDUwNTA0NmBcbiAgICApO1xuXG4gICAgY29uc3QgYWlyUXVhbGl0eURhdGEgPSBhd2FpdCBhaXJRdWFsaXR5UmVzcG9uc2UuanNvbigpO1xuXG4gICAgcmV0dXJuIGFpclF1YWxpdHlEYXRhO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRGb3JlY2FzdChsb2NhdGlvbikge1xuICAgIGNvbnN0IGZvcmVjYXN0UmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9xPSR7bG9jYXRpb259JnVuaXRzPW1ldHJpYyZhcHBpZD02OWEwZmU5ZDg5YWEzYzU2MmMwOWE1MGZiZDUwNTA0NmBcbiAgICApO1xuXG4gICAgY29uc3QgZm9yZWNhc3REYXRhID0gYXdhaXQgZm9yZWNhc3RSZXNwb25zZS5qc29uKCk7XG5cbiAgICByZXR1cm4gZm9yZWNhc3REYXRhO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyTWFwKGxvY2F0aW9uKSB7fVxuXG5leHBvcnQgeyBnZXRXZWF0aGVyLCBnZXRBaXJRdWFsaXR5LCBnZXRGb3JlY2FzdCB9O1xuIiwiLy8gRnVuY3Rpb25zIHRvIGNyZWF0ZSBhbmQgZGlzcGxheSBET00gZWxlbWVudHNcblxuaW1wb3J0IHtcbiAgICBjb252ZXJ0VGltZSxcbiAgICBjb252ZXJ0V2luZERpcmVjdGlvbixcbiAgICBjYXBpdGFsaXplRmlyc3RMZXR0ZXJzLFxufSBmcm9tIFwiLi91dGlsc1wiO1xuXG5mdW5jdGlvbiBwb3B1bGF0ZUxvY2F0aW9uKGRhdGEpIHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9jYXRpb25cIik7XG4gICAgbG9jYXRpb24uaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZGF0YSkge1xuICAgICAgICBpZiAocHJvcGVydHkgPT0gXCJMb2NhdGlvblwiKSB7XG4gICAgICAgICAgICBsZXQgcmVnaW9uTmFtZXMgPSBuZXcgSW50bC5EaXNwbGF5TmFtZXMoW1wiZW5cIl0sIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInJlZ2lvblwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgY291bnRyeSA9IHJlZ2lvbk5hbWVzLm9mKGAke2RhdGFbcHJvcGVydHldWzFdfWApO1xuXG4gICAgICAgICAgICBsb2NhdGlvbi5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XVswXX0sICR7Y291bnRyeX1gO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZUN1cnJlbnRXZWF0aGVyKGRhdGEpIHtcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudFRpbWVcIik7XG5cbiAgICBjb25zdCBjdXJyZW50V2VhdGhlckRldGFpbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBcIi5jdXJyZW50V2VhdGhlckRldGFpbHNcIlxuICAgICk7XG5cbiAgICBjb25zdCBjdXJyZW50Q29uZGl0aW9uSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIFwiLmN1cnJlbnRDb25kaXRpb25JY29uXCJcbiAgICApO1xuICAgIGNvbnN0IGN1cnJlbnRDb25kaXRpb25OYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgXCIuY3VycmVudENvbmRpdGlvbk5hbWVcIlxuICAgICk7XG4gICAgY29uc3QgY3VycmVudFRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnRUZW1wXCIpO1xuXG4gICAgY3VycmVudFdlYXRoZXJEZXRhaWxzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgY3VycmVudFRlbXAuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZGF0YSkge1xuICAgICAgICBpZiAocHJvcGVydHkgPT0gXCJEYXRlXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRhW3Byb3BlcnR5XSAqIDEwMDApO1xuICAgICAgICAgICAgY29uc3QgaG91ciA9IGRhdGUuZ2V0SG91cnMoZGF0ZSk7XG4gICAgICAgICAgICBjb25zdCBtaW51dGUgPSBkYXRlLmdldE1pbnV0ZXMoZGF0ZSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBjb252ZXJ0VGltZShob3VyLCBtaW51dGUpO1xuXG4gICAgICAgICAgICBjdXJyZW50VGltZS5pbm5lckhUTUwgPSB0aW1lO1xuICAgICAgICB9IGVsc2UgaWYgKHByb3BlcnR5ID09IFwiVGVtcGVyYXR1cmVcIikge1xuICAgICAgICAgICAgY3VycmVudFRlbXAuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV19ICYjODQ1MWA7XG4gICAgICAgICAgICAvLyBVKzIxMDkgZm9yIEZhaHJlbmhlaXRcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eSA9PSBcIkNvbmRpdGlvblwiKSB7XG4gICAgICAgICAgICBjdXJyZW50Q29uZGl0aW9uTmFtZS5pbm5lckhUTUwgPSBgJHtjYXBpdGFsaXplRmlyc3RMZXR0ZXJzKFxuICAgICAgICAgICAgICAgIGRhdGFbcHJvcGVydHldXG4gICAgICAgICAgICApfWA7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGNvbmRpdGlvbiBJY29uIGFjY29yZGluZyB0byBuYW1lXG4gICAgICAgICAgICBjdXJyZW50Q29uZGl0aW9uSWNvbi5zcmMgPSBcImFzc2V0cy9jbG91ZC5wbmdcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHdlYXRoZXJJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGNvbnN0IGhyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhyXCIpO1xuICAgICAgICAgICAgd2VhdGhlckl0ZW0uY2xhc3NMaXN0LmFkZChcImN1cnJlbnRXZWF0aGVySXRlbVwiKTtcblxuICAgICAgICAgICAgY29uc3Qgd2VhdGhlckl0ZW1Qcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBjb25zdCB3ZWF0aGVySXRlbURhdGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICAgICAgICBpZiAocHJvcGVydHkgPT0gXCJMb2NhdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgd2VhdGhlckl0ZW1Qcm9wZXJ0eS5pbm5lckhUTUwgPSBgJHtwcm9wZXJ0eX1gO1xuXG4gICAgICAgICAgICAgICAgbGV0IHJlZ2lvbk5hbWVzID0gbmV3IEludGwuRGlzcGxheU5hbWVzKFtcImVuXCJdLCB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicmVnaW9uXCIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbGV0IGNvdW50cnkgPSByZWdpb25OYW1lcy5vZihgJHtkYXRhW3Byb3BlcnR5XVsxXX1gKTtcblxuICAgICAgICAgICAgICAgIHdlYXRoZXJJdGVtRGF0YS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XVswXX0sICR7Y291bnRyeX1gO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3ZWF0aGVySXRlbVByb3BlcnR5LmlubmVySFRNTCA9IGAke3Byb3BlcnR5fWA7XG4gICAgICAgICAgICAgICAgd2VhdGhlckl0ZW1EYXRhLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3ZWF0aGVySXRlbS5hcHBlbmRDaGlsZCh3ZWF0aGVySXRlbVByb3BlcnR5KTtcbiAgICAgICAgICAgIHdlYXRoZXJJdGVtLmFwcGVuZENoaWxkKHdlYXRoZXJJdGVtRGF0YSk7XG5cbiAgICAgICAgICAgIGN1cnJlbnRXZWF0aGVyRGV0YWlscy5hcHBlbmRDaGlsZCh3ZWF0aGVySXRlbSk7XG4gICAgICAgICAgICBjdXJyZW50V2VhdGhlckRldGFpbHMuYXBwZW5kQ2hpbGQoaHIpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZUFpclF1YWxpdHkoZGF0YSkge1xuICAgIGNvbnN0IGFpclF1YWxpdHlEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5haXJRdWFsaXR5RGlzcGxheVwiKTtcbiAgICBjb25zdCBhaXJRdWFsaXR5SGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5haXJRdWFsaXR5SGVhZGVyXCIpO1xuICAgIGNvbnN0IGFpclF1YWxpdHlQYXJhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5haXJRdWFsaXR5UGFyYVwiKTtcblxuICAgIGFpclF1YWxpdHlEaXNwbGF5LmlubmVySFRNTCA9IFwiXCI7XG4gICAgYWlyUXVhbGl0eUhlYWRlci5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGFpclF1YWxpdHlQYXJhLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBjb25zdCBhaXJRdWFsaXR5RGVzY2lwdGlvbnMgPSB7XG4gICAgICAgIDE6IFtcbiAgICAgICAgICAgIFwiRXhjZWxsZW50XCIsXG4gICAgICAgICAgICBcIlRoZSBhaXIgcXVhbGl0eSBpcyBpZGVhbCBmb3IgbW9zdCBpbmRpdmlkdWFsczsgRW5qb3kgeW91ciB1c3VhbCBvdXRkb29yIGFjdGl2aXRpZXMuXCIsXG4gICAgICAgIF0sXG4gICAgICAgIDI6IFtcbiAgICAgICAgICAgIFwiRmFpclwiLFxuICAgICAgICAgICAgXCJBaXIgcXVhbGl0eSBpcyBmYWlyIGFuZCBpcyBub3QgYSBjb25jZXJuIGZvciB0aGUgZ2VuZXJhbCBwdWJsaWMuIE5vIG5lZWQgdG8gbW9kaWZ5IHlvdXIgdXN1YWwgb3V0ZG9vciBhY3Rpdml0aWVzIHVubGVzcyB5b3UgZXhwZXJpZW5jZSBzeW1wdG9tcyBzdWNoIGFzIGNvdWdoaW5nIGFuZCB0aHJvYXQgaXJyaXRhdGlvbi5cIixcbiAgICAgICAgXSxcbiAgICAgICAgMzogW1xuICAgICAgICAgICAgXCJNb2RlcmF0ZVwiLFxuICAgICAgICAgICAgXCJBaXIgcXVhbGl0eSBpcyBtb2RlcmF0ZSBhbmQgdHlwaWNhbGx5IHNhZmUgZm9yIHRoZSBnZW5lcmFsIHB1YmxpYzsgQ29uc2lkZXIgcmVkdWNpbmcgb3IgcmVzY2hlZHVsaW5nIHN0cmVudW91cyBhY3Rpdml0aWVzIG91dGRvb3JzIGlmIHlvdSBleHBlcmllbmNlIHN5bXB0b21zIHN1Y2ggYXMgY291Z2hpbmcgYW5kIHRocm9hdCBpcnJpdGF0aW9uLlwiLFxuICAgICAgICBdLFxuICAgICAgICA0OiBbXG4gICAgICAgICAgICBcIlBvb3JcIixcbiAgICAgICAgICAgIFwiQWlyIHF1YWxpdHkgaXMgcG9vciBhbmQgcHJlY2F1dGlvbnMgc2hvdWxkIGJlIGNvbnNpZGVyZWQuIFJlZHVjZSBvciByZXNjaGVkdWxlIHN0cmVudW91cyBhY3Rpdml0aWVzIG91dGRvb3JzLiBDaGlsZHJlbiBhbmQgdGhlIGVsZGVybHkgc2hvdWxkIGFsc28gdGFrZSBpdCBlYXN5LlwiLFxuICAgICAgICBdLFxuICAgICAgICA1OiBbXG4gICAgICAgICAgICBcIlZlcnkgUG9vclwiLFxuICAgICAgICAgICAgXCJBaXIgcXVhbGl0eSBpcyB2ZXJ5IHBvb3I7IEF2b2lkIHN0cmVudW91cyBhY3Rpdml0aWVzIG91dGRvb3JzLiBDaGlsZHJlbiBhbmQgdGhlIGVsZGVybHkgc2hvdWxkIGFsc28gYXZvaWQgb3V0ZG9vciBwaHlzaWNhbCBleGVydGlvbi5cIixcbiAgICAgICAgXSxcbiAgICB9O1xuXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBkYXRhKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0eSA9PSBcIkFRSVwiKSB7XG4gICAgICAgICAgICBhaXJRdWFsaXR5RGlzcGxheS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XX0gQVFJYDtcblxuICAgICAgICAgICAgYWlyUXVhbGl0eUhlYWRlci5pbm5lckhUTUwgPVxuICAgICAgICAgICAgICAgIGFpclF1YWxpdHlEZXNjaXB0aW9uc1tgJHtkYXRhW3Byb3BlcnR5XX1gXVswXTtcbiAgICAgICAgICAgIGFpclF1YWxpdHlQYXJhLmlubmVySFRNTCA9XG4gICAgICAgICAgICAgICAgYWlyUXVhbGl0eURlc2NpcHRpb25zW2Ake2RhdGFbcHJvcGVydHldfWBdWzFdO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZUZvcmVjYXN0KGRhdGEpIHtcbiAgICBjb25zdCBmb3JlY2FzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9yZWNhc3RcIik7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICBjb25zdCBmb3JlY2FzdFRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBmb3JlY2FzdFRpbGUuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0VGlsZVwiKTtcblxuICAgICAgICBjb25zdCBmb3JlY2FzdFRpbGVNYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY29uc3QgZm9yZWNhc3RUaWxlRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IGZvcmVjYXN0VGlsZVN1cHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICAgIGZvcmVjYXN0VGlsZU1haW4uY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0VGlsZU1haW5cIik7XG4gICAgICAgIGZvcmVjYXN0VGlsZURpc3BsYXkuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0VGlsZURpc3BsYXlcIik7XG4gICAgICAgIGZvcmVjYXN0VGlsZVN1cHAuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0VGlsZVN1cHBcIik7XG5cbiAgICAgICAgbGV0IHRpbGVEYXRhID0gZGF0YVtpXTtcblxuICAgICAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIHRpbGVEYXRhKSB7XG4gICAgICAgICAgICBpZiAocHJvcGVydHkgPT0gXCJEYXRlXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHRpbGVEYXRhW3Byb3BlcnR5XSAqIDEwMDApO1xuICAgICAgICAgICAgICAgIGxldCBob3VyID0gZGF0ZS5nZXRIb3VycyhkYXRlKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIHRpbWUuaW5uZXJIVE1MID0gY29udmVydFRpbWUoaG91cik7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVNYWluLmFwcGVuZENoaWxkKHRpbWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eSA9PSBcIkNvbmRpdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RJY29uXCIpO1xuXG4gICAgICAgICAgICAgICAgaWNvbi5zcmMgPSBcImFzc2V0cy9jbG91ZC5wbmdcIjtcblxuICAgICAgICAgICAgICAgIGZvcmVjYXN0VGlsZURpc3BsYXkuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BlcnR5ID09IFwiVGVtcGVyYXR1cmVcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRlbXAuaW5uZXJIVE1MID0gYCR7dGlsZURhdGFbcHJvcGVydHldfSAmIzg0NTFgO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUaWxlRGlzcGxheS5hcHBlbmRDaGlsZChmb3JlY2FzdFRlbXApO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0VGlsZU1haW4uYXBwZW5kQ2hpbGQoZm9yZWNhc3RUaWxlRGlzcGxheSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BlcnR5ID09IFwiUG9wXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICAgICAgICAgICAgcG9wLmlubmVySFRNTCA9IGAke3RpbGVEYXRhW3Byb3BlcnR5XX0lIHBvcGA7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVNYWluLmFwcGVuZENoaWxkKHBvcCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdEl0ZW1cIik7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKTtcbiAgICAgICAgICAgICAgICBoci5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RIclwiKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0SXRlbVByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JlY2FzdEl0ZW1EYXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbVByb3BlcnR5LmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdEl0ZW1Qcm9wZXJ0eVwiKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1EYXRhLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdEl0ZW1EYXRhXCIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5ID09IFwiV2luZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbVByb3BlcnR5LmlubmVySFRNTCA9IGAke3Byb3BlcnR5fWA7XG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbURhdGEuaW5uZXJIVE1MID0gYCR7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlRGF0YVtwcm9wZXJ0eV0uc3BlZWRcbiAgICAgICAgICAgICAgICAgICAgfSAke2NvbnZlcnRXaW5kRGlyZWN0aW9uKHRpbGVEYXRhW3Byb3BlcnR5XS5kaXJlY3Rpb24pfWA7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmFwcGVuZENoaWxkKGZvcmVjYXN0SXRlbVByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmFwcGVuZENoaWxkKGZvcmVjYXN0SXRlbURhdGEpO1xuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uYXBwZW5kQ2hpbGQoaHIpO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0VGlsZVN1cHAuYXBwZW5kQ2hpbGQoZm9yZWNhc3RJdGVtKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1Qcm9wZXJ0eS5pbm5lckhUTUwgPSBgJHtwcm9wZXJ0eX1gO1xuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1EYXRhLmlubmVySFRNTCA9IGAke3RpbGVEYXRhW3Byb3BlcnR5XX1gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW1Qcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmFwcGVuZENoaWxkKGZvcmVjYXN0SXRlbURhdGEpO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChocik7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVTdXBwLmFwcGVuZENoaWxkKGZvcmVjYXN0SXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBleHBhbmRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBleHBhbmRCdG4uY2xhc3NMaXN0LmFkZChcImV4cGFuZEJ0blwiKTtcbiAgICAgICAgZXhwYW5kQnRuLmlubmVySFRNTCA9IFwiJiM4OTY0XCI7XG5cbiAgICAgICAgZXhwYW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBmb3JlY2FzdFRpbGUuY2xhc3NMaXN0LnRvZ2dsZShcImV4cGFuZFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yZWNhc3RUaWxlTWFpbi5hcHBlbmRDaGlsZChleHBhbmRCdG4pO1xuXG4gICAgICAgIGZvcmVjYXN0VGlsZS5hcHBlbmRDaGlsZChmb3JlY2FzdFRpbGVNYWluKTtcbiAgICAgICAgZm9yZWNhc3RUaWxlLmFwcGVuZENoaWxkKGZvcmVjYXN0VGlsZVN1cHApO1xuXG4gICAgICAgIGZvcmVjYXN0LmFwcGVuZENoaWxkKGZvcmVjYXN0VGlsZSk7XG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIHBvcHVsYXRlTG9jYXRpb24sXG4gICAgcG9wdWxhdGVDdXJyZW50V2VhdGhlcixcbiAgICBwb3B1bGF0ZUFpclF1YWxpdHksXG4gICAgcG9wdWxhdGVGb3JlY2FzdCxcbn07XG4iLCIvLyBVdGlsaXR5IGZ1bmN0aW9ucyBmb3IgV2VhdGhlckFwcFxuXG5mdW5jdGlvbiBjb252ZXJ0VGltZShob3VyLCBtaW51dGUpIHtcbiAgICAvLyBUYWtlcyB0aGUgaG91ciBpbiAyNGhyIHRpbWUgYW5kIGNvbnZlcnRzIGl0IHRvIDEyaHIgdGltZSB3aXRoIEFNIG9yIFBNXG4gICAgbGV0IG5ld1RpbWUgPSBcIlwiO1xuXG4gICAgaWYgKCFtaW51dGUpIHtcbiAgICAgICAgaWYgKGhvdXIgPCAxMikge1xuICAgICAgICAgICAgbmV3VGltZSA9IGAke2hvdXIgJSAxMiB8fCAxMn1BTWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdUaW1lID0gYCR7aG91ciAlIDEyIHx8IDEyfVBNYDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChtaW51dGUudG9TdHJpbmcoKS5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgbWludXRlID0gXCIwXCIgKyBtaW51dGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhvdXIgPCAxMikge1xuICAgICAgICAgICAgbmV3VGltZSA9IGAke2hvdXIgJSAxMiB8fCAxMn06JHttaW51dGV9QU1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3VGltZSA9IGAke2hvdXIgJSAxMiB8fCAxMn06JHttaW51dGV9UE1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1RpbWU7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRXaW5kRGlyZWN0aW9uKGRlZykge1xuICAgIC8vIENoYW5nZSBpbiBkaXJlY3Rpb24gZXZlcnkgMjIuNSBkZWdyZWVzXG4gICAgY29uc3QgdmFsID0gTWF0aC5mbG9vcihkZWcgLyAyMi41ICsgMC41KTtcbiAgICBjb25zdCBjb21wYXNzRGlyZWN0aW9ucyA9IFtcbiAgICAgICAgXCJOXCIsXG4gICAgICAgIFwiTk5FXCIsXG4gICAgICAgIFwiTkVcIixcbiAgICAgICAgXCJFTkVcIixcbiAgICAgICAgXCJFXCIsXG4gICAgICAgIFwiRVNFXCIsXG4gICAgICAgIFwiU0VcIixcbiAgICAgICAgXCJTU0VcIixcbiAgICAgICAgXCJTXCIsXG4gICAgICAgIFwiU1NXXCIsXG4gICAgICAgIFwiU1dcIixcbiAgICAgICAgXCJXU1dcIixcbiAgICAgICAgXCJXXCIsXG4gICAgICAgIFwiV05XXCIsXG4gICAgICAgIFwiTldcIixcbiAgICAgICAgXCJOTldcIixcbiAgICBdO1xuXG4gICAgY29uc3QgZGlyZWN0aW9uID0gY29tcGFzc0RpcmVjdGlvbnNbdmFsICUgMTZdO1xuXG4gICAgcmV0dXJuIGRpcmVjdGlvbjtcbn1cblxuZnVuY3Rpb24gY2FwaXRhbGl6ZUZpcnN0TGV0dGVycyhwaHJhc2UpIHtcbiAgICBjb25zdCB3b3JkcyA9IHBocmFzZS5zcGxpdChcIiBcIik7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHdvcmRzW2ldID0gd29yZHNbaV1bMF0udG9VcHBlckNhc2UoKSArIHdvcmRzW2ldLnN1YnN0cigxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd29yZHMuam9pbihcIiBcIik7XG59XG5cbmV4cG9ydCB7IGNvbnZlcnRUaW1lLCBjb252ZXJ0V2luZERpcmVjdGlvbiwgY2FwaXRhbGl6ZUZpcnN0TGV0dGVycyB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTb3VyY2UgaW5kZXggc2NyaXB0IGZvciBXZWF0aGVyIEFwcFxuXG5pbXBvcnQgeyBnZXRXZWF0aGVyLCBnZXRBaXJRdWFsaXR5LCBnZXRGb3JlY2FzdCB9IGZyb20gXCIuL2FwaUZ1bmN0aW9uc1wiO1xuaW1wb3J0IHtcbiAgICBwb3B1bGF0ZUxvY2F0aW9uLFxuICAgIHBvcHVsYXRlQ3VycmVudFdlYXRoZXIsXG4gICAgcG9wdWxhdGVBaXJRdWFsaXR5LFxuICAgIHBvcHVsYXRlRm9yZWNhc3QsXG59IGZyb20gXCIuL2RvbUZ1bmN0aW9uc1wiO1xuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzV2VhdGhlcihsb2NhdGlvbikge1xuICAgIC8vIE5lZWQgdG8gYWRkIHRyeS9jYXRjaCB0byBoYW5kbGUgZXJyb3JzXG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCBnZXRXZWF0aGVyKGxvY2F0aW9uKTtcblxuICAgIGNvbnNvbGUubG9nKHdlYXRoZXJEYXRhKTtcblxuICAgIGxldCBpbXBvcnRhbnREYXRhID0ge307XG5cbiAgICBpbXBvcnRhbnREYXRhLkxvY2F0aW9uID0gW3dlYXRoZXJEYXRhLm5hbWUsIHdlYXRoZXJEYXRhLnN5cy5jb3VudHJ5XTtcbiAgICBpbXBvcnRhbnREYXRhLkRhdGUgPSB3ZWF0aGVyRGF0YS5kdDtcbiAgICBpbXBvcnRhbnREYXRhLlRlbXBlcmF0dXJlID0gd2VhdGhlckRhdGEubWFpbi50ZW1wO1xuICAgIGltcG9ydGFudERhdGFbXCJGZWVscyBMaWtlXCJdID0gd2VhdGhlckRhdGEubWFpbi5mZWVsc19saWtlO1xuICAgIGltcG9ydGFudERhdGEuSHVtaWRpdHkgPSB3ZWF0aGVyRGF0YS5tYWluLmh1bWlkaXR5O1xuICAgIGltcG9ydGFudERhdGEuV2luZHNwZWVkID0gd2VhdGhlckRhdGEud2luZC5zcGVlZDtcblxuICAgIGltcG9ydGFudERhdGEuQ29uZGl0aW9uID0gd2VhdGhlckRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcblxuICAgIC8vIEZvcm1hdCB0aGlzIG9iamVjdCBiZXR0ZXJcbiAgICAvLyBPYmplY3QgQ29uc3RydWN0b3I/XG5cbiAgICByZXR1cm4gaW1wb3J0YW50RGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc0FpclF1YWxpdHkobG9jYXRpb24pIHtcbiAgICAvLyBHZXRzIGRhdGEgZnJvbSBhaXIgcXVhbGl0eSBhcGlGdW5jdGlvbnMgZnVuY3Rpb24gYW5kIGdhdGhlcnMgcmVsYXZlbnQgaW5mbyBmb3IgZGlzcGxheVxuXG4gICAgY29uc3QgYWlyUXVhbGl0eURhdGEgPSBhd2FpdCBnZXRBaXJRdWFsaXR5KGxvY2F0aW9uKTtcbiAgICBjb25zb2xlLmxvZyhhaXJRdWFsaXR5RGF0YSk7XG5cbiAgICBsZXQgaW1wb3J0YW50RGF0YSA9IHt9O1xuXG4gICAgaW1wb3J0YW50RGF0YS5BUUkgPSBhaXJRdWFsaXR5RGF0YS5saXN0WzBdLm1haW4uYXFpO1xuXG4gICAgcmV0dXJuIGltcG9ydGFudERhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NGb3JlY2FzdChsb2NhdGlvbikge1xuICAgIC8vIEdldHMgZGF0YSBmcm9tIGZvcmVjYXN0IGFwaUZ1bmN0aW9ucyBmdW5jdGlvbiBhbmQgZ2F0aGVycyByZWxhdmVudCBpbmZvIGZvciBkaXNwbGF5XG5cbiAgICBjb25zdCBmb3JlY2FzdERhdGEgPSBhd2FpdCBnZXRGb3JlY2FzdChsb2NhdGlvbik7XG4gICAgY29uc29sZS5sb2coZm9yZWNhc3REYXRhKTtcblxuICAgIGxldCBpbXBvcnRhbnREYXRhID0gW107XG5cbiAgICBmb3IgKGNvbnN0IGluZGV4IGluIGZvcmVjYXN0RGF0YS5saXN0KSB7XG4gICAgICAgIGltcG9ydGFudERhdGFbaW5kZXhdID0ge307XG4gICAgICAgIGltcG9ydGFudERhdGFbaW5kZXhdLkRhdGUgPSBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0uZHQ7XG4gICAgICAgIGltcG9ydGFudERhdGFbaW5kZXhdLkNvbmRpdGlvbiA9XG4gICAgICAgICAgICBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF0uVGVtcGVyYXR1cmUgPSBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ubWFpbi50ZW1wO1xuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XS5Qb3AgPSBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ucG9wO1xuXG4gICAgICAgIGltcG9ydGFudERhdGFbaW5kZXhdW1wiRmVlbHMgTGlrZVwiXSA9XG4gICAgICAgICAgICBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ubWFpbi5mZWVsc19saWtlO1xuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XS5IdW1pZGl0eSA9IGZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS5tYWluLmh1bWlkaXR5O1xuXG4gICAgICAgIGltcG9ydGFudERhdGFbaW5kZXhdW1wiQ2xvdWQgQ292ZXJcIl0gPVxuICAgICAgICAgICAgZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLmNsb3Vkcy5hbGw7XG4gICAgICAgIGltcG9ydGFudERhdGFbaW5kZXhdLlZpc2liaWxpdHkgPSBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0udmlzaWJpbGl0eTtcblxuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XS5XaW5kID0ge1xuICAgICAgICAgICAgc3BlZWQ6IGZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS53aW5kLnNwZWVkLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ud2luZC5kZWcsXG4gICAgICAgIH07XG4gICAgICAgIGltcG9ydGFudERhdGFbaW5kZXhdLkd1c3QgPSBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ud2luZC5ndXN0O1xuICAgIH1cblxuICAgIHJldHVybiBpbXBvcnRhbnREYXRhO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzTWFwKCkge1xuICAgIC8vIEdldHMgZGF0YSBmcm9tIG1hcCBhcGlGdW5jdGlvbnMgZnVuY3Rpb24gYW5kIGdhdGhlcnMgcmVsYXZlbnQgaW5mbyBmb3IgZGlzcGxheVxufVxuXG5hc3luYyBmdW5jdGlvbiBsb2FkUGFnZShsb2NhdGlvbikge1xuICAgIC8vIEFkZCBzb21lIHZpc3VhbCBpbmRpY2F0aW9uIHRoYXQgd2UncmUgd2FpdGluZyBmb3IgdGhlIGRhdGEgKHByb21pc2UuYWxsKSBiZWZvcmUgaXQgZ2V0cyBkaXNwbGF5ZWQgKE1hcCB3b3VsZCBsaWtleSB0YWtlIHRoZSBsb25nZXN0IHRvIGRpc3BsYXkpXG4gICAgLy9Db3VsZCBhZGQgYSBjbGFzcyB0byBjaGFuZ2UgdGhlIGRpc3BsYXkgcHJpb3IgdG8gcHJvbWlzZS5hbGwgc2hvd2luZyB0aGF0IGl0J3MgbG9hZGluZywgYW5kIHJlbW92ZSBpdCB0byBzaG93IGRhdGEgaWYgc3VjY2Vzc2Z1bCBvciBkaXNwbGF5IGEgbm8gcmVzdWx0cyBmb3VuZCBwYWdlIGlmIGVycm9yXG5cbiAgICAvLyBVc2UgYSBwcm9taXNlLmFsbCB0byB3YWl0IGZvciBhbGwgcHJvY2Vzc2luZyB0byBjb21wbGV0ZSBiZWZvcmUgZGlzcGxheWluZyBkYXRhXG5cbiAgICBQcm9taXNlLmFsbChbXG4gICAgICAgIHByb2Nlc3NXZWF0aGVyKGxvY2F0aW9uKSxcbiAgICAgICAgcHJvY2Vzc0FpclF1YWxpdHkobG9jYXRpb24pLFxuICAgICAgICBwcm9jZXNzRm9yZWNhc3QobG9jYXRpb24pLFxuICAgIF0pLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgcG9wdWxhdGVMb2NhdGlvbihkYXRhWzBdKTtcbiAgICAgICAgcG9wdWxhdGVDdXJyZW50V2VhdGhlcihkYXRhWzBdKTtcbiAgICAgICAgcG9wdWxhdGVBaXJRdWFsaXR5KGRhdGFbMV0pO1xuICAgICAgICBwb3B1bGF0ZUZvcmVjYXN0KGRhdGFbMl0pO1xuICAgIH0pO1xufVxuXG5jb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Ym1pdEJ0blwiKTtcblxuc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoXCIpO1xuXG4gICAgbG9hZFBhZ2Uoc2VhcmNoLnZhbHVlKTtcblxuICAgIHNlYXJjaC52YWx1ZSA9IFwiXCI7XG59KTtcblxubG9hZFBhZ2UoXCJMb25kb25cIik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=