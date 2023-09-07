import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function Configure() {
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
      <Button onClick={toggleDrawer("right", true)} variant="contained">
        Set
      </Button>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer("right", true)}>Open</Button>
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
