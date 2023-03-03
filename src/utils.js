// Utility functions for WeatherApp

function convertTime(hour) {
    // Takes the hour in 24hr time and converts it to 12hr time with AM or PM
    let newTime = "";

    if (hour < 12) {
        newTime = `${hour % 12 || 12}AM`;
    } else {
        newTime = `${hour % 12 || 12}PM`;
    }

    return newTime;
}

function convertWindDirection(deg) {
    // Change in direction every 22.5 degrees
    const val = Math.floor(deg / 22.5 + 0.5);
    const compassDirections = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW",
    ];

    const direction = compassDirections[val % 16];

    return direction;
}

export { convertTime, convertWindDirection };
