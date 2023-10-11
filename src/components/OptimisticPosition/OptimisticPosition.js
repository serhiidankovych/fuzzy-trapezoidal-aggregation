import React from "react";
import { Typography, Box } from "@mui/material";

export default function OptimisticPosition({ optimisticPositionResults }) {
  return (
    <>
      <Box
        component="span"
        sx={{
          p: 1.5,
        }}
      >
        {optimisticPositionResults.map((result, index) => (
          <Typography variant="h2" color="#90caf9" key={index}>
            {`${Object.entries(result)
              .map(([key, value]) => `${key}: ${value.toFixed(2)}`)
              .join(", ")}`}
          </Typography>
        ))}
      </Box>
    </>
  );
}
