// Functions to fetch weather data through API

async function getWeather(location) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=69a0fe9d89aa3c562c09a50fbd505046`
    );

    const weatherData = await response.json();

    return weatherData;
}

export { getWeather };
