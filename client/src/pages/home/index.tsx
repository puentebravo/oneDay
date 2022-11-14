import React, {useState} from "react";
import Navbar from "../../components/navbar";
import SearchBar from "../../components/searchBar";
import "./home.css"


function Home() {

    const [city, setCity] = useState()


    return (
        <>
        <Navbar />
        <SearchBar city={city} setCity={setCity}/>
        </>
    )
}

export default Home;