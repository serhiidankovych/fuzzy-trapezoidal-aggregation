import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import expertOpinionsData from "../../DataTemplate/expertOpinionsData";

export default function ConfigurationPanel({ setExpertOpinions }) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const handleSetExpertOpinions = () => {
    setExpertOpinions(expertOpinionsData);
  };

  const list = (anchor) => (
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
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={handleSetExpertOpinions}>
          Set Data #1
        </Button>
        <Button variant="contained" onClick={handleSetExpertOpinions}>
          Set Data #2
        </Button>
        <Button variant="contained" onClick={handleSetExpertOpinions}>
          Set Data #3
        </Button>
      </Stack>
      <TextField
        id="outlined-basic"
        label="Number of alernatives"
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
    </Box>
  );

  return (
    <div>
      <Button
        variant="contained"
        onClick={toggleDrawer("right", true)}
        sx={{
          marginTop: "20px",
        }}
      >
        Open Configuration Panel
      </Button>

      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </div>
  );
}
