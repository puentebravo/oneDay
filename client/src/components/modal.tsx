import React from "react";
import { useFormik } from "formik";

interface modalOpts {
    status: boolean,
    setStatus: (params: any) => any
}


function Modal(props: modalOpts) {

    const handleClose = () => {
        props.setStatus(false)
    }


    const formik = useFormik({
        initialValues: {
            title: "",
            story: "",
            photo: "",
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2))
        }
    })


    return (
        <section className={`modal ${props.status ? 'show' : ""}`} onClick={handleClose}>
            <div className="modal-content font-space" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title text-lead">INPUT_DATA</h3>
                </div>
                <div className="modal-body">
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="title">Title</label>
                        <input className="textEntry" id="title" name="title" type="text" onChange={formik.handleChange} value={formik.values.title} />

                        <label htmlFor="story">What's the Story?</label>
                        <input className="textEntry" id="story" name="story" type="text" onChange={formik.handleChange} />

                        <label htmlFor="photo">Upload a photo to capture your day</label>
                        <input className="textEntry" id="photo" name="photo" type="file" capture="environment" accept="image/*" onChange={formik.handleChange} />
                        <button className="button" type="submit">SUBMIT</button>
                    </form>
                </div>
                <div className="modal-footer">
                    <button className="button" onClick={handleClose}>CLOSE</button>
                </div>

            </div>
        </section>
    )
}

export default Modal;