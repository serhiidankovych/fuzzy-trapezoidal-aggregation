import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function NumberConfiguration({
  numbers,
  handleTextFieldChange,
  generateShortNames,
  handleNumbersChange,
}) {
  // Define a function to check if any of the text fields are empty
  const areTextFieldsEmpty = () => {
    for (const key in numbers) {
      if (numbers[key] === "") {
        return true; // At least one field is empty
      }
    }
    return false; // All fields are filled
  };
  return (
    <>
      <Typography>Set:</Typography>
      <Box
        component="span"
        sx={{
          p: 2,
          border: "1px dashed grey",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "3px",
        }}
      >
        <TextField
          id="alternatives"
          label="Number of alternatives"
          variant="outlined"
          type="number"
          value={numbers.alternatives}
          onChange={handleNumbersChange}
        />
        <TextField
          id="criteria"
          label="Number of criteria"
          variant="outlined"
          type="number"
          value={numbers.criteria}
          onChange={handleNumbersChange}
        />
        <TextField
          id="linguisticTerms"
          label="Number of linguistic terms"
          variant="outlined"
          type="number"
          value={numbers.linguisticTerms}
          onChange={handleNumbersChange}
        />
        <TextField
          id="alpha"
          label="Alpha (α)"
          variant="outlined"
          type="number"
          value={numbers.alpha}
          onChange={handleNumbersChange}
        />
        <Button
          variant="contained"
          sx={{
            marginTop: "20px",
          }}
          disabled={areTextFieldsEmpty()}
          onClick={generateShortNames}
        >
          Next step
        </Button>
      </Box>
    </>
  );
}
