import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import { CardContent, Container } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import GoBackButton from "./GoBackButton";
import { BACKEND_URL } from "../constants.js";
import SearchPage from "./SearchPage.js";

export default function SightingsList() {
  const [sightings, setSightings] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const locationQuery = searchParams.get("location") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = {};
        if (locationQuery) {
          query.location = locationQuery;
        }

        const { data } = await axios.get(`${BACKEND_URL}/sightings`, {
          params: query,
        });
        setSightings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [locationQuery]);

  console.log(sightings);

  const newSightings = sightings.map((sighting, index) =>
    sighting.date && sighting.location ? (
      <Link to={`./${sighting.id}`} key={index}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card sx={{ marginBottom: 3, width: 300 }}>
            <CardContent sx={{ display: "flex", justifyContent: "flex-start" }}>
              <p>
                {sighting.date} {sighting.location}
              </p>
            </CardContent>
          </Card>
        </Container>
      </Link>
    ) : null
  );

  return (
    <div>
      <GoBackButton />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        <h1 className="page-title">Bigfoot sightings</h1>
      </Container>
      <SearchPage setSearchParams={setSearchParams} />
      {newSightings}
    </div>
  );
}
