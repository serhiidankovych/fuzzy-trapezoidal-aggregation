import React from "react";
import { Typography, Box } from "@mui/material";

export default function PessimisticPosition({
  neutralPositionResults,
  neutralAggressivePositionResults,
}) {
  return (
    <>
      <Box
        component="span"
        sx={{
          p: 2,
        }}
      >
        {neutralPositionResults.map((result, index) => (
          <Typography variant="h2" color="#90caf9" key={index}>
            {`${Object.entries(result)
              .map(([key, value]) => `${key}: ${value.toFixed(2)}*`)
              .join(", ")}`}
          </Typography>
        ))}
        <Typography>OR</Typography>
        {neutralAggressivePositionResults.map((result, index) => (
          <Typography variant="h2" color="#90caf9" key={index}>
            {`${Object.entries(result)
              .map(([key, value]) => `${key}: ${value.toFixed(2)}**`)
              .join(", ")}`}
          </Typography>
        ))}
      </Box>
    </>
  );
}
