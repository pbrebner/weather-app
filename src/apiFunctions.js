// Functions to fetch weather data through API

async function getWeather(location) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=69a0fe9d89aa3c562c09a50fbd505046`
    );

    const weatherData = await response.json();

    return weatherData;
}

async function getAirQuality(location) {
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

export { getWeather, getAirQuality, getForecast };
