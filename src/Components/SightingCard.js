import React from "react";
import { Card, CardContent } from "@mui/material";

export default function SightingCard(props) {
  return (
    <div className="sighting-card">
      <Card
        sx={{
          width: 800,
          minHeight: 300,
        }}
      >
        <CardContent>
          {props.categories.length > 0 && (
            <p>Categories: {props.categories.join(", ")}</p>
          )}
          <p>Date: {props.sighting.date}</p>
          <p>Location: {props.sighting.location}</p>
          <p>{props.sighting.notes}</p>
        </CardContent>
      </Card>
    </div>
  );
}
