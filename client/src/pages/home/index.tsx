import React, { useState, useEffect } from "react";
import CurrentTemp from "../../components/currentTemp";
import ProgressBar from "../../components/progressBar";
import Navbar from "../../components/navbar";
import SearchBar from "../../components/searchBar";
import "./home.css"
import { weatherResponse } from "../../interfaces";
import UnitSwitch from "../../components/unitSwitch";
import FiveDay from "../../components/fiveDay";
import Hourly from "../../components/hourly";
import SaveBtn from "../../components/saveBtn";
import Modal from "../../components/modal";



interface Coords {
    lat: number,
    lon: number
}



function Home() {

    const [city, setCity] = useState<string>("")

    const [show, setShow] = useState<boolean>(false)

    const [weatherData, setWeatherData] = useState<weatherResponse>()

    const [units, setUnits] = useState<string>("imperial")


    async function getCityWeather(city: string, units: string) {

        let sanitizedCity: string = city.toLowerCase().trim()

        const search = await fetch(`/api/getTargetWeather/${sanitizedCity}/${units}`)

        const searchReturn = await search.json()

        setWeatherData(searchReturn)

    }

    async function fetchWeather(coordinates: Coords, units: string) {

        const data = await fetch(`/api/getLocalWeather/${coordinates.lat}/${coordinates.lon}/${units}`)

        const jsonData = await data.json()

        setWeatherData(jsonData)
        localStorage.setItem("weatherData", JSON.stringify(jsonData))
        
    }

    useEffect(() => {

        let cachedWeather = localStorage.getItem("weatherData")

        if (cachedWeather) {
            setWeatherData(JSON.parse(cachedWeather));
        }

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {

                let coords = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                }

                fetchWeather(coords, units)
            })

        } else {
            console.log("Geolocation disabled.")
        }


    }, [units])


    return (
        <>
            <Navbar />
            <SearchBar city={city} setCity={setCity} getCityWeather={getCityWeather} units={units} />
            <section id="controlBar" className="card">
                <UnitSwitch unit={units} setUnit={setUnits} />
                <SaveBtn setStatus={setShow} />
            </section>
            

            {weatherData ?
                <>
                <main id="weatherContainer">
                    <CurrentTemp current={weatherData.current.temp} icon={weatherData.current.weather[0].icon} sunrise={weatherData.current.sunrise} sunset={weatherData.current.sunset} temp={weatherData.current.temp} feelsLike={weatherData.current.feels_like} windSpeed={weatherData.current.wind_speed} UVI={weatherData.current.uvi} humidity={weatherData.current.humidity} units={units} />
                    <Hourly hourly={weatherData.hourly} units={units} />
                    <FiveDay dailyForecasts={weatherData.daily} units={units} />
                </main>
                <Modal status={show} setStatus={setShow} weatherData={weatherData.daily[0]}/>
                </>
                : <ProgressBar />

            }
            


        </>
    )
}

export default Home;
