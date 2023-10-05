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

//FIX GETTING DATA FROM DATA TEMPLATE
function IntervalExpertOpinions({ intervalExpertOpinions, shortNames }) {
  // Organize the data into a table structure
  const tableData = {};

  const criteriaList = ["x/c", ...shortNames.criteria];

  intervalExpertOpinions?.forEach((data) => {
    const { alternative, criteria, selectedIntervals } = data;

    if (!tableData[alternative]) {
      tableData[alternative] = {};
    }

    tableData[alternative][criteria] = selectedIntervals;
  });
  //

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="Interval Expert Opinions">
          <TableHead>
            <TableRow>
              {criteriaList.map((criteria) => (
                <TableCell key={criteria} sx={{ color: "#90caf9" }}>
                  {criteria}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(tableData).map((alternative) => (
              <TableRow key={alternative}>
                <TableCell sx={{ color: "#90caf9" }}>{alternative}</TableCell>
                {criteriaList.slice(1).map((criteria) => (
                  <TableCell key={criteria}>
                    {"{ "}
                    {tableData[alternative][criteria]
                      ? tableData[alternative][criteria]
                          .map((item, index) => item.shortLinguisticTerm)
                          .join(", ")
                      : "error"}
                    {" }"}
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
export default IntervalExpertOpinions;
