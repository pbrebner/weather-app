/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
// Source script for Weather App

async function getWeather(location) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=69a0fe9d89aa3c562c09a50fbd505046`
    );

    const weatherData = await response.json();
    console.log(weatherData);
    processWeather(weatherData);
}

function processWeather(jsonData) {
    importantData = {};

    importantData.location = jsonData.name;
    importantData.temp = jsonData.main.temp;
    importantData.humidity = jsonData.main.humidity;
    importantData.tempMax = jsonData.main.temp_max;
    importantData.tempMin = jsonData.main.temp_min;

    console.log(importantData);

    populateCurrentWeather(importantData);

    // This should return a weather object
    // split into individual sections????
}

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

const submitBtn = document.querySelector(".submitBtn");

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const search = document.querySelector(".search");

    getWeather(search.value);

    search.value = "";
});

getWeather("London");

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQSw2REFBNkQsU0FBUztBQUN0RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQ0FBbUMsU0FBUyxJQUFJLGVBQWU7O0FBRS9EO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDQUFDOztBQUVEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gU291cmNlIHNjcmlwdCBmb3IgV2VhdGhlciBBcHBcblxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlcihsb2NhdGlvbikge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7bG9jYXRpb259JkFQUElEPTY5YTBmZTlkODlhYTNjNTYyYzA5YTUwZmJkNTA1MDQ2YFxuICAgICk7XG5cbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBjb25zb2xlLmxvZyh3ZWF0aGVyRGF0YSk7XG4gICAgcHJvY2Vzc1dlYXRoZXIod2VhdGhlckRhdGEpO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzV2VhdGhlcihqc29uRGF0YSkge1xuICAgIGltcG9ydGFudERhdGEgPSB7fTtcblxuICAgIGltcG9ydGFudERhdGEubG9jYXRpb24gPSBqc29uRGF0YS5uYW1lO1xuICAgIGltcG9ydGFudERhdGEudGVtcCA9IGpzb25EYXRhLm1haW4udGVtcDtcbiAgICBpbXBvcnRhbnREYXRhLmh1bWlkaXR5ID0ganNvbkRhdGEubWFpbi5odW1pZGl0eTtcbiAgICBpbXBvcnRhbnREYXRhLnRlbXBNYXggPSBqc29uRGF0YS5tYWluLnRlbXBfbWF4O1xuICAgIGltcG9ydGFudERhdGEudGVtcE1pbiA9IGpzb25EYXRhLm1haW4udGVtcF9taW47XG5cbiAgICBjb25zb2xlLmxvZyhpbXBvcnRhbnREYXRhKTtcblxuICAgIHBvcHVsYXRlQ3VycmVudFdlYXRoZXIoaW1wb3J0YW50RGF0YSk7XG5cbiAgICAvLyBUaGlzIHNob3VsZCByZXR1cm4gYSB3ZWF0aGVyIG9iamVjdFxuICAgIC8vIHNwbGl0IGludG8gaW5kaXZpZHVhbCBzZWN0aW9ucz8/Pz9cbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVDdXJyZW50V2VhdGhlcihkYXRhKSB7XG4gICAgY29uc3QgY3VycmVudFdlYXRoZXJEZXRhaWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgXCIuY3VycmVudFdlYXRoZXJEZXRhaWxzXCJcbiAgICApO1xuXG4gICAgY3VycmVudFdlYXRoZXJEZXRhaWxzLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGRhdGEpIHtcbiAgICAgICAgY29uc3Qgd2VhdGhlckl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB3ZWF0aGVySXRlbS5jbGFzc0xpc3QuYWRkKFwid2VhdGhlckl0ZW1cIik7XG5cbiAgICAgICAgd2VhdGhlckl0ZW0uaW5uZXJIVE1MID0gYCR7cHJvcGVydHl9OiAke2RhdGFbcHJvcGVydHldfWA7XG5cbiAgICAgICAgY3VycmVudFdlYXRoZXJEZXRhaWxzLmFwcGVuZENoaWxkKHdlYXRoZXJJdGVtKTtcbiAgICB9XG59XG5cbmNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VibWl0QnRuXCIpO1xuXG5zdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2hcIik7XG5cbiAgICBnZXRXZWF0aGVyKHNlYXJjaC52YWx1ZSk7XG5cbiAgICBzZWFyY2gudmFsdWUgPSBcIlwiO1xufSk7XG5cbmdldFdlYXRoZXIoXCJMb25kb25cIik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=