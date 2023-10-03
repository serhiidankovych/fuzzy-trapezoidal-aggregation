import React from "react";
import { Typography } from "@mui/material";

export default function PessimisticPosition({
  neutralPositionResults,
  neutralPosition,
}) {
  return (
    <>
      {neutralPositionResults.map((result, index) => (
        <Typography variant="h3" color="#90caf9" key={index}>
          {`${Object.entries(result)
            .map(([key, value]) => `${key}: ${value.toFixed(3)}`)
            .join(", ")}`}
        </Typography>
      ))}
      {Object.entries(neutralPosition).map(([key, value]) => (
        <div key={key}>{`${key}: ${value.toFixed(3)}`}</div>
      ))}
    </>
  );
}
