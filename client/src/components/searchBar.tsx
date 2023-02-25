
import React from "react";

interface city {
  city: string | undefined;
  units: string,
  setCity: (params: any) => any;
  getCityWeather: (coords: any, units: any) => any
}

function SearchBar(props: city) {

  function handleInputChange(input: string) {
      props.setCity(input)
      console.log(props.city)
  }

  function handleFormSubmit() {

    console.log("this was clicked")
    props.getCityWeather(props.city, props.units);
    props.setCity("")
  }

  return (
    <section id="searchBar" className="card">
      <button className="button" id="searchBtn" onClick={handleFormSubmit}>Search</button>
      <form>
        <label htmlFor="citySearch">
          <input
            id="citySearch"
            type="text"
            placeholder="Input_City"
            value={props.city}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </label>

      </form>

    </section>
  );
}

export default SearchBar;
