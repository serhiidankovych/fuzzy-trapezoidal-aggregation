import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Title() {
  return (
    <Box
      sx={{
        boxShadow: 1,
        borderRadius: 2,
        padding: "20px",
        border: "1px solid  rgba(81, 81, 81, 1)",
        marginTop: "50px",
        backgroundColor: "#181819",
        marginBottom: "0",
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        THE METHOD OF AGGREGATION OF TRAPEZOIDAL LINGUISTIC TERMS
      </Typography>
    </Box>
  );
}
