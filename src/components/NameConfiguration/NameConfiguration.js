import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";

export default function NameConfiguration({
  shortNames,
  handleConfigurationMenuStepBack,
  handleConfigurationMenuStepNext,
  showNames,
  names,
  handleNamesChange,
  generateLinguisticTerms,
  isDataTemplateSet,
  showToastMessage,
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["alternatives", "criteria", "linguistic terms"];

  const handleStepChange = (step) => {
    if (step >= 0 && step <= 2) {
      setCurrentStep(step);
    }
  };

  const renderInputs = (nameArray, nameType, shortName) => {
    return nameArray.map((name, index) => (
      <TextField
        id={`${nameType}${index + 1}`}
        label={`${name}`}
        key={`${nameType}-${index}`} // Use an index-based key
        variant="outlined"
        type="text"
        value={names[nameType][index]}
        onChange={(e) => handleNamesChange(nameType, index, e.target.value)}
        disabled={isDataTemplateSet}
      />
    ));
  };

  const checkNamesAndSet = () => {
    let isValid = true; // Assume all inputs are valid initially

    names.alternatives.forEach((alternative) => {
      if (alternative === "") {
        showToastMessage("Please enter a name", "error");
        isValid = false; // Invalid input found, set isValid to false
        return;
      }
      if (alternative.length > 20) {
        showToastMessage("Please enter a shorter name", "error");
        isValid = false; // Invalid input found, set isValid to false
        return;
      }
    });

    names.criteria.forEach((criteria) => {
      if (criteria === "") {
        showToastMessage("Please enter a name", "error");
        isValid = false; // Invalid input found, set isValid to false
        return;
      }
      if (criteria.length > 20) {
        showToastMessage("Please enter a shorter name", "error");
        isValid = false; // Invalid input found, set isValid to false
        return;
      }
    });

    names.linguisticTerms.forEach((linguisticTerm) => {
      if (linguisticTerm === "") {
        showToastMessage("Please enter a name", "error");
        isValid = false; // Invalid input found, set isValid to false
        return;
      }
      if (linguisticTerm.length > 20) {
        showToastMessage("Please enter a shorter name", "error");
        isValid = false; // Invalid input found, set isValid to false
        return;
      }
    });

    if (isValid) {
      // If all inputs are valid
      if (isDataTemplateSet) {
        handleConfigurationMenuStepNext();
      } else {
        generateLinguisticTerms();
      }
    }
  };

  return (
    <div>
      <Typography>Set names:</Typography>
      <Box
        component="span"
        sx={{
          p: 1.5,
          border: "1px dashed grey",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "3px",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ marginBottom: "10px" }}
        >
          <Button
            onClick={() => handleStepChange(currentStep - 1)}
            disabled={currentStep === 0}
            variant="outlined"
          >
            <GoChevronLeft />
          </Button>
          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                fontSize: "12px",
                fontWeight: index === currentStep ? "bold" : "normal",
                textDecoration: index === currentStep && "underline",
                color: index === currentStep && "#90caf9",
              }}
              onClick={() => handleStepChange(index)}
            >
              {step}
            </div>
          ))}
          <Button
            onClick={() => handleStepChange(currentStep + 1)}
            disabled={currentStep === 2}
            variant="outlined"
          >
            <GoChevronRight />
          </Button>
        </Stack>
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
          sx={{ marginTop: "10px" }}
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
            onClick={checkNamesAndSet}
          >
            Next step
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
