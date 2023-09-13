import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Import your data here
import expertOpinionsData from "../../DataTemplate/expertOpinionsData";
import linguisticTermsData from "../../DataTemplate/linguisticTermsData";
import operatorsData from "../../DataTemplate/operatorsData";
import configurationData from "../../DataTemplate/configurationData";

export default function ConfigurationPanel({
  setExpertOpinions,
  setLinguisticTerms,
  setOperators,
  setIsConfigurationPanelOpen,
  isConfigurationPanelOpen,
  setConfiguration,
}) {
  const [numberOfAlternatives, setNumberOfAlternatives] = React.useState(0);
  const [numberOfCriteria, setNumberOfCriteria] = React.useState(0);
  const [numberOfLinguisticTerms, setNumberOfLinguisticTerms] =
    React.useState(0);
  const [alpha, setAlphaa] = React.useState(0);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsConfigurationPanelOpen(open);
  };

  const handleSetTemplateData = () => {
    setExpertOpinions(expertOpinionsData);
    setLinguisticTerms(linguisticTermsData);
    setOperators(operatorsData);
    setConfiguration(configurationData);
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
      <Typography variant="h4" gutterBottom align="center">
        Configuration
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
        sx={{
          backgroundColor: "rgb(78 78 78)",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <Button variant="contained" onClick={handleSetTemplateData}>
          Set Data #1
        </Button>
        <Button variant="contained" onClick={handleSetTemplateData}>
          Set Data #2
        </Button>
        <Button variant="contained" onClick={handleSetTemplateData}>
          Set Data #3
        </Button>
      </Stack>
      <TextField
        id="outlined-basic"
        label="Number of alternatives"
        variant="outlined"
        type="number"
      />
      <TextField
        id="outlined-basic"
        label="Number of criteria"
        variant="outlined"
        type="number"
      />
      <TextField
        id="outlined-basic"
        label="Number of linguistic terms"
        variant="outlined"
        type="number"
      />
      <TextField
        id="outlined-basic"
        label="Alpha (α)"
        variant="outlined"
        type="number"
      />

      <Button
        variant="contained"
        sx={{
          marginTop: "20px",
        }}
        disabled
      >
        Next
      </Button>
    </Box>
  );

  return (
    <div>
      {/* <Button
        variant="contained"
        onClick={toggleDrawer(true)}
        sx={{
          marginTop: "20px",
        }}
      >
        Open Configuration Panel
      </Button> */}

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
