import React, {useState, useEffect} from "react";
import { SaveData } from "../../interfaces";
import DateCard from "../../components/dateCard";
import ProgressBar from "../../components/progressBar";
import Navbar from "../../components/navbar";
import "./saved.css"


function Saved() {

    const [saveData, setSaveData] = useState<[SaveData]>()

    async function getSavedData(){
        const fetchResponse = await fetch("/api/getSaved")

        const fetchJson = await fetchResponse.json()

        localStorage.setItem("saveData", JSON.stringify(fetchJson))

        setSaveData(fetchJson)
    }

    useEffect(() => {
        let cachedSaveData = localStorage.getItem("saveData")

        if (cachedSaveData) {
            setSaveData(JSON.parse(cachedSaveData))
        }

        getSavedData();

    }, [])
    
    return (
        <>
            <Navbar />
            <main id="savedList" className="font-space">

                {
                    saveData ? 
                    saveData.map( element => (
                        <DateCard date={element.date} title={element.title} high={element.high} low={element.low} weather={element.weather} story={element.story} photoSrc={element.photoSrc}/>
                    ))

                    : <ProgressBar />
                }
            </main>
        </>
    )

}

export default Saved;