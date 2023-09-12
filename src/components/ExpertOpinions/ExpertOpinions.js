import React from "react";
import Box from "@mui/material/Box";
import ExpertOpinionsChip from "../ExpertOpinionsChip/ExpertOpinionsChip";

export default function ExpertOpinions({
  configurationData,
  expertOpinions,
  setExpertOpinions,
  linguisticTerms,
  operations,
}) {
  const { alternative } = configurationData;
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
      {expertOpinions?.map((data, index) => (
        <ExpertOpinionsChip
          key={index}
          label={data.label}
          values={data.values}
          selectedValues={data.selectedValues}
          setExpertOpinions={setExpertOpinions}
          expertOpinions={expertOpinions}
          linguisticTerms={linguisticTerms}
          operations={operations}
        />
      ))}
    </Box>
  );
}
