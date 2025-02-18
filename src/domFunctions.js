// Functions to create and display DOM elements
import { loadPage } from "./index";
import {
    convertTime,
    convertWindDirection,
    capitalizeFirstLetters,
} from "./utils";

function populateLocation(data) {
    // Populates location in nav bar
    const location = document.querySelector(".location");
    location.innerHTML = "";

    let regionNames = new Intl.DisplayNames(["en"], {
        type: "region",
    });

    let country = regionNames.of(`${data.location[1]}`);
    location.innerHTML = `${data.location[0]}, ${country}`;
}

function populateCurrentWeather(data) {
    // Populates current weather dom elements

    // Create main current weather elements
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

    // Iterate through data object and assign values to dom elements
    for (const property in data) {
        if (property == "date") {
            const date = new Date(data[property][0] * 1000);

            const hour = date.getUTCHours(date);
            const minute = date.getUTCMinutes(date);

            const time = convertTime(data[property][1], hour, minute);

            currentTime.innerHTML = time;
        } else if (property == "temperature") {
            currentTemp.innerHTML = `${data[property]}`;
        } else if (property == "condition") {
            currentConditionName.innerHTML = `${capitalizeFirstLetters(
                data[property][0]
            )}`;
            // Update the condition Icon according to name
            currentConditionIcon.src = `https://openweathermap.org/img/wn/${data[property][1]}@2x.png`;
        } else {
            // For all non-main current weather elements
            const weatherItem = document.createElement("div");
            const hr = document.createElement("hr");
            weatherItem.classList.add("currentWeatherItem");

            const weatherItemProperty = document.createElement("div");
            const weatherItemData = document.createElement("div");
            weatherItemData.classList.add("weatherItemData");

            if (property == "location") {
                weatherItemProperty.innerHTML = `${property}`;

                let regionNames = new Intl.DisplayNames(["en"], {
                    type: "region",
                });
                let country = regionNames.of(`${data[property][1]}`);

                weatherItemData.innerHTML = `${data[property][0]}, ${country}`;
            } else if (property == "wind") {
                weatherItemProperty.innerHTML = `${property}`;
                weatherItemData.innerHTML = `${
                    data[property][0]
                } ${convertWindDirection(data[property][1])}`;
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
    // Populates current air quality dom elements

    // Select all necessary HTML elements
    const airQualityContainer = document.querySelector(".airQualityContainer");

    const airQualityDisplay = document.querySelector(".airQualityDisplay");
    const displayRing = document.querySelector(".displayRing");
    const aqiValue = document.querySelector(".aqiValue");
    const airQualityHeader = document.querySelector(".airQualityHeader");
    const airQualityPara = document.querySelector(".airQualityPara");
    const detailsBtnDiv = document.querySelector(".detailsBtnDiv");

    aqiValue.innerHTML = "";
    airQualityHeader.innerHTML = "";
    airQualityPara.innerHTML = "";
    detailsBtnDiv.innerHTML = "";

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
            // Create an interval to fill in AQI ring gradually on load
            // AQI values is between 1 and 5
            let speed = 30;
            let progressValue = 0;
            let progressEndValue = data[property] * 20;

            let progress = setInterval(() => {
                progressValue += 1;
                displayRing.style.background = `conic-gradient(
                    #4d5bf9 ${progressValue * 3.6}deg,
                    #cadcff ${progressValue * 3.6}deg
                )`;
                if (progressValue == progressEndValue) {
                    clearInterval(progress);
                }
            }, speed);

            // Fills in other AQI values
            aqiValue.innerHTML = `${data[property]} AQI`;

            airQualityHeader.innerHTML =
                airQualityDesciptions[`${data[property]}`][0];
            airQualityPara.innerHTML =
                airQualityDesciptions[`${data[property]}`][1];
        } else if (property == "components") {
            // Fills in components values
            ozoneValue.innerHTML = `${data[property].o3} &#181g/m<sup>3</sup>`;
            N2Value.innerHTML = `${data[property].no2} &#181g/m<sup>3</sup>`;
            finePMValue.innerHTML = `${data[property].pm2_5} &#181g/m<sup>3</sup>`;
            PMValue.innerHTML = `${data[property].pm10} &#181g/m<sup>3</sup>`;
            sulfurDioxideValue.innerHTML = `${data[property].so2} &#181g/m<sup>3</sup>`;
            carbonMonoxideValue.innerHTML = `${data[property].co} &#181g/m<sup>3</sup>`;
        }
    }

    // Creates a btn to display air quality details
    const airQualityBtn = document.createElement("button");
    airQualityBtn.classList.add("airQualityBtn");
    airQualityBtn.textContent = "More Details";

    airQualityBtn.addEventListener("click", () => {
        airQualityContainer.classList.toggle("expandAirQuality");

        if (airQualityBtn.textContent == "More Details") {
            airQualityBtn.textContent = "Less Details";
        } else {
            airQualityBtn.textContent = "More Details";
        }
    });

    detailsBtnDiv.appendChild(airQualityBtn);
}

function populateForecast(data) {
    // Populates forecast weather dom elements
    const forecast = document.querySelector(".forecast");
    forecast.innerHTML = "";

    // Iterate through the 8 forecast data values
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

        // Populate html elements with data based on object key
        for (const property in tileData) {
            if (property == "date") {
                let date = new Date(tileData[property][0] * 1000);
                let hour = date.getUTCHours(date);

                const time = document.createElement("div");
                time.innerHTML = convertTime(tileData[property][1], hour);

                forecastTileMain.appendChild(time);
            } else if (property == "condition") {
                const icon = document.createElement("img");
                icon.classList.add("forecastIcon");

                icon.src = `https://openweathermap.org/img/wn/${tileData[property][1]}@2x.png`;

                forecastTileDisplay.appendChild(icon);
            } else if (property == "temperature") {
                const forecastTemp = document.createElement("div");

                forecastTemp.innerHTML = `${tileData[property]}`;

                forecastTileDisplay.appendChild(forecastTemp);
                forecastTileMain.appendChild(forecastTileDisplay);
            } else if (property == "pop") {
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

                if (property == "wind") {
                    forecastItemProperty.innerHTML = `${property}`;
                    forecastItemData.innerHTML = `${
                        tileData[property].speed
                    } ${convertWindDirection(tileData[property].direction)}`;

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

        // Creates btn to expand forecast
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
    // Displays error page when called
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
    // Removes error page and returns to main page
    const outerWrappers = document.querySelectorAll(".outerWrapper");
    const errorWrapper = document.querySelector(".errorWrapper");

    outerWrappers.forEach((wrapper) => {
        wrapper.classList.remove("hideContainer");
    });

    errorWrapper.classList.add("hideContainer");
}

function startLoadingAnimation() {
    // Starts skeleton loading animation
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
    // Ends skeleton loading animation
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

function search() {
    // Sets up search funtionality of main search bar
    const submitBtn = document.querySelector(".submitBtn");
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const unitsBtn = document.querySelector(".unitsBtn");
        const search = document.querySelector(".search");

        if (search.value != "") {
            if (unitsBtn.innerHTML == "Imperial Units") {
                loadPage(search.value, "metric");
            } else if (unitsBtn.innerHTML == "Metric Units") {
                loadPage(search.value, "imperial");
            } else {
                loadPage(search.value, "metric");
            }
        }

        search.value = "";
    });
}

function convertUnits() {
    // Sets up listener to convert units on btn click
    const unitsBtn = document.querySelector(".unitsBtn");
    const location = document.querySelector(".location");

    unitsBtn.addEventListener("click", () => {
        if (unitsBtn.innerHTML == "Imperial Units") {
            unitsBtn.innerHTML = "Metric Units";
            loadPage(location.innerHTML, "imperial", false);
        } else {
            unitsBtn.innerHTML = "Imperial Units";
            loadPage(location.innerHTML, "metric", false);
        }
    });
}

/*
// Code to implement google autocomplete (Need to set up billing to work)

window.addEventListener("load", initialize);

function initialize() {
    const form = document.querySelector(".searchForm");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
    });

    const search = document.querySelector(".search");
    const autocomplete = new google.maps.places.Autocomplete(search);

    autocomplete.addListener("place_changed", function () {
        const place = autocomplete.getPlace();

        loadPage(place.name);
        search.value = "";
    });
}
*/

export {
    populateLocation,
    populateCurrentWeather,
    populateAirQuality,
    populateForecast,
    addError,
    startLoadingAnimation,
    endLoadingAnimation,
    search,
    convertUnits,
};
