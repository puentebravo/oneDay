import React from "react";
import { currentWeatherObj } from "../interfaces"
import HourlyCard from "./hourlyCard";


interface hourlyForecasts {
    hourly: currentWeatherObj[],
    units: string
}


function Hourly(props: hourlyForecasts) {


    const hours = props.hourly.map(element => {
        return {
            time: element.dt,
            temp: element.temp,
            feelsLike: element.feels_like,
            weather: element.weather[0].description
        }
    })

    hours.length = 12

    
   

    console.log(hours)

    return (
        <section className="card font-space" id="hourly">
            <h3>Hourly Forecast</h3>
            <div id="hourlyContainer">
                {hours.map( element => (
                    <HourlyCard time={element.time} temp={element.temp} feelsLike={element.feelsLike} weather={element.weather} units={props.units}/>
                ))}
            </div>
        </section>
    )
}

export default Hourly;