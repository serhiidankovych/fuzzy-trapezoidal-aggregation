import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import ConfigurationPanel from "./components/ConfigurationPanel/ConfigurationPanel";

import Title from "./components/Title/Title";
import ExpertOpinions from "./components/ExpertOpinions/ExpertOpinions";
import IntervalExpertOpinions from "./components/IntervalExpertOpinions/IntervalExpertOpinions";
import TrapezoidalExpertOpinions from "./components/TrapezoidalExpertOpinions/TrapezoidalExpertOpinions";
import IntervalEstimates from "./components/IntervalEstimates/IntervalEstimates";
import DecisionMaker from "./components/DecisionMaker/DecisionMaker";
import Footer from "./components/Footer/Footer";

import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "Abel",
  },
});

function App() {
  const [isConfigurationFinished, setIsConfigurationFinished] =
    React.useState(false);

  const [expertOpinions, setExpertOpinions] = React.useState([]);
  const [intervalExpertOpinions, setIntervalExpertOpinions] = React.useState(
    []
  );

  const [trapezoidalExpertOpinions, setTrapezoidalExpertOpinions] =
    React.useState([]);
  const [intervalEstimates, setIntervalEstimates] = React.useState([]);

  const [linguisticTerms, setLinguisticTerms] = React.useState();
  const [linguisticTermsNormalized, setLinguisticTermsNormalized] =
    React.useState();

  const [operators, setOperators] = React.useState([
    {
      symbol: "<",
      operator: "greater than",
      type: "operator",
    },
    {
      symbol: ">",
      operator: "less than",
      type: "operator",
    },
    {
      symbol: "&",
      operator: "and",
      type: "operator",
    },
  ]);

  const [configuration, setConfiguration] = React.useState({
    alternatives: [],
    criteria: [],
    linguisticTerms: [],
    alpha: 0.5,
  });

  const [isConfigurationPanelOpen, setIsConfigurationPanelOpen] =
    React.useState(false);

  const [shortNames, setShortNames] = React.useState({
    alternatives: [],
    criteria: [],
    linguisticTerms: [],
  });

  const [names, setNames] = React.useState({
    alternatives: [],
    criteria: [],
    linguisticTerms: [],
  });
  const [numbers, setNumbers] = React.useState({
    alternatives: "",
    criteria: "",
    linguisticTerms: "",
    alpha: "",
  });

  const handleLinguisticTermsChange = (index, value, confinesIndex) => {
    const updatedLinguisticTerms = [...linguisticTerms];

    updatedLinguisticTerms[index] = {
      ...updatedLinguisticTerms[index],
      confines: [
        ...updatedLinguisticTerms[index].confines.slice(0, confinesIndex),
        value === "" ? "" : Number(value),
        ...updatedLinguisticTerms[index].confines.slice(confinesIndex + 1),
      ],
    };

    setLinguisticTerms(updatedLinguisticTerms);
  };

  const showToastMessage = (message, typeMessage) => {
    let toastOptions = {
      position: toast.POSITION.BOTTOM_LEFT,
    };

    if (typeMessage === "success") {
      toast.success(message, toastOptions);
    } else if (typeMessage === "error") {
      toast.error(message, toastOptions);
    } else if (typeMessage === "warning") {
      toast.warn(message, toastOptions);
    } else {
      toast.info(message, toastOptions);
    }
  };
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          <ConfigurationPanel
            setExpertOpinions={setExpertOpinions}
            linguisticTerms={linguisticTerms}
            setLinguisticTerms={setLinguisticTerms}
            setOperators={setOperators}
            setIsConfigurationPanelOpen={setIsConfigurationPanelOpen}
            isConfigurationPanelOpen={isConfigurationPanelOpen}
            setConfiguration={setConfiguration}
            setShortNames={setShortNames}
            shortNames={shortNames}
            names={names}
            setNames={setNames}
            setNumbers={setNumbers}
            numbers={numbers}
            setLinguisticTermsNormalized={setLinguisticTermsNormalized}
            handleLinguisticTermsChange={handleLinguisticTermsChange}
            setIsConfigurationFinished={setIsConfigurationFinished}
            linguisticTermsNormalized={linguisticTermsNormalized}
            showToastMessage={showToastMessage}
          />
          <CssBaseline />
          <Title setIsConfigurationPanelOpen={setIsConfigurationPanelOpen} />
          {isConfigurationFinished && <Typography>Set opinions</Typography>}
          {!isConfigurationFinished && (
            <>
              <Box
                sx={{
                  border: "1px dotted #90caf9",
                  borderRadius: 2,
                  backgroundColor: "#181819",
                  textAlign: "center",
                  padding: "40px",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => setIsConfigurationPanelOpen(true)}
                >
                  Let`s start
                </Button>
              </Box>
            </>
          )}

          {isConfigurationFinished && (
            <>
              <ExpertOpinions
                configuration={configuration}
                expertOpinions={expertOpinions}
                linguisticTerms={linguisticTerms}
                linguisticTermsNormalized={linguisticTermsNormalized}
                operators={operators}
                setExpertOpinions={setExpertOpinions}
                setIntervalExpertOpinions={setIntervalExpertOpinions}
                setTrapezoidalExpertOpinions={setTrapezoidalExpertOpinions}
                intervalExpertOpinions={intervalExpertOpinions}
                setIntervalEstimates={setIntervalEstimates}
                setLinguisticTerms={setLinguisticTerms}
                names={names}
                setNames={setNames}
                setNumbers={setNumbers}
                numbers={numbers}
                showToastMessage={showToastMessage}
              />
            </>
          )}
          {intervalExpertOpinions.length > 0 && (
            <>
              <Typography>Interval opinions</Typography>
              <IntervalExpertOpinions
                intervalExpertOpinions={intervalExpertOpinions}
                shortNames={shortNames}
              />
            </>
          )}
          {trapezoidalExpertOpinions.length > 0 && (
            <>
              <Typography>Trapezoidal terms</Typography>
              <TrapezoidalExpertOpinions
                trapezoidalExpertOpinions={trapezoidalExpertOpinions}
                shortNames={shortNames}
              />
            </>
          )}
          {intervalEstimates.length > 0 && (
            <>
              <Typography>Interval estimates</Typography>
              <IntervalEstimates
                intervalEstimates={intervalEstimates}
                shortNames={shortNames}
              />
            </>
          )}
          {intervalEstimates.length > 0 && (
            <DecisionMaker
              intervalEstimates={intervalEstimates}
              trapezoidalExpertOpinions={trapezoidalExpertOpinions}
              numbers={numbers}
            />
          )}
          <Footer />
        </Container>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
