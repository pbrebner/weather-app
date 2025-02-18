// Functions to fetch weather data through API

async function getWeather(location, units) {
    try {
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&APPID=69a0fe9d89aa3c562c09a50fbd505046`
        );
        const weatherData = await weatherResponse.json();

        return weatherData;
    } catch (error) {
        throw new Error(error);
    }
}

async function getAirQuality(location, units) {
    try {
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&APPID=69a0fe9d89aa3c562c09a50fbd505046`
        );
        const weatherData = await weatherResponse.json();

        let lat = weatherData.coord.lat;
        let lon = weatherData.coord.lon;

        const airQualityResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&APPID=69a0fe9d89aa3c562c09a50fbd505046`
        );

        const airQualityData = await airQualityResponse.json();

        return airQualityData;
    } catch (error) {
        throw new Error(error);
    }
}

async function getForecast(location, units) {
    try {
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&appid=69a0fe9d89aa3c562c09a50fbd505046`
        );

        const forecastData = await forecastResponse.json();

        return forecastData;
    } catch (error) {
        throw new Error(error);
    }
}

async function getWeatherMap(location) {}

export { getWeather, getAirQuality, getForecast };
