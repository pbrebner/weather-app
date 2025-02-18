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
    // Add some visual indication that we're waiting for the data (promise.all) before it gets displayed (Map would likey take the longest to display)
    //Could add a class to change the display prior to promise.all showing that it's loading, and remove it to show data if successful or display a no results found page if error
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

/*
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

loadPage("London", "metric");
search();
convertUnits();

export { loadPage };
