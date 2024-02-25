import React from "react";
import { Container } from "@mui/material";

export default function SearchPage(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.search.value;
    props.setSearchParams({ location: query });
  };

  return (
    <div>
      <p className="query">Make your query by location.</p>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            name="search"
            size="35"
            className="input"
          ></input>
          <input type="submit" value="Search" className="input"></input>
        </form>
      </Container>
    </div>
  );
}
