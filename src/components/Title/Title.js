import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Title() {
  return (
    <Box
      sx={{
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        minWidth: 300,
        border: "1px solid  rgba(81, 81, 81, 1)",
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        The method of aggregation of trapezoidal linguistic terms
      </Typography>
    </Box>
  );
}
