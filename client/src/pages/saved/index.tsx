import React from "react";
import Navbar from "../../components/navbar";
import "./saved.css"


function Saved() {

    let testArr = [1, 2, 3, 4, 5, 6]
    return (
        <>
            <Navbar />
            <main id="savedList" className="font-space">
                {testArr.map( element => (
                    <div>This is a thing, among other things.</div>
                ))}
            </main>
        </>
    )

}

export default Saved