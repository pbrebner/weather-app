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
/* harmony export */   "getWeather": () => (/* binding */ getWeather)
/* harmony export */ });
// Functions to fetch weather data through API

async function getWeather(location) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=69a0fe9d89aa3c562c09a50fbd505046`
    );

    const weatherData = await response.json();

    return weatherData;
}




/***/ }),

/***/ "./src/domFunctions.js":
/*!*****************************!*\
  !*** ./src/domFunctions.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "populateCurrentWeather": () => (/* binding */ populateCurrentWeather)
/* harmony export */ });
// Functions to create and display DOM elements

function populateCurrentWeather(data) {
    const currentWeatherDetails = document.querySelector(
        ".currentWeatherDetails"
    );

    currentWeatherDetails.innerHTML = "";

    for (const property in data) {
        const weatherItem = document.createElement("div");
        weatherItem.classList.add("weatherItem");

        weatherItem.innerHTML = `${property}: ${data[property]}`;

        currentWeatherDetails.appendChild(weatherItem);
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
    const weatherData = await (0,_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.getWeather)(location);

    let importantData = {};

    importantData.location = weatherData.name;
    importantData.temperature = weatherData.main.temp;
    importantData.humidity = weatherData.main.humidity;
    importantData.tempMax = weatherData.main.temp_max;
    importantData.tempMin = weatherData.main.temp_min;

    console.log(importantData);
    return importantData;
}

async function processAirQuality() {
    // Gets data from air quality apiFunctions function and gathers relavent info for display
}

async function processForecast() {
    // Gets data from forecast apiFunctions function and gathers relavent info for display
}

async function processMap() {
    // Gets data from map apiFunctions function and gathers relavent info for display
}

async function loadPage(location) {
    // Use a promise.all to wait for all processing to complete before displaying data

    Promise.all([processWeather(location)]).then((data) => {
        console.log(data);
        (0,_domFunctions__WEBPACK_IMPORTED_MODULE_1__.populateCurrentWeather)(data[0]);
    });

    // Add some visual indication that we're waiting for the data before it gets displayed (Map would likey take the longest to display)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQSw2REFBNkQsU0FBUztBQUN0RTs7QUFFQTs7QUFFQTtBQUNBOztBQUVzQjs7Ozs7Ozs7Ozs7Ozs7O0FDWnRCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQ0FBbUMsU0FBUyxJQUFJLGVBQWU7O0FBRS9EO0FBQ0E7QUFDQTs7QUFFa0M7Ozs7Ozs7VUNuQmxDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTkE7O0FBRTRDO0FBQ1k7O0FBRXhEO0FBQ0EsOEJBQThCLHlEQUFVOztBQUV4Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLHFFQUFzQjtBQUM5QixLQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2FwaUZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9kb21GdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGdW5jdGlvbnMgdG8gZmV0Y2ggd2VhdGhlciBkYXRhIHRocm91Z2ggQVBJXG5cbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXIobG9jYXRpb24pIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2xvY2F0aW9ufSZBUFBJRD02OWEwZmU5ZDg5YWEzYzU2MmMwOWE1MGZiZDUwNTA0NmBcbiAgICApO1xuXG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICByZXR1cm4gd2VhdGhlckRhdGE7XG59XG5cbmV4cG9ydCB7IGdldFdlYXRoZXIgfTtcbiIsIi8vIEZ1bmN0aW9ucyB0byBjcmVhdGUgYW5kIGRpc3BsYXkgRE9NIGVsZW1lbnRzXG5cbmZ1bmN0aW9uIHBvcHVsYXRlQ3VycmVudFdlYXRoZXIoZGF0YSkge1xuICAgIGNvbnN0IGN1cnJlbnRXZWF0aGVyRGV0YWlscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIFwiLmN1cnJlbnRXZWF0aGVyRGV0YWlsc1wiXG4gICAgKTtcblxuICAgIGN1cnJlbnRXZWF0aGVyRGV0YWlscy5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBkYXRhKSB7XG4gICAgICAgIGNvbnN0IHdlYXRoZXJJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgd2VhdGhlckl0ZW0uY2xhc3NMaXN0LmFkZChcIndlYXRoZXJJdGVtXCIpO1xuXG4gICAgICAgIHdlYXRoZXJJdGVtLmlubmVySFRNTCA9IGAke3Byb3BlcnR5fTogJHtkYXRhW3Byb3BlcnR5XX1gO1xuXG4gICAgICAgIGN1cnJlbnRXZWF0aGVyRGV0YWlscy5hcHBlbmRDaGlsZCh3ZWF0aGVySXRlbSk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBwb3B1bGF0ZUN1cnJlbnRXZWF0aGVyIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIFNvdXJjZSBpbmRleCBzY3JpcHQgZm9yIFdlYXRoZXIgQXBwXG5cbmltcG9ydCB7IGdldFdlYXRoZXIgfSBmcm9tIFwiLi9hcGlGdW5jdGlvbnNcIjtcbmltcG9ydCB7IHBvcHVsYXRlQ3VycmVudFdlYXRoZXIgfSBmcm9tIFwiLi9kb21GdW5jdGlvbnNcIjtcblxuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc1dlYXRoZXIobG9jYXRpb24pIHtcbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IGdldFdlYXRoZXIobG9jYXRpb24pO1xuXG4gICAgbGV0IGltcG9ydGFudERhdGEgPSB7fTtcblxuICAgIGltcG9ydGFudERhdGEubG9jYXRpb24gPSB3ZWF0aGVyRGF0YS5uYW1lO1xuICAgIGltcG9ydGFudERhdGEudGVtcGVyYXR1cmUgPSB3ZWF0aGVyRGF0YS5tYWluLnRlbXA7XG4gICAgaW1wb3J0YW50RGF0YS5odW1pZGl0eSA9IHdlYXRoZXJEYXRhLm1haW4uaHVtaWRpdHk7XG4gICAgaW1wb3J0YW50RGF0YS50ZW1wTWF4ID0gd2VhdGhlckRhdGEubWFpbi50ZW1wX21heDtcbiAgICBpbXBvcnRhbnREYXRhLnRlbXBNaW4gPSB3ZWF0aGVyRGF0YS5tYWluLnRlbXBfbWluO1xuXG4gICAgY29uc29sZS5sb2coaW1wb3J0YW50RGF0YSk7XG4gICAgcmV0dXJuIGltcG9ydGFudERhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NBaXJRdWFsaXR5KCkge1xuICAgIC8vIEdldHMgZGF0YSBmcm9tIGFpciBxdWFsaXR5IGFwaUZ1bmN0aW9ucyBmdW5jdGlvbiBhbmQgZ2F0aGVycyByZWxhdmVudCBpbmZvIGZvciBkaXNwbGF5XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NGb3JlY2FzdCgpIHtcbiAgICAvLyBHZXRzIGRhdGEgZnJvbSBmb3JlY2FzdCBhcGlGdW5jdGlvbnMgZnVuY3Rpb24gYW5kIGdhdGhlcnMgcmVsYXZlbnQgaW5mbyBmb3IgZGlzcGxheVxufVxuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzTWFwKCkge1xuICAgIC8vIEdldHMgZGF0YSBmcm9tIG1hcCBhcGlGdW5jdGlvbnMgZnVuY3Rpb24gYW5kIGdhdGhlcnMgcmVsYXZlbnQgaW5mbyBmb3IgZGlzcGxheVxufVxuXG5hc3luYyBmdW5jdGlvbiBsb2FkUGFnZShsb2NhdGlvbikge1xuICAgIC8vIFVzZSBhIHByb21pc2UuYWxsIHRvIHdhaXQgZm9yIGFsbCBwcm9jZXNzaW5nIHRvIGNvbXBsZXRlIGJlZm9yZSBkaXNwbGF5aW5nIGRhdGFcblxuICAgIFByb21pc2UuYWxsKFtwcm9jZXNzV2VhdGhlcihsb2NhdGlvbildKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICBwb3B1bGF0ZUN1cnJlbnRXZWF0aGVyKGRhdGFbMF0pO1xuICAgIH0pO1xuXG4gICAgLy8gQWRkIHNvbWUgdmlzdWFsIGluZGljYXRpb24gdGhhdCB3ZSdyZSB3YWl0aW5nIGZvciB0aGUgZGF0YSBiZWZvcmUgaXQgZ2V0cyBkaXNwbGF5ZWQgKE1hcCB3b3VsZCBsaWtleSB0YWtlIHRoZSBsb25nZXN0IHRvIGRpc3BsYXkpXG59XG5cbmNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VibWl0QnRuXCIpO1xuXG5zdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2hcIik7XG5cbiAgICBsb2FkUGFnZShzZWFyY2gudmFsdWUpO1xuXG4gICAgc2VhcmNoLnZhbHVlID0gXCJcIjtcbn0pO1xuXG5sb2FkUGFnZShcIkxvbmRvblwiKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==