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
import intervalExpertOpinionsData from "../../DataTemplate/intervalExpertOpinionsData";
import linguisticTermsData from "../../DataTemplate/linguisticTermsData";

function IntervalExpertOpinions({ expertOpinions }) {
  // Organize the data into a table structure

  const [intervalExpertOpinions, setIntervalExpertOpinions] = React.useState(
    []
  );
  const tableData = {};

  const getValuesBetweenTerms = (terms, data) => {
    // Extract the start and end values from the terms array
    const [start, end] = terms.map((term) => {
      // Find the term data in the data array
      const termData = data.find(
        (item) => item.shortLinguisticTerm === term.shortLinguisticTerm
      );
      // Return the middle value if the term data exists, otherwise return null
      return termData ? termData.confines.middle : null;
    });
    // Check if both start and end values are not null
    if (start !== null && end !== null) {
      // Filter the data array based on the middle value of each item
      return data.filter(
        (item) => item.confines.middle >= start && item.confines.middle <= end
      );
    } else {
      // Return an empty array if either start or end value is null
      return [];
    }
  };

  const sortLinguisticTerm = (terms) => {
    return terms.sort((a, b) => a.confines.middle - b.confines.middle);
  };

  // Create an array of criteria
  const modifyData = () => {
    const modifiedData = expertOpinions.map((data) => {
      const {
        alternative,
        criteria,
        selectedValues,
        selectedOperators,
        selectedLinguisticTerms,
      } = data;

      if (selectedOperators.length > 0) {
        const symbol = selectedOperators[0]?.symbol;
        let selectedIntervals;

        if (symbol === "&") {
          selectedIntervals = getValuesBetweenTerms(
            selectedLinguisticTerms,
            linguisticTermsData
          );
        } else if (symbol === "<") {
          const maxLinguisticTerm =
            linguisticTermsData[linguisticTermsData.length - 1];
          const greaterThanLinguisticTerms = [
            maxLinguisticTerm,
            ...selectedLinguisticTerms,
          ];
          const sortedGreaterThanLinguisticTerms = sortLinguisticTerm(
            greaterThanLinguisticTerms
          );
          selectedIntervals = getValuesBetweenTerms(
            sortedGreaterThanLinguisticTerms,
            linguisticTermsData
          );

          // selectedIntervals = [{ shortLinguisticTerm: "M" }];
        } else if (symbol === ">") {
          const minLinguisticTerm = linguisticTermsData[0];
          const lessThanLinguisticTerms = [
            minLinguisticTerm,
            ...selectedLinguisticTerms,
          ];

          selectedIntervals = getValuesBetweenTerms(
            lessThanLinguisticTerms,
            linguisticTermsData
          );
        }

        return {
          ...data,
          selectedIntervals,
          selectedOperators: symbol,
        };
      } else {
        return {
          ...data,
          selectedIntervals: selectedValues,
        };
      }
    });

    console.log(modifiedData);
    setIntervalExpertOpinions(modifiedData);
  };

  const criteriaList = ["alternative", ...configurationData.criteria];

  intervalExpertOpinions.forEach((data) => {
    const { alternative, criteria, selectedIntervals } = data;

    if (!tableData[alternative]) {
      tableData[alternative] = {};
    }

    tableData[alternative][criteria] = selectedIntervals;
  });

  return (
    <>
      <Button onClick={modifyData}>IntervalExpertOpinions</Button>
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
