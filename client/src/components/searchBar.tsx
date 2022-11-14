import React from "react";

interface city {
  city: string | undefined;
  setCity: (params: any) => any;
}

function SearchBar(props: city) {
  return (
    <section id="searchBar">
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
        <button className="button">Search</button>
      </form>
    </section>
  );
}

export default SearchBar;
