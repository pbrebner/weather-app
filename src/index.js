// Source index script for Weather App
import "./styles.css";
import {
    processWeather,
    processAirQuality,
    processForecast,
} from "./processWeather";
import {
    populateLocation,
    populateCurrentWeather,
    populateAirQuality,
    populateForecast,
    addError,
    startLoadingAnimation,
    endLoadingAnimation,
    search,
    convertUnits,
} from "./domFunctions";

async function loadPage(location, units = "metric", loading = true) {
    // Loads the page with the specified location and units

    // Start loading animation
    if (loading) {
        startLoadingAnimation();
    }

    // Use a promise.all to wait for all processing to complete before displaying data
    Promise.all([
        processWeather(location, units),
        processAirQuality(location, units),
        processForecast(location, units),
    ])
        .then((data) => {
            populateLocation(data[0]);
            populateCurrentWeather(data[0]);
            populateAirQuality(data[1]);
            populateForecast(data[2]);
        })
        .catch((error) => {
            console.log(error);
            addError();
        })
        .finally(() => {
            endLoadingAnimation();
        });
}

loadPage("London", "metric");
search();
convertUnits();

export { loadPage };
