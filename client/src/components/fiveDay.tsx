import React from "react";
import ForecastCard from "./foreCastCard";
import { forecastObj } from "../interfaces"

interface forecasts {
    dailyForecasts: forecastObj[],
    units: string
}



function FiveDay(props: forecasts) {

    const daily = props.dailyForecasts.map( element => {
        return {
            date: element.dt,
            daytime: element.temp.day,
            nighttime: element.temp.night,
            weather: element.weather[0].description,
            icon: element.weather[0].icon,
            units: props.units
        }
    })

    return (
        <section className="card font-space" id="fiveDay">
            <div id="forecastContainer">

                {daily.map((element, index) => (
                    <ForecastCard id={index} daytime={element.daytime} date={element.date} nighttime={element.nighttime} weather={element.weather} icon={element.icon} units={element.units}/>
                ))}

            </div>
        </section>

    )
}

export default FiveDay;