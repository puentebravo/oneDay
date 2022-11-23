import React from "react";

interface WeatherObject {
    current: number,
    icon: string,
    sunrise: number,
    sunset: number,
    temp: number,
    feelsLike: number,
    windSpeed: number,
    UVI: number,
    humidity: number
}

function CurrentTemp(props: WeatherObject) {

    
    const sunriseTime = new Date(props.sunrise)
    const sunsetTime = new Date(props.sunset)
    

    

    return (
        <section id="cTemp">
            <div id="tempHeader">
                <h2> Temperature: {props.current}</h2>
                <img src={props.icon} alt="icon representing today's weather" id="weatherIcon" />
            </div>
            <div id="weatherList">
                <ul>
                    <li>Feels Like: {props.feelsLike}</li>
                    <li>Wind Speed: {props.windSpeed}</li>
                    <li>Sunrise: {sunriseTime.toLocaleTimeString("en-US")} </li>
                    <li>Sunset: {sunsetTime.toLocaleTimeString("en-US")}</li>
                    <li>UV Index: {props.UVI}</li>
                    <li>Humidity: {props.UVI}</li>
                </ul>
            </div>

        </section>
    )
}

export default CurrentTemp;