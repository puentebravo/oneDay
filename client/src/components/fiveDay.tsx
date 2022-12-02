import React from "react";
import ForecastContainer from "./foreCastCard";


function FiveDay() {


    const arr = [1 , 2, 3, 4, 5]
    return (
        <section className="card font-space" id="fiveDay">
            <div id="forecastContainer">

                {arr.map( (element) => (
                    <ForecastContainer key={element}/>
                ))}

            </div>
        </section>

    )
}

export default FiveDay;