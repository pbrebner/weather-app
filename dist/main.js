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
        if (property == "Temperature") {
            currentTemp.innerHTML = `${data[property]} &#8451`;
            // U+2109 for Fahrenheit
        } else if (property == "Condition") {
            currentConditionName.innerHTML = `${(0,_utils__WEBPACK_IMPORTED_MODULE_0__.capitalizeFirstLetters)(
                data[property]
            )}`;
            // Update the condition Icon according to name
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

function convertTime(hour) {
    // Takes the hour in 24hr time and converts it to 12hr time with AM or PM
    let newTime = "";

    if (hour < 12) {
        newTime = `${hour % 12 || 12}AM`;
    } else {
        newTime = `${hour % 12 || 12}PM`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQzs7QUFFRCIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2FwaUZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9kb21GdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGdW5jdGlvbnMgdG8gZmV0Y2ggd2VhdGhlciBkYXRhIHRocm91Z2ggQVBJXG5cbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXIobG9jYXRpb24pIHtcbiAgICBjb25zdCB3ZWF0aGVyUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtsb2NhdGlvbn0mdW5pdHM9bWV0cmljJkFQUElEPTY5YTBmZTlkODlhYTNjNTYyYzA5YTUwZmJkNTA1MDQ2YFxuICAgICk7XG5cbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHdlYXRoZXJSZXNwb25zZS5qc29uKCk7XG5cbiAgICByZXR1cm4gd2VhdGhlckRhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEFpclF1YWxpdHkobG9jYXRpb24pIHtcbiAgICBjb25zdCB3ZWF0aGVyUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtsb2NhdGlvbn0mdW5pdHM9bWV0cmljJkFQUElEPTY5YTBmZTlkODlhYTNjNTYyYzA5YTUwZmJkNTA1MDQ2YFxuICAgICk7XG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCB3ZWF0aGVyUmVzcG9uc2UuanNvbigpO1xuXG4gICAgbGV0IGxhdCA9IHdlYXRoZXJEYXRhLmNvb3JkLmxhdDtcbiAgICBsZXQgbG9uID0gd2VhdGhlckRhdGEuY29vcmQubG9uO1xuXG4gICAgY29uc3QgYWlyUXVhbGl0eVJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvYWlyX3BvbGx1dGlvbj9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mQVBQSUQ9NjlhMGZlOWQ4OWFhM2M1NjJjMDlhNTBmYmQ1MDUwNDZgXG4gICAgKTtcblxuICAgIGNvbnN0IGFpclF1YWxpdHlEYXRhID0gYXdhaXQgYWlyUXVhbGl0eVJlc3BvbnNlLmpzb24oKTtcblxuICAgIHJldHVybiBhaXJRdWFsaXR5RGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0Rm9yZWNhc3QobG9jYXRpb24pIHtcbiAgICBjb25zdCBmb3JlY2FzdFJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT0ke2xvY2F0aW9ufSZ1bml0cz1tZXRyaWMmYXBwaWQ9NjlhMGZlOWQ4OWFhM2M1NjJjMDlhNTBmYmQ1MDUwNDZgXG4gICAgKTtcblxuICAgIGNvbnN0IGZvcmVjYXN0RGF0YSA9IGF3YWl0IGZvcmVjYXN0UmVzcG9uc2UuanNvbigpO1xuXG4gICAgcmV0dXJuIGZvcmVjYXN0RGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlck1hcChsb2NhdGlvbikge31cblxuZXhwb3J0IHsgZ2V0V2VhdGhlciwgZ2V0QWlyUXVhbGl0eSwgZ2V0Rm9yZWNhc3QgfTtcbiIsIi8vIEZ1bmN0aW9ucyB0byBjcmVhdGUgYW5kIGRpc3BsYXkgRE9NIGVsZW1lbnRzXG5cbmltcG9ydCB7XG4gICAgY29udmVydFRpbWUsXG4gICAgY29udmVydFdpbmREaXJlY3Rpb24sXG4gICAgY2FwaXRhbGl6ZUZpcnN0TGV0dGVycyxcbn0gZnJvbSBcIi4vdXRpbHNcIjtcblxuZnVuY3Rpb24gcG9wdWxhdGVMb2NhdGlvbihkYXRhKSB7XG4gICAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvY2F0aW9uXCIpO1xuICAgIGxvY2F0aW9uLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGRhdGEpIHtcbiAgICAgICAgaWYgKHByb3BlcnR5ID09IFwiTG9jYXRpb25cIikge1xuICAgICAgICAgICAgbGV0IHJlZ2lvbk5hbWVzID0gbmV3IEludGwuRGlzcGxheU5hbWVzKFtcImVuXCJdLCB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJyZWdpb25cIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IGNvdW50cnkgPSByZWdpb25OYW1lcy5vZihgJHtkYXRhW3Byb3BlcnR5XVsxXX1gKTtcblxuICAgICAgICAgICAgbG9jYXRpb24uaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV1bMF19LCAke2NvdW50cnl9YDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVDdXJyZW50V2VhdGhlcihkYXRhKSB7XG4gICAgY29uc3QgY3VycmVudFdlYXRoZXJEZXRhaWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgXCIuY3VycmVudFdlYXRoZXJEZXRhaWxzXCJcbiAgICApO1xuXG4gICAgY29uc3QgY3VycmVudENvbmRpdGlvbkljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBcIi5jdXJyZW50Q29uZGl0aW9uSWNvblwiXG4gICAgKTtcbiAgICBjb25zdCBjdXJyZW50Q29uZGl0aW9uTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIFwiLmN1cnJlbnRDb25kaXRpb25OYW1lXCJcbiAgICApO1xuICAgIGNvbnN0IGN1cnJlbnRUZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50VGVtcFwiKTtcblxuICAgIGN1cnJlbnRXZWF0aGVyRGV0YWlscy5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGN1cnJlbnRUZW1wLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGRhdGEpIHtcbiAgICAgICAgaWYgKHByb3BlcnR5ID09IFwiVGVtcGVyYXR1cmVcIikge1xuICAgICAgICAgICAgY3VycmVudFRlbXAuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV19ICYjODQ1MWA7XG4gICAgICAgICAgICAvLyBVKzIxMDkgZm9yIEZhaHJlbmhlaXRcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eSA9PSBcIkNvbmRpdGlvblwiKSB7XG4gICAgICAgICAgICBjdXJyZW50Q29uZGl0aW9uTmFtZS5pbm5lckhUTUwgPSBgJHtjYXBpdGFsaXplRmlyc3RMZXR0ZXJzKFxuICAgICAgICAgICAgICAgIGRhdGFbcHJvcGVydHldXG4gICAgICAgICAgICApfWA7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGNvbmRpdGlvbiBJY29uIGFjY29yZGluZyB0byBuYW1lXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB3ZWF0aGVySXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBjb25zdCBociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKTtcbiAgICAgICAgICAgIHdlYXRoZXJJdGVtLmNsYXNzTGlzdC5hZGQoXCJjdXJyZW50V2VhdGhlckl0ZW1cIik7XG5cbiAgICAgICAgICAgIGNvbnN0IHdlYXRoZXJJdGVtUHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgY29uc3Qgd2VhdGhlckl0ZW1EYXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICAgICAgaWYgKHByb3BlcnR5ID09IFwiTG9jYXRpb25cIikge1xuICAgICAgICAgICAgICAgIHdlYXRoZXJJdGVtUHJvcGVydHkuaW5uZXJIVE1MID0gYCR7cHJvcGVydHl9YDtcblxuICAgICAgICAgICAgICAgIGxldCByZWdpb25OYW1lcyA9IG5ldyBJbnRsLkRpc3BsYXlOYW1lcyhbXCJlblwiXSwge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInJlZ2lvblwiLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGxldCBjb3VudHJ5ID0gcmVnaW9uTmFtZXMub2YoYCR7ZGF0YVtwcm9wZXJ0eV1bMV19YCk7XG5cbiAgICAgICAgICAgICAgICB3ZWF0aGVySXRlbURhdGEuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV1bMF19LCAke2NvdW50cnl9YDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2VhdGhlckl0ZW1Qcm9wZXJ0eS5pbm5lckhUTUwgPSBgJHtwcm9wZXJ0eX1gO1xuICAgICAgICAgICAgICAgIHdlYXRoZXJJdGVtRGF0YS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2VhdGhlckl0ZW0uYXBwZW5kQ2hpbGQod2VhdGhlckl0ZW1Qcm9wZXJ0eSk7XG4gICAgICAgICAgICB3ZWF0aGVySXRlbS5hcHBlbmRDaGlsZCh3ZWF0aGVySXRlbURhdGEpO1xuXG4gICAgICAgICAgICBjdXJyZW50V2VhdGhlckRldGFpbHMuYXBwZW5kQ2hpbGQod2VhdGhlckl0ZW0pO1xuICAgICAgICAgICAgY3VycmVudFdlYXRoZXJEZXRhaWxzLmFwcGVuZENoaWxkKGhyKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVBaXJRdWFsaXR5KGRhdGEpIHtcbiAgICBjb25zdCBhaXJRdWFsaXR5RGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlyUXVhbGl0eURpc3BsYXlcIik7XG4gICAgY29uc3QgYWlyUXVhbGl0eUhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlyUXVhbGl0eUhlYWRlclwiKTtcbiAgICBjb25zdCBhaXJRdWFsaXR5UGFyYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlyUXVhbGl0eVBhcmFcIik7XG5cbiAgICBhaXJRdWFsaXR5RGlzcGxheS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGFpclF1YWxpdHlIZWFkZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBhaXJRdWFsaXR5UGFyYS5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgY29uc3QgYWlyUXVhbGl0eURlc2NpcHRpb25zID0ge1xuICAgICAgICAxOiBbXG4gICAgICAgICAgICBcIkV4Y2VsbGVudFwiLFxuICAgICAgICAgICAgXCJUaGUgYWlyIHF1YWxpdHkgaXMgaWRlYWwgZm9yIG1vc3QgaW5kaXZpZHVhbHM7IEVuam95IHlvdXIgdXN1YWwgb3V0ZG9vciBhY3Rpdml0aWVzLlwiLFxuICAgICAgICBdLFxuICAgICAgICAyOiBbXG4gICAgICAgICAgICBcIkZhaXJcIixcbiAgICAgICAgICAgIFwiQWlyIHF1YWxpdHkgaXMgZmFpciBhbmQgaXMgbm90IGEgY29uY2VybiBmb3IgdGhlIGdlbmVyYWwgcHVibGljLiBObyBuZWVkIHRvIG1vZGlmeSB5b3VyIHVzdWFsIG91dGRvb3IgYWN0aXZpdGllcyB1bmxlc3MgeW91IGV4cGVyaWVuY2Ugc3ltcHRvbXMgc3VjaCBhcyBjb3VnaGluZyBhbmQgdGhyb2F0IGlycml0YXRpb24uXCIsXG4gICAgICAgIF0sXG4gICAgICAgIDM6IFtcbiAgICAgICAgICAgIFwiTW9kZXJhdGVcIixcbiAgICAgICAgICAgIFwiQWlyIHF1YWxpdHkgaXMgbW9kZXJhdGUgYW5kIHR5cGljYWxseSBzYWZlIGZvciB0aGUgZ2VuZXJhbCBwdWJsaWM7IENvbnNpZGVyIHJlZHVjaW5nIG9yIHJlc2NoZWR1bGluZyBzdHJlbnVvdXMgYWN0aXZpdGllcyBvdXRkb29ycyBpZiB5b3UgZXhwZXJpZW5jZSBzeW1wdG9tcyBzdWNoIGFzIGNvdWdoaW5nIGFuZCB0aHJvYXQgaXJyaXRhdGlvbi5cIixcbiAgICAgICAgXSxcbiAgICAgICAgNDogW1xuICAgICAgICAgICAgXCJQb29yXCIsXG4gICAgICAgICAgICBcIkFpciBxdWFsaXR5IGlzIHBvb3IgYW5kIHByZWNhdXRpb25zIHNob3VsZCBiZSBjb25zaWRlcmVkLiBSZWR1Y2Ugb3IgcmVzY2hlZHVsZSBzdHJlbnVvdXMgYWN0aXZpdGllcyBvdXRkb29ycy4gQ2hpbGRyZW4gYW5kIHRoZSBlbGRlcmx5IHNob3VsZCBhbHNvIHRha2UgaXQgZWFzeS5cIixcbiAgICAgICAgXSxcbiAgICAgICAgNTogW1xuICAgICAgICAgICAgXCJWZXJ5IFBvb3JcIixcbiAgICAgICAgICAgIFwiQWlyIHF1YWxpdHkgaXMgdmVyeSBwb29yOyBBdm9pZCBzdHJlbnVvdXMgYWN0aXZpdGllcyBvdXRkb29ycy4gQ2hpbGRyZW4gYW5kIHRoZSBlbGRlcmx5IHNob3VsZCBhbHNvIGF2b2lkIG91dGRvb3IgcGh5c2ljYWwgZXhlcnRpb24uXCIsXG4gICAgICAgIF0sXG4gICAgfTtcblxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZGF0YSkge1xuICAgICAgICBpZiAocHJvcGVydHkgPT0gXCJBUUlcIikge1xuICAgICAgICAgICAgYWlyUXVhbGl0eURpc3BsYXkuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV19IEFRSWA7XG5cbiAgICAgICAgICAgIGFpclF1YWxpdHlIZWFkZXIuaW5uZXJIVE1MID1cbiAgICAgICAgICAgICAgICBhaXJRdWFsaXR5RGVzY2lwdGlvbnNbYCR7ZGF0YVtwcm9wZXJ0eV19YF1bMF07XG4gICAgICAgICAgICBhaXJRdWFsaXR5UGFyYS5pbm5lckhUTUwgPVxuICAgICAgICAgICAgICAgIGFpclF1YWxpdHlEZXNjaXB0aW9uc1tgJHtkYXRhW3Byb3BlcnR5XX1gXVsxXTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVGb3JlY2FzdChkYXRhKSB7XG4gICAgY29uc3QgZm9yZWNhc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcmVjYXN0XCIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgY29uc3QgZm9yZWNhc3RUaWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZm9yZWNhc3RUaWxlLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdFRpbGVcIik7XG5cbiAgICAgICAgY29uc3QgZm9yZWNhc3RUaWxlTWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IGZvcmVjYXN0VGlsZURpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb25zdCBmb3JlY2FzdFRpbGVTdXBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICBmb3JlY2FzdFRpbGVNYWluLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdFRpbGVNYWluXCIpO1xuICAgICAgICBmb3JlY2FzdFRpbGVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdFRpbGVEaXNwbGF5XCIpO1xuICAgICAgICBmb3JlY2FzdFRpbGVTdXBwLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdFRpbGVTdXBwXCIpO1xuXG4gICAgICAgIGxldCB0aWxlRGF0YSA9IGRhdGFbaV07XG5cbiAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiB0aWxlRGF0YSkge1xuICAgICAgICAgICAgaWYgKHByb3BlcnR5ID09IFwiRGF0ZVwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSh0aWxlRGF0YVtwcm9wZXJ0eV0gKiAxMDAwKTtcbiAgICAgICAgICAgICAgICBsZXQgaG91ciA9IGRhdGUuZ2V0SG91cnMoZGF0ZSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICB0aW1lLmlubmVySFRNTCA9IGNvbnZlcnRUaW1lKGhvdXIpO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUaWxlTWFpbi5hcHBlbmRDaGlsZCh0aW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHkgPT0gXCJDb25kaXRpb25cIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0SWNvblwiKTtcblxuICAgICAgICAgICAgICAgIGljb24uc3JjID0gXCJhc3NldHMvY2xvdWQucG5nXCI7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVEaXNwbGF5LmFwcGVuZENoaWxkKGljb24pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eSA9PSBcIlRlbXBlcmF0dXJlXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JlY2FzdFRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUZW1wLmlubmVySFRNTCA9IGAke3RpbGVEYXRhW3Byb3BlcnR5XX0gJiM4NDUxYDtcblxuICAgICAgICAgICAgICAgIGZvcmVjYXN0VGlsZURpc3BsYXkuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUZW1wKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVNYWluLmFwcGVuZENoaWxkKGZvcmVjYXN0VGlsZURpc3BsYXkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eSA9PSBcIlBvcFwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICAgICAgICAgIHBvcC5pbm5lckhUTUwgPSBgJHt0aWxlRGF0YVtwcm9wZXJ0eV19JSBwb3BgO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUaWxlTWFpbi5hcHBlbmRDaGlsZChwb3ApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JlY2FzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RJdGVtXCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgaHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIik7XG4gICAgICAgICAgICAgICAgaHIuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0SHJcIik7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmb3JlY2FzdEl0ZW1Qcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9yZWNhc3RJdGVtRGF0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1Qcm9wZXJ0eS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RJdGVtUHJvcGVydHlcIik7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtRGF0YS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RJdGVtRGF0YVwiKTtcblxuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PSBcIldpbmRcIikge1xuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1Qcm9wZXJ0eS5pbm5lckhUTUwgPSBgJHtwcm9wZXJ0eX1gO1xuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1EYXRhLmlubmVySFRNTCA9IGAke1xuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZURhdGFbcHJvcGVydHldLnNwZWVkXG4gICAgICAgICAgICAgICAgICAgIH0gJHtjb252ZXJ0V2luZERpcmVjdGlvbih0aWxlRGF0YVtwcm9wZXJ0eV0uZGlyZWN0aW9uKX1gO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW1Qcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW1EYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmFwcGVuZENoaWxkKGhyKTtcblxuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVTdXBwLmFwcGVuZENoaWxkKGZvcmVjYXN0SXRlbSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtUHJvcGVydHkuaW5uZXJIVE1MID0gYCR7cHJvcGVydHl9YDtcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtRGF0YS5pbm5lckhUTUwgPSBgJHt0aWxlRGF0YVtwcm9wZXJ0eV19YDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uYXBwZW5kQ2hpbGQoZm9yZWNhc3RJdGVtUHJvcGVydHkpO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW1EYXRhKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uYXBwZW5kQ2hpbGQoaHIpO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUaWxlU3VwcC5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZXhwYW5kQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgZXhwYW5kQnRuLmNsYXNzTGlzdC5hZGQoXCJleHBhbmRCdG5cIik7XG4gICAgICAgIGV4cGFuZEJ0bi5pbm5lckhUTUwgPSBcIiYjODk2NFwiO1xuXG4gICAgICAgIGV4cGFuZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZm9yZWNhc3RUaWxlLmNsYXNzTGlzdC50b2dnbGUoXCJleHBhbmRcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvcmVjYXN0VGlsZU1haW4uYXBwZW5kQ2hpbGQoZXhwYW5kQnRuKTtcblxuICAgICAgICBmb3JlY2FzdFRpbGUuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUaWxlTWFpbik7XG4gICAgICAgIGZvcmVjYXN0VGlsZS5hcHBlbmRDaGlsZChmb3JlY2FzdFRpbGVTdXBwKTtcblxuICAgICAgICBmb3JlY2FzdC5hcHBlbmRDaGlsZChmb3JlY2FzdFRpbGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBwb3B1bGF0ZUxvY2F0aW9uLFxuICAgIHBvcHVsYXRlQ3VycmVudFdlYXRoZXIsXG4gICAgcG9wdWxhdGVBaXJRdWFsaXR5LFxuICAgIHBvcHVsYXRlRm9yZWNhc3QsXG59O1xuIiwiLy8gVXRpbGl0eSBmdW5jdGlvbnMgZm9yIFdlYXRoZXJBcHBcblxuZnVuY3Rpb24gY29udmVydFRpbWUoaG91cikge1xuICAgIC8vIFRha2VzIHRoZSBob3VyIGluIDI0aHIgdGltZSBhbmQgY29udmVydHMgaXQgdG8gMTJociB0aW1lIHdpdGggQU0gb3IgUE1cbiAgICBsZXQgbmV3VGltZSA9IFwiXCI7XG5cbiAgICBpZiAoaG91ciA8IDEyKSB7XG4gICAgICAgIG5ld1RpbWUgPSBgJHtob3VyICUgMTIgfHwgMTJ9QU1gO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld1RpbWUgPSBgJHtob3VyICUgMTIgfHwgMTJ9UE1gO1xuICAgIH1cblxuICAgIHJldHVybiBuZXdUaW1lO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0V2luZERpcmVjdGlvbihkZWcpIHtcbiAgICAvLyBDaGFuZ2UgaW4gZGlyZWN0aW9uIGV2ZXJ5IDIyLjUgZGVncmVlc1xuICAgIGNvbnN0IHZhbCA9IE1hdGguZmxvb3IoZGVnIC8gMjIuNSArIDAuNSk7XG4gICAgY29uc3QgY29tcGFzc0RpcmVjdGlvbnMgPSBbXG4gICAgICAgIFwiTlwiLFxuICAgICAgICBcIk5ORVwiLFxuICAgICAgICBcIk5FXCIsXG4gICAgICAgIFwiRU5FXCIsXG4gICAgICAgIFwiRVwiLFxuICAgICAgICBcIkVTRVwiLFxuICAgICAgICBcIlNFXCIsXG4gICAgICAgIFwiU1NFXCIsXG4gICAgICAgIFwiU1wiLFxuICAgICAgICBcIlNTV1wiLFxuICAgICAgICBcIlNXXCIsXG4gICAgICAgIFwiV1NXXCIsXG4gICAgICAgIFwiV1wiLFxuICAgICAgICBcIldOV1wiLFxuICAgICAgICBcIk5XXCIsXG4gICAgICAgIFwiTk5XXCIsXG4gICAgXTtcblxuICAgIGNvbnN0IGRpcmVjdGlvbiA9IGNvbXBhc3NEaXJlY3Rpb25zW3ZhbCAlIDE2XTtcblxuICAgIHJldHVybiBkaXJlY3Rpb247XG59XG5cbmZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlcnMocGhyYXNlKSB7XG4gICAgY29uc3Qgd29yZHMgPSBwaHJhc2Uuc3BsaXQoXCIgXCIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB3b3Jkc1tpXSA9IHdvcmRzW2ldWzBdLnRvVXBwZXJDYXNlKCkgKyB3b3Jkc1tpXS5zdWJzdHIoMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdvcmRzLmpvaW4oXCIgXCIpO1xufVxuXG5leHBvcnQgeyBjb252ZXJ0VGltZSwgY29udmVydFdpbmREaXJlY3Rpb24sIGNhcGl0YWxpemVGaXJzdExldHRlcnMgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gU291cmNlIGluZGV4IHNjcmlwdCBmb3IgV2VhdGhlciBBcHBcblxuaW1wb3J0IHsgZ2V0V2VhdGhlciwgZ2V0QWlyUXVhbGl0eSwgZ2V0Rm9yZWNhc3QgfSBmcm9tIFwiLi9hcGlGdW5jdGlvbnNcIjtcbmltcG9ydCB7XG4gICAgcG9wdWxhdGVMb2NhdGlvbixcbiAgICBwb3B1bGF0ZUN1cnJlbnRXZWF0aGVyLFxuICAgIHBvcHVsYXRlQWlyUXVhbGl0eSxcbiAgICBwb3B1bGF0ZUZvcmVjYXN0LFxufSBmcm9tIFwiLi9kb21GdW5jdGlvbnNcIjtcblxuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc1dlYXRoZXIobG9jYXRpb24pIHtcbiAgICAvLyBOZWVkIHRvIGFkZCB0cnkvY2F0Y2ggdG8gaGFuZGxlIGVycm9yc1xuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgZ2V0V2VhdGhlcihsb2NhdGlvbik7XG5cbiAgICBjb25zb2xlLmxvZyh3ZWF0aGVyRGF0YSk7XG5cbiAgICBsZXQgaW1wb3J0YW50RGF0YSA9IHt9O1xuXG4gICAgaW1wb3J0YW50RGF0YS5Mb2NhdGlvbiA9IFt3ZWF0aGVyRGF0YS5uYW1lLCB3ZWF0aGVyRGF0YS5zeXMuY291bnRyeV07XG4gICAgaW1wb3J0YW50RGF0YS5UZW1wZXJhdHVyZSA9IHdlYXRoZXJEYXRhLm1haW4udGVtcDtcbiAgICBpbXBvcnRhbnREYXRhW1wiRmVlbHMgTGlrZVwiXSA9IHdlYXRoZXJEYXRhLm1haW4uZmVlbHNfbGlrZTtcbiAgICBpbXBvcnRhbnREYXRhLkh1bWlkaXR5ID0gd2VhdGhlckRhdGEubWFpbi5odW1pZGl0eTtcbiAgICBpbXBvcnRhbnREYXRhLldpbmRzcGVlZCA9IHdlYXRoZXJEYXRhLndpbmQuc3BlZWQ7XG5cbiAgICBpbXBvcnRhbnREYXRhLkNvbmRpdGlvbiA9IHdlYXRoZXJEYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG5cbiAgICAvLyBGb3JtYXQgdGhpcyBvYmplY3QgYmV0dGVyXG4gICAgLy8gT2JqZWN0IENvbnN0cnVjdG9yP1xuXG4gICAgcmV0dXJuIGltcG9ydGFudERhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NBaXJRdWFsaXR5KGxvY2F0aW9uKSB7XG4gICAgLy8gR2V0cyBkYXRhIGZyb20gYWlyIHF1YWxpdHkgYXBpRnVuY3Rpb25zIGZ1bmN0aW9uIGFuZCBnYXRoZXJzIHJlbGF2ZW50IGluZm8gZm9yIGRpc3BsYXlcblxuICAgIGNvbnN0IGFpclF1YWxpdHlEYXRhID0gYXdhaXQgZ2V0QWlyUXVhbGl0eShsb2NhdGlvbik7XG4gICAgY29uc29sZS5sb2coYWlyUXVhbGl0eURhdGEpO1xuXG4gICAgbGV0IGltcG9ydGFudERhdGEgPSB7fTtcblxuICAgIGltcG9ydGFudERhdGEuQVFJID0gYWlyUXVhbGl0eURhdGEubGlzdFswXS5tYWluLmFxaTtcblxuICAgIHJldHVybiBpbXBvcnRhbnREYXRhO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzRm9yZWNhc3QobG9jYXRpb24pIHtcbiAgICAvLyBHZXRzIGRhdGEgZnJvbSBmb3JlY2FzdCBhcGlGdW5jdGlvbnMgZnVuY3Rpb24gYW5kIGdhdGhlcnMgcmVsYXZlbnQgaW5mbyBmb3IgZGlzcGxheVxuXG4gICAgY29uc3QgZm9yZWNhc3REYXRhID0gYXdhaXQgZ2V0Rm9yZWNhc3QobG9jYXRpb24pO1xuICAgIGNvbnNvbGUubG9nKGZvcmVjYXN0RGF0YSk7XG5cbiAgICBsZXQgaW1wb3J0YW50RGF0YSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBpbmRleCBpbiBmb3JlY2FzdERhdGEubGlzdCkge1xuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XSA9IHt9O1xuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XS5EYXRlID0gZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLmR0O1xuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XS5Db25kaXRpb24gPVxuICAgICAgICAgICAgZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG4gICAgICAgIGltcG9ydGFudERhdGFbaW5kZXhdLlRlbXBlcmF0dXJlID0gZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLm1haW4udGVtcDtcbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF0uUG9wID0gZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLnBvcDtcblxuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XVtcIkZlZWxzIExpa2VcIl0gPVxuICAgICAgICAgICAgZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLm1haW4uZmVlbHNfbGlrZTtcbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF0uSHVtaWRpdHkgPSBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ubWFpbi5odW1pZGl0eTtcblxuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XVtcIkNsb3VkIENvdmVyXCJdID1cbiAgICAgICAgICAgIGZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS5jbG91ZHMuYWxsO1xuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XS5WaXNpYmlsaXR5ID0gZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLnZpc2liaWxpdHk7XG5cbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF0uV2luZCA9IHtcbiAgICAgICAgICAgIHNwZWVkOiBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ud2luZC5zcGVlZCxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLndpbmQuZGVnLFxuICAgICAgICB9O1xuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XS5HdXN0ID0gZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLndpbmQuZ3VzdDtcbiAgICB9XG5cbiAgICByZXR1cm4gaW1wb3J0YW50RGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc01hcCgpIHtcbiAgICAvLyBHZXRzIGRhdGEgZnJvbSBtYXAgYXBpRnVuY3Rpb25zIGZ1bmN0aW9uIGFuZCBnYXRoZXJzIHJlbGF2ZW50IGluZm8gZm9yIGRpc3BsYXlcbn1cblxuYXN5bmMgZnVuY3Rpb24gbG9hZFBhZ2UobG9jYXRpb24pIHtcbiAgICAvLyBBZGQgc29tZSB2aXN1YWwgaW5kaWNhdGlvbiB0aGF0IHdlJ3JlIHdhaXRpbmcgZm9yIHRoZSBkYXRhIChwcm9taXNlLmFsbCkgYmVmb3JlIGl0IGdldHMgZGlzcGxheWVkIChNYXAgd291bGQgbGlrZXkgdGFrZSB0aGUgbG9uZ2VzdCB0byBkaXNwbGF5KVxuICAgIC8vQ291bGQgYWRkIGEgY2xhc3MgdG8gY2hhbmdlIHRoZSBkaXNwbGF5IHByaW9yIHRvIHByb21pc2UuYWxsIHNob3dpbmcgdGhhdCBpdCdzIGxvYWRpbmcsIGFuZCByZW1vdmUgaXQgdG8gc2hvdyBkYXRhIGlmIHN1Y2Nlc3NmdWwgb3IgZGlzcGxheSBhIG5vIHJlc3VsdHMgZm91bmQgcGFnZSBpZiBlcnJvclxuXG4gICAgLy8gVXNlIGEgcHJvbWlzZS5hbGwgdG8gd2FpdCBmb3IgYWxsIHByb2Nlc3NpbmcgdG8gY29tcGxldGUgYmVmb3JlIGRpc3BsYXlpbmcgZGF0YVxuXG4gICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICBwcm9jZXNzV2VhdGhlcihsb2NhdGlvbiksXG4gICAgICAgIHByb2Nlc3NBaXJRdWFsaXR5KGxvY2F0aW9uKSxcbiAgICAgICAgcHJvY2Vzc0ZvcmVjYXN0KGxvY2F0aW9uKSxcbiAgICBdKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIHBvcHVsYXRlTG9jYXRpb24oZGF0YVswXSk7XG4gICAgICAgIHBvcHVsYXRlQ3VycmVudFdlYXRoZXIoZGF0YVswXSk7XG4gICAgICAgIHBvcHVsYXRlQWlyUXVhbGl0eShkYXRhWzFdKTtcbiAgICAgICAgcG9wdWxhdGVGb3JlY2FzdChkYXRhWzJdKTtcbiAgICB9KTtcbn1cblxuY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWJtaXRCdG5cIik7XG5cbnN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBzZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaFwiKTtcblxuICAgIGxvYWRQYWdlKHNlYXJjaC52YWx1ZSk7XG5cbiAgICBzZWFyY2gudmFsdWUgPSBcIlwiO1xufSk7XG5cbmxvYWRQYWdlKFwiTG9uZG9uXCIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9