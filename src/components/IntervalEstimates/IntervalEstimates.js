import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

import configurationData from "../../DataTemplate/configurationData";

function IntervalEstimates({ intervalEstimates }) {
  // Organize the data into a table structure
  const tableData = {};

  const criteriaList = ["a/c", ...configurationData.criteria];

  intervalEstimates?.forEach((data) => {
    const { alternative, criteria, selectedIntervalsEstimate } = data;

    if (!tableData[alternative]) {
      tableData[alternative] = {};
    }

    tableData[alternative][criteria] = selectedIntervalsEstimate;
  });

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="Interval Expert Opinions">
          <TableHead>
            <TableRow>
              {criteriaList.map((criteria) => (
                <TableCell key={criteria}>{criteria}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(tableData).map((alternative) => (
              <TableRow key={alternative}>
                <TableCell>{alternative}</TableCell>
                {criteriaList.slice(1).map((criteria) => (
                  <TableCell key={criteria}>
                    {"["}
                    {tableData[alternative][criteria]
                      ? tableData[alternative][criteria].join(", ")
                      : "error"}
                    {"]"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default IntervalEstimates;
