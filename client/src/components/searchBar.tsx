import React from "react";

interface city {
  city: string | undefined;
  setCity: (params: any) => any;
  getCityWeather: (params: any) => any
}

function SearchBar(props: city) {

  function handleInputChange(input: string) {
    setTimeout(() => {
      props.setCity(input)
    }, 500);
  }

  function handleFormSubmit() {
    props.getCityWeather(props.city);
  }

  return (
    <section id="searchBar">
      <button className="button" id="searchBtn" onClick={handleFormSubmit}>Search</button>
      <form>
        <label htmlFor="citySearch">
          <input
            id="citySearch"
            type="text"
            placeholder="Search"
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </label>
        
      </form>
      
    </section>
  );
}

export default SearchBar;
