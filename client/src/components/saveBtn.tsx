import React from "react";

interface saveFunctions {
    setStatus: (params: any) => any
}


function SaveBtn(props: saveFunctions) {

    const handleOpen = () => {
        props.setStatus(true)
        console.log("clicked")
    }

    return <button className="button" id="saveBtn" onClick={handleOpen}>SAVE</button>
}


export default SaveBtn;