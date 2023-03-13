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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLCtEQUFnQjtBQUN4QixRQUFRLHFFQUFzQjtBQUM5QixRQUFRLGlFQUFrQjtBQUMxQixRQUFRLCtEQUFnQjtBQUN4QixLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2FwaUZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9kb21GdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBGdW5jdGlvbnMgdG8gZmV0Y2ggd2VhdGhlciBkYXRhIHRocm91Z2ggQVBJXG5cbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXIobG9jYXRpb24pIHtcbiAgICBjb25zdCB3ZWF0aGVyUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtsb2NhdGlvbn0mdW5pdHM9bWV0cmljJkFQUElEPTY5YTBmZTlkODlhYTNjNTYyYzA5YTUwZmJkNTA1MDQ2YFxuICAgICk7XG5cbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHdlYXRoZXJSZXNwb25zZS5qc29uKCk7XG5cbiAgICByZXR1cm4gd2VhdGhlckRhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEFpclF1YWxpdHkobG9jYXRpb24pIHtcbiAgICBjb25zdCB3ZWF0aGVyUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtsb2NhdGlvbn0mdW5pdHM9bWV0cmljJkFQUElEPTY5YTBmZTlkODlhYTNjNTYyYzA5YTUwZmJkNTA1MDQ2YFxuICAgICk7XG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCB3ZWF0aGVyUmVzcG9uc2UuanNvbigpO1xuXG4gICAgbGV0IGxhdCA9IHdlYXRoZXJEYXRhLmNvb3JkLmxhdDtcbiAgICBsZXQgbG9uID0gd2VhdGhlckRhdGEuY29vcmQubG9uO1xuXG4gICAgY29uc3QgYWlyUXVhbGl0eVJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvYWlyX3BvbGx1dGlvbj9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mQVBQSUQ9NjlhMGZlOWQ4OWFhM2M1NjJjMDlhNTBmYmQ1MDUwNDZgXG4gICAgKTtcblxuICAgIGNvbnN0IGFpclF1YWxpdHlEYXRhID0gYXdhaXQgYWlyUXVhbGl0eVJlc3BvbnNlLmpzb24oKTtcblxuICAgIHJldHVybiBhaXJRdWFsaXR5RGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0Rm9yZWNhc3QobG9jYXRpb24pIHtcbiAgICBjb25zdCBmb3JlY2FzdFJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT0ke2xvY2F0aW9ufSZ1bml0cz1tZXRyaWMmYXBwaWQ9NjlhMGZlOWQ4OWFhM2M1NjJjMDlhNTBmYmQ1MDUwNDZgXG4gICAgKTtcblxuICAgIGNvbnN0IGZvcmVjYXN0RGF0YSA9IGF3YWl0IGZvcmVjYXN0UmVzcG9uc2UuanNvbigpO1xuXG4gICAgcmV0dXJuIGZvcmVjYXN0RGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlck1hcChsb2NhdGlvbikge31cblxuZXhwb3J0IHsgZ2V0V2VhdGhlciwgZ2V0QWlyUXVhbGl0eSwgZ2V0Rm9yZWNhc3QgfTtcbiIsIi8vIEZ1bmN0aW9ucyB0byBjcmVhdGUgYW5kIGRpc3BsYXkgRE9NIGVsZW1lbnRzXG5cbmltcG9ydCB7XG4gICAgY29udmVydFRpbWUsXG4gICAgY29udmVydFdpbmREaXJlY3Rpb24sXG4gICAgY2FwaXRhbGl6ZUZpcnN0TGV0dGVycyxcbn0gZnJvbSBcIi4vdXRpbHNcIjtcblxuZnVuY3Rpb24gcG9wdWxhdGVMb2NhdGlvbihkYXRhKSB7XG4gICAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvY2F0aW9uXCIpO1xuICAgIGxvY2F0aW9uLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGRhdGEpIHtcbiAgICAgICAgaWYgKHByb3BlcnR5ID09IFwiTG9jYXRpb25cIikge1xuICAgICAgICAgICAgbGV0IHJlZ2lvbk5hbWVzID0gbmV3IEludGwuRGlzcGxheU5hbWVzKFtcImVuXCJdLCB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJyZWdpb25cIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IGNvdW50cnkgPSByZWdpb25OYW1lcy5vZihgJHtkYXRhW3Byb3BlcnR5XVsxXX1gKTtcblxuICAgICAgICAgICAgbG9jYXRpb24uaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV1bMF19LCAke2NvdW50cnl9YDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVDdXJyZW50V2VhdGhlcihkYXRhKSB7XG4gICAgY29uc3QgY3VycmVudFRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnRUaW1lXCIpO1xuXG4gICAgY29uc3QgY3VycmVudFdlYXRoZXJEZXRhaWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgXCIuY3VycmVudFdlYXRoZXJEZXRhaWxzXCJcbiAgICApO1xuXG4gICAgY29uc3QgY3VycmVudENvbmRpdGlvbkljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBcIi5jdXJyZW50Q29uZGl0aW9uSWNvblwiXG4gICAgKTtcbiAgICBjb25zdCBjdXJyZW50Q29uZGl0aW9uTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIFwiLmN1cnJlbnRDb25kaXRpb25OYW1lXCJcbiAgICApO1xuICAgIGNvbnN0IGN1cnJlbnRUZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50VGVtcFwiKTtcblxuICAgIGN1cnJlbnRXZWF0aGVyRGV0YWlscy5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGN1cnJlbnRUZW1wLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGRhdGEpIHtcbiAgICAgICAgaWYgKHByb3BlcnR5ID09IFwiRGF0ZVwiKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0YVtwcm9wZXJ0eV1bMF0gKiAxMDAwKTtcblxuICAgICAgICAgICAgY29uc3QgaG91ciA9IGRhdGUuZ2V0VVRDSG91cnMoZGF0ZSk7XG4gICAgICAgICAgICBjb25zdCBtaW51dGUgPSBkYXRlLmdldFVUQ01pbnV0ZXMoZGF0ZSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBjb252ZXJ0VGltZShkYXRhW3Byb3BlcnR5XVsxXSwgaG91ciwgbWludXRlKTtcblxuICAgICAgICAgICAgY3VycmVudFRpbWUuaW5uZXJIVE1MID0gdGltZTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eSA9PSBcIlRlbXBlcmF0dXJlXCIpIHtcbiAgICAgICAgICAgIGN1cnJlbnRUZW1wLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldfWA7XG4gICAgICAgICAgICAvLyBVKzIxMDkgZm9yIEZhaHJlbmhlaXRcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eSA9PSBcIkNvbmRpdGlvblwiKSB7XG4gICAgICAgICAgICBjdXJyZW50Q29uZGl0aW9uTmFtZS5pbm5lckhUTUwgPSBgJHtjYXBpdGFsaXplRmlyc3RMZXR0ZXJzKFxuICAgICAgICAgICAgICAgIGRhdGFbcHJvcGVydHldWzBdXG4gICAgICAgICAgICApfWA7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGNvbmRpdGlvbiBJY29uIGFjY29yZGluZyB0byBuYW1lXG4gICAgICAgICAgICBjdXJyZW50Q29uZGl0aW9uSWNvbi5zcmMgPSBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7ZGF0YVtwcm9wZXJ0eV1bMV19QDJ4LnBuZ2A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB3ZWF0aGVySXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBjb25zdCBociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKTtcbiAgICAgICAgICAgIHdlYXRoZXJJdGVtLmNsYXNzTGlzdC5hZGQoXCJjdXJyZW50V2VhdGhlckl0ZW1cIik7XG5cbiAgICAgICAgICAgIGNvbnN0IHdlYXRoZXJJdGVtUHJvcGVydHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgY29uc3Qgd2VhdGhlckl0ZW1EYXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICAgICAgaWYgKHByb3BlcnR5ID09IFwiTG9jYXRpb25cIikge1xuICAgICAgICAgICAgICAgIHdlYXRoZXJJdGVtUHJvcGVydHkuaW5uZXJIVE1MID0gYCR7cHJvcGVydHl9YDtcblxuICAgICAgICAgICAgICAgIGxldCByZWdpb25OYW1lcyA9IG5ldyBJbnRsLkRpc3BsYXlOYW1lcyhbXCJlblwiXSwge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInJlZ2lvblwiLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGxldCBjb3VudHJ5ID0gcmVnaW9uTmFtZXMub2YoYCR7ZGF0YVtwcm9wZXJ0eV1bMV19YCk7XG5cbiAgICAgICAgICAgICAgICB3ZWF0aGVySXRlbURhdGEuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV1bMF19LCAke2NvdW50cnl9YDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHkgPT0gXCJXaW5kXCIpIHtcbiAgICAgICAgICAgICAgICB3ZWF0aGVySXRlbVByb3BlcnR5LmlubmVySFRNTCA9IGAke3Byb3BlcnR5fWA7XG4gICAgICAgICAgICAgICAgd2VhdGhlckl0ZW1EYXRhLmlubmVySFRNTCA9IGAke1xuICAgICAgICAgICAgICAgICAgICBkYXRhW3Byb3BlcnR5XVswXVxuICAgICAgICAgICAgICAgIH0gJHtjb252ZXJ0V2luZERpcmVjdGlvbihkYXRhW3Byb3BlcnR5XVsxXSl9YDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2VhdGhlckl0ZW1Qcm9wZXJ0eS5pbm5lckhUTUwgPSBgJHtwcm9wZXJ0eX1gO1xuICAgICAgICAgICAgICAgIHdlYXRoZXJJdGVtRGF0YS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2VhdGhlckl0ZW0uYXBwZW5kQ2hpbGQod2VhdGhlckl0ZW1Qcm9wZXJ0eSk7XG4gICAgICAgICAgICB3ZWF0aGVySXRlbS5hcHBlbmRDaGlsZCh3ZWF0aGVySXRlbURhdGEpO1xuXG4gICAgICAgICAgICBjdXJyZW50V2VhdGhlckRldGFpbHMuYXBwZW5kQ2hpbGQod2VhdGhlckl0ZW0pO1xuICAgICAgICAgICAgY3VycmVudFdlYXRoZXJEZXRhaWxzLmFwcGVuZENoaWxkKGhyKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVBaXJRdWFsaXR5KGRhdGEpIHtcbiAgICBjb25zdCBhaXJRdWFsaXR5Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5haXJRdWFsaXR5Q29udGFpbmVyXCIpO1xuXG4gICAgY29uc3QgYWlyUXVhbGl0eURpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpclF1YWxpdHlEaXNwbGF5XCIpO1xuICAgIC8vY29uc3QgaW5uZXJSaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbm5lclJpbmdcIik7XG4gICAgY29uc3QgZGlzcGxheVJpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpc3BsYXlSaW5nXCIpO1xuICAgIGNvbnN0IGFxaVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hcWlWYWx1ZVwiKTtcbiAgICBjb25zdCBhaXJRdWFsaXR5SGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5haXJRdWFsaXR5SGVhZGVyXCIpO1xuICAgIGNvbnN0IGFpclF1YWxpdHlQYXJhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5haXJRdWFsaXR5UGFyYVwiKTtcblxuICAgIC8vYWlyUXVhbGl0eURpc3BsYXkuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAvL2lubmVyUmluZy5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGFxaVZhbHVlLmlubmVySFRNTCA9IFwiXCI7XG4gICAgYWlyUXVhbGl0eUhlYWRlci5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGFpclF1YWxpdHlQYXJhLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBjb25zdCBvem9uZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wb25lbnRPem9uZSAudmFsdWVcIik7XG4gICAgY29uc3QgTjJWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcG9uZW50Tml0cm9nZW5EaW94aWRlIC52YWx1ZVwiKTtcbiAgICBjb25zdCBmaW5lUE1WYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcG9uZW50RmluZVBNIC52YWx1ZVwiKTtcbiAgICBjb25zdCBQTVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wb25lbnRQTSAudmFsdWVcIik7XG4gICAgY29uc3Qgc3VsZnVyRGlveGlkZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgXCIuY29tcG9uZW50U3VsZnVyRGlveGlkZSAudmFsdWVcIlxuICAgICk7XG4gICAgY29uc3QgY2FyYm9uTW9ub3hpZGVWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIFwiLmNvbXBvbmVudENhcmJvbk1vbm94aWRlIC52YWx1ZVwiXG4gICAgKTtcblxuICAgIG96b25lVmFsdWUuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBOMlZhbHVlLmlubmVySFRNTCA9IFwiXCI7XG4gICAgZmluZVBNVmFsdWUuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBQTVZhbHVlLmlubmVySFRNTCA9IFwiXCI7XG4gICAgc3VsZnVyRGlveGlkZVZhbHVlLmlubmVySFRNTCA9IFwiXCI7XG4gICAgY2FyYm9uTW9ub3hpZGVWYWx1ZS5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgY29uc3QgYWlyUXVhbGl0eURlc2NpcHRpb25zID0ge1xuICAgICAgICAxOiBbXG4gICAgICAgICAgICBcIkV4Y2VsbGVudFwiLFxuICAgICAgICAgICAgXCJUaGUgYWlyIHF1YWxpdHkgaXMgaWRlYWwgZm9yIG1vc3QgaW5kaXZpZHVhbHM7IEVuam95IHlvdXIgdXN1YWwgb3V0ZG9vciBhY3Rpdml0aWVzLlwiLFxuICAgICAgICBdLFxuICAgICAgICAyOiBbXG4gICAgICAgICAgICBcIkZhaXJcIixcbiAgICAgICAgICAgIFwiQWlyIHF1YWxpdHkgaXMgZmFpciBhbmQgaXMgbm90IGEgY29uY2VybiBmb3IgdGhlIGdlbmVyYWwgcHVibGljLiBObyBuZWVkIHRvIG1vZGlmeSB5b3VyIHVzdWFsIG91dGRvb3IgYWN0aXZpdGllcyB1bmxlc3MgeW91IGV4cGVyaWVuY2Ugc3ltcHRvbXMgc3VjaCBhcyBjb3VnaGluZyBhbmQgdGhyb2F0IGlycml0YXRpb24uXCIsXG4gICAgICAgIF0sXG4gICAgICAgIDM6IFtcbiAgICAgICAgICAgIFwiTW9kZXJhdGVcIixcbiAgICAgICAgICAgIFwiQWlyIHF1YWxpdHkgaXMgbW9kZXJhdGUgYW5kIHR5cGljYWxseSBzYWZlIGZvciB0aGUgZ2VuZXJhbCBwdWJsaWM7IENvbnNpZGVyIHJlZHVjaW5nIG9yIHJlc2NoZWR1bGluZyBzdHJlbnVvdXMgYWN0aXZpdGllcyBvdXRkb29ycyBpZiB5b3UgZXhwZXJpZW5jZSBzeW1wdG9tcyBzdWNoIGFzIGNvdWdoaW5nIGFuZCB0aHJvYXQgaXJyaXRhdGlvbi5cIixcbiAgICAgICAgXSxcbiAgICAgICAgNDogW1xuICAgICAgICAgICAgXCJQb29yXCIsXG4gICAgICAgICAgICBcIkFpciBxdWFsaXR5IGlzIHBvb3IgYW5kIHByZWNhdXRpb25zIHNob3VsZCBiZSBjb25zaWRlcmVkLiBSZWR1Y2Ugb3IgcmVzY2hlZHVsZSBzdHJlbnVvdXMgYWN0aXZpdGllcyBvdXRkb29ycy4gQ2hpbGRyZW4gYW5kIHRoZSBlbGRlcmx5IHNob3VsZCBhbHNvIHRha2UgaXQgZWFzeS5cIixcbiAgICAgICAgXSxcbiAgICAgICAgNTogW1xuICAgICAgICAgICAgXCJWZXJ5IFBvb3JcIixcbiAgICAgICAgICAgIFwiQWlyIHF1YWxpdHkgaXMgdmVyeSBwb29yOyBBdm9pZCBzdHJlbnVvdXMgYWN0aXZpdGllcyBvdXRkb29ycy4gQ2hpbGRyZW4gYW5kIHRoZSBlbGRlcmx5IHNob3VsZCBhbHNvIGF2b2lkIG91dGRvb3IgcGh5c2ljYWwgZXhlcnRpb24uXCIsXG4gICAgICAgIF0sXG4gICAgfTtcblxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZGF0YSkge1xuICAgICAgICBpZiAocHJvcGVydHkgPT0gXCJBUUlcIikge1xuICAgICAgICAgICAgbGV0IHNwZWVkID0gMzA7XG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3NWYWx1ZSA9IDA7XG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3NFbmRWYWx1ZSA9IGRhdGFbcHJvcGVydHldICogMjA7XG5cbiAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc1ZhbHVlICs9IDE7XG4gICAgICAgICAgICAgICAgLy9hcWlWYWx1ZS5pbm5lckhUTUwgPSBgJHtwcm9ncmVzc1ZhbHVlfSVgXG4gICAgICAgICAgICAgICAgZGlzcGxheVJpbmcuc3R5bGUuYmFja2dyb3VuZCA9IGBjb25pYy1ncmFkaWVudChcbiAgICAgICAgICAgICAgICAgICAgIzRkNWJmOSAke3Byb2dyZXNzVmFsdWUgKiAzLjZ9ZGVnLFxuICAgICAgICAgICAgICAgICAgICAjY2FkY2ZmICR7cHJvZ3Jlc3NWYWx1ZSAqIDMuNn1kZWdcbiAgICAgICAgICAgICAgICApYDtcbiAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3NWYWx1ZSA9PSBwcm9ncmVzc0VuZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocHJvZ3Jlc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHNwZWVkKTtcblxuICAgICAgICAgICAgYXFpVmFsdWUuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV19IEFRSWA7XG5cbiAgICAgICAgICAgIGFpclF1YWxpdHlIZWFkZXIuaW5uZXJIVE1MID1cbiAgICAgICAgICAgICAgICBhaXJRdWFsaXR5RGVzY2lwdGlvbnNbYCR7ZGF0YVtwcm9wZXJ0eV19YF1bMF07XG4gICAgICAgICAgICBhaXJRdWFsaXR5UGFyYS5pbm5lckhUTUwgPVxuICAgICAgICAgICAgICAgIGFpclF1YWxpdHlEZXNjaXB0aW9uc1tgJHtkYXRhW3Byb3BlcnR5XX1gXVsxXTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eSA9PSBcImNvbXBvbmVudHNcIikge1xuICAgICAgICAgICAgb3pvbmVWYWx1ZS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XS5vM30gJiMxODFnL208c3VwPjM8L3N1cD5gO1xuICAgICAgICAgICAgTjJWYWx1ZS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XS5ubzJ9ICYjMTgxZy9tPHN1cD4zPC9zdXA+YDtcbiAgICAgICAgICAgIGZpbmVQTVZhbHVlLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldLnBtMl81fSAmIzE4MWcvbTxzdXA+Mzwvc3VwPmA7XG4gICAgICAgICAgICBQTVZhbHVlLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldLnBtMTB9ICYjMTgxZy9tPHN1cD4zPC9zdXA+YDtcbiAgICAgICAgICAgIHN1bGZ1ckRpb3hpZGVWYWx1ZS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XS5zbzJ9ICYjMTgxZy9tPHN1cD4zPC9zdXA+YDtcbiAgICAgICAgICAgIGNhcmJvbk1vbm94aWRlVmFsdWUuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV0uY299ICYjMTgxZy9tPHN1cD4zPC9zdXA+YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGFpclF1YWxpdHlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpclF1YWxpdHlCdG5cIik7XG4gICAgYWlyUXVhbGl0eUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBhaXJRdWFsaXR5Q29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoXCJleHBhbmRBaXJRdWFsaXR5XCIpO1xuICAgICAgICBpZiAoYWlyUXVhbGl0eUJ0bi50ZXh0Q29udGVudCA9PSBcIk1vcmUgRGV0YWlsc1wiKSB7XG4gICAgICAgICAgICBhaXJRdWFsaXR5QnRuLnRleHRDb250ZW50ID0gXCJMZXNzIERldGFpbHNcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFpclF1YWxpdHlCdG4udGV4dENvbnRlbnQgPSBcIk1vcmUgRGV0YWlsc1wiO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlRm9yZWNhc3QoZGF0YSkge1xuICAgIGNvbnN0IGZvcmVjYXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JlY2FzdFwiKTtcbiAgICBmb3JlY2FzdC5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgY29uc3QgZm9yZWNhc3RUaWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZm9yZWNhc3RUaWxlLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdFRpbGVcIik7XG5cbiAgICAgICAgY29uc3QgZm9yZWNhc3RUaWxlTWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IGZvcmVjYXN0VGlsZURpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb25zdCBmb3JlY2FzdFRpbGVTdXBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICBmb3JlY2FzdFRpbGVNYWluLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdFRpbGVNYWluXCIpO1xuICAgICAgICBmb3JlY2FzdFRpbGVEaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdFRpbGVEaXNwbGF5XCIpO1xuICAgICAgICBmb3JlY2FzdFRpbGVTdXBwLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdFRpbGVTdXBwXCIpO1xuXG4gICAgICAgIGxldCB0aWxlRGF0YSA9IGRhdGFbaV07XG5cbiAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiB0aWxlRGF0YSkge1xuICAgICAgICAgICAgaWYgKHByb3BlcnR5ID09IFwiRGF0ZVwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSh0aWxlRGF0YVtwcm9wZXJ0eV1bMF0gKiAxMDAwKTtcbiAgICAgICAgICAgICAgICBsZXQgaG91ciA9IGRhdGUuZ2V0VVRDSG91cnMoZGF0ZSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICB0aW1lLmlubmVySFRNTCA9IGNvbnZlcnRUaW1lKHRpbGVEYXRhW3Byb3BlcnR5XVsxXSwgaG91cik7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVNYWluLmFwcGVuZENoaWxkKHRpbWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eSA9PSBcIkNvbmRpdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RJY29uXCIpO1xuXG4gICAgICAgICAgICAgICAgaWNvbi5zcmMgPSBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7dGlsZURhdGFbcHJvcGVydHldWzFdfUAyeC5wbmdgO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUaWxlRGlzcGxheS5hcHBlbmRDaGlsZChpY29uKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHkgPT0gXCJUZW1wZXJhdHVyZVwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9yZWNhc3RUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICAgICAgICAgIGZvcmVjYXN0VGVtcC5pbm5lckhUTUwgPSBgJHt0aWxlRGF0YVtwcm9wZXJ0eV19YDtcblxuICAgICAgICAgICAgICAgIGZvcmVjYXN0VGlsZURpc3BsYXkuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUZW1wKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVNYWluLmFwcGVuZENoaWxkKGZvcmVjYXN0VGlsZURpc3BsYXkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eSA9PSBcIlBvcFwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICAgICAgICAgIHBvcC5pbm5lckhUTUwgPSBgJHt0aWxlRGF0YVtwcm9wZXJ0eV19IHBvcGA7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVNYWluLmFwcGVuZENoaWxkKHBvcCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdEl0ZW1cIik7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKTtcbiAgICAgICAgICAgICAgICBoci5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RIclwiKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0SXRlbVByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JlY2FzdEl0ZW1EYXRhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbVByb3BlcnR5LmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdEl0ZW1Qcm9wZXJ0eVwiKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1EYXRhLmNsYXNzTGlzdC5hZGQoXCJmb3JlY2FzdEl0ZW1EYXRhXCIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5ID09IFwiV2luZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbVByb3BlcnR5LmlubmVySFRNTCA9IGAke3Byb3BlcnR5fWA7XG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbURhdGEuaW5uZXJIVE1MID0gYCR7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlRGF0YVtwcm9wZXJ0eV0uc3BlZWRcbiAgICAgICAgICAgICAgICAgICAgfSAke2NvbnZlcnRXaW5kRGlyZWN0aW9uKHRpbGVEYXRhW3Byb3BlcnR5XS5kaXJlY3Rpb24pfWA7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmFwcGVuZENoaWxkKGZvcmVjYXN0SXRlbVByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmFwcGVuZENoaWxkKGZvcmVjYXN0SXRlbURhdGEpO1xuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uYXBwZW5kQ2hpbGQoaHIpO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0VGlsZVN1cHAuYXBwZW5kQ2hpbGQoZm9yZWNhc3RJdGVtKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1Qcm9wZXJ0eS5pbm5lckhUTUwgPSBgJHtwcm9wZXJ0eX1gO1xuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1EYXRhLmlubmVySFRNTCA9IGAke3RpbGVEYXRhW3Byb3BlcnR5XX1gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW1Qcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmFwcGVuZENoaWxkKGZvcmVjYXN0SXRlbURhdGEpO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChocik7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVTdXBwLmFwcGVuZENoaWxkKGZvcmVjYXN0SXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBleHBhbmRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBleHBhbmRCdG4uY2xhc3NMaXN0LmFkZChcImV4cGFuZEJ0blwiKTtcbiAgICAgICAgZXhwYW5kQnRuLmlubmVySFRNTCA9IFwiJiM4OTY0XCI7XG5cbiAgICAgICAgZXhwYW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBmb3JlY2FzdFRpbGUuY2xhc3NMaXN0LnRvZ2dsZShcImV4cGFuZEZvcmVjYXN0XCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3JlY2FzdFRpbGVNYWluLmFwcGVuZENoaWxkKGV4cGFuZEJ0bik7XG5cbiAgICAgICAgZm9yZWNhc3RUaWxlLmFwcGVuZENoaWxkKGZvcmVjYXN0VGlsZU1haW4pO1xuICAgICAgICBmb3JlY2FzdFRpbGUuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUaWxlU3VwcCk7XG5cbiAgICAgICAgZm9yZWNhc3QuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUaWxlKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7XG4gICAgcG9wdWxhdGVMb2NhdGlvbixcbiAgICBwb3B1bGF0ZUN1cnJlbnRXZWF0aGVyLFxuICAgIHBvcHVsYXRlQWlyUXVhbGl0eSxcbiAgICBwb3B1bGF0ZUZvcmVjYXN0LFxufTtcbiIsIi8vIFV0aWxpdHkgZnVuY3Rpb25zIGZvciBXZWF0aGVyQXBwXG5cbmZ1bmN0aW9uIGNvbnZlcnRUaW1lKHRpbWV6b25lLCBob3VyLCBtaW51dGUpIHtcbiAgICAvLyBUYWtlcyB0aGUgaG91ciBpbiAyNGhyIHRpbWUgYW5kIGNvbnZlcnRzIGl0IHRvIDEyaHIgdGltZSB3aXRoIEFNIG9yIFBNXG4gICAgbGV0IG5ld1RpbWUgPSBcIlwiO1xuXG4gICAgY29uc3QgdGltZXpvbmVTaGlmdCA9IE1hdGguZmxvb3IodGltZXpvbmUgLyAzNjAwKTtcbiAgICBsZXQgYWRqdXN0ZWRIb3VyID0gaG91ciArIHRpbWV6b25lU2hpZnQ7XG5cbiAgICBpZiAoYWRqdXN0ZWRIb3VyIDwgMCkge1xuICAgICAgICBhZGp1c3RlZEhvdXIgPSBhZGp1c3RlZEhvdXIgKyAyNDtcbiAgICB9XG5cbiAgICBpZiAoIW1pbnV0ZSkge1xuICAgICAgICBpZiAoYWRqdXN0ZWRIb3VyIDwgMTIpIHtcbiAgICAgICAgICAgIG5ld1RpbWUgPSBgJHthZGp1c3RlZEhvdXIgJSAxMiB8fCAxMn1BTWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdUaW1lID0gYCR7YWRqdXN0ZWRIb3VyICUgMTIgfHwgMTJ9UE1gO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1pbnV0ZS50b1N0cmluZygpLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICBtaW51dGUgPSBcIjBcIiArIG1pbnV0ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWRqdXN0ZWRIb3VyIDwgMTIpIHtcbiAgICAgICAgICAgIG5ld1RpbWUgPSBgJHthZGp1c3RlZEhvdXIgJSAxMiB8fCAxMn06JHttaW51dGV9QU1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3VGltZSA9IGAke2FkanVzdGVkSG91ciAlIDEyIHx8IDEyfToke21pbnV0ZX1QTWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3VGltZTtcbn1cblxuZnVuY3Rpb24gY29udmVydFdpbmREaXJlY3Rpb24oZGVnKSB7XG4gICAgLy8gQ2hhbmdlIGluIGRpcmVjdGlvbiBldmVyeSAyMi41IGRlZ3JlZXNcbiAgICBjb25zdCB2YWwgPSBNYXRoLmZsb29yKGRlZyAvIDIyLjUgKyAwLjUpO1xuICAgIGNvbnN0IGNvbXBhc3NEaXJlY3Rpb25zID0gW1xuICAgICAgICBcIk5cIixcbiAgICAgICAgXCJOTkVcIixcbiAgICAgICAgXCJORVwiLFxuICAgICAgICBcIkVORVwiLFxuICAgICAgICBcIkVcIixcbiAgICAgICAgXCJFU0VcIixcbiAgICAgICAgXCJTRVwiLFxuICAgICAgICBcIlNTRVwiLFxuICAgICAgICBcIlNcIixcbiAgICAgICAgXCJTU1dcIixcbiAgICAgICAgXCJTV1wiLFxuICAgICAgICBcIldTV1wiLFxuICAgICAgICBcIldcIixcbiAgICAgICAgXCJXTldcIixcbiAgICAgICAgXCJOV1wiLFxuICAgICAgICBcIk5OV1wiLFxuICAgIF07XG5cbiAgICBjb25zdCBkaXJlY3Rpb24gPSBjb21wYXNzRGlyZWN0aW9uc1t2YWwgJSAxNl07XG5cbiAgICByZXR1cm4gZGlyZWN0aW9uO1xufVxuXG5mdW5jdGlvbiBjYXBpdGFsaXplRmlyc3RMZXR0ZXJzKHBocmFzZSkge1xuICAgIGNvbnN0IHdvcmRzID0gcGhyYXNlLnNwbGl0KFwiIFwiKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgd29yZHNbaV0gPSB3b3Jkc1tpXVswXS50b1VwcGVyQ2FzZSgpICsgd29yZHNbaV0uc3Vic3RyKDEpO1xuICAgIH1cblxuICAgIHJldHVybiB3b3Jkcy5qb2luKFwiIFwiKTtcbn1cblxuZXhwb3J0IHsgY29udmVydFRpbWUsIGNvbnZlcnRXaW5kRGlyZWN0aW9uLCBjYXBpdGFsaXplRmlyc3RMZXR0ZXJzIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIFNvdXJjZSBpbmRleCBzY3JpcHQgZm9yIFdlYXRoZXIgQXBwXG5cbmltcG9ydCB7IGdldFdlYXRoZXIsIGdldEFpclF1YWxpdHksIGdldEZvcmVjYXN0IH0gZnJvbSBcIi4vYXBpRnVuY3Rpb25zXCI7XG5pbXBvcnQge1xuICAgIHBvcHVsYXRlTG9jYXRpb24sXG4gICAgcG9wdWxhdGVDdXJyZW50V2VhdGhlcixcbiAgICBwb3B1bGF0ZUFpclF1YWxpdHksXG4gICAgcG9wdWxhdGVGb3JlY2FzdCxcbn0gZnJvbSBcIi4vZG9tRnVuY3Rpb25zXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NXZWF0aGVyKGxvY2F0aW9uKSB7XG4gICAgLy8gR2V0cyBkYXRhIGZyb20gZ2V0IHdlYXRoZXIgYXBpRnVuY3Rpb25zIGZ1bmN0aW9uIGFuZCBnYXRoZXJzIHJlbGF2ZW50IGluZm8gZm9yIGRpc3BsYXlcbiAgICAvLyBOZWVkIHRvIGFkZCB0cnkvY2F0Y2ggdG8gaGFuZGxlIGVycm9yc1xuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgZ2V0V2VhdGhlcihsb2NhdGlvbik7XG5cbiAgICBjb25zb2xlLmxvZyh3ZWF0aGVyRGF0YSk7XG5cbiAgICBsZXQgaW1wb3J0YW50RGF0YSA9IHt9O1xuXG4gICAgaW1wb3J0YW50RGF0YS5Mb2NhdGlvbiA9IFt3ZWF0aGVyRGF0YS5uYW1lLCB3ZWF0aGVyRGF0YS5zeXMuY291bnRyeV07XG4gICAgaW1wb3J0YW50RGF0YS5EYXRlID0gW3dlYXRoZXJEYXRhLmR0LCB3ZWF0aGVyRGF0YS50aW1lem9uZV07XG4gICAgaW1wb3J0YW50RGF0YS5UZW1wZXJhdHVyZSA9IGAke3dlYXRoZXJEYXRhLm1haW4udGVtcH0gJiM4NDUxYDtcbiAgICBpbXBvcnRhbnREYXRhW1wiRmVlbHMgTGlrZVwiXSA9IGAke3dlYXRoZXJEYXRhLm1haW4uZmVlbHNfbGlrZX0gJiM4NDUxYDtcbiAgICBpbXBvcnRhbnREYXRhLkh1bWlkaXR5ID0gYCR7d2VhdGhlckRhdGEubWFpbi5odW1pZGl0eX0gJWA7XG4gICAgaW1wb3J0YW50RGF0YS5XaW5kID0gW1xuICAgICAgICBgJHtNYXRoLnJvdW5kKHdlYXRoZXJEYXRhLndpbmQuc3BlZWQgKiAzLjYgKiAxMDApIC8gMTAwfSBrbS9ocmAsXG4gICAgICAgIHdlYXRoZXJEYXRhLndpbmQuZGVnLFxuICAgIF07XG5cbiAgICBpZiAod2VhdGhlckRhdGEud2luZC5ndXN0KSB7XG4gICAgICAgIGltcG9ydGFudERhdGEuR3VzdCA9IGAke1xuICAgICAgICAgICAgTWF0aC5yb3VuZCh3ZWF0aGVyRGF0YS53aW5kLmd1c3QgKiAzLjYgKiAxMDApIC8gMTAwXG4gICAgICAgIH0ga20vaHJgO1xuICAgIH1cblxuICAgIGlmICh3ZWF0aGVyRGF0YS5yYWluKSB7XG4gICAgICAgIGltcG9ydGFudERhdGEuUmFpbiA9IGAke3dlYXRoZXJEYXRhLnJhaW5bXCIxaFwiXX0gbW1gO1xuICAgIH1cblxuICAgIGltcG9ydGFudERhdGEuQ29uZGl0aW9uID0gW1xuICAgICAgICB3ZWF0aGVyRGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICB3ZWF0aGVyRGF0YS53ZWF0aGVyWzBdLmljb24sXG4gICAgXTtcblxuICAgIC8vIEZvcm1hdCB0aGlzIG9iamVjdCBiZXR0ZXJcbiAgICAvLyBPYmplY3QgQ29uc3RydWN0b3IgYW5kIGNyZWF0ZSBtZXRob2QgdG8gY29udmVydCB0byBkaWZmZXJlbnQgdW5pdHNcblxuICAgIHJldHVybiBpbXBvcnRhbnREYXRhO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzQWlyUXVhbGl0eShsb2NhdGlvbikge1xuICAgIC8vIEdldHMgZGF0YSBmcm9tIGFpciBxdWFsaXR5IGFwaUZ1bmN0aW9ucyBmdW5jdGlvbiBhbmQgZ2F0aGVycyByZWxhdmVudCBpbmZvIGZvciBkaXNwbGF5XG5cbiAgICBjb25zdCBhaXJRdWFsaXR5RGF0YSA9IGF3YWl0IGdldEFpclF1YWxpdHkobG9jYXRpb24pO1xuICAgIGNvbnNvbGUubG9nKGFpclF1YWxpdHlEYXRhKTtcblxuICAgIGxldCBpbXBvcnRhbnREYXRhID0ge307XG5cbiAgICBpbXBvcnRhbnREYXRhLkFRSSA9IGFpclF1YWxpdHlEYXRhLmxpc3RbMF0ubWFpbi5hcWk7XG4gICAgaW1wb3J0YW50RGF0YS5jb21wb25lbnRzID0gYWlyUXVhbGl0eURhdGEubGlzdFswXS5jb21wb25lbnRzO1xuXG4gICAgcmV0dXJuIGltcG9ydGFudERhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NGb3JlY2FzdChsb2NhdGlvbikge1xuICAgIC8vIEdldHMgZGF0YSBmcm9tIGZvcmVjYXN0IGFwaUZ1bmN0aW9ucyBmdW5jdGlvbiBhbmQgZ2F0aGVycyByZWxhdmVudCBpbmZvIGZvciBkaXNwbGF5XG5cbiAgICBjb25zdCBmb3JlY2FzdERhdGEgPSBhd2FpdCBnZXRGb3JlY2FzdChsb2NhdGlvbik7XG4gICAgY29uc29sZS5sb2coZm9yZWNhc3REYXRhKTtcblxuICAgIGxldCBpbXBvcnRhbnREYXRhID0gW107XG5cbiAgICBmb3IgKGNvbnN0IGluZGV4IGluIGZvcmVjYXN0RGF0YS5saXN0KSB7XG4gICAgICAgIGltcG9ydGFudERhdGFbaW5kZXhdID0ge307XG4gICAgICAgIGltcG9ydGFudERhdGFbaW5kZXhdLkRhdGUgPSBbXG4gICAgICAgICAgICBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0uZHQsXG4gICAgICAgICAgICBmb3JlY2FzdERhdGEuY2l0eS50aW1lem9uZSxcbiAgICAgICAgXTtcbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF0uQ29uZGl0aW9uID0gW1xuICAgICAgICAgICAgZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ud2VhdGhlclswXS5pY29uLFxuICAgICAgICBdO1xuICAgICAgICBpbXBvcnRhbnREYXRhW1xuICAgICAgICAgICAgaW5kZXhcbiAgICAgICAgXS5UZW1wZXJhdHVyZSA9IGAke2ZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS5tYWluLnRlbXB9ICYjODQ1MWA7XG4gICAgICAgIGltcG9ydGFudERhdGFbaW5kZXhdLlBvcCA9IGAke01hdGgucm91bmQoXG4gICAgICAgICAgICBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ucG9wICogMTAwXG4gICAgICAgICl9ICVgO1xuXG4gICAgICAgIGltcG9ydGFudERhdGFbaW5kZXhdW1xuICAgICAgICAgICAgXCJGZWVscyBMaWtlXCJcbiAgICAgICAgXSA9IGAke2ZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS5tYWluLmZlZWxzX2xpa2V9ICYjODQ1MWA7XG4gICAgICAgIGltcG9ydGFudERhdGFbXG4gICAgICAgICAgICBpbmRleFxuICAgICAgICBdLkh1bWlkaXR5ID0gYCR7Zm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLm1haW4uaHVtaWRpdHl9JWA7XG5cbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF1bXG4gICAgICAgICAgICBcIkNsb3VkIENvdmVyXCJcbiAgICAgICAgXSA9IGAke2ZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS5jbG91ZHMuYWxsfSAlYDtcbiAgICAgICAgaW1wb3J0YW50RGF0YVtcbiAgICAgICAgICAgIGluZGV4XG4gICAgICAgIF0uVmlzaWJpbGl0eSA9IGAke2ZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS52aXNpYmlsaXR5fSBrbWA7XG5cbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF0uV2luZCA9IHtcbiAgICAgICAgICAgIHNwZWVkOiBgJHtcbiAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKGZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS53aW5kLnNwZWVkICogMy42ICogMTAwKSAvXG4gICAgICAgICAgICAgICAgMTAwXG4gICAgICAgICAgICB9IGttL2hyYCxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLndpbmQuZGVnLFxuICAgICAgICB9O1xuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XS5HdXN0ID0gYCR7XG4gICAgICAgICAgICBNYXRoLnJvdW5kKGZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS53aW5kLmd1c3QgKiAzLjYgKiAxMDApIC8gMTAwXG4gICAgICAgIH0ga20vaHJgO1xuICAgIH1cblxuICAgIHJldHVybiBpbXBvcnRhbnREYXRhO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzTWFwKCkge1xuICAgIC8vIEdldHMgZGF0YSBmcm9tIG1hcCBhcGlGdW5jdGlvbnMgZnVuY3Rpb24gYW5kIGdhdGhlcnMgcmVsYXZlbnQgaW5mbyBmb3IgZGlzcGxheVxufVxuXG5hc3luYyBmdW5jdGlvbiBsb2FkUGFnZShsb2NhdGlvbikge1xuICAgIC8vIEFkZCBzb21lIHZpc3VhbCBpbmRpY2F0aW9uIHRoYXQgd2UncmUgd2FpdGluZyBmb3IgdGhlIGRhdGEgKHByb21pc2UuYWxsKSBiZWZvcmUgaXQgZ2V0cyBkaXNwbGF5ZWQgKE1hcCB3b3VsZCBsaWtleSB0YWtlIHRoZSBsb25nZXN0IHRvIGRpc3BsYXkpXG4gICAgLy9Db3VsZCBhZGQgYSBjbGFzcyB0byBjaGFuZ2UgdGhlIGRpc3BsYXkgcHJpb3IgdG8gcHJvbWlzZS5hbGwgc2hvd2luZyB0aGF0IGl0J3MgbG9hZGluZywgYW5kIHJlbW92ZSBpdCB0byBzaG93IGRhdGEgaWYgc3VjY2Vzc2Z1bCBvciBkaXNwbGF5IGEgbm8gcmVzdWx0cyBmb3VuZCBwYWdlIGlmIGVycm9yXG5cbiAgICAvLyBVc2UgYSBwcm9taXNlLmFsbCB0byB3YWl0IGZvciBhbGwgcHJvY2Vzc2luZyB0byBjb21wbGV0ZSBiZWZvcmUgZGlzcGxheWluZyBkYXRhXG5cbiAgICBQcm9taXNlLmFsbChbXG4gICAgICAgIHByb2Nlc3NXZWF0aGVyKGxvY2F0aW9uKSxcbiAgICAgICAgcHJvY2Vzc0FpclF1YWxpdHkobG9jYXRpb24pLFxuICAgICAgICBwcm9jZXNzRm9yZWNhc3QobG9jYXRpb24pLFxuICAgIF0pLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgcG9wdWxhdGVMb2NhdGlvbihkYXRhWzBdKTtcbiAgICAgICAgcG9wdWxhdGVDdXJyZW50V2VhdGhlcihkYXRhWzBdKTtcbiAgICAgICAgcG9wdWxhdGVBaXJRdWFsaXR5KGRhdGFbMV0pO1xuICAgICAgICBwb3B1bGF0ZUZvcmVjYXN0KGRhdGFbMl0pO1xuICAgIH0pO1xufVxuXG5jb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Ym1pdEJ0blwiKTtcblxuc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoXCIpO1xuXG4gICAgbG9hZFBhZ2Uoc2VhcmNoLnZhbHVlKTtcblxuICAgIHNlYXJjaC52YWx1ZSA9IFwiXCI7XG59KTtcblxubG9hZFBhZ2UoXCJMb25kb25cIik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=