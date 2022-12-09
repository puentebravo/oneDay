import React from "react";

interface unitProp {
    unit: string,
    setUnit: (params: any) => any
}

function UnitSwitch(props: unitProp) {

    const handleModeSwitch = () => {
        if (props.unit === "metric") {
            props.setUnit("imperial")
        } else {
            props.setUnit("metric")
        }

        console.log(props.unit)
    }

    return (
        <figure id="unitToggler">
            <p className="font-space">{props.unit.toUpperCase()}</p>
            <label className="switch">
                <input type="checkbox" onChange={handleModeSwitch} />
                <span className="slider"></span>
            </label>
        </figure>

    )
}

export default UnitSwitch;