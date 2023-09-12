import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import ConfigurationPanel from "./components/ConfigurationPanel/ConfigurationPanel";

import Title from "./components/Title/Title";
import ExpertOpinions from "./components/ExpertOpinions/ExpertOpinions";

import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import configurationData from "./DataTemplate/configurationData";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "Abel",
  },
});

function App() {
  const [expertOpinions, setExpertOpinions] = React.useState([]);
  const [linguisticTerms, setLinguisticTerms] = React.useState();
  const [operations, setOperations] = React.useState();
  const [isConfigurationPanelOpen, setIsConfigurationPanelOpen] =
    React.useState(false);
  const [isConfigurationPanelNotSet, setIsConfigurationPanelNotSet] =
    React.useState(true);

  React.useEffect(() => {
    // console.log("Expert Opinion Data:", JSON.stringify(expertOpinions));
    console.log("Expert Opinion Data:", expertOpinions);
  }, [expertOpinions]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        <ConfigurationPanel
          setExpertOpinions={setExpertOpinions}
          setLinguisticTerms={setLinguisticTerms}
          setOperations={setOperations}
          setIsConfigurationPanelOpen={setIsConfigurationPanelOpen}
          isConfigurationPanelOpen={isConfigurationPanelOpen}
        />
        <CssBaseline />
        <Title />
        {!expertOpinions.length > 0 && (
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
        )}
        {expertOpinions.length > 0 && (
          <ExpertOpinions
            configurationData={configurationData}
            expertOpinions={expertOpinions}
            linguisticTerms={linguisticTerms}
            operations={operations}
            setExpertOpinions={setExpertOpinions}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
