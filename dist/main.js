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
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=69a0fe9d89aa3c562c09a50fbd505046`
    );

    const weatherData = await response.json();

    return weatherData;
}

async function getAirQuality(location) {
    // Need to get lat and long from other API to call here
    let lat = "30";
    let lon = "100";
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&APPID=69a0fe9d89aa3c562c09a50fbd505046`
    );

    const airQualityData = await response.json();

    return airQualityData;
}

async function getForecast(location) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=69a0fe9d89aa3c562c09a50fbd505046`
    );

    const forecastData = await response.json();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNBLDZEQUE2RCxTQUFTO0FBQ3RFOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRSxJQUFJLE9BQU8sSUFBSTtBQUNwRjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4REFBOEQsU0FBUztBQUN2RTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVrRDs7Ozs7Ozs7Ozs7Ozs7OztBQ3JDbEQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLDRDQUE0QyxrQkFBa0I7O0FBRTlELG9DQUFvQyxrQkFBa0IsSUFBSSxRQUFRO0FBQ2xFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1Q0FBdUMsZ0JBQWdCO0FBQ3ZEO0FBQ0EsVUFBVTtBQUNWLGdEQUFnRCxlQUFlO0FBQy9EO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQW1ELFNBQVM7O0FBRTVEO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsZ0RBQWdELGtCQUFrQjs7QUFFbEUsK0NBQStDLGtCQUFrQixJQUFJLFFBQVE7QUFDN0UsY0FBYztBQUNkLG1EQUFtRCxTQUFTO0FBQzVELCtDQUErQyxlQUFlO0FBQzlEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVvRDs7Ozs7OztVQ3ZFcEQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOQTs7QUFFd0U7QUFDRTs7QUFFMUU7QUFDQTtBQUNBLDhCQUE4Qix5REFBVTs7QUFFeEM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQ0FBaUMsNERBQWE7QUFDOUM7QUFDQTs7QUFFQTtBQUNBOztBQUVBLCtCQUErQiwwREFBVztBQUMxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwrREFBZ0I7QUFDeEIsUUFBUSxxRUFBc0I7QUFDOUIsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hcGlGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZG9tRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRnVuY3Rpb25zIHRvIGZldGNoIHdlYXRoZXIgZGF0YSB0aHJvdWdoIEFQSVxuXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyKGxvY2F0aW9uKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtsb2NhdGlvbn0mdW5pdHM9bWV0cmljJkFQUElEPTY5YTBmZTlkODlhYTNjNTYyYzA5YTUwZmJkNTA1MDQ2YFxuICAgICk7XG5cbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIHJldHVybiB3ZWF0aGVyRGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0QWlyUXVhbGl0eShsb2NhdGlvbikge1xuICAgIC8vIE5lZWQgdG8gZ2V0IGxhdCBhbmQgbG9uZyBmcm9tIG90aGVyIEFQSSB0byBjYWxsIGhlcmVcbiAgICBsZXQgbGF0ID0gXCIzMFwiO1xuICAgIGxldCBsb24gPSBcIjEwMFwiO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvYWlyX3BvbGx1dGlvbj9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mQVBQSUQ9NjlhMGZlOWQ4OWFhM2M1NjJjMDlhNTBmYmQ1MDUwNDZgXG4gICAgKTtcblxuICAgIGNvbnN0IGFpclF1YWxpdHlEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgcmV0dXJuIGFpclF1YWxpdHlEYXRhO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRGb3JlY2FzdChsb2NhdGlvbikge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT0ke2xvY2F0aW9ufSZ1bml0cz1tZXRyaWMmYXBwaWQ9NjlhMGZlOWQ4OWFhM2M1NjJjMDlhNTBmYmQ1MDUwNDZgXG4gICAgKTtcblxuICAgIGNvbnN0IGZvcmVjYXN0RGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIHJldHVybiBmb3JlY2FzdERhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJNYXAobG9jYXRpb24pIHt9XG5cbmV4cG9ydCB7IGdldFdlYXRoZXIsIGdldEFpclF1YWxpdHksIGdldEZvcmVjYXN0IH07XG4iLCIvLyBGdW5jdGlvbnMgdG8gY3JlYXRlIGFuZCBkaXNwbGF5IERPTSBlbGVtZW50c1xuXG5mdW5jdGlvbiBwb3B1bGF0ZUxvY2F0aW9uKGRhdGEpIHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9jYXRpb25cIik7XG4gICAgbG9jYXRpb24uaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZGF0YSkge1xuICAgICAgICBpZiAocHJvcGVydHkgPT0gXCJMb2NhdGlvblwiKSB7XG4gICAgICAgICAgICBsZXQgcmVnaW9uTmFtZXMgPSBuZXcgSW50bC5EaXNwbGF5TmFtZXMoW1wiZW5cIl0sIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInJlZ2lvblwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgY291bnRyeSA9IHJlZ2lvbk5hbWVzLm9mKGAke2RhdGFbcHJvcGVydHldWzFdfWApO1xuXG4gICAgICAgICAgICBsb2NhdGlvbi5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XVswXX0sICR7Y291bnRyeX1gO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZUN1cnJlbnRXZWF0aGVyKGRhdGEpIHtcbiAgICBjb25zdCBjdXJyZW50V2VhdGhlckRldGFpbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBcIi5jdXJyZW50V2VhdGhlckRldGFpbHNcIlxuICAgICk7XG5cbiAgICBjb25zdCBjdXJyZW50Q29uZGl0aW9uSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIFwiLmN1cnJlbnRDb25kaXRpb25JY29uXCJcbiAgICApO1xuICAgIGNvbnN0IGN1cnJlbnRDb25kaXRpb25OYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgXCIuY3VycmVudENvbmRpdGlvbk5hbWVcIlxuICAgICk7XG4gICAgY29uc3QgY3VycmVudFRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnRUZW1wXCIpO1xuXG4gICAgY3VycmVudFdlYXRoZXJEZXRhaWxzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgY3VycmVudFRlbXAuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZGF0YSkge1xuICAgICAgICBpZiAocHJvcGVydHkgPT0gXCJUZW1wZXJhdHVyZVwiKSB7XG4gICAgICAgICAgICBjdXJyZW50VGVtcC5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XX0gJiM4NDUxYDtcbiAgICAgICAgICAgIC8vIFUrMjEwOSBmb3IgRmFocmVuaGVpdFxuICAgICAgICB9IGVsc2UgaWYgKHByb3BlcnR5ID09IFwiQ29uZGl0aW9uXCIpIHtcbiAgICAgICAgICAgIGN1cnJlbnRDb25kaXRpb25OYW1lLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldfWA7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGNvbmRpdGlvbiBJY29uIGFjY29yZGluZyB0byBuYW1lXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB3ZWF0aGVySXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBjb25zdCBociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKTtcbiAgICAgICAgICAgIHdlYXRoZXJJdGVtLmNsYXNzTGlzdC5hZGQoXCJjdXJyZW50V2VhdGhlckl0ZW1cIik7XG5cbiAgICAgICAgICAgIGNvbnN0IHdlYXRoZXJJdGVtUHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgY29uc3Qgd2VhdGhlckl0ZW1EYXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICAgICAgaWYgKHByb3BlcnR5ID09IFwiTG9jYXRpb25cIikge1xuICAgICAgICAgICAgICAgIHdlYXRoZXJJdGVtUHJvcGVydHkuaW5uZXJIVE1MID0gYCR7cHJvcGVydHl9YDtcblxuICAgICAgICAgICAgICAgIGxldCByZWdpb25OYW1lcyA9IG5ldyBJbnRsLkRpc3BsYXlOYW1lcyhbXCJlblwiXSwge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInJlZ2lvblwiLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGxldCBjb3VudHJ5ID0gcmVnaW9uTmFtZXMub2YoYCR7ZGF0YVtwcm9wZXJ0eV1bMV19YCk7XG5cbiAgICAgICAgICAgICAgICB3ZWF0aGVySXRlbURhdGEuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV1bMF19LCAke2NvdW50cnl9YDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2VhdGhlckl0ZW1Qcm9wZXJ0eS5pbm5lckhUTUwgPSBgJHtwcm9wZXJ0eX1gO1xuICAgICAgICAgICAgICAgIHdlYXRoZXJJdGVtRGF0YS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2VhdGhlckl0ZW0uYXBwZW5kQ2hpbGQod2VhdGhlckl0ZW1Qcm9wZXJ0eSk7XG4gICAgICAgICAgICB3ZWF0aGVySXRlbS5hcHBlbmRDaGlsZCh3ZWF0aGVySXRlbURhdGEpO1xuXG4gICAgICAgICAgICBjdXJyZW50V2VhdGhlckRldGFpbHMuYXBwZW5kQ2hpbGQod2VhdGhlckl0ZW0pO1xuICAgICAgICAgICAgY3VycmVudFdlYXRoZXJEZXRhaWxzLmFwcGVuZENoaWxkKGhyKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHsgcG9wdWxhdGVMb2NhdGlvbiwgcG9wdWxhdGVDdXJyZW50V2VhdGhlciB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTb3VyY2UgaW5kZXggc2NyaXB0IGZvciBXZWF0aGVyIEFwcFxuXG5pbXBvcnQgeyBnZXRXZWF0aGVyLCBnZXRBaXJRdWFsaXR5LCBnZXRGb3JlY2FzdCB9IGZyb20gXCIuL2FwaUZ1bmN0aW9uc1wiO1xuaW1wb3J0IHsgcG9wdWxhdGVMb2NhdGlvbiwgcG9wdWxhdGVDdXJyZW50V2VhdGhlciB9IGZyb20gXCIuL2RvbUZ1bmN0aW9uc1wiO1xuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzV2VhdGhlcihsb2NhdGlvbikge1xuICAgIC8vIE5lZWQgdG8gYWRkIHRyeS9jYXRjaCB0byBoYW5kbGUgZXJyb3JzXG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCBnZXRXZWF0aGVyKGxvY2F0aW9uKTtcblxuICAgIGNvbnNvbGUubG9nKHdlYXRoZXJEYXRhKTtcblxuICAgIGxldCBpbXBvcnRhbnREYXRhID0ge307XG5cbiAgICBpbXBvcnRhbnREYXRhLkxvY2F0aW9uID0gW3dlYXRoZXJEYXRhLm5hbWUsIHdlYXRoZXJEYXRhLnN5cy5jb3VudHJ5XTtcbiAgICBpbXBvcnRhbnREYXRhLlRlbXBlcmF0dXJlID0gd2VhdGhlckRhdGEubWFpbi50ZW1wO1xuICAgIGltcG9ydGFudERhdGFbXCJGZWVscyBMaWtlXCJdID0gd2VhdGhlckRhdGEubWFpbi5mZWVsc19saWtlO1xuICAgIGltcG9ydGFudERhdGEuSHVtaWRpdHkgPSB3ZWF0aGVyRGF0YS5tYWluLmh1bWlkaXR5O1xuICAgIGltcG9ydGFudERhdGEuV2luZHNwZWVkID0gd2VhdGhlckRhdGEud2luZC5zcGVlZDtcblxuICAgIGltcG9ydGFudERhdGEuQ29uZGl0aW9uID0gd2VhdGhlckRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcblxuICAgIC8vIEZvcm1hdCB0aGlzIG9iamVjdCBiZXR0ZXJcbiAgICAvLyBPYmplY3QgQ29uc3RydWN0b3I/XG5cbiAgICByZXR1cm4gaW1wb3J0YW50RGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc0FpclF1YWxpdHkobG9jYXRpb24pIHtcbiAgICAvLyBHZXRzIGRhdGEgZnJvbSBhaXIgcXVhbGl0eSBhcGlGdW5jdGlvbnMgZnVuY3Rpb24gYW5kIGdhdGhlcnMgcmVsYXZlbnQgaW5mbyBmb3IgZGlzcGxheVxuXG4gICAgY29uc3QgYWlyUXVhbGl0eURhdGEgPSBhd2FpdCBnZXRBaXJRdWFsaXR5KGxvY2F0aW9uKTtcbiAgICBjb25zb2xlLmxvZyhhaXJRdWFsaXR5RGF0YSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NGb3JlY2FzdChsb2NhdGlvbikge1xuICAgIC8vIEdldHMgZGF0YSBmcm9tIGZvcmVjYXN0IGFwaUZ1bmN0aW9ucyBmdW5jdGlvbiBhbmQgZ2F0aGVycyByZWxhdmVudCBpbmZvIGZvciBkaXNwbGF5XG5cbiAgICBjb25zdCBmb3JlY2FzdERhdGEgPSBhd2FpdCBnZXRGb3JlY2FzdChsb2NhdGlvbik7XG4gICAgY29uc29sZS5sb2coZm9yZWNhc3REYXRhKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc01hcCgpIHtcbiAgICAvLyBHZXRzIGRhdGEgZnJvbSBtYXAgYXBpRnVuY3Rpb25zIGZ1bmN0aW9uIGFuZCBnYXRoZXJzIHJlbGF2ZW50IGluZm8gZm9yIGRpc3BsYXlcbn1cblxuYXN5bmMgZnVuY3Rpb24gbG9hZFBhZ2UobG9jYXRpb24pIHtcbiAgICAvLyBBZGQgc29tZSB2aXN1YWwgaW5kaWNhdGlvbiB0aGF0IHdlJ3JlIHdhaXRpbmcgZm9yIHRoZSBkYXRhIChwcm9taXNlLmFsbCkgYmVmb3JlIGl0IGdldHMgZGlzcGxheWVkIChNYXAgd291bGQgbGlrZXkgdGFrZSB0aGUgbG9uZ2VzdCB0byBkaXNwbGF5KVxuICAgIC8vQ291bGQgYWRkIGEgY2xhc3MgdG8gY2hhbmdlIHRoZSBkaXNwbGF5IHByaW9yIHRvIHByb21pc2UuYWxsIHNob3dpbmcgdGhhdCBpdCdzIGxvYWRpbmcsIGFuZCByZW1vdmUgaXQgdG8gc2hvdyBkYXRhIGlmIHN1Y2Nlc3NmdWwgb3IgZGlzcGxheSBhIG5vIHJlc3VsdHMgZm91bmQgcGFnZSBpZiBlcnJvclxuXG4gICAgLy8gVXNlIGEgcHJvbWlzZS5hbGwgdG8gd2FpdCBmb3IgYWxsIHByb2Nlc3NpbmcgdG8gY29tcGxldGUgYmVmb3JlIGRpc3BsYXlpbmcgZGF0YVxuXG4gICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICBwcm9jZXNzV2VhdGhlcihsb2NhdGlvbiksXG4gICAgICAgIHByb2Nlc3NBaXJRdWFsaXR5KGxvY2F0aW9uKSxcbiAgICAgICAgcHJvY2Vzc0ZvcmVjYXN0KGxvY2F0aW9uKSxcbiAgICBdKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIHBvcHVsYXRlTG9jYXRpb24oZGF0YVswXSk7XG4gICAgICAgIHBvcHVsYXRlQ3VycmVudFdlYXRoZXIoZGF0YVswXSk7XG4gICAgfSk7XG59XG5cbmNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VibWl0QnRuXCIpO1xuXG5zdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2hcIik7XG5cbiAgICBsb2FkUGFnZShzZWFyY2gudmFsdWUpO1xuXG4gICAgc2VhcmNoLnZhbHVlID0gXCJcIjtcbn0pO1xuXG5sb2FkUGFnZShcIkxvbmRvblwiKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==