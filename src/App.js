import React from "react";
import bigfoot from "./bigfoot.png";
import "./App.css";
import { Link } from "react-router-dom";

class App extends React.Component {
  handleClick = () => {
    const navigate = this.props.navigate;
    navigate("/sightings");
  };

  linkStyle = {
    textDecoration: "none",
    color: "white",
    border: "solid",
    padding: "10px",
    margin: "20px",
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Bigfoot sightings</h1>
          <img src={bigfoot} className="bigfoot" alt="bigfoot" width={400} />

          <Link to={"/sightings"} style={this.linkStyle}>
            <h4>Click here to view Bigfoot sightings</h4>
          </Link>

          <Link to={"/new"} style={this.linkStyle}>
            <h4> Click here to add a new sighting</h4>
          </Link>
        </header>
      </div>
    );
  }
}

export default App;
