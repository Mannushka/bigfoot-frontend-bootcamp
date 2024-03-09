import React from "react";
import { List, ListItem, Divider, ListItemText } from "@mui/material";
import "./Styling.css";

export default function CommentsList(props) {
  const commentsList =
    props.comments &&
    props.comments.map((comment, index) => (
      <div key={index} className="comments-list">
        <List>
          <ListItem>
            <div className="comment-container">
              <ListItemText
                primary={comment.createdAt}
                secondary={<React.Fragment>{comment.content}</React.Fragment>}
              />
            </div>
          </ListItem>
          <Divider component="li" />
        </List>
      </div>
    ));
  return <div>{commentsList}</div>;
}
