import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import LinguisticTermsSelect from "./LinguisticTermsSelect";

//Linguistic Terms Template
const linguisticTerms = [
  {
    fullName: "Low",
    shortName: "L",
    confines: { left: 0, middle: 0, right: 25 },
  },
  {
    fullName: "Low middle",
    shortName: "LM",
    confines: { left: 0, middle: 25, right: 50 },
  },
  {
    fullName: "Middle",
    shortName: "M",
    confines: { left: 25, middle: 50, right: 75 },
  },
  {
    fullName: "High Middle",
    shortName: "HM",
    confines: { left: 50, middle: 75, right: 100 },
  },
  {
    fullName: "High",
    shortName: "H",
    confines: { left: 75, middle: 100, right: 100 },
  },
];

const operations = [
  {
    symbol: ">",
    definition: "greater than",
  },
  {
    symbol: "<",
    definition: "less than",
  },
  {
    symbol: "&",
    definition: "and",
  },
];

//Menu
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

//Adding weight for sorting
linguisticTerms.forEach((term) => {
  const { left, middle, right } = term.confines;
  term.weight = parseInt(left) + parseInt(middle) + parseInt(right);
});

export default function LinguisticTermsChip({
  criteria,
  alternative,
  setSelectedLinguisticTerms,
}) {
  const [terms, setTerms] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    // value.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight));
    setTerms(value);
    handleSelectedLinguisticTerms(value);
  };

  const handleSelectedLinguisticTerms = (value) => {
    setSelectedLinguisticTerms((prevTerms) => ({
      ...prevTerms,
      [`${alternative}-${criteria}`]: value,
    }));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="terms-chip-label">{`${alternative}-${criteria}`}</InputLabel>
        <Select
          labelId="terms-chip-label"
          id="terms-chip"
          multiple
          value={terms}
          onChange={handleChange}
          input={<OutlinedInput id="select-terms-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value.shortName ? value.shortName : value.definition}
                  label={value.shortName ? value.shortName : value.definition}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {operations.map((name) => (
            <MenuItem key={name.definition} value={name}>
              {name.definition}
            </MenuItem>
          ))}
          {linguisticTerms.map((name) => (
            <MenuItem key={name.shortName} value={name}>
              {name.shortName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
