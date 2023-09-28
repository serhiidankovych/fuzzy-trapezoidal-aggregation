import React from "react";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

export default function DataTemplateConfiguration({
  handleSetTemplateData1,
  handleSetTemplateData2,
}) {
  return (
    <div>
      <Typography>Data templates:</Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
        sx={{
          backgroundColor: "rgb(78 78 78)",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <Button variant="contained" onClick={handleSetTemplateData1}>
          Set Data #1
        </Button>
        <Button variant="contained" onClick={handleSetTemplateData2}>
          Set Data #2
        </Button>
        <Button variant="contained" onClick={handleSetTemplateData1}>
          Set Data #3
        </Button>
      </Stack>
    </div>
  );
}
