import * as React from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import PessimisticPosition from "../PessimisticPosition/PessimisticPosition";
import OptimisticPosition from "../OptimisticPosition/OptimisticPosition";
import NeutralPosition from "../NeutralPosition/NeutralPosition";

import AdvancedPessimisticPosition from "../PessimisticPosition/AdvancedPessimisticPosition";
import AdvancedOptimisticPosition from "../OptimisticPosition/AdvancedOptimisticPosition";
import AdvancedNeutralPosition from "../NeutralPosition/AdvancedNeutralPosition";
import { Button } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#181819" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DecisionMaker({
  intervalEstimates,
  trapezoidalExpertOpinions,
  numbers,
}) {
  const [
    isAdvancedPessimisticPositionShown,
    setIsAdvancedPessimisticPositionShown,
  ] = React.useState(false);
  const [
    isAdvancedOptimisticPositionShown,
    setIsAdvancedOptimisticPositionShown,
  ] = React.useState(false);
  const [isAdvancedNeutralPositionShown, setIsAdvancedNeutralPositionShown] =
    React.useState(false);

  const minIntervals = {};
  const maxIntervals = {};
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

  let minIntervals2 = {};
  let maxIntervals2 = {};
  const alpha = numbers.alpha;

  trapezoidalExpertOpinions.forEach((data, index) => {
    const { selectedTrapezoidal, alternative } = data;

    // Get the minimum intervals for the current alternative, or set them to Infinity if they don't exist yet
    const [min0, min1] = minIntervals2[alternative] || [Infinity, Infinity];
    const [max0, max1] = maxIntervals2[alternative] || [0, 0];

    // Calculate the new minimum values by comparing the current minimum values with the selectedIntervalsEstimate
    const newMin0 = Math.min(min0, selectedTrapezoidal[0]);
    const newMin1 = Math.min(min1, selectedTrapezoidal[1]);

    const newMax0 = Math.max(max0, selectedTrapezoidal[2]);
    const newMax1 = Math.max(max1, selectedTrapezoidal[3]);

    // Update the minIntervals object with the new minimum values
    minIntervals2[alternative] = [newMin0, newMin1];
    maxIntervals2[alternative] = [newMax0, newMax1];
  });

  const averageTrapezoidalIntervals = {};
  const averageTrapezoidalOptions = [];

  Object.keys(minIntervals2).forEach((key, index) => {
    const averageTrapezoidalOption = [
      minIntervals2[key][0],
      minIntervals2[key][1],
      maxIntervals2[key][0],
      maxIntervals2[key][1],
    ];
    averageTrapezoidalOptions.push(averageTrapezoidalOption);

    const leftBorderOfAverageTrapezoidalOptions =
      alpha * (averageTrapezoidalOption[1] - averageTrapezoidalOption[0]) +
      averageTrapezoidalOption[0];
    const rightBorderOfAverageTrapezoidalOptions =
      averageTrapezoidalOption[3] -
      alpha * (averageTrapezoidalOption[3] - averageTrapezoidalOption[2]);

    averageTrapezoidalIntervals[`x${index + 1}`] = [
      leftBorderOfAverageTrapezoidalOptions,
      rightBorderOfAverageTrapezoidalOptions,
    ];
  });
  console.log(averageTrapezoidalOptions);
  console.log(averageTrapezoidalIntervals);

  const neutralProbability = {};
  Object.entries(averageTrapezoidalIntervals).forEach(([key, item]) => {
    neutralProbability[key] = Math.max(
      1 - Math.max((1 - item[0]) / (item[1] - item[0] + 1), 0),
      0
    );
  });
  console.log(neutralProbability);

  const neutralProbabilityRanked = Object.entries(neutralProbability).sort(
    (a, b) => b[1] - a[1]
  );

  for (let i = 0; i < neutralProbabilityRanked.length - 1; i++) {
    const currentRank = neutralProbabilityRanked[i][1];
    const nextRank = neutralProbabilityRanked[i + 1][1];

    neutralProbabilityRanked[i].push(currentRank === nextRank ? "=" : ">");
  }

  neutralProbabilityRanked[neutralProbabilityRanked.length - 1].push(" ");

  console.log(neutralProbabilityRanked);

  const pessimisticProbability = {};
  Object.entries(minIntervals).forEach(([key, item]) => {
    pessimisticProbability[key] = Math.max(
      1 - Math.max((1 - item[0]) / (item[1] - item[0] + 1), 0),
      0
    );
  });

  const pessimisticProbabilityRanked = Object.entries(
    pessimisticProbability
  ).sort((a, b) => b[1] - a[1]);

  for (let i = 0; i < pessimisticProbabilityRanked.length - 1; i++) {
    const currentRank = pessimisticProbabilityRanked[i][1];
    const nextRank = pessimisticProbabilityRanked[i + 1][1];

    pessimisticProbabilityRanked[i].push(currentRank === nextRank ? "=" : ">");
  }

  pessimisticProbabilityRanked[pessimisticProbabilityRanked.length - 1].push(
    " "
  );

  const optimisticProbability = {};
  Object.entries(maxIntervals).forEach(([key, item]) => {
    optimisticProbability[key] = Math.max(
      1 - Math.max((1 - item[0]) / (item[1] - item[0] + 1), 0),
      0
    );
  });

  const optimisticProbabilityRanked = Object.entries(
    optimisticProbability
  ).sort((a, b) => b[1] - a[1]);

  for (let i = 0; i < optimisticProbabilityRanked.length - 1; i++) {
    const currentRank = optimisticProbabilityRanked[i][1];
    const nextRank = optimisticProbabilityRanked[i + 1][1];

    optimisticProbabilityRanked[i].push(currentRank === nextRank ? "=" : ">");
  }

  optimisticProbabilityRanked[optimisticProbabilityRanked.length - 1].push(" ");

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

    const neutralProb = (pessimisticProb + optimisticProb) / 2;
    neutralPosition[key] = neutralProb;
  });

  const neutralAggressiveProbability = {};
  Object.entries(minIntervals).forEach(([key, minValue]) => {
    const maxValue = maxIntervals[key];
    const neutralAggressive = (minValue[0] + maxValue[1]) / 2;
    neutralAggressiveProbability[key] = neutralAggressive;
  });

  const neutralAggressiveProbabilityRanked = Object.entries(
    neutralAggressiveProbability
  ).sort((a, b) => b[1] - a[1]);

  for (let i = 0; i < neutralAggressiveProbabilityRanked.length - 1; i++) {
    const currentRank = neutralAggressiveProbabilityRanked[i][1];
    const nextRank = neutralAggressiveProbabilityRanked[i + 1][1];

    neutralAggressiveProbabilityRanked[i].push(
      currentRank === nextRank ? "=" : ">"
    );
  }

  neutralAggressiveProbabilityRanked[
    neutralAggressiveProbabilityRanked.length - 1
  ].push(" ");

  // Find the keys with the highest probabilities in the neutral position
  const neutralPositionResults = Object.entries(neutralProbability).reduce(
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
              <AdvancedPessimisticPosition
                minIntervals={minIntervals}
                pessimisticProbability={pessimisticProbability}
                pessimisticProbabilityRanked={pessimisticProbabilityRanked}
              />
            )}
          </Item>
        </Grid>
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
              <Typography variant="h4">The neutral position</Typography>
              <NeutralPosition
                neutralPositionResults={neutralPositionResults}
              />
              <Button
                variant="outlined"
                onClick={() =>
                  setIsAdvancedNeutralPositionShown((prev) => !prev)
                }
              >
                {isAdvancedNeutralPositionShown ? "Hide" : "See more details"}
              </Button>
            </Box>
            {isAdvancedNeutralPositionShown && (
              <AdvancedNeutralPosition
                minIntervals={minIntervals}
                maxIntervals={maxIntervals}
                minIntervals2={minIntervals2}
                maxIntervals2={maxIntervals2}
                neutralAggressiveProbability={neutralAggressiveProbability}
                neutralAggressiveProbabilityRanked={
                  neutralAggressiveProbabilityRanked
                }
                neutralPosition={neutralPosition}
                averageTrapezoidalIntervals={averageTrapezoidalIntervals}
                averageTrapezoidalOptions={averageTrapezoidalOptions}
                neutralProbability={neutralProbability}
                neutralProbabilityRanked={neutralProbabilityRanked}
                numbers={numbers}
              />
            )}
          </Item>
        </Grid>
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
              <Typography variant="h4">The optimistic position</Typography>
              <OptimisticPosition
                optimisticPositionResults={optimisticPositionResults}
              />
              <Button
                variant="outlined"
                onClick={() =>
                  setIsAdvancedOptimisticPositionShown((prev) => !prev)
                }
              >
                {isAdvancedOptimisticPositionShown
                  ? "Hide"
                  : "See more details"}
              </Button>
            </Box>
            {isAdvancedOptimisticPositionShown && (
              <AdvancedOptimisticPosition
                maxIntervals={maxIntervals}
                optimisticProbability={optimisticProbability}
                optimisticProbabilityRanked={optimisticProbabilityRanked}
              />
            )}
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
