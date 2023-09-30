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
import InfoConfiguration from "../InfoConfiguration/InfoConfiguration";
import expertOpinionsData2 from "../../DataTemplate/expertOptionsData2";

export default function ConfigurationPanel({
  linguisticTerms,
  setExpertOpinions,
  setLinguisticTerms,
  setOperators,
  setIsConfigurationPanelOpen,
  isConfigurationPanelOpen,
  setConfiguration,
  setShortNames,
  shortNames,
  names,
  setNames,
  setNumbers,
  numbers,
  setLinguisticTermsNormalized,
  handleLinguisticTermsChange,
  setIsConfigurationFinished,
  linguisticTermsNormalized,
  showToastMessage,
}) {
  const [configurationMenuStep, setConfigurationMenuStep] = React.useState(0);

  const [isDataTemplateSet, setIsDataTemplateSet] = React.useState(false);

  const handleConfigurationMenuStepNext = () => {
    setConfigurationMenuStep(configurationMenuStep + 1);
  };

  const handleConfigurationMenuStepBack = () => {
    setConfigurationMenuStep(configurationMenuStep - 1);
  };

  const setNumbersTemplate = () => {
    setNumbers({
      alternatives: configurationData.alternatives.length,
      criteria: configurationData.criteria.length,
      linguisticTerms: configurationData.linguisticTerms.length,
      alpha: configurationData.alpha,
    });
  };

  const setNamesTemplate = () => {
    setShortNames({
      alternatives: ["x1", "x2", "x3", "x4"],
      criteria: ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"],
      linguisticTerms: ["lt1", "lt2", "lt3", "lt4", "lt5"],
    });

    setNames({
      alternatives: ["SkyUA", "AeroDrones", "FlyMax", "SwiftFly"],
      criteria: [
        "Battery Life",
        "Flight Stability",
        "Camera Quality",
        "Collision Avoidance",
        "Data Transmission",
        "Range",
        "Price",
        "Customer Support",
      ],
      linguisticTerms: ["L", "LM", "M", "HM", "H"],
    });
  };

  const handleSetTemplateData1 = () => {
    setExpertOpinions(expertOpinionsData);
    setLinguisticTerms(linguisticTermsData);

    setLinguisticTermsNormalized(linguisticTermsData);
    setOperators(operatorsData);
    setConfiguration(configurationData);
    setNumbersTemplate();

    setIsDataTemplateSet(true);
    setNamesTemplate();
  };

  const handleSetTemplateData2 = () => {
    setLinguisticTerms(linguisticTermsData);
    setLinguisticTermsNormalized(linguisticTermsData);
    setOperators(operatorsData);
    setConfiguration(configurationData);
    setNumbersTemplate();

    setIsDataTemplateSet(true);

    setExpertOpinions(expertOpinionsData2);
    setNamesTemplate();
  };

  const handleSetTemplateData3 = () => {
    setLinguisticTerms(linguisticTermsData);
    setLinguisticTermsNormalized(linguisticTermsData);
    setOperators(operatorsData);
    setConfiguration(configurationData);
    setNumbersTemplate();

    setIsDataTemplateSet(true);

    setExpertOpinions(expertOpinionsData2);
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
    handleConfigurationMenuStepNext();
  };

  //fix set names

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
  const generateLinguisticTerms = () => {
    const generatedLinguisticTerms = [];
    //Fixed  confines type
    for (let i = 0; i < numbers.linguisticTerms; i++) {
      generatedLinguisticTerms.push({
        linguisticTerm: names.linguisticTerms[i],
        shortLinguisticTerm: names.linguisticTerms[i],
        confines: [0, 0, 0],
        type: "linguistic term",
      });
    }

    setLinguisticTerms(generatedLinguisticTerms);
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
    const updatedNames = JSON.parse(JSON.stringify(names));
    updatedNames[fieldName][index] = value;
    setNames(updatedNames);
  };

  const showNames = () => {};

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
          handleSetTemplateData1={handleSetTemplateData1}
          handleSetTemplateData2={handleSetTemplateData2}
          handleSetTemplateData3={handleSetTemplateData3}
        />
      )}

      {configurationMenuStep === 0 && (
        <NumberConfiguration
          numbers={numbers}
          handleNumbersChange={handleNumbersChange}
          generateShortNames={generateShortNames}
          isDataTemplateSet={isDataTemplateSet}
          handleConfigurationMenuStepNext={handleConfigurationMenuStepNext}
          showToastMessage={showToastMessage}
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
          generateLinguisticTerms={generateLinguisticTerms}
          isDataTemplateSet={isDataTemplateSet}
          showToastMessage={showToastMessage}
        />
      )}

      {configurationMenuStep === 2 && (
        <LinguisticTermsConfiguration
          names={names}
          shortNames={shortNames}
          linguisticTerms={linguisticTerms}
          handleLinguisticTermsChange={handleLinguisticTermsChange}
          handleConfigurationMenuStepBack={handleConfigurationMenuStepBack}
          handleConfigurationMenuStepNext={handleConfigurationMenuStepNext}
          generateExpertOpinions={generateExpertOpinions}
          isDataTemplateSet={isDataTemplateSet}
          setLinguisticTerms={setLinguisticTerms}
          setLinguisticTermsNormalized={setLinguisticTermsNormalized}
          setIsConfigurationFinished={setIsConfigurationFinished}

          // generateDataFromConfigurationMenu={generateDataFromConfigurationMenu}
        />
      )}
      {configurationMenuStep === 3 && (
        <InfoConfiguration
          linguisticTermsNormalized={linguisticTermsNormalized}
          handleConfigurationMenuStepBack={handleConfigurationMenuStepBack}
          names={names}
          shortNames={shortNames}
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
