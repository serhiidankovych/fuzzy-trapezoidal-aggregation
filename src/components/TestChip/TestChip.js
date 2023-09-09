import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function TestChip({
  label,
  values,
  selectedValues,
  setExpertOpinions,
}) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState(selectedValues || []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(value);
    handleSelectedLinguisticTerms(value);
  };

  const handleSelectedLinguisticTerms = (value) => {
    // setExpertOpinions((prevTerms) => ({
    //   ...prevTerms,
    //   value,
    // }));
    console.log("handleSelectedLinguisticTerms", value);
  };
  // const handleSelectedLinguisticTerms = (value) => {
  //   setExpertOpinions((prevTerms) => ({
  //     ...prevTerms,
  //     [label]: value, // Use the label as the key
  //   }));
  // };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={`demo-multiple-chip-label-${label}`}>
          {label}
        </InputLabel>
        <Select
          labelId={`demo-multiple-chip-label-${label}`}
          id={`demo-multiple-chip-${label}`}
          multiple
          value={personName}
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
          {values.map((value) => (
            <MenuItem
              key={value}
              value={value}
              style={getStyles(value, personName, theme)}
            >
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <Button onClick={}></Button> */}
    </div>
  );
}
