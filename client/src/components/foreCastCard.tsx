import React from "react";

interface Test {
    key: number
}

function ForecastContainer(props: Test) {

    // const imgUrl = `http://openweathermap.org/img/wn/${props.icon}@2x.png`
    return (
        <figure key={props.key} className="foreCastCard">
            <img src="" alt="weather icon"/>
            <h6>Day: Unknown</h6>
            <p>Nighttime: Probably cold</p>
        </figure>

        
    )
}

export default ForecastContainer