import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function InfoConfiguration({
  linguisticTermsNormalized,
  handleConfigurationMenuStepBack,
  names,
  shortNames,
}) {
  return (
    <>
      <Typography>Info:</Typography>
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
        <Typography>~Linguistic Terms:</Typography>
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
          <ResponsiveContainer width="80%" height={150}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" />
              <YAxis type="number" dataKey="y" />
              <ZAxis type="number" range={[100]} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />

              {linguisticTermsNormalized.map((linguisticTerm, index) => (
                <Scatter
                  key={index}
                  data={linguisticTerm.normalizedTriangularChart}
                  fill="#3498db"
                  line
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </Box>
        <Typography>Transcript:</Typography>
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
          {shortNames?.alternatives.map((alternative, index) => (
            <Typography key={index}>
              {alternative} - {names.alternatives[index]}
            </Typography>
          ))}
        </Box>
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
          {shortNames?.criteria.map((criteria, index) => (
            <Typography key={index}>
              {criteria} - {names.criteria[index]}
            </Typography>
          ))}
        </Box>
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
          {shortNames?.linguisticTerms.map((linguisticTerm, index) => (
            <Typography key={index}>
              {linguisticTerm} - {names.linguisticTerms[index]}
            </Typography>
          ))}
        </Box>
        <Button
          variant="contained"
          sx={{
            marginTop: "20px",
          }}
          onClick={handleConfigurationMenuStepBack}
        >
          Back
        </Button>
      </Box>
    </>
  );
}
