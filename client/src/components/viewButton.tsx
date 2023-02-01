import React from "react";

interface getFunctions {
    setOpen: (params: any) => any
}

function ViewButton(props: getFunctions) {
    const handleOpen = () => {
        props.setOpen(true)
        console.log("Clicked")
    }

    return <button className="button" id="viewBtn" onClick={handleOpen}>View Memory</button>
}

export default ViewButton;