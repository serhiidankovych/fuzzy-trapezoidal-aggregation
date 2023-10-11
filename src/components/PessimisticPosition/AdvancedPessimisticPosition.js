import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function AdvancedPessimisticPosition({
  minIntervalsForTrapezoidalTerms,
  pessimisticProbability,
  pessimisticProbabilityRanked,
}) {
  return (
    <>
      <Typography variant="h4" sx={{ marginTop: "20px" }}>
        The pessimistic position
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
          Intervals with minimal estimates
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
          {Object.entries(minIntervalsForTrapezoidalTerms).map(
            ([key, item]) => (
              <div key={key}>{`Imin(${key})=[${item[0].toFixed(
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
          {Object.entries(minIntervalsForTrapezoidalTerms).map(
            ([key, item]) => (
              <div key={key}>
                {`p(Imin(${key}))=max(1-max((1-${item[0].toFixed(
                  2
                )})/(${item[1].toFixed(2)}-${item[0].toFixed(
                  2
                )}+1),0),0)=${pessimisticProbability[key].toFixed(2)}`}
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
          {pessimisticProbabilityRanked
            .map((rank) => {
              return `${rank[0]} ${rank[2] && `${rank[2]}`}`;
            })
            .join(" ")}
        </Box>
      </Box>
    </>
  );
}
