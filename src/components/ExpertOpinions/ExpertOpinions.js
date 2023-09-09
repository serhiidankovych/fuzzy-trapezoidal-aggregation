import React from "react";
import Box from "@mui/material/Box";
import LinguisticTermsChip from "../LinguisticTermsChip/LinguisticTermsChip";
import TestChip from "../TestChip/TestChip";
import expertOpinionsData from "../../DataTemplate/expertOpinionsData";

export default function ExpertOpinions({
  configurationData,
  expertOpinions,
  setExpertOpinions,
}) {
  const criteria = 3;

  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "scroll",
        overflowY: "hidden",
        whiteSpace: "nowrap",
        flexDirection: "column",
        border: "1px solid #00ff05",
        borderRadius: 2,
        marginTop: "10px",
      }}
    >
      {expertOpinions?.map(
        (data, dataIndex) =>
          dataIndex % criteria === 0 && (
            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
              key={dataIndex}
            >
              {expertOpinions
                ?.slice(dataIndex, dataIndex + criteria)
                ?.map((data, index) => (
                  <TestChip
                    key={index}
                    label={data.label}
                    values={data.values}
                    selectedValues={data.selectedValues}
                    setExpertOpinions={setExpertOpinions}
                  />
                ))}
            </Box>
          )
      )}
    </Box>
  );
}
