import React from "react";

interface modalOpts {
    status: boolean,
    setStatus: (params: any) => any
}

function Modal(props: modalOpts) {

    const handleClose = () => {
        props.setStatus(false)
    }


    return (
        <section className={`modal ${props.status ? 'show' : ""}`} onClick={handleClose}>
            <div className="modal-content font-space" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">Test</h3>
                </div>
                <div className="modal-body">
                    <p>Form stuff goes here</p>
                </div>
                <div className="modal-footer">
                    <button className="button" onClick={handleClose}>Close</button>
                </div>

            </div>
        </section>
    )
}

export default Modal;