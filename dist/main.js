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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQSw2REFBNkQsU0FBUztBQUN0RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDQUFDOztBQUVEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gU291cmNlIHNjcmlwdCBmb3IgV2VhdGhlciBBcHBcblxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlcihsb2NhdGlvbikge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7bG9jYXRpb259JkFQUElEPTY5YTBmZTlkODlhYTNjNTYyYzA5YTUwZmJkNTA1MDQ2YFxuICAgICk7XG5cbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBjb25zb2xlLmxvZyh3ZWF0aGVyRGF0YSk7XG4gICAgcHJvY2Vzc1dlYXRoZXIod2VhdGhlckRhdGEpO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzV2VhdGhlcihqc29uRGF0YSkge1xuICAgIGltcG9ydGFudERhdGEgPSB7fTtcblxuICAgIGltcG9ydGFudERhdGEubG9jYXRpb24gPSBqc29uRGF0YS5uYW1lO1xuICAgIGltcG9ydGFudERhdGEudGVtcCA9IGpzb25EYXRhLm1haW4udGVtcDtcbiAgICBpbXBvcnRhbnREYXRhLmh1bWlkaXR5ID0ganNvbkRhdGEubWFpbi5odW1pZGl0eTtcbiAgICBpbXBvcnRhbnREYXRhLnRlbXBNYXggPSBqc29uRGF0YS5tYWluLnRlbXBfbWF4O1xuICAgIGltcG9ydGFudERhdGEudGVtcE1pbiA9IGpzb25EYXRhLm1haW4udGVtcF9taW47XG5cbiAgICBjb25zb2xlLmxvZyhpbXBvcnRhbnREYXRhKTtcbn1cblxuY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWJtaXRCdG5cIik7XG5cbnN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBzZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaFwiKTtcblxuICAgIGdldFdlYXRoZXIoc2VhcmNoLnZhbHVlKTtcblxuICAgIHNlYXJjaC52YWx1ZSA9IFwiXCI7XG59KTtcblxuZ2V0V2VhdGhlcihcIkxvbmRvblwiKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==