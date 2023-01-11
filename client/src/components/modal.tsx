import React, { useState } from "react";
import { useFormik } from "formik";
import { currentWeatherObj } from "../interfaces";



interface modalOpts {
    status: boolean,
    setStatus: (params: any) => any
    weatherData: currentWeatherObj

}


function Modal(props: modalOpts) {

    const [file, setFile] = useState<File>()

    const [link, setLink] = useState<string>()

    const [key, setKey] = useState<string>()

    const handleClose = () => {
        props.setStatus(false)
    }


    async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        console.log("this is working.")

        const fileList = event.target.files

        if (fileList) {
            setFile(fileList[0])

            const newLink = await fetch("/api/getSignedUrl")

            const newLinkData = await newLink.json()

            setLink(newLinkData.fetchUrl)

            setKey(newLinkData.key)

            console.log(newLinkData)

        }
    }


    const formik = useFormik({
        initialValues: {
            title: "",
            story: ""
        },
        onSubmit: values => {
            if (link) {
                fetch(link, {
                    method: "PUT",
                    body: file,
                    headers: {
                        "Origin": "http://localhost:3000",
                    }
                }).then(response => {
                    response.json()
                }).then(data => {
                    console.log(data, values)

                    const saveData = {
                        title: values.title,
                        date: props.weatherData.dt.toString(),
                        temp: props.weatherData.temp.toString(),
                        feel: props.weatherData.feels_like.toString(),
                        weather: props.weatherData.weather[0].description,
                        story: values.story,
                        photoSrc: key
                    }
                    
                    console.log(saveData)

                    fetch("/api/saveDate", {
                        method: "POST",
                        body: JSON.stringify(saveData),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then( data => {
                        data.json();
                    }).then( response => {
                        console.log("Success", response)
                        handleClose()
                    }).catch( err => {
                        console.log(err)
                        handleClose()
                    })
                })
            }

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
                        <input className="textEntry" id="photo" name="photo" type="file" capture="environment" accept="image/*" onChange={handleFileUpload} />
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