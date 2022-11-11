import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <h1 className="font-neon glow text-left">One Day</h1>
            <ul id="navList">
                <li className="navLink"><Link to={"/"}>Home</Link></li>
                <li className="navLink inactive"><Link to={"/dates"}>History</Link></li>
            </ul>
        </nav>

    )
}

export default Navbar;