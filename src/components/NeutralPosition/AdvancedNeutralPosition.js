import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function AdvancedNeutralPosition({
  minIntervalsForTrapezoidalTerms,
  maxIntervalsForTrapezoidalTerms,
  minIntervalsForAverageTrapezoidalTerms,

  neutralProbability,
  averageTrapezoidalOptions,
  averageTrapezoidalIntervals,
  neutralProbabilityRanked,
  neutralAggressiveProbability,
  neutralAggressiveProbabilityRanked,
  numbers,
  minLeftAndMaxLeftIntervalsForTrapezoidalTerms,
  minRightAndMaxRightIntervalsForTrapezoidalTerms,
  aggressiveIntervalsForTrapezoidalTerms,
}) {
  return (
    <>
      <Typography variant="h4" sx={{ marginTop: "20px" }}>
        The neutral position*
      </Typography>
      <Box
        component="span"
        sx={{
          p: 1.5,
          border: "1px dashed grey",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "3px",
        }}
      >
        <Typography variant="h5" color={"#90caf9"}>
          Average trapezoidal terms
        </Typography>
        <Box
          component="span"
          sx={{
            p: 1.5,
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
            <div key={index}>{`GS${index + 1}=(${option[0].toFixed(
              2
            )},${option[1].toFixed(2)},${option[2].toFixed(
              2
            )},${option[3].toFixed(2)})`}</div>
          ))}
        </Box>
        <Typography variant="h5" color={"#90caf9"}>
          Interval estimates
        </Typography>
        <Box
          component="span"
          sx={{
            p: 1.5,
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
              <div key={key}>{`I(${key})=[${
                numbers.alpha
              }*(${averageTrapezoidalOptions[index][1].toFixed(
                2
              )}-${averageTrapezoidalOptions[index][0].toFixed(
                2
              )})+${averageTrapezoidalOptions[index][0].toFixed(
                2
              )},${averageTrapezoidalOptions[index][3].toFixed(2)}-${
                numbers.alpha
              }*(${averageTrapezoidalOptions[index][3].toFixed(
                2
              )}-${averageTrapezoidalOptions[index][2].toFixed(
                2
              )})]=[${interval[0].toFixed(2)},${interval[1].toFixed(2)}]`}</div>
            )
          )}
        </Box>
        <Typography variant="h5" color={"#90caf9"}>
          Probability
        </Typography>
        <Box
          component="span"
          sx={{
            p: 1.5,
            border: "1px dashed grey",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            fontSize: "12px",
            color: "#fff",
          }}
        >
          {Object.entries(averageTrapezoidalIntervals).map(([key, item]) => (
            <div key={key}>
              {`p(Imin(${key}))=max(1-max((1-${item[0].toFixed(
                2
              )})/(${item[1].toFixed(2)}-${item[0].toFixed(
                2
              )}+1),0),0)=${neutralProbability[key].toFixed(2)}`}
            </div>
          ))}
        </Box>
        <Typography variant="h5" color={"#90caf9"}>
          Ranking
        </Typography>
        <Box
          component="span"
          sx={{
            p: 1.5,
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
        The neutral position**
      </Typography>
      <Box
        component="span"
        sx={{
          p: 1.5,
          border: "1px dashed grey",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "3px",
        }}
      >
        <Typography variant="h5" color={"#90caf9"}>
          Intervals with aggressive estimates
        </Typography>
        <Box
          component="span"
          sx={{
            p: 1.5,
            border: "1px dashed grey",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            fontSize: "12px",
            color: "#fff",
          }}
        >
          {Object.entries(aggressiveIntervalsForTrapezoidalTerms).map(
            ([key, aggressiveIntervals]) => {
              let minLeftAndMaxLeft =
                minLeftAndMaxLeftIntervalsForTrapezoidalTerms[key];
              let minRightAndMaxRight =
                minRightAndMaxRightIntervalsForTrapezoidalTerms[key];
              return (
                <div key={key}>{`Iag(${key})=[(${minLeftAndMaxLeft[0].toFixed(
                  2
                )}+${minLeftAndMaxLeft[1].toFixed(
                  2
                )})/2,(${minRightAndMaxRight[0].toFixed(
                  2
                )}+${minRightAndMaxRight[1].toFixed(
                  2
                )})/2]=[${aggressiveIntervals[0].toFixed(
                  2
                )},${aggressiveIntervals[1].toFixed(2)}]`}</div>
              );
            }
          )}
        </Box>
        <Typography variant="h5" color={"#90caf9"}>
          Probability
        </Typography>
        <Box
          component="span"
          sx={{
            p: 1.5,
            border: "1px dashed grey",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            fontSize: "12px",
            color: "#fff",
          }}
        >
          {Object.entries(aggressiveIntervalsForTrapezoidalTerms).map(
            ([key, item]) => (
              <div key={key}>
                {`p(Iag(${key}))=max(1-max((1-${item[0].toFixed(
                  2
                )})/(${item[1].toFixed(2)}-${item[0].toFixed(
                  2
                )}+1),0),0)=${neutralAggressiveProbability[key].toFixed(2)}`}
              </div>
            )
          )}
        </Box>
        <Typography variant="h5" color={"#90caf9"}>
          Ranking
        </Typography>
        <Box
          component="span"
          sx={{
            p: 1.5,
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
