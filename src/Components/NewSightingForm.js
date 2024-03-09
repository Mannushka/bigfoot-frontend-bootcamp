import React from "react";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoBackButton from "./GoBackButton.js";
import Select from "react-select";
import { Button, TextField } from "@mui/material";

export default function NewSightingForm() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/categories`);
        const categoriesFetched = response.data;
        setCategories(categoriesFetched);
        console.log(categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCategories();
  }, []);

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleSelectChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addNewSighting();
  };

  const selectedCategoryIds = selectedCategories.map(({ value }) => value); //extract the selected categories IDs

  const addNewSighting = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/sightings`, {
        date: date,
        location: location,
        notes: notes,
        selectedCategoryIds,
      });
      setDate("");
      setLocation("");
      setNotes("");
      setSelectedCategories([]);
      navigate(`/sightings/${res.data.id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <GoBackButton />
      <div
        className="header"
        style={{
          display: "flex",
          // justifyContent: "center",
          color: "white",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Create a new sighting</h1>

        <form>
          <h4>Category</h4>
          <div
            style={{
              color: "black",
            }}
          >
            <Select
              isMulti
              options={categoryOptions}
              value={selectedCategories}
              onChange={handleSelectChange}
            />
          </div>
          <h4>Date</h4>
          <TextField
            type="datetime-local"
            name="date"
            id="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            variant="outlined"
            style={{ backgroundColor: "white", width: 350 }}
          />
          <br />
          <h4>Location</h4>
          <TextField
            type="text"
            name="location"
            id="location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            variant="outlined"
            style={{ backgroundColor: "white", width: 350 }}
          />
          <br />
          <h4>Notes:</h4>
          <TextField
            type="text"
            name="notes"
            id="notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            variant="outlined"
            style={{ backgroundColor: "white", width: 350 }}
          />
          <br />
          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit}
            style={{
              marginTop: 30,
              display: "flex",
              justifyContent: "center",
              backgroundColor: "orange",
              color: "black",
            }}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
