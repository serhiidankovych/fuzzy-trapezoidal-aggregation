import React, { useState } from "react";
import Box from "@mui/material/Box";
import ExpertOpinionsChip from "../ExpertOpinionsChip/ExpertOpinionsChip";
import Pagination from "@mui/material/Pagination";

export default function ExpertOpinions({
  configuration,
  expertOpinions,
  setExpertOpinions,
  linguisticTerms,
  operators,
}) {
  const { alternatives, criteria } = configuration;
  // const itemsPerPage = criteria.length;
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
        />
      ))}

      {/* Pagination */}
      <Pagination
        count={Math.ceil(expertOpinions.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
}
