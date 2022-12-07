import React from "react";

interface hourlyForecast {
    time: number,
    temp: number,
    feelsLike: number,
    weather: string,
    units: string
}

function HourlyCard(props: hourlyForecast) {
    const tString = new Date(props.time * 1000)

    let unit;

    if (props.units === "metric") {
        unit = "C"
    } else {
        unit = "F"
    }


    return (
        <figure className="hourlyCard font-space" key={props.time}>
            <h6>{tString.toLocaleTimeString("en-US", { hour12: false })}</h6>
            <p>{props.temp}°{unit}</p>
            <p>{props.feelsLike}°{unit}</p>
            <p>{props.weather}</p>
        </figure>
    )

}


export default HourlyCard;