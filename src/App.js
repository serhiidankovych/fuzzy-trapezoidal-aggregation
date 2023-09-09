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
});

function App() {
  const [expertOpinions, setExpertOpinions] = React.useState();
  const [linguisticTerms, setLinguisticTerms] = React.useState();
  const [operations, setOperations] = React.useState();
  const [isConfigurationPanelOpen, setIsConfigurationPanelOpen] =
    React.useState(false);
  const [isConfigurationPanelNotSet, setIsConfigurationPanelNotSet] =
    React.useState(true);

  React.useEffect(() => {
    console.log("Expert Opinion Data:", JSON.stringify(expertOpinions));
  }, [expertOpinions]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          gap: "6px",
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
        {isConfigurationPanelNotSet && (
          <Box
            sx={{
              border: "1px solid #00ff05",
              borderRadius: 2,
              marginTop: "10px",
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
        {expertOpinions && (
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
