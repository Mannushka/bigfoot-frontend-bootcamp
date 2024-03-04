import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  TextField,
  Button,
  List,
  ListItem,
  Divider,
  ListItemText,
  Typography,
} from "@mui/material";
import GoBackButton from "./GoBackButton";
import { BACKEND_URL } from "../constants.js";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import Divider from "@mui/material/Divider";
// import ListItemText from "@mui/material/ListItemText";

export default function SightingPage() {
  const { id } = useParams();
  const [sighting, setSighting] = useState();
  const [comments, setComments] = useState();
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    const fetchSightingData = async () => {
      try {
        const data = await axios.get(`${BACKEND_URL}/sightings/${id}`);
        setSighting(data.data);
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

  const commentsList =
    comments &&
    comments.map((comment, index) => (
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start" key={index}>
          <ListItemText
            sx={{
              display: "flex",
              // justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
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
      <div
        className="comments"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h3
          style={{
            color: "white",
          }}
        >
          Comments:
        </h3>
        <TextField
          required
          id="outlined-required"
          value={newComment}
          placeholder="write you comment in here"
          style={{
            backgroundColor: "white",
            width: "300px",
          }}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <Button
          variant="standard"
          sx={{
            backgroundColor: "orange",
            marginTop: 1,
            marginBottom: 3,
          }}
          onClick={handleNewCommentSubmit}
        >
          Submit
        </Button>
        {commentsList}
      </div>
    </div>
  );
}
