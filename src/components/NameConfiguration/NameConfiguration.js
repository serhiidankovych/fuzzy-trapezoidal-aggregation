import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

export default function NameConfiguration({
  shortNames,
  handleConfigurationMenuStepBack,
  handleConfigurationMenuStepNext,
  showNames,
  names,
  handleNamesChange,
  generateLinguisticTerms,
  isDataTemplateSet,
}) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepChange = (step) => {
    if (step >= 0 && step <= 2) {
      setCurrentStep(step);
    }
  };

  const renderInputs = (nameArray, nameType, shortName) => {
    return nameArray.map((name, index) => (
      <TextField
        id={`${nameType}${index + 1}`}
        label={`${shortName}${index + 1}`}
        key={`${nameType}-${index}`} // Use an index-based key
        variant="outlined"
        type="text"
        value={names[nameType][index]}
        onChange={(e) => handleNamesChange(nameType, index, e.target.value)}
      />
    ));
  };

  return (
    <div>
      <Typography>Name:</Typography>
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
        {currentStep === 0 &&
          renderInputs(shortNames.alternatives, "alternatives", "x")}
        {currentStep === 1 &&
          renderInputs(shortNames.criteria, "criteria", "c")}
        {currentStep === 2 &&
          renderInputs(shortNames.linguisticTerms, "linguisticTerms", "lt")}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Button
            onClick={() => handleStepChange(currentStep - 1)}
            disabled={currentStep === 0}
          >
            ⬅️
          </Button>
          <Button
            onClick={() => handleStepChange(currentStep + 1)}
            disabled={currentStep === 2}
          >
            ➡️
          </Button>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Button
            variant="contained"
            sx={{
              marginTop: "20px",
            }}
            onClick={handleConfigurationMenuStepBack}
          >
            Back
          </Button>

          <Button
            variant="contained"
            sx={{
              marginTop: "20px",
            }}
            onClick={
              isDataTemplateSet
                ? handleConfigurationMenuStepNext
                : generateLinguisticTerms
            }
          >
            Next step
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
