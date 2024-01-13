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

async function getWeatherMap(location) {
    const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=69a0fe9d89aa3c562c09a50fbd505046`
    );
    const weatherData = await weatherResponse.json();

    let lat = weatherData.coord.lat;
    let lon = weatherData.coord.lon;

    //const weatherMap = document.querySelector(".weatherMap");
    //weatherMap.innerHTML = "";

    let map = L.map("map").setView([lat, lon], 8);

    await L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 8,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    await L.tileLayer(
        `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=69a0fe9d89aa3c562c09a50fbd505046`,
        {
            maxZoom: 8,
        }
    ).addTo(map);

    return map;
}

async function updateWeatherMap(location) {
    const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=69a0fe9d89aa3c562c09a50fbd505046`
    );
    const weatherData = await weatherResponse.json();

    let lat = weatherData.coord.lat;
    let lon = weatherData.coord.lon;

    map.setView([lat, lon], 8);
}

export {
    getWeather,
    getAirQuality,
    getForecast,
    getWeatherMap,
    updateWeatherMap,
};
