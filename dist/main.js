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
/* harmony export */   "populateLocation": () => (/* binding */ populateLocation)
/* harmony export */ });
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
            currentConditionName.innerHTML = `${data[property]}`;
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
            "Air quality is fair and is not a concern for the general public.No need to modify your usual outdoor activities unless you experience symptoms such as coughing and throat irritation.",
        ],
        3: [
            "Moderate",
            "Air quality is moderate; Consider reducing or rescheduling strenuous activities outdoors if you experience symptoms such as coughing and throat irritation.",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNBLDZEQUE2RCxTQUFTO0FBQ3RFOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZEQUE2RCxTQUFTO0FBQ3RFO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFFQUFxRSxJQUFJLE9BQU8sSUFBSTtBQUNwRjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4REFBOEQsU0FBUztBQUN2RTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVrRDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQ2xEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYiw0Q0FBNEMsa0JBQWtCOztBQUU5RCxvQ0FBb0Msa0JBQWtCLElBQUksUUFBUTtBQUNsRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUNBQXVDLGdCQUFnQjtBQUN2RDtBQUNBLFVBQVU7QUFDVixnREFBZ0QsZUFBZTtBQUMvRDtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUFtRCxTQUFTOztBQUU1RDtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGdEQUFnRCxrQkFBa0I7O0FBRWxFLCtDQUErQyxrQkFBa0IsSUFBSSxRQUFRO0FBQzdFLGNBQWM7QUFDZCxtREFBbUQsU0FBUztBQUM1RCwrQ0FBK0MsZUFBZTtBQUM5RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNERBQTREO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZDQUE2QyxnQkFBZ0I7O0FBRTdEO0FBQ0EseUNBQXlDLGVBQWU7QUFDeEQ7QUFDQSx5Q0FBeUMsZUFBZTtBQUN4RDtBQUNBO0FBQ0E7O0FBRXdFOzs7Ozs7O1VDbkh4RTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05BOztBQUV3RTtBQUtoRDs7QUFFeEI7QUFDQTtBQUNBLDhCQUE4Qix5REFBVTs7QUFFeEM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQ0FBaUMsNERBQWE7QUFDOUM7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLCtCQUErQiwwREFBVztBQUMxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwrREFBZ0I7QUFDeEIsUUFBUSxxRUFBc0I7QUFDOUIsUUFBUSxpRUFBa0I7QUFDMUIsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hcGlGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZG9tRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRnVuY3Rpb25zIHRvIGZldGNoIHdlYXRoZXIgZGF0YSB0aHJvdWdoIEFQSVxuXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyKGxvY2F0aW9uKSB7XG4gICAgY29uc3Qgd2VhdGhlclJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7bG9jYXRpb259JnVuaXRzPW1ldHJpYyZBUFBJRD02OWEwZmU5ZDg5YWEzYzU2MmMwOWE1MGZiZDUwNTA0NmBcbiAgICApO1xuXG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCB3ZWF0aGVyUmVzcG9uc2UuanNvbigpO1xuXG4gICAgcmV0dXJuIHdlYXRoZXJEYXRhO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRBaXJRdWFsaXR5KGxvY2F0aW9uKSB7XG4gICAgY29uc3Qgd2VhdGhlclJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7bG9jYXRpb259JnVuaXRzPW1ldHJpYyZBUFBJRD02OWEwZmU5ZDg5YWEzYzU2MmMwOWE1MGZiZDUwNTA0NmBcbiAgICApO1xuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgd2VhdGhlclJlc3BvbnNlLmpzb24oKTtcblxuICAgIGxldCBsYXQgPSB3ZWF0aGVyRGF0YS5jb29yZC5sYXQ7XG4gICAgbGV0IGxvbiA9IHdlYXRoZXJEYXRhLmNvb3JkLmxvbjtcblxuICAgIGNvbnN0IGFpclF1YWxpdHlSZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2Fpcl9wb2xsdXRpb24/bGF0PSR7bGF0fSZsb249JHtsb259JkFQUElEPTY5YTBmZTlkODlhYTNjNTYyYzA5YTUwZmJkNTA1MDQ2YFxuICAgICk7XG5cbiAgICBjb25zdCBhaXJRdWFsaXR5RGF0YSA9IGF3YWl0IGFpclF1YWxpdHlSZXNwb25zZS5qc29uKCk7XG5cbiAgICByZXR1cm4gYWlyUXVhbGl0eURhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEZvcmVjYXN0KGxvY2F0aW9uKSB7XG4gICAgY29uc3QgZm9yZWNhc3RSZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtsb2NhdGlvbn0mdW5pdHM9bWV0cmljJmFwcGlkPTY5YTBmZTlkODlhYTNjNTYyYzA5YTUwZmJkNTA1MDQ2YFxuICAgICk7XG5cbiAgICBjb25zdCBmb3JlY2FzdERhdGEgPSBhd2FpdCBmb3JlY2FzdFJlc3BvbnNlLmpzb24oKTtcblxuICAgIHJldHVybiBmb3JlY2FzdERhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJNYXAobG9jYXRpb24pIHt9XG5cbmV4cG9ydCB7IGdldFdlYXRoZXIsIGdldEFpclF1YWxpdHksIGdldEZvcmVjYXN0IH07XG4iLCIvLyBGdW5jdGlvbnMgdG8gY3JlYXRlIGFuZCBkaXNwbGF5IERPTSBlbGVtZW50c1xuXG5mdW5jdGlvbiBwb3B1bGF0ZUxvY2F0aW9uKGRhdGEpIHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9jYXRpb25cIik7XG4gICAgbG9jYXRpb24uaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZGF0YSkge1xuICAgICAgICBpZiAocHJvcGVydHkgPT0gXCJMb2NhdGlvblwiKSB7XG4gICAgICAgICAgICBsZXQgcmVnaW9uTmFtZXMgPSBuZXcgSW50bC5EaXNwbGF5TmFtZXMoW1wiZW5cIl0sIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInJlZ2lvblwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgY291bnRyeSA9IHJlZ2lvbk5hbWVzLm9mKGAke2RhdGFbcHJvcGVydHldWzFdfWApO1xuXG4gICAgICAgICAgICBsb2NhdGlvbi5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XVswXX0sICR7Y291bnRyeX1gO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZUN1cnJlbnRXZWF0aGVyKGRhdGEpIHtcbiAgICBjb25zdCBjdXJyZW50V2VhdGhlckRldGFpbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBcIi5jdXJyZW50V2VhdGhlckRldGFpbHNcIlxuICAgICk7XG5cbiAgICBjb25zdCBjdXJyZW50Q29uZGl0aW9uSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIFwiLmN1cnJlbnRDb25kaXRpb25JY29uXCJcbiAgICApO1xuICAgIGNvbnN0IGN1cnJlbnRDb25kaXRpb25OYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgXCIuY3VycmVudENvbmRpdGlvbk5hbWVcIlxuICAgICk7XG4gICAgY29uc3QgY3VycmVudFRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnRUZW1wXCIpO1xuXG4gICAgY3VycmVudFdlYXRoZXJEZXRhaWxzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgY3VycmVudFRlbXAuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZGF0YSkge1xuICAgICAgICBpZiAocHJvcGVydHkgPT0gXCJUZW1wZXJhdHVyZVwiKSB7XG4gICAgICAgICAgICBjdXJyZW50VGVtcC5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XX0gJiM4NDUxYDtcbiAgICAgICAgICAgIC8vIFUrMjEwOSBmb3IgRmFocmVuaGVpdFxuICAgICAgICB9IGVsc2UgaWYgKHByb3BlcnR5ID09IFwiQ29uZGl0aW9uXCIpIHtcbiAgICAgICAgICAgIGN1cnJlbnRDb25kaXRpb25OYW1lLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldfWA7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGNvbmRpdGlvbiBJY29uIGFjY29yZGluZyB0byBuYW1lXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB3ZWF0aGVySXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBjb25zdCBociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKTtcbiAgICAgICAgICAgIHdlYXRoZXJJdGVtLmNsYXNzTGlzdC5hZGQoXCJjdXJyZW50V2VhdGhlckl0ZW1cIik7XG5cbiAgICAgICAgICAgIGNvbnN0IHdlYXRoZXJJdGVtUHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgY29uc3Qgd2VhdGhlckl0ZW1EYXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICAgICAgaWYgKHByb3BlcnR5ID09IFwiTG9jYXRpb25cIikge1xuICAgICAgICAgICAgICAgIHdlYXRoZXJJdGVtUHJvcGVydHkuaW5uZXJIVE1MID0gYCR7cHJvcGVydHl9YDtcblxuICAgICAgICAgICAgICAgIGxldCByZWdpb25OYW1lcyA9IG5ldyBJbnRsLkRpc3BsYXlOYW1lcyhbXCJlblwiXSwge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInJlZ2lvblwiLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGxldCBjb3VudHJ5ID0gcmVnaW9uTmFtZXMub2YoYCR7ZGF0YVtwcm9wZXJ0eV1bMV19YCk7XG5cbiAgICAgICAgICAgICAgICB3ZWF0aGVySXRlbURhdGEuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV1bMF19LCAke2NvdW50cnl9YDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2VhdGhlckl0ZW1Qcm9wZXJ0eS5pbm5lckhUTUwgPSBgJHtwcm9wZXJ0eX1gO1xuICAgICAgICAgICAgICAgIHdlYXRoZXJJdGVtRGF0YS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2VhdGhlckl0ZW0uYXBwZW5kQ2hpbGQod2VhdGhlckl0ZW1Qcm9wZXJ0eSk7XG4gICAgICAgICAgICB3ZWF0aGVySXRlbS5hcHBlbmRDaGlsZCh3ZWF0aGVySXRlbURhdGEpO1xuXG4gICAgICAgICAgICBjdXJyZW50V2VhdGhlckRldGFpbHMuYXBwZW5kQ2hpbGQod2VhdGhlckl0ZW0pO1xuICAgICAgICAgICAgY3VycmVudFdlYXRoZXJEZXRhaWxzLmFwcGVuZENoaWxkKGhyKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVBaXJRdWFsaXR5KGRhdGEpIHtcbiAgICBjb25zdCBhaXJRdWFsaXR5RGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlyUXVhbGl0eURpc3BsYXlcIik7XG4gICAgY29uc3QgYWlyUXVhbGl0eUhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlyUXVhbGl0eUhlYWRlclwiKTtcbiAgICBjb25zdCBhaXJRdWFsaXR5UGFyYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlyUXVhbGl0eVBhcmFcIik7XG5cbiAgICBhaXJRdWFsaXR5RGlzcGxheS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGFpclF1YWxpdHlIZWFkZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBhaXJRdWFsaXR5UGFyYS5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgY29uc3QgYWlyUXVhbGl0eURlc2NpcHRpb25zID0ge1xuICAgICAgICAxOiBbXG4gICAgICAgICAgICBcIkV4Y2VsbGVudFwiLFxuICAgICAgICAgICAgXCJUaGUgYWlyIHF1YWxpdHkgaXMgaWRlYWwgZm9yIG1vc3QgaW5kaXZpZHVhbHM7IEVuam95IHlvdXIgdXN1YWwgb3V0ZG9vciBhY3Rpdml0aWVzLlwiLFxuICAgICAgICBdLFxuICAgICAgICAyOiBbXG4gICAgICAgICAgICBcIkZhaXJcIixcbiAgICAgICAgICAgIFwiQWlyIHF1YWxpdHkgaXMgZmFpciBhbmQgaXMgbm90IGEgY29uY2VybiBmb3IgdGhlIGdlbmVyYWwgcHVibGljLk5vIG5lZWQgdG8gbW9kaWZ5IHlvdXIgdXN1YWwgb3V0ZG9vciBhY3Rpdml0aWVzIHVubGVzcyB5b3UgZXhwZXJpZW5jZSBzeW1wdG9tcyBzdWNoIGFzIGNvdWdoaW5nIGFuZCB0aHJvYXQgaXJyaXRhdGlvbi5cIixcbiAgICAgICAgXSxcbiAgICAgICAgMzogW1xuICAgICAgICAgICAgXCJNb2RlcmF0ZVwiLFxuICAgICAgICAgICAgXCJBaXIgcXVhbGl0eSBpcyBtb2RlcmF0ZTsgQ29uc2lkZXIgcmVkdWNpbmcgb3IgcmVzY2hlZHVsaW5nIHN0cmVudW91cyBhY3Rpdml0aWVzIG91dGRvb3JzIGlmIHlvdSBleHBlcmllbmNlIHN5bXB0b21zIHN1Y2ggYXMgY291Z2hpbmcgYW5kIHRocm9hdCBpcnJpdGF0aW9uLlwiLFxuICAgICAgICBdLFxuICAgICAgICA0OiBbXG4gICAgICAgICAgICBcIlBvb3JcIixcbiAgICAgICAgICAgIFwiQWlyIHF1YWxpdHkgaXMgcG9vciBhbmQgcHJlY2F1dGlvbnMgc2hvdWxkIGJlIGNvbnNpZGVyZWQuIFJlZHVjZSBvciByZXNjaGVkdWxlIHN0cmVudW91cyBhY3Rpdml0aWVzIG91dGRvb3JzLiBDaGlsZHJlbiBhbmQgdGhlIGVsZGVybHkgc2hvdWxkIGFsc28gdGFrZSBpdCBlYXN5LlwiLFxuICAgICAgICBdLFxuICAgICAgICA1OiBbXG4gICAgICAgICAgICBcIlZlcnkgUG9vclwiLFxuICAgICAgICAgICAgXCJBaXIgcXVhbGl0eSBpcyB2ZXJ5IHBvb3I7IEF2b2lkIHN0cmVudW91cyBhY3Rpdml0aWVzIG91dGRvb3JzLiBDaGlsZHJlbiBhbmQgdGhlIGVsZGVybHkgc2hvdWxkIGFsc28gYXZvaWQgb3V0ZG9vciBwaHlzaWNhbCBleGVydGlvbi5cIixcbiAgICAgICAgXSxcbiAgICB9O1xuXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBkYXRhKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0eSA9PSBcIkFRSVwiKSB7XG4gICAgICAgICAgICBhaXJRdWFsaXR5RGlzcGxheS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XX0gQVFJYDtcblxuICAgICAgICAgICAgYWlyUXVhbGl0eUhlYWRlci5pbm5lckhUTUwgPVxuICAgICAgICAgICAgICAgIGFpclF1YWxpdHlEZXNjaXB0aW9uc1tgJHtkYXRhW3Byb3BlcnR5XX1gXVswXTtcbiAgICAgICAgICAgIGFpclF1YWxpdHlQYXJhLmlubmVySFRNTCA9XG4gICAgICAgICAgICAgICAgYWlyUXVhbGl0eURlc2NpcHRpb25zW2Ake2RhdGFbcHJvcGVydHldfWBdWzFdO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgeyBwb3B1bGF0ZUxvY2F0aW9uLCBwb3B1bGF0ZUN1cnJlbnRXZWF0aGVyLCBwb3B1bGF0ZUFpclF1YWxpdHkgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gU291cmNlIGluZGV4IHNjcmlwdCBmb3IgV2VhdGhlciBBcHBcblxuaW1wb3J0IHsgZ2V0V2VhdGhlciwgZ2V0QWlyUXVhbGl0eSwgZ2V0Rm9yZWNhc3QgfSBmcm9tIFwiLi9hcGlGdW5jdGlvbnNcIjtcbmltcG9ydCB7XG4gICAgcG9wdWxhdGVMb2NhdGlvbixcbiAgICBwb3B1bGF0ZUN1cnJlbnRXZWF0aGVyLFxuICAgIHBvcHVsYXRlQWlyUXVhbGl0eSxcbn0gZnJvbSBcIi4vZG9tRnVuY3Rpb25zXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NXZWF0aGVyKGxvY2F0aW9uKSB7XG4gICAgLy8gTmVlZCB0byBhZGQgdHJ5L2NhdGNoIHRvIGhhbmRsZSBlcnJvcnNcbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IGdldFdlYXRoZXIobG9jYXRpb24pO1xuXG4gICAgY29uc29sZS5sb2cod2VhdGhlckRhdGEpO1xuXG4gICAgbGV0IGltcG9ydGFudERhdGEgPSB7fTtcblxuICAgIGltcG9ydGFudERhdGEuTG9jYXRpb24gPSBbd2VhdGhlckRhdGEubmFtZSwgd2VhdGhlckRhdGEuc3lzLmNvdW50cnldO1xuICAgIGltcG9ydGFudERhdGEuVGVtcGVyYXR1cmUgPSB3ZWF0aGVyRGF0YS5tYWluLnRlbXA7XG4gICAgaW1wb3J0YW50RGF0YVtcIkZlZWxzIExpa2VcIl0gPSB3ZWF0aGVyRGF0YS5tYWluLmZlZWxzX2xpa2U7XG4gICAgaW1wb3J0YW50RGF0YS5IdW1pZGl0eSA9IHdlYXRoZXJEYXRhLm1haW4uaHVtaWRpdHk7XG4gICAgaW1wb3J0YW50RGF0YS5XaW5kc3BlZWQgPSB3ZWF0aGVyRGF0YS53aW5kLnNwZWVkO1xuXG4gICAgaW1wb3J0YW50RGF0YS5Db25kaXRpb24gPSB3ZWF0aGVyRGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuXG4gICAgLy8gRm9ybWF0IHRoaXMgb2JqZWN0IGJldHRlclxuICAgIC8vIE9iamVjdCBDb25zdHJ1Y3Rvcj9cblxuICAgIHJldHVybiBpbXBvcnRhbnREYXRhO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzQWlyUXVhbGl0eShsb2NhdGlvbikge1xuICAgIC8vIEdldHMgZGF0YSBmcm9tIGFpciBxdWFsaXR5IGFwaUZ1bmN0aW9ucyBmdW5jdGlvbiBhbmQgZ2F0aGVycyByZWxhdmVudCBpbmZvIGZvciBkaXNwbGF5XG5cbiAgICBjb25zdCBhaXJRdWFsaXR5RGF0YSA9IGF3YWl0IGdldEFpclF1YWxpdHkobG9jYXRpb24pO1xuICAgIGNvbnNvbGUubG9nKGFpclF1YWxpdHlEYXRhKTtcblxuICAgIGxldCBpbXBvcnRhbnREYXRhID0ge307XG5cbiAgICBpbXBvcnRhbnREYXRhLkFRSSA9IGFpclF1YWxpdHlEYXRhLmxpc3RbMF0ubWFpbi5hcWk7XG5cbiAgICByZXR1cm4gaW1wb3J0YW50RGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc0ZvcmVjYXN0KGxvY2F0aW9uKSB7XG4gICAgLy8gR2V0cyBkYXRhIGZyb20gZm9yZWNhc3QgYXBpRnVuY3Rpb25zIGZ1bmN0aW9uIGFuZCBnYXRoZXJzIHJlbGF2ZW50IGluZm8gZm9yIGRpc3BsYXlcblxuICAgIGNvbnN0IGZvcmVjYXN0RGF0YSA9IGF3YWl0IGdldEZvcmVjYXN0KGxvY2F0aW9uKTtcbiAgICBjb25zb2xlLmxvZyhmb3JlY2FzdERhdGEpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzTWFwKCkge1xuICAgIC8vIEdldHMgZGF0YSBmcm9tIG1hcCBhcGlGdW5jdGlvbnMgZnVuY3Rpb24gYW5kIGdhdGhlcnMgcmVsYXZlbnQgaW5mbyBmb3IgZGlzcGxheVxufVxuXG5hc3luYyBmdW5jdGlvbiBsb2FkUGFnZShsb2NhdGlvbikge1xuICAgIC8vIEFkZCBzb21lIHZpc3VhbCBpbmRpY2F0aW9uIHRoYXQgd2UncmUgd2FpdGluZyBmb3IgdGhlIGRhdGEgKHByb21pc2UuYWxsKSBiZWZvcmUgaXQgZ2V0cyBkaXNwbGF5ZWQgKE1hcCB3b3VsZCBsaWtleSB0YWtlIHRoZSBsb25nZXN0IHRvIGRpc3BsYXkpXG4gICAgLy9Db3VsZCBhZGQgYSBjbGFzcyB0byBjaGFuZ2UgdGhlIGRpc3BsYXkgcHJpb3IgdG8gcHJvbWlzZS5hbGwgc2hvd2luZyB0aGF0IGl0J3MgbG9hZGluZywgYW5kIHJlbW92ZSBpdCB0byBzaG93IGRhdGEgaWYgc3VjY2Vzc2Z1bCBvciBkaXNwbGF5IGEgbm8gcmVzdWx0cyBmb3VuZCBwYWdlIGlmIGVycm9yXG5cbiAgICAvLyBVc2UgYSBwcm9taXNlLmFsbCB0byB3YWl0IGZvciBhbGwgcHJvY2Vzc2luZyB0byBjb21wbGV0ZSBiZWZvcmUgZGlzcGxheWluZyBkYXRhXG5cbiAgICBQcm9taXNlLmFsbChbXG4gICAgICAgIHByb2Nlc3NXZWF0aGVyKGxvY2F0aW9uKSxcbiAgICAgICAgcHJvY2Vzc0FpclF1YWxpdHkobG9jYXRpb24pLFxuICAgICAgICBwcm9jZXNzRm9yZWNhc3QobG9jYXRpb24pLFxuICAgIF0pLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgcG9wdWxhdGVMb2NhdGlvbihkYXRhWzBdKTtcbiAgICAgICAgcG9wdWxhdGVDdXJyZW50V2VhdGhlcihkYXRhWzBdKTtcbiAgICAgICAgcG9wdWxhdGVBaXJRdWFsaXR5KGRhdGFbMV0pO1xuICAgIH0pO1xufVxuXG5jb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Ym1pdEJ0blwiKTtcblxuc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoXCIpO1xuXG4gICAgbG9hZFBhZ2Uoc2VhcmNoLnZhbHVlKTtcblxuICAgIHNlYXJjaC52YWx1ZSA9IFwiXCI7XG59KTtcblxubG9hZFBhZ2UoXCJMb25kb25cIik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=