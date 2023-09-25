import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

// Import your data here
import expertOpinionsData from "../../DataTemplate/expertOpinionsData";
import linguisticTermsData from "../../DataTemplate/linguisticTermsData";
import operatorsData from "../../DataTemplate/operatorsData";
import configurationData from "../../DataTemplate/configurationData";

import DataTemplateConfiguration from "../DataTemplateConfiguration/DataTemplateConfiguration";
import NumberConfiguration from "../NumberConfiguration/NumberConfiguration";
import NameConfiguration from "../NameConfiguration/NameConfiguration";
import LinguisticTermsConfiguration from "../LinguisticTermsConfiguration/LinguisticTermsConfiguration";

export default function ConfigurationPanel({
  linguisticTerms,
  setExpertOpinions,
  setLinguisticTerms,
  setOperators,
  setIsConfigurationPanelOpen,
  isConfigurationPanelOpen,
  setConfiguration,
}) {
  const [configurationMenuStep, setConfigurationMenuStep] = React.useState(0);

  const handleConfigurationMenuStepNext = () => {
    setConfigurationMenuStep(configurationMenuStep + 1);
  };

  const handleConfigurationMenuStepBack = () => {
    setConfigurationMenuStep(configurationMenuStep - 1);
  };

  const [numbers, setNumbers] = React.useState({
    alternatives: "",
    criteria: "",
    linguisticTerms: "",
    alpha: "",
  });

  // fix set names
  const [names, setNames] = React.useState({
    alternatives: [],
    criteria: [],
    linguisticTerms: [],
    alpha: "",
  });

  const [shortNames, setShortNames] = React.useState({
    alternatives: [],
    criteria: [],
    linguisticTerms: [],
  });

  const setNumbersTemplate = () => {
    setNumbers({
      alternatives: configurationData.alternatives.length,
      criteria: configurationData.criteria.length,
      linguisticTerms: configurationData.linguisticTerms.length,
      alpha: configurationData.alpha,
    });
  };

  const setNamesTemplate = () => {
    // setNames({
    //   alternatives: ["x1", "x2", "x3", "x4"],
    //   criteria: ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"],
    //   linguisticTerms: ["c1", "c2", "c3"],
    // });
  };

  const handleSetTemplateData = () => {
    setExpertOpinions(expertOpinionsData);
    setLinguisticTerms(linguisticTermsData);
    setOperators(operatorsData);
    setConfiguration(configurationData);
    setNumbersTemplate();
    setNamesTemplate();
  };

  const generateShortNames = () => {
    const alternatives = [];
    const criteria = [];
    const linguisticTerms = [];
    for (let i = 0; i < numbers.alternatives; i++) {
      alternatives.push("x" + (i + 1));
    }
    for (let i = 0; i < numbers.criteria; i++) {
      criteria.push("c" + (i + 1));
    }
    for (let i = 0; i < numbers.linguisticTerms; i++) {
      linguisticTerms.push("l" + (i + 1));
    }
    setShortNames({
      alternatives: alternatives,
      criteria: criteria,
      linguisticTerms: linguisticTerms,
    });
    setNames({
      alternatives: alternatives,
      criteria: criteria,
      linguisticTerms: linguisticTerms,
    });
  };

  const generateExpertOpinions = () => {
    const generatedExpertOpinions = [];
    for (let i = 0; i < numbers.alternatives; i++) {
      for (let j = 0; j < numbers.criteria; j++) {
        generatedExpertOpinions.push({
          label: `x${i + 1}-c${j + 1}`,
          alternative: `x${i + 1}`,
          criteria: `c${j + 1}`,
          selectedValues: [],
          selectedLinguisticTerms: [],
          selectedOperators: [],
        });
      }
    }

    setExpertOpinions(generatedExpertOpinions);
  };
  const generateListicTerms = () => {
    const generatedLinguisticTerms = [];

    for (let i = 0; i < numbers.linguisticTerms; i++) {
      generatedLinguisticTerms.push({
        linguisticTerm: `l${i + 1}`,
        shortLinguisticTerm: `l${i + 1}`,
        confines: { left: 0, middle: 0, right: 0 },
        type: "linguistic term",
      });
    }

    setLinguisticTerms(generatedLinguisticTerms);
  };

  const setNumbersForConfiguration = () => {
    generateShortNames();
    // generateListicTerms();
    // generateExpertOpinions();

    handleConfigurationMenuStepNext();
  };

  const handleNumbersChange = (event) => {
    const { id, value } = event.target;
    const updatedNumbers = { ...numbers };

    updatedNumbers[id] = value;

    setNumbers(updatedNumbers);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsConfigurationPanelOpen(open);
  };

  const handleNamesChange = (fieldName, index, value) => {
    const updatedNames = { ...names };
    updatedNames[fieldName][index] = value;
    setNames(updatedNames);
  };

  // TODO: generate data by names

  const showNames = () => {
    console.log(names);
  };

  const list = () => (
    <Box
      sx={{
        width: 450,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
      role="presentation"
    >
      {configurationMenuStep === 0 && (
        <DataTemplateConfiguration
          handleSetTemplateData={handleSetTemplateData}
        />
      )}

      {configurationMenuStep === 0 && (
        <NumberConfiguration
          numbers={numbers}
          handleNumbersChange={handleNumbersChange}
          setNumbersForConfiguration={setNumbersForConfiguration}
        />
      )}

      {configurationMenuStep === 1 && (
        <NameConfiguration
          names={names}
          shortNames={shortNames}
          showNames={showNames}
          handleNamesChange={handleNamesChange}
          handleConfigurationMenuStepBack={handleConfigurationMenuStepBack}
          handleConfigurationMenuStepNext={handleConfigurationMenuStepNext}
        />
      )}

      {configurationMenuStep === 2 && (
        <LinguisticTermsConfiguration
          names={names}
          linguisticTerms={linguisticTerms}
          handleConfigurationMenuStepBack={handleConfigurationMenuStepBack}
          handleConfigurationMenuStepNext={handleConfigurationMenuStepNext}
        />
      )}
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor="right"
        open={isConfigurationPanelOpen}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
}
