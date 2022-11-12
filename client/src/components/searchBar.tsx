import React from "react";

interface city {
    city: string
    setCity: (params: any) => any
}

function SearchBar(props: city) {
    return (
        <form>
            <label htmlFor="input">
                <input 
                type="text"
                value={props.city}
                onChange={(e) => props.setCity(e.target.value)}
                />
            </label>   
        </form>
    )
}

export default SearchBar;