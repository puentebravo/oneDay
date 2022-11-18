import React from "react";


function CurrentTemp() {
    return (
        <section id="cTemp">
            <div id="tempHeader">
                <h2> Temperature: 43F</h2>
                <img src="" alt="icon representing today's weather" id="weatherIcon" />
            </div>
            <div id="weatherList">
                <ul>
                    <li>Wind Speed</li>
                    <li>Humidity</li>
                </ul>
            </div>

        </section>
    )
}

export default CurrentTemp;