import React from "react";
import { useState } from "react";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoBackButton from "./GoBackButton.js";

export default function NewSightingForm() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    addNewSighting();
  };

  const addNewSighting = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/sightings`, {
        date: date,
        location: location,
        notes: notes,
      });
      setDate("");
      setLocation("");
      setNotes("");
      navigate(`/sightings/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <GoBackButton />
      <h1>Create a new sighting</h1>
      <form>
        <label>Date </label>
        <input
          type="datetime-local"
          name="date"
          id="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        ></input>
        <br />
        <label>Location </label>
        <input
          type="text"
          name="location"
          id="location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        ></input>
        <br />
        <label>Notes </label>
        <input
          type="text"
          name="notes"
          id="notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        ></input>
        <br />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
