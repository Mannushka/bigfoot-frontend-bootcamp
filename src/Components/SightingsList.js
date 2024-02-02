import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import { CardContent, Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function SightingsList() {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("http://localhost:3000/sightings");
        console.log(data.data);
        setSightings(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const newSightings = sightings.map((sighting, index) =>
    sighting.YEAR && sighting.STATE ? (
      <Link to={`/sightings/${index}`} key={index}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card sx={{ marginBottom: 3, width: 300 }}>
            <CardContent sx={{ display: "flex", justifyContent: "flex-start" }}>
              <p>
                {index + 1}. {sighting.STATE} {sighting.YEAR}
              </p>
            </CardContent>
          </Card>
        </Container>
      </Link>
    ) : null
  );

  return (
    <div>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        <h1>Bigfoot sightings</h1>
      </Container>
      {newSightings}
    </div>
  );
}
