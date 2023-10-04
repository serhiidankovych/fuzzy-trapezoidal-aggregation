import React from "react";
import { Typography } from "@mui/material";

export default function PessimisticPosition({ neutralPositionResults }) {
  return (
    <>
      {neutralPositionResults.map((result, index) => (
        <Typography variant="h2" color="#90caf9" key={index}>
          {`${Object.entries(result)
            .map(([key, value]) => `${key}: ${value.toFixed(2)}`)
            .join(", ")}`}
        </Typography>
      ))}
    </>
  );
}
