import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import ConfigurationPanel from "./components/ConfigurationPanel/ConfigurationPanel";

import Title from "./components/Title/Title";
import ExpertOpinions from "./components/ExpertOpinions/ExpertOpinions";
import IntervalExpertOpinions from "./components/IntervalExpertOpinions/IntervalExpertOpinions";

import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
  const [operators, setOperators] = React.useState();
  const [isConfigurationPanelOpen, setIsConfigurationPanelOpen] =
    React.useState(false);
  const [configuration, setConfiguration] = React.useState({
    alternatives: [],
    criteria: [],
    linguisticTerms: [],
    alpha: null,
  });

  React.useEffect(() => {
    console.log(
      "Expert Opinion Data:",
      JSON.stringify(expertOpinions, undefined, 4)
    );
    // console.log("Expert Opinion Data has Changed");
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
          setOperators={setOperators}
          setIsConfigurationPanelOpen={setIsConfigurationPanelOpen}
          isConfigurationPanelOpen={isConfigurationPanelOpen}
          setConfiguration={setConfiguration}
        />
        <CssBaseline />
        <Title />
        {expertOpinions.length > 0 && <Typography>Set opinions</Typography>}
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
            configuration={configuration}
            expertOpinions={expertOpinions}
            linguisticTerms={linguisticTerms}
            operators={operators}
            setExpertOpinions={setExpertOpinions}
          />
        )}
        {expertOpinions.length > 0 && (
          <>
            <Typography>Interval opinions</Typography>
            <IntervalExpertOpinions expertOpinions={expertOpinions} />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
