import React, {useState, useEffect} from "react";
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



    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCoords({lon: position.coords.longitude, lat: position.coords.latitude})
            })
        } else {
            setCoords({lon: 0, lat: 0})
        }

        async function fetchWeather(coordinates:Coords) {
            const data = await fetch(`/api/getLocalWeather/${coordinates.lat}/${coordinates.lon}`)

            const jsonData = await data.json()

            setWeatherData(jsonData)

            if (jsonData) {
                console.log(weatherData)
            } else {
                console.log("Loading")
            }
            
        }

        fetchWeather(coords)

        

    }, [])


    return (
        <>
        <Navbar />
        <SearchBar city={city} setCity={setCity}/>
        </>
    )
}

export default Home;