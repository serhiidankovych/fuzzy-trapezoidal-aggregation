import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import ConfigurationPanel from "./components/ConfigurationPanel";

import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LinguisticTermsChip from "./components/LinguisticTermsChip";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [configurationData, setConfigurationData] = React.useState([
    {
      alternatives: ["x1", "x2", "x3", "x4"],
      criteria: ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"],
      linguisticTerms: ["c1", "c2", "c3"],
      alpha: 0.5,
    },
  ]);
  const [selectedLinguisticTerms, setSelectedLinguisticTerms] = React.useState(
    {}
  );
  const [expertOpinions, setExpertOpinions] = React.useState([]);

  React.useEffect(() => {
    console.log("Selected Linguistic Terms:", selectedLinguisticTerms);
  }, [selectedLinguisticTerms]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="lg">
        <ConfigurationPanel />
        <CssBaseline />
        <Box
          sx={{
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            minWidth: 300,
            border: "1px solid  rgba(81, 81, 81, 1)",
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            The method of aggregation of trapezoidal linguistic terms
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            overflowX: "scroll",
            overflowY: "hidden",
            whiteSpace: "nowrap",
            flexDirection: "column",
          }}
        >
          {configurationData[0].alternatives.map(
            (alternative, alternativeIndex) => (
              <Box
                sx={{ flexWrap: "row", display: "flex" }}
                key={alternativeIndex}
              >
                {configurationData[0].criteria.map(
                  (criteria, criteriaIndex) => (
                    <LinguisticTermsChip
                      key={criteriaIndex}
                      criteria={criteria}
                      alternative={alternative}
                      setSelectedLinguisticTerms={setSelectedLinguisticTerms}
                    />
                  )
                )}
              </Box>
            )
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
