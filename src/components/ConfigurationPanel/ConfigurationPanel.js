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
import operationsData from "../../DataTemplate/operationsData";

export default function ConfigurationPanel({
  setExpertOpinions,
  setLinguisticTerms,
  setOperations,
  setIsConfigurationPanelOpen,
  isConfigurationPanelOpen,
}) {
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsConfigurationPanelOpen(open);
  };

  const handleSetData = () => {
    setExpertOpinions(expertOpinionsData);
    setLinguisticTerms(linguisticTermsData);
    setOperations(operationsData);
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
      >
        <Button variant="contained" onClick={handleSetData}>
          Set Data #1
        </Button>
        <Button variant="contained" onClick={handleSetData}>
          Set Data #2
        </Button>
        <Button variant="contained" onClick={handleSetData}>
          Set Data #3
        </Button>
      </Stack>
      <TextField
        id="outlined-basic"
        label="Number of alternatives"
        variant="outlined"
      />
      <TextField
        id="outlined-basic"
        label="Number of Criteria"
        variant="outlined"
      />
      <TextField
        id="outlined-basic"
        label="Number of linguistic terms"
        variant="outlined"
      />
      <TextField id="outlined-basic" label="Alpha (α)" variant="outlined" />

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
