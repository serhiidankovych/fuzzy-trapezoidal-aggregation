import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function AdvancedOptimisticPosition({
  maxIntervalsForTrapezoidalTerms,
  optimisticProbability,
  optimisticProbabilityRanked,
}) {
  return (
    <>
      <Typography variant="h4" sx={{ marginTop: "20px" }}>
        The optimistic position
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
          Intervals with maximal estimates
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
          {Object.entries(maxIntervalsForTrapezoidalTerms).map(
            ([key, item]) => (
              <div key={key}>{`Imax(${key})=[${item[0].toFixed(
                2
              )},${item[1].toFixed(2)}]`}</div>
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
          {Object.entries(maxIntervalsForTrapezoidalTerms).map(
            ([key, item]) => (
              <div key={key}>
                {`p(Imax(${key}))=max(1-max((1-${item[0].toFixed(
                  2
                )})/(${item[1].toFixed(2)}-${item[0].toFixed(
                  2
                )}+1),0),0)=${optimisticProbability[key].toFixed(2)}`}
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
          {optimisticProbabilityRanked
            .map((rank) => {
              return `${rank[0]} ${rank[2] && `${rank[2]}`}`;
            })
            .join(" ")}
        </Box>
      </Box>
    </>
  );
}
