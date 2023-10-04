import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function AdvancedNeutralPosition({
  minIntervals,
  maxIntervals,
  minIntervals2,
  maxIntervals2,
  neutralProbability,
  averageTrapezoidalOptions,
  averageTrapezoidalIntervals,
  neutralProbabilityRanked,
  neutralAggressiveProbability,
  neutralAggressiveProbabilityRanked,
  numbers,
}) {
  return (
    <>
      <Typography variant="h4" sx={{ marginTop: "20px" }}>
        Agregation of generalized trapezoidal linguistic terms
      </Typography>
      <Box
        component="span"
        sx={{
          p: 2,
          border: "1px dashed grey",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "3px",
        }}
      >
        <Typography variant="h5">Average trapezoidal terms</Typography>
        <Box
          component="span"
          sx={{
            p: 2,
            border: "1px dashed grey",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            fontSize: "12px",
            color: "#fff",
          }}
        >
          {averageTrapezoidalOptions.map((option, index) => (
            <div key={index}>{`GS${index + 1}=(${option[0]}, ${option[1]}, ${
              option[2]
            }, ${option[3]})`}</div>
          ))}
        </Box>
        <Typography variant="h5">To intervals</Typography>
        <Box
          component="span"
          sx={{
            p: 2,
            border: "1px dashed grey",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            fontSize: "12px",
            color: "#fff",
          }}
        >
          {Object.entries(averageTrapezoidalIntervals).map(
            ([key, interval], index) => (
              <div>{`I(${key})= [${
                numbers.alpha
              } * (${averageTrapezoidalOptions[index][1].toFixed(
                2
              )} - ${averageTrapezoidalOptions[index][0].toFixed(2)}) +
              ${averageTrapezoidalOptions[index][0].toFixed(
                2
              )},  ${averageTrapezoidalOptions[index][3].toFixed(2)} -
              ${numbers.alpha} * (${averageTrapezoidalOptions[index][3].toFixed(
                2
              )} - ${averageTrapezoidalOptions[index][2].toFixed(
                2
              )})]=[${interval[0].toFixed(2)},${interval[1].toFixed(
                2
              )}] `}</div>
            )
          )}
        </Box>
        <Typography variant="h5">Probability</Typography>
        <Box
          component="span"
          sx={{
            p: 2,
            border: "1px dashed grey",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            fontSize: "12px",
            color: "#fff",
          }}
        >
          {Object.entries(minIntervals2).map(([key, item]) => (
            <div key={key}>
              {`p(Imin(${key}))=max(1-max(1-${item[0].toFixed(
                2
              )}/${item[1].toFixed(2)}-${item[0].toFixed(
                2
              )}+1,0),0) = ${neutralProbability[key].toFixed(2)}`}
            </div>
          ))}
        </Box>
        <Typography variant="h5">Ranking</Typography>
        <Box
          component="span"
          sx={{
            p: 2,
            border: "1px dashed grey",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            fontSize: "12px",
            color: "#fff",
          }}
        >
          {neutralProbabilityRanked
            .map((rank) => {
              return `${rank[0]} ${rank[2] && `${rank[2]}`}`;
            })
            .join(" ")}
        </Box>
      </Box>
      <Typography variant="h4" sx={{ marginTop: "20px" }}>
        Agregation of generalized trapezoidal linguistic terms
      </Typography>
      <Box
        component="span"
        sx={{
          p: 2,
          border: "1px dashed grey",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "3px",
        }}
      >
        {" "}
        <Typography variant="h5">Intervals with minimal estimates</Typography>
        <Box
          component="span"
          sx={{
            p: 2,
            border: "1px dashed grey",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            fontSize: "12px",
            color: "#fff",
          }}
        >
          {Object.entries(minIntervals).map(([key, minValue]) => {
            const maxValue = maxIntervals[key];

            return (
              <div key={key}>
                {`(IminL(${key}),IminR(${key}))=[${minValue[0].toFixed(
                  2
                )},${maxValue[1].toFixed(2)}]`}
              </div>
            );
          })}
        </Box>
        <Typography variant="h5">Probability</Typography>
        <Box
          component="span"
          sx={{
            p: 2,
            border: "1px dashed grey",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            fontSize: "12px",
            color: "#fff",
          }}
        >
          {Object.entries(minIntervals).map(([key, minValue]) => {
            const maxValue = maxIntervals[key];

            return (
              <div key={key}>
                {`p((IminL(${key})+IminR(${key}))/2)=(${minValue[0].toFixed(
                  2
                )}+${maxValue[1].toFixed(2)})/2=${neutralAggressiveProbability[
                  key
                ].toFixed(2)}`}
              </div>
            );
          })}
        </Box>
        <Typography variant="h5">Ranking</Typography>
        <Box
          component="span"
          sx={{
            p: 2,
            border: "1px dashed grey",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            fontSize: "12px",
            color: "#fff",
          }}
        >
          {neutralAggressiveProbabilityRanked
            .map((rank) => {
              return `${rank[0]} ${rank[2] && `${rank[2]}`}`;
            })
            .join(" ")}
        </Box>
      </Box>
    </>
  );
}
