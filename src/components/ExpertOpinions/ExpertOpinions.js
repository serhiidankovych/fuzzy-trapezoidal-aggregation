import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ExpertOpinionsChip from "../ExpertOpinionsChip/ExpertOpinionsChip";
import Pagination from "@mui/material/Pagination";
// import linguisticTermsNormalized from "../../DataTemplate/linguisticTermsNormalized";
//FIX ADDING CONFINES WITH NORMALIZED DATA
const getValuesBetweenTerms = (terms, data) => {
  // Extract the start and end values from the terms array
  const [start, end] = terms.map((term) => {
    // Find the term data in the data array
    const termData = data.find(
      (item) => item.shortLinguisticTerm === term.shortLinguisticTerm
    );
    // Return the middle value if the term data exists, otherwise return null
    return termData ? termData.confines[1] : null;
  });
  // Check if both start and end values are not null
  if (start !== null && end !== null) {
    // Filter the data array based on the middle value of each item
    return data.filter(
      (item) => item.confines[1] >= start && item.confines[1] <= end
    );
  } else {
    // Return an empty array if either start or end value is null
    return [];
  }
};

const sortLinguisticTerm = (terms) => {
  return terms.sort((a, b) => a.confines[1] - b.confines[1]);
};

export default function ExpertOpinions({
  names,
  setNames,
  configuration,
  expertOpinions,
  setExpertOpinions,
  linguisticTerms,
  linguisticTermsNormalized,
  operators,
  setIntervalExpertOpinions,
  setTrapezoidalExpertOpinions,
  setIntervalEstimates,
  setLinguisticTerms,
  numbers,
  setNumbers,
  showToastMessage = { showToastMessage },
}) {
  const linguisticToIntervalExpertOpinions = () => {
    const intervalOpinions = expertOpinions?.map((data) => {
      const { selectedValues, selectedOperators, selectedLinguisticTerms } =
        data;

      if (selectedOperators.length > 0) {
        const symbol = selectedOperators[0]?.symbol;
        let selectedIntervals;

        if (symbol === "&") {
          selectedIntervals = getValuesBetweenTerms(
            selectedLinguisticTerms,
            linguisticTermsNormalized
          );
        } else if (symbol === "<") {
          const maxLinguisticTerm =
            linguisticTermsNormalized[linguisticTermsNormalized.length - 1];
          const greaterThanLinguisticTerms = [
            maxLinguisticTerm,
            ...selectedLinguisticTerms,
          ];
          const sortedGreaterThanLinguisticTerms = sortLinguisticTerm(
            greaterThanLinguisticTerms
          );
          selectedIntervals = getValuesBetweenTerms(
            sortedGreaterThanLinguisticTerms,
            linguisticTermsNormalized
          );
        } else if (symbol === ">") {
          const minLinguisticTerm = linguisticTermsNormalized[0];
          const lessThanLinguisticTerms = [
            minLinguisticTerm,
            ...selectedLinguisticTerms,
          ];

          selectedIntervals = getValuesBetweenTerms(
            lessThanLinguisticTerms,
            linguisticTermsNormalized
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
          selectedIntervals: selectedValues.map((value) => {
            const matchingTerm = linguisticTermsNormalized.find(
              (term) => term.shortLinguisticTerm === value.shortLinguisticTerm
            );
            return matchingTerm || value; // Use the matching term or the original value if not found
          }),
        };
      }
    });

    const nonEmptySelectedValues = intervalOpinions.filter(
      (data) => data.selectedValues.length > 0
    );
    if (nonEmptySelectedValues.length > 0) {
      setIntervalExpertOpinions(intervalOpinions);
      intervalToTrapezoidalExpertOpinions(intervalOpinions);
    } else {
      showToastMessage("Expert opinions are empty", "error");
    }
  };

  const intervalToTrapezoidalExpertOpinions = (intervalOpinions) => {
    const trapezoidalOpinions = intervalOpinions?.map((data) => {
      const { selectedIntervals } = data;
      const firstInterval = selectedIntervals[0];
      const lastInterval = selectedIntervals[selectedIntervals.length - 1];

      if (selectedIntervals.length > 0) {
        const selectedTrapezoidal =
          selectedIntervals.length === 1
            ? [
                firstInterval.normalizedConfines[0],
                firstInterval.normalizedConfines[1],
                firstInterval.normalizedConfines[1],
                firstInterval.normalizedConfines[2],
              ]
            : [
                firstInterval.normalizedConfines[0],
                firstInterval.normalizedConfines[1],
                lastInterval.normalizedConfines[1],
                lastInterval.normalizedConfines[2],
              ];
        return {
          ...data,
          selectedTrapezoidal,
        };
      }
    });

    setTrapezoidalExpertOpinions(trapezoidalOpinions);
    estimateIntervals(trapezoidalOpinions);
  };

  const estimateIntervals = (trapezoidalOpinions) => {
    const alpha = numbers.alpha;

    const intervalEstimates = trapezoidalOpinions.map((data) => {
      const { selectedTrapezoidal } = data;

      const leftBorderOfIntervalEstimate =
        alpha * (selectedTrapezoidal[1] - selectedTrapezoidal[0]) +
        selectedTrapezoidal[0];
      const rightBorderOfIntervalEstimate =
        selectedTrapezoidal[3] -
        alpha * (selectedTrapezoidal[3] - selectedTrapezoidal[2]);

      const selectedIntervalsEstimate = [
        leftBorderOfIntervalEstimate,
        rightBorderOfIntervalEstimate,
      ];

      return {
        ...data,
        selectedIntervalsEstimate,
      };
    });
    setIntervalEstimates(intervalEstimates);
    //
  };
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the current page's data
  const currentExpertOpinions = expertOpinions.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #515151",
        borderRadius: 2,
        backgroundColor: "#181819",
        alignItems: "center",
        padding: "40px",
      }}
    >
      {currentExpertOpinions.map((data, index) => (
        <ExpertOpinionsChip
          key={index}
          label={data.label}
          values={data.values}
          selectedValues={data.selectedValues}
          setExpertOpinions={setExpertOpinions}
          expertOpinions={expertOpinions}
          linguisticTerms={linguisticTerms}
          operators={operators}
          linguisticTermsNormalized={linguisticTermsNormalized}
        />
      ))}

      <Pagination
        count={Math.ceil(expertOpinions.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
      />
      <Button
        onClick={linguisticToIntervalExpertOpinions}
        variant="outlined"
        sx={{ marginTop: "20px" }}
      >
        transform opinios
      </Button>
    </Box>
  );
}
