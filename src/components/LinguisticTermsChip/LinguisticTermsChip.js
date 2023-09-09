import React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import linguisticTermsData from "../../DataTemplate/linguisticTermsData";
import operations from "../../DataTemplate/operationsData";
import expertOpinionsData from "../../DataTemplate/expertOpinionsData";

//Menu
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

//Adding weight for sorting
// linguisticTermsData.forEach((term) => {
//   const { left, middle, right } = term.confines;
//   term.weight = parseInt(left) + parseInt(middle) + parseInt(right);
// });

export default function LinguisticTermsChip({
  criteria,
  alternative,
  setExpertOpinions,
}) {
  const [terms, setTerms] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    // value.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight));
    setTerms(value);
    handleSelectedLinguisticTerms(value);
    console.log(terms);
  };

  const handleSelectedLinguisticTerms = (value) => {
    setExpertOpinions((prevTerms) => ({
      ...prevTerms,
      value,
    }));
  };
  const handleSetDefaults = () => {
    const defaultValues = [
      /* your default values here */
    ];
    setTerms(defaultValues);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
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
                  key={
                    value.shortLinguisticTerm
                      ? value.shortLinguisticTerm
                      : value.definition
                  }
                  label={
                    value.shortLinguisticTerm
                      ? value.shortLinguisticTerm
                      : value.definition
                  }
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
          {linguisticTermsData.map((name) => (
            <MenuItem key={name.shortLinguisticTerm} value={name}>
              {name.shortLinguisticTerm}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <Button onClick={handleSetDefaults}>Set Defaults</Button> */}
    </div>
  );
}
