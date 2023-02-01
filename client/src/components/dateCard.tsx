import React from "react";
import { SaveData } from "../interfaces";


function DateCard(props: SaveData) {


    return (

        <section className="card" >
            <div className="dCardHeader">
                <h2 className="font-space text-lead">{props.date}</h2>
            </div>
            <div className="dCardBody">
                <p>{props.title}</p>
                <p>Conditions: {props.weather}</p>
                <p>High: {props.high}</p>
                <p>Low: {props.low}</p>
            </div>
            <div className="dCardFooter">
                <button className="button">View Memory</button>
            </div>
        </section>

    )

}


export default DateCard;