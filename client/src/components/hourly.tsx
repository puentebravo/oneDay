import React from "react";
import { currentWeatherObj } from "../interfaces"

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

    return (
        <section className="card font-space" id="hourly">
            <div id="hourlyContainer">
                {hours.map((element) => (
                    <div>{element.temp}</div>
                ))}
            </div>
        </section>
    )
}

export default Hourly;