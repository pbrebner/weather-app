import { getWeather, getAirQuality, getForecast } from "./apiFunctions";

async function processWeather(location, units) {
    // Gets data from getWeather apiFunctions function and formats data for display

    const weatherData = await getWeather(location, units);

    // Factory function to create current weather object
    function createWeather(weatherData) {
        // Weather data object to return
        let data = {};

        data.location = [weatherData.name, weatherData.sys.country];
        data.date = [weatherData.dt, weatherData.timezone];

        if (units == "metric") {
            // Metric Units
            data.temperature = `${Math.round(weatherData.main.temp)} &#8451`;
            data.feelsLike = `${Math.round(
                weatherData.main.feels_like
            )} &#8451`;
            data.humidity = `${weatherData.main.humidity} %`;
            data.wind = [
                `${Math.round(weatherData.wind.speed * 3.6 * 100) / 100} km/hr`,
                weatherData.wind.deg,
            ];

            if (weatherData.wind.gust) {
                data.gust = `${
                    Math.round(weatherData.wind.gust * 3.6 * 100) / 100
                } km/hr`;
            }

            if (weatherData.rain) {
                data.rain = `${weatherData.rain["1h"]} mm`;
            }
        } else {
            // Imperial Units
            data.temperature = `${Math.round(weatherData.main.temp)} &#8457`;
            data.feelsLike = `${Math.round(
                weatherData.main.feels_like
            )} &#8457`;
            data.humidity = `${weatherData.main.humidity} %`;
            data.wind = [
                `${Math.round(weatherData.wind.speed)} mph`,
                weatherData.wind.deg,
            ];

            if (weatherData.wind.gust) {
                data.gust = `${Math.round(weatherData.wind.gust)} mph`;
            }

            if (weatherData.rain) {
                data.rain = `${weatherData.rain["1h"] / 25.4} in`;
            }
        }

        data.condition = [
            weatherData.weather[0].description,
            weatherData.weather[0].icon,
        ];

        return data;
    }

    const importantData = createWeather(weatherData);

    return importantData;
}

async function processAirQuality(location, units) {
    // Gets data from air quality apiFunctions function and gathers relavent info for display

    const airQualityData = await getAirQuality(location, units);

    let importantData = {};

    importantData.AQI = airQualityData.list[0].main.aqi;
    importantData.components = airQualityData.list[0].components;

    return importantData;
}

async function processForecast(location, units) {
    // Gets data from forecast apiFunctions function and gathers relavent info for display

    const forecastData = await getForecast(location, units);

    // Factory function to create forecast object
    function createForecast(forecastData, city) {
        let date = [forecastData.dt, city.timezone];
        let condition = [
            forecastData.weather[0].description,
            forecastData.weather[0].icon,
        ];

        if (units == "metric") {
            // Metric Units
            let temperature = `${Math.round(forecastData.main.temp)} &#8451`;
            let pop = `${Math.round(forecastData.pop * 100)} %`;
            let feelsLike = `${Math.round(
                forecastData.main.feels_like
            )} &#8451`;
            let humidity = `${forecastData.main.humidity}%`;
            let cloudCover = `${forecastData.clouds.all} %`;
            let visibility = `${forecastData.visibility} km`;
            let wind = {
                speed: `${
                    Math.round(forecastData.wind.speed * 3.6 * 100) / 100
                } km/hr`,
                direction: forecastData.wind.deg,
            };
            let gust = `${
                Math.round(forecastData.wind.gust * 3.6 * 100) / 100
            } km/hr`;

            return {
                date,
                condition,
                temperature,
                pop,
                feelsLike,
                humidity,
                cloudCover,
                visibility,
                wind,
                gust,
            };
        } else {
            // Imperial Units
            let temperature = `${Math.round(forecastData.main.temp)} &#8457`;
            let pop = `${Math.round(forecastData.pop * 100)} %`;
            let feelsLike = `${Math.round(
                forecastData.main.feels_like
            )} &#8457`;
            let humidity = `${forecastData.main.humidity}%`;
            let cloudCover = `${forecastData.clouds.all} %`;
            let visibility = `${forecastData.visibility} km`;
            let wind = {
                speed: `${Math.round(forecastData.wind.speed)} mph`,
                direction: forecastData.wind.deg,
            };
            let gust = `${Math.round(forecastData.wind.gust)} mph`;

            return {
                date,
                condition,
                temperature,
                pop,
                feelsLike,
                humidity,
                cloudCover,
                visibility,
                wind,
                gust,
            };
        }
    }

    // Create list of forecast objects and return list
    let importantData = [];

    for (const index in forecastData.list) {
        const forecast = createForecast(
            forecastData.list[index],
            forecastData.city
        );

        importantData.push(forecast);
    }

    return importantData;
}

async function processMap() {
    // Gets data from map apiFunctions function and gathers relavent info for display
}

export { processWeather, processAirQuality, processForecast };
