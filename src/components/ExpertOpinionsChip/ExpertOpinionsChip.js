import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function ExpertOpinionsChip({
  label,
  selectedValues,
  setExpertOpinions,
  expertOpinions,
  linguisticTerms,
  operators,
}) {
  const handleChange = (event) => {
    const newValue = event.target.value;
    handleUpdateExpertOpinions(label, newValue);
  };

  const handleUpdateExpertOpinions = (label, newValue) => {
    const updatedData = expertOpinions.map((item) => {
      if (item.label === label) {
        const selectedValues = newValue.filter(
          (value) =>
            value.type === "linguistic term" || value.type === "operator"
        );

        return {
          ...item,
          selectedValues: selectedValues,
          selectedLinguisticTerms: selectedValues.filter(
            (value) => value.type === "linguistic term"
          ),
          selectedOperators: selectedValues.filter(
            (value) => value.type === "operator"
          ),
        };
      }
      return item;
    });
    setExpertOpinions(updatedData);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={`multiple-chip-label-${label}`}>{label}</InputLabel>
        <Select
          labelId={`multiple-chip-label-${label}`}
          id={`multiple-chip-${label}`}
          multiple
          value={selectedValues}
          onChange={handleChange}
          input={
            <OutlinedInput id={`select-multiple-chip-${label}`} label={label} />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value.linguisticTerm || value.operator}
                  label={value.linguisticTerm || value.operator}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          <MenuItem
            key={"operators"}
            disabled
            sx={{ backgroundColor: "#1f1f1f" }}
          >
            {" available operators:"}
          </MenuItem>
          {operators.map((value) => (
            <MenuItem key={value.operator} value={value}>
              {value.operator}
            </MenuItem>
          ))}
          <MenuItem
            key={"linguistic terms"}
            disabled
            sx={{ backgroundColor: "#1f1f1f" }}
          >
            {"available linguistic terms:"}
          </MenuItem>
          {linguisticTerms.map((value) => (
            <MenuItem key={value.shortLinguisticTerm} value={value}>
              {value.shortLinguisticTerm}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
