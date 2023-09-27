import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import configurationData from "../../DataTemplate/configurationData";

function TrapezoidalExpertOpinions({ trapezoidalExpertOpinions, shortNames }) {
  // Organize the data into a table structure
  const tableData = {};
  //FIX GETTING DATA FROM DATA TEMPLATE
  const criteriaList = ["a/c", ...shortNames.criteria];

  trapezoidalExpertOpinions?.forEach((data) => {
    const { alternative, criteria, selectedTrapezoidal } = data;

    if (!tableData[alternative]) {
      tableData[alternative] = {};
    }

    tableData[alternative][criteria] = selectedTrapezoidal;
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
export default TrapezoidalExpertOpinions;
