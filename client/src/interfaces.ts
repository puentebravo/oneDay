interface currentWeatherDetails {
    description: string,
    icon: string,
    id: number,
    main: string
}

interface currentWeatherObj {
    dt: number,
    sunrise: number,
    sunset: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    wind_speed: number
    wind_deg: number,
    wind_gust: number,
    weather: currentWeatherDetails[]
}

interface forecastObj {
    clouds: number,
    dew_point: number,
    dt: number,
    feels_like: {
        day: number,
        eve: number,
        morn: number,
        night: number
    },
    humidity: number,
    moon_phase: number,
    moonrise: number,
    moonset: number,
    pop: number,
    pressure: number,
    sunrise: number,
    sunset: number,
    temp: {
        day: number,
        eve: number,
        max: number,
        min: number,
        morn: number,
        night: number
    },
    uvi: number,
    weather: currentWeatherDetails[],
    wind_deg: number,
    wind_gust: number,
    wind_speed: number
}

interface weatherResponse {
    current: currentWeatherObj,
    daily: forecastObj[],
    hourly: currentWeatherObj[],
    lat: number,
    lon: number,
    timezone: string,
    timezone_offset: number

}

interface SaveData {
    id: String,
    date: String,
    title: String,
    high: String,
    low: String,
    weather: String,
    story: String,
    photoSrc: String
}


export type {weatherResponse, forecastObj, currentWeatherObj, currentWeatherDetails, SaveData}