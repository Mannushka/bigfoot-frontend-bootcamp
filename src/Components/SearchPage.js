import React from "react";
import "./Styling.css";

export default function SearchPage(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    props.setSearchParams({ location: query });
  };

  return (
    <div className="container">
      <div className="query-header">
        <p>Make your query by location.</p>
      </div>
      <div className="query-form">
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            name="search"
            size="35"
            className="input"
          ></input>
          <input type="submit" value="Search" className="input"></input>
        </form>
      </div>
    </div>
  );
}
