import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function GoBackButton() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Button
        variant="standard"
        sx={{
          backgroundColor: "orange",
          marginTop: 3,
          marginLeft: 2,
        }}
        onClick={handleGoBack}
      >
        Go back
      </Button>
    </div>
  );
}
