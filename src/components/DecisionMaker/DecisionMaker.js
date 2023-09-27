import * as React from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import PessimisticPosition from "../PessimisticPosition/PessimisticPosition";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DecisionMaker({ intervalEstimates, configuration }) {
  const [pessimisticPosition, setPessimisticPositions] = React.useState([]);

  const { alternatives, criteria } = configuration;

  const minIntervals = {};

  // Iterate over each item in the intervalEstimates array
  intervalEstimates.forEach((item, index) => {
    const { alternative, selectedIntervalsEstimate } = item;

    // Get the minimum intervals for the current alternative, or set them to Infinity if they don't exist yet
    const [min0, min1] = minIntervals[alternative] || [Infinity, Infinity];

    // Calculate the new minimum values by comparing the current minimum values with the selectedIntervalsEstimate
    const newMin0 = Math.min(min0, selectedIntervalsEstimate[0]);
    const newMin1 = Math.min(min1, selectedIntervalsEstimate[1]);

    // Update the minIntervals object with the new minimum values
    minIntervals[alternative] = [newMin0, newMin1];
  });
  //fix this code
  minIntervals.forEach((item, index) => {
    console.log(
      Math.max(1 - Math.max((1 - item[0]) / (item[1] - item[0] + 1), 0), 0)
    );
  });

  console.log(minIntervals);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={12}>
        <Grid xs={4}>
          <Item>
            <Typography>The pessimistic position</Typography>
            <PessimisticPosition pessimisticPosition={pessimisticPosition} />
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item>
            <Typography>The neutral position</Typography>
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item>
            <Typography>The optimistic position</Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
