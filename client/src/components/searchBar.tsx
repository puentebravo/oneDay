import React from "react";

interface city {
  city: string | undefined;
  setCity: (params: any) => any;
}

function SearchBar(props: city) {
  return (
    <section id="searchBar">
      <button className="button" id="searchBtn">Search</button>
      <form>
        <label htmlFor="citySearch">
          <input
            id="citySearch"
            type="text"
            placeholder="Search"
            value={props.city}
            onChange={(e) => props.setCity(e.target.value)}
          />
        </label>
        
      </form>
      
    </section>
  );
}

export default SearchBar;
