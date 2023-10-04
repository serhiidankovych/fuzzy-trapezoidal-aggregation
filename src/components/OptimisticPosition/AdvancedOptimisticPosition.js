import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function AdvancedOptimisticPosition({
  maxIntervals,
  optimisticProbability,
  optimisticProbabilityRanked,
}) {
  return (
    <>
      <Box
        component="span"
        sx={{
          p: 2,
          border: "1px dashed grey",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "3px",
          marginTop: "20px",
        }}
      >
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
          {Object.entries(maxIntervals).map(([key, item]) => (
            <div key={key}>{`Imax(${key})=[${item[0].toFixed(
              2
            )},${item[1].toFixed(2)}]`}</div>
          ))}
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
          {Object.entries(maxIntervals).map(([key, item]) => (
            <div key={key}>
              {`p(Imax(${key}))=max(1-max(1-${item[0].toFixed(
                2
              )}/${item[1].toFixed(2)}-${item[0].toFixed(
                2
              )}+1,0),0) = ${optimisticProbability[key].toFixed(2)}`}
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
