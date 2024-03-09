import React from "react";

export default function SearchPage(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.search.value;
    props.setSearchParams({ location: query });
  };

  return (
    <div className="query-field-container">
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
