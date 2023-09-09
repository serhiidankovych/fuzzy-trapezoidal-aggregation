import React, { useState } from "react";
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
  operations,
}) {
  const [expertOpinion, setExpertOpinion] = useState(selectedValues || []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setExpertOpinion(value);
    handleChangeSelectedLinguisticTerm(label, value);
  };

  const handleChangeSelectedLinguisticTerm = (label, value) => {
    const updatedData = expertOpinions.map((item) => ({
      ...item,
      selectedValues: item.label === label ? value : item.selectedValues,
    }));
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
          value={expertOpinion}
          onChange={handleChange}
          input={
            <OutlinedInput id={`select-multiple-chip-${label}`} label={label} />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {operations.map((value) => (
            <MenuItem key={value.definition} value={value.definition}>
              {value.definition}
            </MenuItem>
          ))}
          {linguisticTerms.map((value) => (
            <MenuItem
              key={value.shortLinguisticTerm}
              value={value.shortLinguisticTerm}
            >
              {value.shortLinguisticTerm}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
