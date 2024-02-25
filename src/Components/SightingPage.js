import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@mui/material";
import GoBackButton from "./GoBackButton";
import { BACKEND_URL } from "../constants.js";

export default function SightingPage() {
  const { id } = useParams();
  const [sighting, setSighting] = useState();
  useEffect(() => {
    const fetchSightingData = async () => {
      try {
        const data = await axios.get(`${BACKEND_URL}/sightings/${id}`);
        setSighting(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSightingData();
  }, [id]);

  const newSighting = sighting ? (
    <Card
      sx={{
        width: 800,
        minHeight: 300,
        display: "flex",
        justifyContent: "center",
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <CardContent>
        <p>Date: {sighting.date}</p>
        <p>Location: {sighting.location}</p>
        <p>{sighting.notes}</p>
      </CardContent>
    </Card>
  ) : null;

  return (
    <div className="sighting-page">
      <GoBackButton />
      {newSighting}
    </div>
  );
}
