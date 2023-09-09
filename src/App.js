import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import ConfigurationPanel from "./components/ConfigurationPanel/ConfigurationPanel";
import TestChip from "./components/TestChip/TestChip";
import Title from "./components/Title/Title";
import ExpertOpinions from "./components/ExpertOpinions/ExpertOpinions";

import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import expertOpinionsData from "./DataTemplate/expertOpinionsData";
import configurationData from "./DataTemplate/configurationData";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  // React.useEffect(() => {
  //   console.log("Expert Opinion Data:", JSON.stringify(expertOpinions));
  // }, [expertOpinions]);

  const [expertOpinions, setExpertOpinions] = React.useState();
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
        <ConfigurationPanel setExpertOpinions={setExpertOpinions} />
        <CssBaseline />
        <Title />
        <ExpertOpinions
          configurationData={configurationData}
          expertOpinions={expertOpinions}
          setExpertOpinions={setExpertOpinions}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
