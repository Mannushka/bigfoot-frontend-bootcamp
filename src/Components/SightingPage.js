import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  List,
  ListItem,
  Divider,
  ListItemText,
} from "@mui/material";
import GoBackButton from "./GoBackButton";
import { BACKEND_URL } from "../constants.js";
import SightingCard from "./SightingCard";

export default function SightingPage() {
  const { id } = useParams();
  const [sighting, setSighting] = useState();
  const [comments, setComments] = useState();
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (id) {
      const fetchSightingData = async () => {
        try {
          const data = await axios.get(`${BACKEND_URL}/sightings/${id}`);
          setSighting(data.data);
          console.log(data.data);
        } catch (error) {
          console.log(error);
        }
      };
      const fetchComments = async () => {
        try {
          const comments = await axios.get(
            `${BACKEND_URL}/sightings/${id}/comments`
          );
          setComments(comments.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchSightingData();
      fetchComments();
    }
  }, [id]);

  let categories = [];
  if (sighting) {
    const categoriesData = sighting.categories;
    categories = categoriesData.map(({ name }) => name);
  }

  console.log(categories);
  console.log(sighting);

  const newSighting = sighting && (
    <SightingCard sighting={sighting} categories={categories} />
  );
  const commentsList =
    comments &&
    comments.map((comment, index) => (
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start" key={index}>
          <ListItemText
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "black",
            }}
            primary={comment.createdAt}
            secondary={<React.Fragment>{comment.content}</React.Fragment>}
          />
        </ListItem>
        <Divider component="li" />
      </List>
    ));
  const handleNewCommentSubmit = async () => {
    try {
      const commentToSubmit = await axios.post(
        `${BACKEND_URL}/sightings/${id}/comments`,
        {
          content: newComment,
        }
      );

      setNewComment("");
    } catch (error) {
      console.log(error);
    }
    try {
      const comments = await axios.get(
        `${BACKEND_URL}/sightings/${id}/comments`
      );
      setComments(comments.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sighting-page">
      <GoBackButton />
      {newSighting}
      <div className="container">
        <h3>Comments:</h3>
        <div className="input-field">
          <TextField
            required
            id="outlined-required"
            value={newComment}
            placeholder="write you comment in here"
            onChange={(event) => setNewComment(event.target.value)}
            style={{ width: 350 }}
          />
        </div>
        <div className="button">
          <Button
            variant="standard"
            sx={{
              backgroundColor: "orange",
              color: "black",
            }}
            onClick={handleNewCommentSubmit}
          >
            Submit
          </Button>
        </div>
        {commentsList}
      </div>
    </div>
  );
}
