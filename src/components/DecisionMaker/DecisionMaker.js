import * as React from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import PessimisticPosition from "../PessimisticPosition/PessimisticPosition";
import OptimisticPosition from "../OptimisticPosition/OptimisticPosition";
import NeutralPosition from "../NeutralPosition/NeutralPosition";

import AdvancedPessimisticProbability from "../PessimisticPosition/AdvancedPessimisticProbability";
import { Button } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#181819" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DecisionMaker({ intervalEstimates, configuration }) {
  const [
    isAdvancedPessimisticPositionShown,
    setIsAdvancedPessimisticPositionShown,
  ] = React.useState(false);
  const [
    isAdvancedOptomisticPositionShown,
    setIsAdvancedOptomisticPositionShown,
  ] = React.useState(false);
  const [isAdvancedNeutralPositionShown, setAdvancedNeutralPositionShown] =
    React.useState(false);

  const minIntervals = {};
  const maxIntervals = {};

  // Iterate over each item in the intervalEstimates array
  intervalEstimates.forEach((item, index) => {
    const { alternative, selectedIntervalsEstimate } = item;

    // Get the minimum intervals for the current alternative, or set them to Infinity if they don't exist yet
    const [min0, min1] = minIntervals[alternative] || [Infinity, Infinity];
    const [max0, max1] = maxIntervals[alternative] || [0, 0];

    // Calculate the new minimum values by comparing the current minimum values with the selectedIntervalsEstimate
    const newMin0 = Math.min(min0, selectedIntervalsEstimate[0]);
    const newMin1 = Math.min(min1, selectedIntervalsEstimate[1]);

    const newMax0 = Math.max(max0, selectedIntervalsEstimate[0]);
    const newMax1 = Math.max(max1, selectedIntervalsEstimate[1]);

    // Update the minIntervals object with the new minimum values
    minIntervals[alternative] = [newMin0, newMin1];
    maxIntervals[alternative] = [newMax0, newMax1];
  });

  // console.log(maxIntervals);
  // console.log(minIntervals);

  const pessimisticProbability = {};
  Object.entries(minIntervals).forEach(([key, item]) => {
    pessimisticProbability[key] = Math.max(
      1 - Math.max((1 - item[0]) / (item[1] - item[0] + 1), 0),
      0
    );
  });

  console.log(pessimisticProbability);

  // let pessimisticProbabilityRanked = Object.entries(pessimisticProbability)
  //   .sort((a, b) => b[1] - a[1])
  //   .map((entry) => entry[0]);

  const pessimisticProbabilityRanked = Object.entries(
    pessimisticProbability
  ).sort((a, b) => b[1] - a[1]);

  console.log(pessimisticProbabilityRanked);

  const optimisticProbability = {};
  Object.entries(maxIntervals).forEach(([key, item]) => {
    optimisticProbability[key] = Math.max(
      1 - Math.max((1 - item[0]) / (item[1] - item[0] + 1), 0),
      0
    );
  });

  const pessimisticPositionResults = Object.entries(
    pessimisticProbability
  ).reduce(
    // The reduce function takes an accumulator (acc) and the current key-value pair [key, value]
    // The accumulator (acc) is an object with two properties: "keys" and "maxValue"
    (acc, [key, value]) => {
      // Check if the current value is greater than the maximum value in the accumulator
      if (value > acc.maxValue) {
        // If it is, create a new accumulator object with the current key-value pair as the only element in the "keys" array
        // Set the maximum value to the current value
        return { keys: [{ [key]: value }], maxValue: value };
      } else if (value === acc.maxValue) {
        // If the current value is equal to the maximum value in the accumulator
        // Add the current key-value pair to the "keys" array in the accumulator
        acc.keys.push({ [key]: value });
      }
      // Return the accumulator for the next iteration of the reduce function
      return acc;
    },
    // Initialize the accumulator object with an empty "keys" array and a maximum value of negative infinity
    { keys: [], maxValue: Number.NEGATIVE_INFINITY }
  ).keys;

  const optimisticPositionResults = Object.entries(
    optimisticProbability
  ).reduce(
    // The reduce function takes an accumulator (acc) and the current key-value pair [key, value]
    // The accumulator (acc) is an object with two properties: "keys" and "maxValue"
    (acc, [key, value]) => {
      // Check if the current value is greater than the maximum value in the accumulator
      if (value > acc.maxValue) {
        // If it is, create a new accumulator object with the current key-value pair as the only element in the "keys" array
        // Set the maximum value to the current value
        return { keys: [{ [key]: value }], maxValue: value };
      } else if (value === acc.maxValue) {
        // If the current value is equal to the maximum value in the accumulator
        // Add the current key-value pair to the "keys" array in the accumulator
        acc.keys.push({ [key]: value });
      }
      // Return the accumulator for the next iteration of the reduce function
      return acc;
    },
    // Initialize the accumulator object with an empty "keys" array and a maximum value of negative infinity
    { keys: [], maxValue: Number.NEGATIVE_INFINITY }
  ).keys;

  const neutralPosition = {};
  Object.entries(pessimisticProbability).forEach(([key, pessimisticProb]) => {
    const optimisticProb = optimisticProbability[key];
    console.log(pessimisticProb);
    console.log(optimisticProb);
    const neutralProb = (pessimisticProb + optimisticProb) / 2;
    neutralPosition[key] = neutralProb;
  });

  const neutralAggressivePosition = {};
  Object.entries(minIntervals).forEach(([key, minValue]) => {
    const maxValue = maxIntervals[key];
    const neutralAggressive = (minValue[0] + maxValue[1]) / 2; // Added missing opening parenthesis here
    neutralAggressivePosition[key] = neutralAggressive;
  });
  // console.log("++++++++++");

  // console.log(neutralAggressivePosition);

  // Find the keys with the highest probabilities in the neutral position
  const neutralPositionResults = Object.entries(neutralPosition).reduce(
    (acc, [key, value]) => {
      if (value > acc.maxValue) {
        return { keys: [{ [key]: value }], maxValue: value };
      } else if (value === acc.maxValue) {
        acc.keys.push({ [key]: value });
      }
      return acc;
    },
    { keys: [], maxValue: Number.NEGATIVE_INFINITY }
  ).keys;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={12}>
        <Grid xs={4}>
          <Item>
            <Box
              component="span"
              sx={{
                p: 2,
                border: "1px solid #515151",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "3px",
              }}
            >
              <Typography variant="h4">The pessimistic position</Typography>
              <PessimisticPosition
                pessimisticPositionResults={pessimisticPositionResults}
              />
              <Button
                variant="outlined"
                onClick={() =>
                  setIsAdvancedPessimisticPositionShown((prev) => !prev)
                }
              >
                {isAdvancedPessimisticPositionShown
                  ? "Hide"
                  : "See more details"}
              </Button>
            </Box>
            {isAdvancedPessimisticPositionShown && (
              <AdvancedPessimisticProbability
                minIntervals={minIntervals}
                pessimisticProbability={pessimisticProbability}
                pessimisticProbabilityRanked={pessimisticProbabilityRanked}
              />
            )}
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item>
            <Typography>The neutral position</Typography>
            <NeutralPosition
              neutralPositionResults={neutralPositionResults}
              neutralPosition={neutralPosition}
              neutralAggressivePosition={neutralAggressivePosition}
            />
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item>
            <Typography>The optimistic position</Typography>
            <OptimisticPosition
              optimisticPositionResults={optimisticPositionResults}
              optimisticProbability={optimisticProbability}
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
