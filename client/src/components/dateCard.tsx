import React, { useState } from "react";
import { SaveData } from "../interfaces";
import ViewButton from "./viewButton";
import ViewModal from "./viewModal";


function DateCard(props: SaveData) {

    const [show, setShow] = useState<boolean>(false)


    return (
        <>
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
                    <ViewButton setOpen={setShow} />
                </div>
            </section>
            <ViewModal status={show} setStatus={setShow} saveData={props} />
        </>
    )

}


export default DateCard;