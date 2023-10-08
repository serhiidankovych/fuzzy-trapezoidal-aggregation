import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";

import { BsGithub } from "react-icons/bs";
export default function Footer({ setIsConfigurationPanelOpen }) {
  const redirectToGitHub = () => {
    const githubUrl =
      "https://github.com/serhiidankovych/trapezoidal-aggregation";

    window.open(githubUrl, "_blank");
  };
  return (
    <Box
      sx={{
        boxShadow: 1,
        borderRadius: 2,
        padding: "20px",
        border: "1px solid  rgba(81, 81, 81, 1)",

        backgroundColor: "#181819",
        marginBottom: "0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <IconButton
        aria-label="menu"
        color="primary"
        size="large"
        onClick={redirectToGitHub}
      >
        <BsGithub />
      </IconButton>
      <Typography gutterBottom align="center" sx={{ margin: "0px" }}>
        Copyright (c) {new Date().getFullYear()} DANKOVYCH SERHII
      </Typography>
    </Box>
  );
}
