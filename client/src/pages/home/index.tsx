import React, { useState, useEffect } from "react";
import CurrentTemp from "../../components/currentTemp";
import ProgressBar from "../../components/progressBar";
import Navbar from "../../components/navbar";
import SearchBar from "../../components/searchBar";
import "./home.css"



interface Coords {
    lat: number,
    lon: number
}

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

function Home() {

    

    const [coords, setCoords] = useState<Coords>({ lon: 0, lat: 0 })

    const [city, setCity] = useState<string>()

    const [weatherData, setWeatherData] = useState<weatherResponse>()


    async function getCityWeather(city: string) {

        let sanitizedCity: string = city.toLowerCase().trim() 

        const search = await fetch(`/api/getTargetWeather/${sanitizedCity}`)

        const searchReturn = await search.json()

        setWeatherData(searchReturn)

    }

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCoords({ lon: position.coords.longitude, lat: position.coords.latitude })
            })
        } else {
            console.log("Geolocation disabled.")
        }

        async function fetchWeather(coordinates: Coords) {
            const data = await fetch(`/api/getLocalWeather/${coordinates.lat}/${coordinates.lon}`)

            const jsonData = await data.json()

            setWeatherData(jsonData)
            console.log(jsonData)
        }

        fetchWeather(coords)

    }, [coords])


    return (
        <>
            <Navbar />
            <SearchBar city={city} setCity={setCity} getCityWeather={getCityWeather} />

            {weatherData ? 
            
            <main id="weatherContainer">
                <CurrentTemp current={weatherData.current.temp} icon={weatherData.current.weather[0].icon} sunrise=     {weatherData.current.sunrise} sunset={weatherData.current.sunset} temp={weatherData.current.temp} feelsLike={weatherData.current.feels_like} windSpeed={weatherData.current.wind_speed} UVI={weatherData.current.uvi} humidity={weatherData.current.humidity}/>


            </main>
                : <ProgressBar />

            }


        </>
    )
}

export default Home;