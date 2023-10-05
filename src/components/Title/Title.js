import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";

import { GoSidebarExpand } from "react-icons/go";
export default function Title({ setIsConfigurationPanelOpen }) {
  return (
    <Box
      sx={{
        boxShadow: 1,
        borderRadius: 2,
        padding: "20px",
        border: "1px solid  rgba(81, 81, 81, 1)",
        marginTop: "20px",
        backgroundColor: "#181819",
        marginBottom: "0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        sx={{ margin: "0px" }}
      >
        THE METHOD OF AGGREGATION OF TRAPEZOIDAL LINGUISTIC TERMS
      </Typography>
      <IconButton
        aria-label="menu"
        color="primary"
        size="large"
        onClick={() => setIsConfigurationPanelOpen(true)}
      >
        <GoSidebarExpand />
      </IconButton>
    </Box>
  );
}
