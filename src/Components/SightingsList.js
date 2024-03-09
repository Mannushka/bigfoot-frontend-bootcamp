import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import GoBackButton from "./GoBackButton";
import { BACKEND_URL } from "../constants.js";
import SearchPage from "./SearchPage.js";
import "./Styling.css";

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

  const newSightings = sightings.map((sighting, index) =>
    sighting.date && sighting.location ? (
      <Link to={`./${sighting.id}`} key={index}>
        <div className="sightings-list-container">
          <Card sx={{ width: 300 }}>
            <div className="sighting-preview-card-content">
              <CardContent>
                <p>{sighting.date}</p>
                <p> {sighting.location}</p>
              </CardContent>
            </div>
          </Card>
        </div>
      </Link>
    ) : null
  );

  return (
    <div>
      <GoBackButton />
      <h1 className="page-title">Bigfoot sightings</h1>
      <SearchPage setSearchParams={setSearchParams} />
      {newSightings}
    </div>
  );
}
