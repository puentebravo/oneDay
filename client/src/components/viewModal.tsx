import React from "react";
import { SaveData } from "../interfaces";

interface modalOpts {
    status: boolean,
    setStatus: (params: any) => any
    saveData: SaveData
}

function ViewModal(props: modalOpts) {

    const data = props.saveData

    const handleClose = () => {
        props.setStatus(false)
    }

    return (
        <section className={`modal ${props.status ? 'show' : ""}`} onClick={handleClose}>
            <div className="modal-content font-space" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title text-lead">EVENT_DATA: {data.title}</h3>
                </div>
                <div className="modal-body">
                    <p>{data.story}</p>
                    <img src="" alt="A memory of today" />
                </div>
                <div className="modal-footer">
                    <button className="button" onClick={handleClose}>CLOSE</button>
                </div>

            </div>
        </section>
    )
}

export default ViewModal;