import React, {useState, useEffect} from "react";
import CurrentTemp from "../../components/currentTemp";
import Navbar from "../../components/navbar";
import SearchBar from "../../components/searchBar";
import "./home.css"


function Home() {

    interface Coords {
        lat: number,
        lon: number
    }

    const [coords, setCoords] = useState({lon: 0, lat: 0})

    const [city, setCity] = useState()

    const [weatherData, setWeatherData] = useState({})

    async function getCityWeather(city: string) {
        const search = await fetch(`/api/getTargetWeather/${city}`)

        const searchReturn = await search.json()

        setWeatherData(searchReturn)

    }

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCoords({lon: position.coords.longitude, lat: position.coords.latitude})
            })
        } else {
            console.log("Geolocation disabled.")
        }

        async function fetchWeather(coordinates:Coords) {
            const data = await fetch(`/api/getLocalWeather/${coordinates.lat}/${coordinates.lon}`)

            const jsonData = await data.json()

            setWeatherData(jsonData)
            
        }

        fetchWeather(coords)

    }, [])


    return (
        <>
        <Navbar />
        <SearchBar city={city} setCity={setCity} getCityWeather={getCityWeather}/>
        <main id="weatherContainer">
            <CurrentTemp />
        </main>
        </>
    )
}

export default Home;