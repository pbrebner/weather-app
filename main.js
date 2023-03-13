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

function startLoadingAnimation() {
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
            //console.log(data);
            (0,_domFunctions__WEBPACK_IMPORTED_MODULE_1__.populateLocation)(data[0]);
            (0,_domFunctions__WEBPACK_IMPORTED_MODULE_1__.populateCurrentWeather)(data[0]);
            (0,_domFunctions__WEBPACK_IMPORTED_MODULE_1__.populateAirQuality)(data[1]);
            (0,_domFunctions__WEBPACK_IMPORTED_MODULE_1__.populateForecast)(data[2]);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            (0,_domFunctions__WEBPACK_IMPORTED_MODULE_1__.endLoadingAnimation)();
        });

    //endLoadingAnimation();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZUFBZSxxQ0FBcUM7QUFDcEQ7QUFDQTtBQUNBLDBCQUEwQixxQ0FBcUM7O0FBRS9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUksb0VBQXFCOztBQUV6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksK0RBQWdCO0FBQzVCLFlBQVkscUVBQXNCO0FBQ2xDLFlBQVksaUVBQWtCO0FBQzlCLFlBQVksK0RBQWdCO0FBQzVCLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsWUFBWSxrRUFBbUI7QUFDL0IsU0FBUzs7QUFFVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hcGlGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZG9tRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRnVuY3Rpb25zIHRvIGZldGNoIHdlYXRoZXIgZGF0YSB0aHJvdWdoIEFQSVxuXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyKGxvY2F0aW9uKSB7XG4gICAgY29uc3Qgd2VhdGhlclJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7bG9jYXRpb259JnVuaXRzPW1ldHJpYyZBUFBJRD02OWEwZmU5ZDg5YWEzYzU2MmMwOWE1MGZiZDUwNTA0NmBcbiAgICApO1xuXG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCB3ZWF0aGVyUmVzcG9uc2UuanNvbigpO1xuXG4gICAgcmV0dXJuIHdlYXRoZXJEYXRhO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRBaXJRdWFsaXR5KGxvY2F0aW9uKSB7XG4gICAgY29uc3Qgd2VhdGhlclJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7bG9jYXRpb259JnVuaXRzPW1ldHJpYyZBUFBJRD02OWEwZmU5ZDg5YWEzYzU2MmMwOWE1MGZiZDUwNTA0NmBcbiAgICApO1xuICAgIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgd2VhdGhlclJlc3BvbnNlLmpzb24oKTtcblxuICAgIGxldCBsYXQgPSB3ZWF0aGVyRGF0YS5jb29yZC5sYXQ7XG4gICAgbGV0IGxvbiA9IHdlYXRoZXJEYXRhLmNvb3JkLmxvbjtcblxuICAgIGNvbnN0IGFpclF1YWxpdHlSZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2Fpcl9wb2xsdXRpb24/bGF0PSR7bGF0fSZsb249JHtsb259JkFQUElEPTY5YTBmZTlkODlhYTNjNTYyYzA5YTUwZmJkNTA1MDQ2YFxuICAgICk7XG5cbiAgICBjb25zdCBhaXJRdWFsaXR5RGF0YSA9IGF3YWl0IGFpclF1YWxpdHlSZXNwb25zZS5qc29uKCk7XG5cbiAgICByZXR1cm4gYWlyUXVhbGl0eURhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEZvcmVjYXN0KGxvY2F0aW9uKSB7XG4gICAgY29uc3QgZm9yZWNhc3RSZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtsb2NhdGlvbn0mdW5pdHM9bWV0cmljJmFwcGlkPTY5YTBmZTlkODlhYTNjNTYyYzA5YTUwZmJkNTA1MDQ2YFxuICAgICk7XG5cbiAgICBjb25zdCBmb3JlY2FzdERhdGEgPSBhd2FpdCBmb3JlY2FzdFJlc3BvbnNlLmpzb24oKTtcblxuICAgIHJldHVybiBmb3JlY2FzdERhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJNYXAobG9jYXRpb24pIHt9XG5cbmV4cG9ydCB7IGdldFdlYXRoZXIsIGdldEFpclF1YWxpdHksIGdldEZvcmVjYXN0IH07XG4iLCIvLyBGdW5jdGlvbnMgdG8gY3JlYXRlIGFuZCBkaXNwbGF5IERPTSBlbGVtZW50c1xuXG5pbXBvcnQge1xuICAgIGNvbnZlcnRUaW1lLFxuICAgIGNvbnZlcnRXaW5kRGlyZWN0aW9uLFxuICAgIGNhcGl0YWxpemVGaXJzdExldHRlcnMsXG59IGZyb20gXCIuL3V0aWxzXCI7XG5cbmZ1bmN0aW9uIHBvcHVsYXRlTG9jYXRpb24oZGF0YSkge1xuICAgIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2NhdGlvblwiKTtcbiAgICBsb2NhdGlvbi5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBkYXRhKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0eSA9PSBcIkxvY2F0aW9uXCIpIHtcbiAgICAgICAgICAgIGxldCByZWdpb25OYW1lcyA9IG5ldyBJbnRsLkRpc3BsYXlOYW1lcyhbXCJlblwiXSwge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwicmVnaW9uXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBjb3VudHJ5ID0gcmVnaW9uTmFtZXMub2YoYCR7ZGF0YVtwcm9wZXJ0eV1bMV19YCk7XG5cbiAgICAgICAgICAgIGxvY2F0aW9uLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldWzBdfSwgJHtjb3VudHJ5fWA7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlQ3VycmVudFdlYXRoZXIoZGF0YSkge1xuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50VGltZVwiKTtcblxuICAgIGNvbnN0IGN1cnJlbnRXZWF0aGVyRGV0YWlscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIFwiLmN1cnJlbnRXZWF0aGVyRGV0YWlsc1wiXG4gICAgKTtcblxuICAgIGNvbnN0IGN1cnJlbnRDb25kaXRpb25JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgXCIuY3VycmVudENvbmRpdGlvbkljb25cIlxuICAgICk7XG4gICAgY29uc3QgY3VycmVudENvbmRpdGlvbk5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBcIi5jdXJyZW50Q29uZGl0aW9uTmFtZVwiXG4gICAgKTtcbiAgICBjb25zdCBjdXJyZW50VGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudFRlbXBcIik7XG5cbiAgICBjdXJyZW50V2VhdGhlckRldGFpbHMuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBjdXJyZW50VGVtcC5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBkYXRhKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0eSA9PSBcIkRhdGVcIikge1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGFbcHJvcGVydHldWzBdICogMTAwMCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGhvdXIgPSBkYXRlLmdldFVUQ0hvdXJzKGRhdGUpO1xuICAgICAgICAgICAgY29uc3QgbWludXRlID0gZGF0ZS5nZXRVVENNaW51dGVzKGRhdGUpO1xuXG4gICAgICAgICAgICBjb25zdCB0aW1lID0gY29udmVydFRpbWUoZGF0YVtwcm9wZXJ0eV1bMV0sIGhvdXIsIG1pbnV0ZSk7XG5cbiAgICAgICAgICAgIGN1cnJlbnRUaW1lLmlubmVySFRNTCA9IHRpbWU7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHkgPT0gXCJUZW1wZXJhdHVyZVwiKSB7XG4gICAgICAgICAgICBjdXJyZW50VGVtcC5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XX1gO1xuICAgICAgICAgICAgLy8gVSsyMTA5IGZvciBGYWhyZW5oZWl0XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHkgPT0gXCJDb25kaXRpb25cIikge1xuICAgICAgICAgICAgY3VycmVudENvbmRpdGlvbk5hbWUuaW5uZXJIVE1MID0gYCR7Y2FwaXRhbGl6ZUZpcnN0TGV0dGVycyhcbiAgICAgICAgICAgICAgICBkYXRhW3Byb3BlcnR5XVswXVxuICAgICAgICAgICAgKX1gO1xuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBjb25kaXRpb24gSWNvbiBhY2NvcmRpbmcgdG8gbmFtZVxuICAgICAgICAgICAgY3VycmVudENvbmRpdGlvbkljb24uc3JjID0gYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2RhdGFbcHJvcGVydHldWzFdfUAyeC5wbmdgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgd2VhdGhlckl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgY29uc3QgaHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIik7XG4gICAgICAgICAgICB3ZWF0aGVySXRlbS5jbGFzc0xpc3QuYWRkKFwiY3VycmVudFdlYXRoZXJJdGVtXCIpO1xuXG4gICAgICAgICAgICBjb25zdCB3ZWF0aGVySXRlbVByb3BlcnR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGNvbnN0IHdlYXRoZXJJdGVtRGF0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PSBcIkxvY2F0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICB3ZWF0aGVySXRlbVByb3BlcnR5LmlubmVySFRNTCA9IGAke3Byb3BlcnR5fWA7XG5cbiAgICAgICAgICAgICAgICBsZXQgcmVnaW9uTmFtZXMgPSBuZXcgSW50bC5EaXNwbGF5TmFtZXMoW1wiZW5cIl0sIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJyZWdpb25cIixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBsZXQgY291bnRyeSA9IHJlZ2lvbk5hbWVzLm9mKGAke2RhdGFbcHJvcGVydHldWzFdfWApO1xuXG4gICAgICAgICAgICAgICAgd2VhdGhlckl0ZW1EYXRhLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldWzBdfSwgJHtjb3VudHJ5fWA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BlcnR5ID09IFwiV2luZFwiKSB7XG4gICAgICAgICAgICAgICAgd2VhdGhlckl0ZW1Qcm9wZXJ0eS5pbm5lckhUTUwgPSBgJHtwcm9wZXJ0eX1gO1xuICAgICAgICAgICAgICAgIHdlYXRoZXJJdGVtRGF0YS5pbm5lckhUTUwgPSBgJHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVtwcm9wZXJ0eV1bMF1cbiAgICAgICAgICAgICAgICB9ICR7Y29udmVydFdpbmREaXJlY3Rpb24oZGF0YVtwcm9wZXJ0eV1bMV0pfWA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdlYXRoZXJJdGVtUHJvcGVydHkuaW5uZXJIVE1MID0gYCR7cHJvcGVydHl9YDtcbiAgICAgICAgICAgICAgICB3ZWF0aGVySXRlbURhdGEuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV19YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdlYXRoZXJJdGVtLmFwcGVuZENoaWxkKHdlYXRoZXJJdGVtUHJvcGVydHkpO1xuICAgICAgICAgICAgd2VhdGhlckl0ZW0uYXBwZW5kQ2hpbGQod2VhdGhlckl0ZW1EYXRhKTtcblxuICAgICAgICAgICAgY3VycmVudFdlYXRoZXJEZXRhaWxzLmFwcGVuZENoaWxkKHdlYXRoZXJJdGVtKTtcbiAgICAgICAgICAgIGN1cnJlbnRXZWF0aGVyRGV0YWlscy5hcHBlbmRDaGlsZChocik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlQWlyUXVhbGl0eShkYXRhKSB7XG4gICAgY29uc3QgYWlyUXVhbGl0eUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlyUXVhbGl0eUNvbnRhaW5lclwiKTtcblxuICAgIGNvbnN0IGFpclF1YWxpdHlEaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5haXJRdWFsaXR5RGlzcGxheVwiKTtcbiAgICAvL2NvbnN0IGlubmVyUmluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5uZXJSaW5nXCIpO1xuICAgIGNvbnN0IGRpc3BsYXlSaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaXNwbGF5UmluZ1wiKTtcbiAgICBjb25zdCBhcWlWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXFpVmFsdWVcIik7XG4gICAgY29uc3QgYWlyUXVhbGl0eUhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlyUXVhbGl0eUhlYWRlclwiKTtcbiAgICBjb25zdCBhaXJRdWFsaXR5UGFyYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlyUXVhbGl0eVBhcmFcIik7XG5cbiAgICAvL2FpclF1YWxpdHlEaXNwbGF5LmlubmVySFRNTCA9IFwiXCI7XG4gICAgLy9pbm5lclJpbmcuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBhcWlWYWx1ZS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGFpclF1YWxpdHlIZWFkZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBhaXJRdWFsaXR5UGFyYS5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgY29uc3Qgb3pvbmVWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcG9uZW50T3pvbmUgLnZhbHVlXCIpO1xuICAgIGNvbnN0IE4yVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXBvbmVudE5pdHJvZ2VuRGlveGlkZSAudmFsdWVcIik7XG4gICAgY29uc3QgZmluZVBNVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXBvbmVudEZpbmVQTSAudmFsdWVcIik7XG4gICAgY29uc3QgUE1WYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcG9uZW50UE0gLnZhbHVlXCIpO1xuICAgIGNvbnN0IHN1bGZ1ckRpb3hpZGVWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIFwiLmNvbXBvbmVudFN1bGZ1ckRpb3hpZGUgLnZhbHVlXCJcbiAgICApO1xuICAgIGNvbnN0IGNhcmJvbk1vbm94aWRlVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBcIi5jb21wb25lbnRDYXJib25Nb25veGlkZSAudmFsdWVcIlxuICAgICk7XG5cbiAgICBvem9uZVZhbHVlLmlubmVySFRNTCA9IFwiXCI7XG4gICAgTjJWYWx1ZS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGZpbmVQTVZhbHVlLmlubmVySFRNTCA9IFwiXCI7XG4gICAgUE1WYWx1ZS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHN1bGZ1ckRpb3hpZGVWYWx1ZS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGNhcmJvbk1vbm94aWRlVmFsdWUuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIGNvbnN0IGFpclF1YWxpdHlEZXNjaXB0aW9ucyA9IHtcbiAgICAgICAgMTogW1xuICAgICAgICAgICAgXCJFeGNlbGxlbnRcIixcbiAgICAgICAgICAgIFwiVGhlIGFpciBxdWFsaXR5IGlzIGlkZWFsIGZvciBtb3N0IGluZGl2aWR1YWxzOyBFbmpveSB5b3VyIHVzdWFsIG91dGRvb3IgYWN0aXZpdGllcy5cIixcbiAgICAgICAgXSxcbiAgICAgICAgMjogW1xuICAgICAgICAgICAgXCJGYWlyXCIsXG4gICAgICAgICAgICBcIkFpciBxdWFsaXR5IGlzIGZhaXIgYW5kIGlzIG5vdCBhIGNvbmNlcm4gZm9yIHRoZSBnZW5lcmFsIHB1YmxpYy4gTm8gbmVlZCB0byBtb2RpZnkgeW91ciB1c3VhbCBvdXRkb29yIGFjdGl2aXRpZXMgdW5sZXNzIHlvdSBleHBlcmllbmNlIHN5bXB0b21zIHN1Y2ggYXMgY291Z2hpbmcgYW5kIHRocm9hdCBpcnJpdGF0aW9uLlwiLFxuICAgICAgICBdLFxuICAgICAgICAzOiBbXG4gICAgICAgICAgICBcIk1vZGVyYXRlXCIsXG4gICAgICAgICAgICBcIkFpciBxdWFsaXR5IGlzIG1vZGVyYXRlIGFuZCB0eXBpY2FsbHkgc2FmZSBmb3IgdGhlIGdlbmVyYWwgcHVibGljOyBDb25zaWRlciByZWR1Y2luZyBvciByZXNjaGVkdWxpbmcgc3RyZW51b3VzIGFjdGl2aXRpZXMgb3V0ZG9vcnMgaWYgeW91IGV4cGVyaWVuY2Ugc3ltcHRvbXMgc3VjaCBhcyBjb3VnaGluZyBhbmQgdGhyb2F0IGlycml0YXRpb24uXCIsXG4gICAgICAgIF0sXG4gICAgICAgIDQ6IFtcbiAgICAgICAgICAgIFwiUG9vclwiLFxuICAgICAgICAgICAgXCJBaXIgcXVhbGl0eSBpcyBwb29yIGFuZCBwcmVjYXV0aW9ucyBzaG91bGQgYmUgY29uc2lkZXJlZC4gUmVkdWNlIG9yIHJlc2NoZWR1bGUgc3RyZW51b3VzIGFjdGl2aXRpZXMgb3V0ZG9vcnMuIENoaWxkcmVuIGFuZCB0aGUgZWxkZXJseSBzaG91bGQgYWxzbyB0YWtlIGl0IGVhc3kuXCIsXG4gICAgICAgIF0sXG4gICAgICAgIDU6IFtcbiAgICAgICAgICAgIFwiVmVyeSBQb29yXCIsXG4gICAgICAgICAgICBcIkFpciBxdWFsaXR5IGlzIHZlcnkgcG9vcjsgQXZvaWQgc3RyZW51b3VzIGFjdGl2aXRpZXMgb3V0ZG9vcnMuIENoaWxkcmVuIGFuZCB0aGUgZWxkZXJseSBzaG91bGQgYWxzbyBhdm9pZCBvdXRkb29yIHBoeXNpY2FsIGV4ZXJ0aW9uLlwiLFxuICAgICAgICBdLFxuICAgIH07XG5cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGRhdGEpIHtcbiAgICAgICAgaWYgKHByb3BlcnR5ID09IFwiQVFJXCIpIHtcbiAgICAgICAgICAgIGxldCBzcGVlZCA9IDMwO1xuICAgICAgICAgICAgbGV0IHByb2dyZXNzVmFsdWUgPSAwO1xuICAgICAgICAgICAgbGV0IHByb2dyZXNzRW5kVmFsdWUgPSBkYXRhW3Byb3BlcnR5XSAqIDIwO1xuXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NWYWx1ZSArPSAxO1xuICAgICAgICAgICAgICAgIC8vYXFpVmFsdWUuaW5uZXJIVE1MID0gYCR7cHJvZ3Jlc3NWYWx1ZX0lYFxuICAgICAgICAgICAgICAgIGRpc3BsYXlSaW5nLnN0eWxlLmJhY2tncm91bmQgPSBgY29uaWMtZ3JhZGllbnQoXG4gICAgICAgICAgICAgICAgICAgICM0ZDViZjkgJHtwcm9ncmVzc1ZhbHVlICogMy42fWRlZyxcbiAgICAgICAgICAgICAgICAgICAgI2NhZGNmZiAke3Byb2dyZXNzVmFsdWUgKiAzLjZ9ZGVnXG4gICAgICAgICAgICAgICAgKWA7XG4gICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzVmFsdWUgPT0gcHJvZ3Jlc3NFbmRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHByb2dyZXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBzcGVlZCk7XG5cbiAgICAgICAgICAgIGFxaVZhbHVlLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldfSBBUUlgO1xuXG4gICAgICAgICAgICBhaXJRdWFsaXR5SGVhZGVyLmlubmVySFRNTCA9XG4gICAgICAgICAgICAgICAgYWlyUXVhbGl0eURlc2NpcHRpb25zW2Ake2RhdGFbcHJvcGVydHldfWBdWzBdO1xuICAgICAgICAgICAgYWlyUXVhbGl0eVBhcmEuaW5uZXJIVE1MID1cbiAgICAgICAgICAgICAgICBhaXJRdWFsaXR5RGVzY2lwdGlvbnNbYCR7ZGF0YVtwcm9wZXJ0eV19YF1bMV07XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHkgPT0gXCJjb21wb25lbnRzXCIpIHtcbiAgICAgICAgICAgIG96b25lVmFsdWUuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV0ubzN9ICYjMTgxZy9tPHN1cD4zPC9zdXA+YDtcbiAgICAgICAgICAgIE4yVmFsdWUuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV0ubm8yfSAmIzE4MWcvbTxzdXA+Mzwvc3VwPmA7XG4gICAgICAgICAgICBmaW5lUE1WYWx1ZS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XS5wbTJfNX0gJiMxODFnL208c3VwPjM8L3N1cD5gO1xuICAgICAgICAgICAgUE1WYWx1ZS5pbm5lckhUTUwgPSBgJHtkYXRhW3Byb3BlcnR5XS5wbTEwfSAmIzE4MWcvbTxzdXA+Mzwvc3VwPmA7XG4gICAgICAgICAgICBzdWxmdXJEaW94aWRlVmFsdWUuaW5uZXJIVE1MID0gYCR7ZGF0YVtwcm9wZXJ0eV0uc28yfSAmIzE4MWcvbTxzdXA+Mzwvc3VwPmA7XG4gICAgICAgICAgICBjYXJib25Nb25veGlkZVZhbHVlLmlubmVySFRNTCA9IGAke2RhdGFbcHJvcGVydHldLmNvfSAmIzE4MWcvbTxzdXA+Mzwvc3VwPmA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhaXJRdWFsaXR5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5haXJRdWFsaXR5QnRuXCIpO1xuICAgIGFpclF1YWxpdHlCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgYWlyUXVhbGl0eUNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKFwiZXhwYW5kQWlyUXVhbGl0eVwiKTtcbiAgICAgICAgaWYgKGFpclF1YWxpdHlCdG4udGV4dENvbnRlbnQgPT0gXCJNb3JlIERldGFpbHNcIikge1xuICAgICAgICAgICAgYWlyUXVhbGl0eUJ0bi50ZXh0Q29udGVudCA9IFwiTGVzcyBEZXRhaWxzXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhaXJRdWFsaXR5QnRuLnRleHRDb250ZW50ID0gXCJNb3JlIERldGFpbHNcIjtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZUZvcmVjYXN0KGRhdGEpIHtcbiAgICBjb25zdCBmb3JlY2FzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9yZWNhc3RcIik7XG4gICAgZm9yZWNhc3QuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGZvcmVjYXN0VGlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGZvcmVjYXN0VGlsZS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RUaWxlXCIpO1xuXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0VGlsZU1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb25zdCBmb3JlY2FzdFRpbGVEaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY29uc3QgZm9yZWNhc3RUaWxlU3VwcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgZm9yZWNhc3RUaWxlTWFpbi5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RUaWxlTWFpblwiKTtcbiAgICAgICAgZm9yZWNhc3RUaWxlRGlzcGxheS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RUaWxlRGlzcGxheVwiKTtcbiAgICAgICAgZm9yZWNhc3RUaWxlU3VwcC5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RUaWxlU3VwcFwiKTtcblxuICAgICAgICBsZXQgdGlsZURhdGEgPSBkYXRhW2ldO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gdGlsZURhdGEpIHtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PSBcIkRhdGVcIikge1xuICAgICAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUodGlsZURhdGFbcHJvcGVydHldWzBdICogMTAwMCk7XG4gICAgICAgICAgICAgICAgbGV0IGhvdXIgPSBkYXRlLmdldFVUQ0hvdXJzKGRhdGUpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgdGltZS5pbm5lckhUTUwgPSBjb252ZXJ0VGltZSh0aWxlRGF0YVtwcm9wZXJ0eV1bMV0sIGhvdXIpO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUaWxlTWFpbi5hcHBlbmRDaGlsZCh0aW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHkgPT0gXCJDb25kaXRpb25cIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0SWNvblwiKTtcblxuICAgICAgICAgICAgICAgIGljb24uc3JjID0gYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3RpbGVEYXRhW3Byb3BlcnR5XVsxXX1AMngucG5nYDtcblxuICAgICAgICAgICAgICAgIGZvcmVjYXN0VGlsZURpc3BsYXkuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BlcnR5ID09IFwiVGVtcGVyYXR1cmVcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRlbXAuaW5uZXJIVE1MID0gYCR7dGlsZURhdGFbcHJvcGVydHldfWA7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVEaXNwbGF5LmFwcGVuZENoaWxkKGZvcmVjYXN0VGVtcCk7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUaWxlTWFpbi5hcHBlbmRDaGlsZChmb3JlY2FzdFRpbGVEaXNwbGF5KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHkgPT0gXCJQb3BcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgICAgICAgICBwb3AuaW5uZXJIVE1MID0gYCR7dGlsZURhdGFbcHJvcGVydHldfSBwb3BgO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUaWxlTWFpbi5hcHBlbmRDaGlsZChwb3ApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JlY2FzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RJdGVtXCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgaHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIik7XG4gICAgICAgICAgICAgICAgaHIuY2xhc3NMaXN0LmFkZChcImZvcmVjYXN0SHJcIik7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmb3JlY2FzdEl0ZW1Qcm9wZXJ0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9yZWNhc3RJdGVtRGF0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1Qcm9wZXJ0eS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RJdGVtUHJvcGVydHlcIik7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtRGF0YS5jbGFzc0xpc3QuYWRkKFwiZm9yZWNhc3RJdGVtRGF0YVwiKTtcblxuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PSBcIldpbmRcIikge1xuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1Qcm9wZXJ0eS5pbm5lckhUTUwgPSBgJHtwcm9wZXJ0eX1gO1xuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW1EYXRhLmlubmVySFRNTCA9IGAke1xuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZURhdGFbcHJvcGVydHldLnNwZWVkXG4gICAgICAgICAgICAgICAgICAgIH0gJHtjb252ZXJ0V2luZERpcmVjdGlvbih0aWxlRGF0YVtwcm9wZXJ0eV0uZGlyZWN0aW9uKX1gO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW1Qcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW1EYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmFwcGVuZENoaWxkKGhyKTtcblxuICAgICAgICAgICAgICAgICAgICBmb3JlY2FzdFRpbGVTdXBwLmFwcGVuZENoaWxkKGZvcmVjYXN0SXRlbSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtUHJvcGVydHkuaW5uZXJIVE1MID0gYCR7cHJvcGVydHl9YDtcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtRGF0YS5pbm5lckhUTUwgPSBgJHt0aWxlRGF0YVtwcm9wZXJ0eV19YDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uYXBwZW5kQ2hpbGQoZm9yZWNhc3RJdGVtUHJvcGVydHkpO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW1EYXRhKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uYXBwZW5kQ2hpbGQoaHIpO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RUaWxlU3VwcC5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZXhwYW5kQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgZXhwYW5kQnRuLmNsYXNzTGlzdC5hZGQoXCJleHBhbmRCdG5cIik7XG4gICAgICAgIGV4cGFuZEJ0bi5pbm5lckhUTUwgPSBcIiYjODk2NFwiO1xuXG4gICAgICAgIGV4cGFuZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZm9yZWNhc3RUaWxlLmNsYXNzTGlzdC50b2dnbGUoXCJleHBhbmRGb3JlY2FzdFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yZWNhc3RUaWxlTWFpbi5hcHBlbmRDaGlsZChleHBhbmRCdG4pO1xuXG4gICAgICAgIGZvcmVjYXN0VGlsZS5hcHBlbmRDaGlsZChmb3JlY2FzdFRpbGVNYWluKTtcbiAgICAgICAgZm9yZWNhc3RUaWxlLmFwcGVuZENoaWxkKGZvcmVjYXN0VGlsZVN1cHApO1xuXG4gICAgICAgIGZvcmVjYXN0LmFwcGVuZENoaWxkKGZvcmVjYXN0VGlsZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzdGFydExvYWRpbmdBbmltYXRpb24oKSB7XG4gICAgY29uc3QgY29uZGl0aW9uQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgIFwiLmNvbmRpdGlvbkNvbnRhaW5lclwiXG4gICAgKTtcbiAgICBjb25zdCBvdXRlcldyYXBwZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5vdXRlcldyYXBwZXJcIik7XG5cbiAgICBjb25kaXRpb25Db250YWluZXJzLmZvckVhY2goKGNvbnRhaW5lcikgPT4ge1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChcImhpZGVDb250YWluZXJcIik7XG4gICAgfSk7XG5cbiAgICBvdXRlcldyYXBwZXJzLmZvckVhY2goKHdyYXBwZXIpID0+IHtcbiAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKFwic2tlbGV0b25cIik7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGVuZExvYWRpbmdBbmltYXRpb24oKSB7XG4gICAgY29uc3QgY29uZGl0aW9uQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgIFwiLmNvbmRpdGlvbkNvbnRhaW5lclwiXG4gICAgKTtcblxuICAgIGNvbnN0IG91dGVyV3JhcHBlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm91dGVyV3JhcHBlclwiKTtcblxuICAgIGNvbmRpdGlvbkNvbnRhaW5lcnMuZm9yRWFjaCgoY29udGFpbmVyKSA9PiB7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZUNvbnRhaW5lclwiKTtcbiAgICB9KTtcblxuICAgIG91dGVyV3JhcHBlcnMuZm9yRWFjaCgod3JhcHBlcikgPT4ge1xuICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJza2VsZXRvblwiKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IHtcbiAgICBwb3B1bGF0ZUxvY2F0aW9uLFxuICAgIHBvcHVsYXRlQ3VycmVudFdlYXRoZXIsXG4gICAgcG9wdWxhdGVBaXJRdWFsaXR5LFxuICAgIHBvcHVsYXRlRm9yZWNhc3QsXG4gICAgc3RhcnRMb2FkaW5nQW5pbWF0aW9uLFxuICAgIGVuZExvYWRpbmdBbmltYXRpb24sXG59O1xuIiwiLy8gVXRpbGl0eSBmdW5jdGlvbnMgZm9yIFdlYXRoZXJBcHBcblxuZnVuY3Rpb24gY29udmVydFRpbWUodGltZXpvbmUsIGhvdXIsIG1pbnV0ZSkge1xuICAgIC8vIFRha2VzIHRoZSBob3VyIGluIDI0aHIgdGltZSBhbmQgY29udmVydHMgaXQgdG8gMTJociB0aW1lIHdpdGggQU0gb3IgUE1cbiAgICBsZXQgbmV3VGltZSA9IFwiXCI7XG5cbiAgICBjb25zdCB0aW1lem9uZVNoaWZ0ID0gTWF0aC5mbG9vcih0aW1lem9uZSAvIDM2MDApO1xuXG4gICAgaWYgKCFtaW51dGUpIHtcbiAgICAgICAgaWYgKGhvdXIgPCAxMikge1xuICAgICAgICAgICAgbmV3VGltZSA9IGAkeyhob3VyICsgdGltZXpvbmVTaGlmdCkgJSAxMiB8fCAxMn1BTWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdUaW1lID0gYCR7KGhvdXIgKyB0aW1lem9uZVNoaWZ0KSAlIDEyIHx8IDEyfVBNYDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChtaW51dGUudG9TdHJpbmcoKS5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgbWludXRlID0gXCIwXCIgKyBtaW51dGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhvdXIgPCAxMikge1xuICAgICAgICAgICAgbmV3VGltZSA9IGAkeyhob3VyICsgdGltZXpvbmVTaGlmdCkgJSAxMiB8fCAxMn06JHttaW51dGV9QU1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3VGltZSA9IGAkeyhob3VyICsgdGltZXpvbmVTaGlmdCkgJSAxMiB8fCAxMn06JHttaW51dGV9UE1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1RpbWU7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRXaW5kRGlyZWN0aW9uKGRlZykge1xuICAgIC8vIENoYW5nZSBpbiBkaXJlY3Rpb24gZXZlcnkgMjIuNSBkZWdyZWVzXG4gICAgY29uc3QgdmFsID0gTWF0aC5mbG9vcihkZWcgLyAyMi41ICsgMC41KTtcbiAgICBjb25zdCBjb21wYXNzRGlyZWN0aW9ucyA9IFtcbiAgICAgICAgXCJOXCIsXG4gICAgICAgIFwiTk5FXCIsXG4gICAgICAgIFwiTkVcIixcbiAgICAgICAgXCJFTkVcIixcbiAgICAgICAgXCJFXCIsXG4gICAgICAgIFwiRVNFXCIsXG4gICAgICAgIFwiU0VcIixcbiAgICAgICAgXCJTU0VcIixcbiAgICAgICAgXCJTXCIsXG4gICAgICAgIFwiU1NXXCIsXG4gICAgICAgIFwiU1dcIixcbiAgICAgICAgXCJXU1dcIixcbiAgICAgICAgXCJXXCIsXG4gICAgICAgIFwiV05XXCIsXG4gICAgICAgIFwiTldcIixcbiAgICAgICAgXCJOTldcIixcbiAgICBdO1xuXG4gICAgY29uc3QgZGlyZWN0aW9uID0gY29tcGFzc0RpcmVjdGlvbnNbdmFsICUgMTZdO1xuXG4gICAgcmV0dXJuIGRpcmVjdGlvbjtcbn1cblxuZnVuY3Rpb24gY2FwaXRhbGl6ZUZpcnN0TGV0dGVycyhwaHJhc2UpIHtcbiAgICBjb25zdCB3b3JkcyA9IHBocmFzZS5zcGxpdChcIiBcIik7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdvcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHdvcmRzW2ldID0gd29yZHNbaV1bMF0udG9VcHBlckNhc2UoKSArIHdvcmRzW2ldLnN1YnN0cigxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd29yZHMuam9pbihcIiBcIik7XG59XG5cbmV4cG9ydCB7IGNvbnZlcnRUaW1lLCBjb252ZXJ0V2luZERpcmVjdGlvbiwgY2FwaXRhbGl6ZUZpcnN0TGV0dGVycyB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBTb3VyY2UgaW5kZXggc2NyaXB0IGZvciBXZWF0aGVyIEFwcFxuXG5pbXBvcnQgeyBnZXRXZWF0aGVyLCBnZXRBaXJRdWFsaXR5LCBnZXRGb3JlY2FzdCB9IGZyb20gXCIuL2FwaUZ1bmN0aW9uc1wiO1xuaW1wb3J0IHtcbiAgICBwb3B1bGF0ZUxvY2F0aW9uLFxuICAgIHBvcHVsYXRlQ3VycmVudFdlYXRoZXIsXG4gICAgcG9wdWxhdGVBaXJRdWFsaXR5LFxuICAgIHBvcHVsYXRlRm9yZWNhc3QsXG4gICAgc3RhcnRMb2FkaW5nQW5pbWF0aW9uLFxuICAgIGVuZExvYWRpbmdBbmltYXRpb24sXG59IGZyb20gXCIuL2RvbUZ1bmN0aW9uc1wiO1xuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzV2VhdGhlcihsb2NhdGlvbikge1xuICAgIC8vIEdldHMgZGF0YSBmcm9tIGdldCB3ZWF0aGVyIGFwaUZ1bmN0aW9ucyBmdW5jdGlvbiBhbmQgZ2F0aGVycyByZWxhdmVudCBpbmZvIGZvciBkaXNwbGF5XG4gICAgLy8gTmVlZCB0byBhZGQgdHJ5L2NhdGNoIHRvIGhhbmRsZSBlcnJvclxuXG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCBnZXRXZWF0aGVyKGxvY2F0aW9uKTtcblxuICAgIGNvbnNvbGUubG9nKHdlYXRoZXJEYXRhKTtcblxuICAgIGxldCBpbXBvcnRhbnREYXRhID0ge307XG5cbiAgICBpbXBvcnRhbnREYXRhLkxvY2F0aW9uID0gW3dlYXRoZXJEYXRhLm5hbWUsIHdlYXRoZXJEYXRhLnN5cy5jb3VudHJ5XTtcbiAgICBpbXBvcnRhbnREYXRhLkRhdGUgPSBbd2VhdGhlckRhdGEuZHQsIHdlYXRoZXJEYXRhLnRpbWV6b25lXTtcbiAgICBpbXBvcnRhbnREYXRhLlRlbXBlcmF0dXJlID0gYCR7d2VhdGhlckRhdGEubWFpbi50ZW1wfSAmIzg0NTFgO1xuICAgIGltcG9ydGFudERhdGFbXCJGZWVscyBMaWtlXCJdID0gYCR7d2VhdGhlckRhdGEubWFpbi5mZWVsc19saWtlfSAmIzg0NTFgO1xuICAgIGltcG9ydGFudERhdGEuSHVtaWRpdHkgPSBgJHt3ZWF0aGVyRGF0YS5tYWluLmh1bWlkaXR5fSAlYDtcbiAgICBpbXBvcnRhbnREYXRhLldpbmQgPSBbXG4gICAgICAgIGAke01hdGgucm91bmQod2VhdGhlckRhdGEud2luZC5zcGVlZCAqIDMuNiAqIDEwMCkgLyAxMDB9IGttL2hyYCxcbiAgICAgICAgd2VhdGhlckRhdGEud2luZC5kZWcsXG4gICAgXTtcblxuICAgIGlmICh3ZWF0aGVyRGF0YS53aW5kLmd1c3QpIHtcbiAgICAgICAgaW1wb3J0YW50RGF0YS5HdXN0ID0gYCR7XG4gICAgICAgICAgICBNYXRoLnJvdW5kKHdlYXRoZXJEYXRhLndpbmQuZ3VzdCAqIDMuNiAqIDEwMCkgLyAxMDBcbiAgICAgICAgfSBrbS9ocmA7XG4gICAgfVxuXG4gICAgaWYgKHdlYXRoZXJEYXRhLnJhaW4pIHtcbiAgICAgICAgaW1wb3J0YW50RGF0YS5SYWluID0gYCR7d2VhdGhlckRhdGEucmFpbltcIjFoXCJdfSBtbWA7XG4gICAgfVxuXG4gICAgaW1wb3J0YW50RGF0YS5Db25kaXRpb24gPSBbXG4gICAgICAgIHdlYXRoZXJEYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICAgIHdlYXRoZXJEYXRhLndlYXRoZXJbMF0uaWNvbixcbiAgICBdO1xuXG4gICAgLy8gRm9ybWF0IHRoaXMgb2JqZWN0IGJldHRlclxuICAgIC8vIE9iamVjdCBDb25zdHJ1Y3RvciBhbmQgY3JlYXRlIG1ldGhvZCB0byBjb252ZXJ0IHRvIGRpZmZlcmVudCB1bml0c1xuXG4gICAgcmV0dXJuIGltcG9ydGFudERhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NBaXJRdWFsaXR5KGxvY2F0aW9uKSB7XG4gICAgLy8gR2V0cyBkYXRhIGZyb20gYWlyIHF1YWxpdHkgYXBpRnVuY3Rpb25zIGZ1bmN0aW9uIGFuZCBnYXRoZXJzIHJlbGF2ZW50IGluZm8gZm9yIGRpc3BsYXlcblxuICAgIGNvbnN0IGFpclF1YWxpdHlEYXRhID0gYXdhaXQgZ2V0QWlyUXVhbGl0eShsb2NhdGlvbik7XG4gICAgY29uc29sZS5sb2coYWlyUXVhbGl0eURhdGEpO1xuXG4gICAgbGV0IGltcG9ydGFudERhdGEgPSB7fTtcblxuICAgIGltcG9ydGFudERhdGEuQVFJID0gYWlyUXVhbGl0eURhdGEubGlzdFswXS5tYWluLmFxaTtcbiAgICBpbXBvcnRhbnREYXRhLmNvbXBvbmVudHMgPSBhaXJRdWFsaXR5RGF0YS5saXN0WzBdLmNvbXBvbmVudHM7XG5cbiAgICByZXR1cm4gaW1wb3J0YW50RGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc0ZvcmVjYXN0KGxvY2F0aW9uKSB7XG4gICAgLy8gR2V0cyBkYXRhIGZyb20gZm9yZWNhc3QgYXBpRnVuY3Rpb25zIGZ1bmN0aW9uIGFuZCBnYXRoZXJzIHJlbGF2ZW50IGluZm8gZm9yIGRpc3BsYXlcblxuICAgIGNvbnN0IGZvcmVjYXN0RGF0YSA9IGF3YWl0IGdldEZvcmVjYXN0KGxvY2F0aW9uKTtcbiAgICBjb25zb2xlLmxvZyhmb3JlY2FzdERhdGEpO1xuXG4gICAgbGV0IGltcG9ydGFudERhdGEgPSBbXTtcblxuICAgIGZvciAoY29uc3QgaW5kZXggaW4gZm9yZWNhc3REYXRhLmxpc3QpIHtcbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF0gPSB7fTtcbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF0uRGF0ZSA9IFtcbiAgICAgICAgICAgIGZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS5kdCxcbiAgICAgICAgICAgIGZvcmVjYXN0RGF0YS5jaXR5LnRpbWV6b25lLFxuICAgICAgICBdO1xuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XS5Db25kaXRpb24gPSBbXG4gICAgICAgICAgICBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS53ZWF0aGVyWzBdLmljb24sXG4gICAgICAgIF07XG4gICAgICAgIGltcG9ydGFudERhdGFbXG4gICAgICAgICAgICBpbmRleFxuICAgICAgICBdLlRlbXBlcmF0dXJlID0gYCR7Zm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLm1haW4udGVtcH0gJiM4NDUxYDtcbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF0uUG9wID0gYCR7TWF0aC5yb3VuZChcbiAgICAgICAgICAgIGZvcmVjYXN0RGF0YS5saXN0W2luZGV4XS5wb3AgKiAxMDBcbiAgICAgICAgKX0gJWA7XG5cbiAgICAgICAgaW1wb3J0YW50RGF0YVtpbmRleF1bXG4gICAgICAgICAgICBcIkZlZWxzIExpa2VcIlxuICAgICAgICBdID0gYCR7Zm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLm1haW4uZmVlbHNfbGlrZX0gJiM4NDUxYDtcbiAgICAgICAgaW1wb3J0YW50RGF0YVtcbiAgICAgICAgICAgIGluZGV4XG4gICAgICAgIF0uSHVtaWRpdHkgPSBgJHtmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ubWFpbi5odW1pZGl0eX0lYDtcblxuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XVtcbiAgICAgICAgICAgIFwiQ2xvdWQgQ292ZXJcIlxuICAgICAgICBdID0gYCR7Zm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLmNsb3Vkcy5hbGx9ICVgO1xuICAgICAgICBpbXBvcnRhbnREYXRhW1xuICAgICAgICAgICAgaW5kZXhcbiAgICAgICAgXS5WaXNpYmlsaXR5ID0gYCR7Zm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLnZpc2liaWxpdHl9IGttYDtcblxuICAgICAgICBpbXBvcnRhbnREYXRhW2luZGV4XS5XaW5kID0ge1xuICAgICAgICAgICAgc3BlZWQ6IGAke1xuICAgICAgICAgICAgICAgIE1hdGgucm91bmQoZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLndpbmQuc3BlZWQgKiAzLjYgKiAxMDApIC9cbiAgICAgICAgICAgICAgICAxMDBcbiAgICAgICAgICAgIH0ga20vaHJgLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiBmb3JlY2FzdERhdGEubGlzdFtpbmRleF0ud2luZC5kZWcsXG4gICAgICAgIH07XG4gICAgICAgIGltcG9ydGFudERhdGFbaW5kZXhdLkd1c3QgPSBgJHtcbiAgICAgICAgICAgIE1hdGgucm91bmQoZm9yZWNhc3REYXRhLmxpc3RbaW5kZXhdLndpbmQuZ3VzdCAqIDMuNiAqIDEwMCkgLyAxMDBcbiAgICAgICAgfSBrbS9ocmA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGltcG9ydGFudERhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NNYXAoKSB7XG4gICAgLy8gR2V0cyBkYXRhIGZyb20gbWFwIGFwaUZ1bmN0aW9ucyBmdW5jdGlvbiBhbmQgZ2F0aGVycyByZWxhdmVudCBpbmZvIGZvciBkaXNwbGF5XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWRQYWdlKGxvY2F0aW9uKSB7XG4gICAgLy8gQWRkIHNvbWUgdmlzdWFsIGluZGljYXRpb24gdGhhdCB3ZSdyZSB3YWl0aW5nIGZvciB0aGUgZGF0YSAocHJvbWlzZS5hbGwpIGJlZm9yZSBpdCBnZXRzIGRpc3BsYXllZCAoTWFwIHdvdWxkIGxpa2V5IHRha2UgdGhlIGxvbmdlc3QgdG8gZGlzcGxheSlcbiAgICAvL0NvdWxkIGFkZCBhIGNsYXNzIHRvIGNoYW5nZSB0aGUgZGlzcGxheSBwcmlvciB0byBwcm9taXNlLmFsbCBzaG93aW5nIHRoYXQgaXQncyBsb2FkaW5nLCBhbmQgcmVtb3ZlIGl0IHRvIHNob3cgZGF0YSBpZiBzdWNjZXNzZnVsIG9yIGRpc3BsYXkgYSBubyByZXN1bHRzIGZvdW5kIHBhZ2UgaWYgZXJyb3JcbiAgICBzdGFydExvYWRpbmdBbmltYXRpb24oKTtcblxuICAgIC8vIFVzZSBhIHByb21pc2UuYWxsIHRvIHdhaXQgZm9yIGFsbCBwcm9jZXNzaW5nIHRvIGNvbXBsZXRlIGJlZm9yZSBkaXNwbGF5aW5nIGRhdGFcblxuICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgcHJvY2Vzc1dlYXRoZXIobG9jYXRpb24pLFxuICAgICAgICBwcm9jZXNzQWlyUXVhbGl0eShsb2NhdGlvbiksXG4gICAgICAgIHByb2Nlc3NGb3JlY2FzdChsb2NhdGlvbiksXG4gICAgXSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBwb3B1bGF0ZUxvY2F0aW9uKGRhdGFbMF0pO1xuICAgICAgICAgICAgcG9wdWxhdGVDdXJyZW50V2VhdGhlcihkYXRhWzBdKTtcbiAgICAgICAgICAgIHBvcHVsYXRlQWlyUXVhbGl0eShkYXRhWzFdKTtcbiAgICAgICAgICAgIHBvcHVsYXRlRm9yZWNhc3QoZGF0YVsyXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgZW5kTG9hZGluZ0FuaW1hdGlvbigpO1xuICAgICAgICB9KTtcblxuICAgIC8vZW5kTG9hZGluZ0FuaW1hdGlvbigpO1xufVxuXG5jb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Ym1pdEJ0blwiKTtcblxuc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoXCIpO1xuXG4gICAgbG9hZFBhZ2Uoc2VhcmNoLnZhbHVlKTtcblxuICAgIHNlYXJjaC52YWx1ZSA9IFwiXCI7XG59KTtcblxubG9hZFBhZ2UoXCJMb25kb25cIik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=