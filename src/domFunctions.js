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

export { populateCurrentWeather };
