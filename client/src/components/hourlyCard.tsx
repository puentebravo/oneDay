import React from "react";

interface hourlyForecast {
    time: number,
    temp: number,
    feelsLike: number,
    weather: string,
    units: string,
    icon: string
}

function HourlyCard(props: hourlyForecast) {
    const tString = new Date(props.time * 1000)
    const imgUrl = `http://openweathermap.org/img/wn/${props.icon}@2x.png`

    let unit;

    if (props.units === "metric") {
        unit = "C"
    } else {
        unit = "F"
    }


    return (
        <figure className="hourlyCard font-space" key={props.time}>
            <h6>{tString.toLocaleTimeString("en-US", { hour12: false })}</h6>
            <img src={imgUrl} alt="A small icon representing today's weather"/>
            <p>{props.weather}</p>
            <p>Temp: {props.temp}°{unit}</p>
            <p>Feel: {props.feelsLike}°{unit}</p>
        </figure>
    )

}


export default HourlyCard;