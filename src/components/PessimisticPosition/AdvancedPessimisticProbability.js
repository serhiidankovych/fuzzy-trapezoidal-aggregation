import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function AdvancedPessimisticProbability({
  minIntervals,
  pessimisticProbability,
  pessimisticProbabilityRanked,
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
          }}
        >
          {Object.entries(minIntervals).map(([key, item]) => (
            <div key={key}>{`Imin(${key})=[${item[0].toFixed(
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
          }}
        >
          {Object.entries(minIntervals).map(([key, item]) => (
            <div key={key}>
              {`p(Imin(${key}))=max(1-max(1-${item[0].toFixed(
                2
              )}/${item[1].toFixed(2)}-${item[0].toFixed(
                2
              )}+1,0),0) = ${pessimisticProbability[key].toFixed(2)}`}
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
          }}
        >
          {pessimisticProbabilityRanked.map((rank) => rank[0]).join(", ")}
        </Box>
      </Box>
    </>
  );
}
