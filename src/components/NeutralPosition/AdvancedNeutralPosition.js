import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function AdvancedNeutralPosition({
  minIntervalsForTrapezoidalTerms,
  maxIntervalsForTrapezoidalTerms,
  minIntervalsForAverageTrapezoidalTerms,
  maxIntervalsForAverageTrapezoidalTerms,
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
        The neutral position*
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
        <Typography variant="h5" color={"#90caf9"}>
          Average trapezoidal terms
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
            fontSize: "12px",
            color: "#fff",
          }}
        >
          {averageTrapezoidalOptions.map((option, index) => (
            <div key={index}>{`GS${index + 1}=(${option[0].toFixed(
              2
            )}, ${option[1].toFixed(2)}, ${option[2].toFixed(
              2
            )}, ${option[3].toFixed(2)})`}</div>
          ))}
        </Box>
        <Typography variant="h5" color={"#90caf9"}>
          Interval estimates
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
              )},  ${averageTrapezoidalOptions[index][3].toFixed(2)}-${
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
          {Object.entries(minIntervalsForAverageTrapezoidalTerms).map(
            ([key, item]) => (
              <div key={key}>
                {`p(Imin(${key}))=max(1-max(1-${item[0].toFixed(
                  2
                )}/${item[1].toFixed(2)}-${item[0].toFixed(
                  2
                )}+1,0),0)=${neutralProbability[key].toFixed(2)}`}
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
        The neutral position**
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
        <Typography variant="h5" color={"#90caf9"}>
          Intervals with extreme boundaries estimates
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
            fontSize: "12px",
            color: "#fff",
          }}
        >
          {Object.entries(minIntervalsForTrapezoidalTerms).map(
            ([key, minValue]) => {
              const maxValue = maxIntervalsForTrapezoidalTerms[key];

              return (
                <div key={key}>
                  {`(IminL(${key}),ImaxR(${key}))=[${minValue[0].toFixed(
                    2
                  )},${maxValue[1].toFixed(2)}]`}
                </div>
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
          {Object.entries(minIntervalsForTrapezoidalTerms).map(
            ([key, minValue]) => {
              const maxValue = maxIntervalsForTrapezoidalTerms[key];

              return (
                <div key={key}>
                  {`p((IminL(${key})+IminR(${key}))/2)=(${minValue[0].toFixed(
                    2
                  )}+${maxValue[1].toFixed(
                    2
                  )})/2=${neutralAggressiveProbability[key].toFixed(2)}`}
                </div>
              );
            }
          )}
        </Box>
        <Typography variant="h5" color={"#90caf9"}>
          Ranking
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
