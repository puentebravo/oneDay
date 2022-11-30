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
    humidity: number,
    units: string
}

function CurrentTemp(props: WeatherObject) {

    
    // const sunriseTime = new Date(props.sunrise)
    // const sunsetTime = new Date(props.sunset)
    const imgUrl = `http://openweathermap.org/img/wn/${props.icon}@2x.png`
    let tempUnit;
    let speedUnit;
    
    if (props.units === "metric") {
        tempUnit = "C"
    } else {
        tempUnit = "F"
    }

    if (props.units === "metric") {
        speedUnit = "KM/H"
    } else {
        speedUnit = "MPH"
    }

    

    return (
        <section id="cTemp" className="card">
            <div id="tempHeader">
                <h2> Temperature: {props.current}° {tempUnit}</h2>
                <img src={imgUrl} alt="icon representing today's weather" id="weatherIcon" />
            </div>
            <div id="weatherList">
                <ul>
                    <li>Feels Like: {props.feelsLike}° {tempUnit}</li>
                    <li>Wind Speed: {props.windSpeed} {speedUnit}</li>
                    {/* <li>Sunrise: {sunriseTime.toLocaleTimeString("en-US", {hour12: false, timeStyle: "short"})} </li>
                    <li>Sunset: {sunsetTime.toLocaleTimeString("en-US", {hour12: false, timeStyle: "short"})}</li> */}
                    <li>UV Index: {props.UVI}</li>
                    <li>Humidity: {props.humidity}%</li>
                </ul>
            </div>

        </section>
    )
}

export default CurrentTemp;