import React from "react";

interface Forecast {
    id: number,
    date: number,
    nighttime: number,
    daytime: number,
    weather: string,
    icon: string,
    units: string
}

function ForecastCard(props: Forecast ) {

    const imgUrl = `http://openweathermap.org/img/wn/${props.icon}@2x.png`
    const dtString = new Date(props.date * 1000)
    const humanString = dtString.toLocaleDateString()
    let tempUnit;

    if (props.units === "metric") {
        tempUnit = "C"
    } else {
        tempUnit = "F"
    }





    return (
        <figure className="foreCastCard" key={props.id}>
            <img src={imgUrl} alt="weather icon" />
            <h6>{humanString}</h6>
            <p>Conditions: {props.weather} </p>
            <p>Night: {props.nighttime}°{tempUnit}</p>
            <p>Day: {props.daytime}°{tempUnit}</p>
        </figure>


    )
}

export default ForecastCard