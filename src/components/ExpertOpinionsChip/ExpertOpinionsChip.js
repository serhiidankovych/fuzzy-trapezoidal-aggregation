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
  values,
  selectedValues,
  setExpertOpinions,
  expertOpinions,
  linguisticTerms,
  operators,
}) {
  const [expertOpinion, setExpertOpinion] = useState(selectedValues || []);
  const [selectedOpinion, setSelectedOpinion] = useState("");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setExpertOpinion(value);
    handleUpdateExpertOpinions(label, value);
  };

  const handleUpdateExpertOpinions = (label, value) => {
    const allSelectedLinguisticTerms = value.filter(
      (item) => item.type === "linguistic term"
    );
    const allSelectedOperators = value.filter(
      (item) => item.type === "operator"
    );

    const updatedData = expertOpinions.map((item) => ({
      ...item,
      selectedValues: item.label === label ? value : item.selectedValues,
      selectedLinguisticTerms:
        item.label === label
          ? allSelectedLinguisticTerms
          : item.selectedLinguisticTerms,
      selectedOperators:
        item.label === label ? allSelectedOperators : item.selectedOperators,
    }));

    setExpertOpinions(updatedData);
    console.log(updatedData);
    console.log(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={`multiple-chip-label-${label}`}>{label}</InputLabel>
        <Select
          labelId={`multiple-chip-label-${label}`}
          id={`multiple-chip-${label}`}
          multiple
          value={expertOpinion}
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
            <MenuItem
              key={value.operator}
              value={value}
              onClick={() => setSelectedOpinion(value.type)}
            >
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
            <MenuItem
              key={value.shortLinguisticTerm}
              value={value}
              onClick={() => setSelectedOpinion(value.type)}
            >
              {value.shortLinguisticTerm}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
