import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function ExpertOpinionsChip({
  label,
  selectedValues,
  setExpertOpinions,
  expertOpinions,
  linguisticTerms,
  operators,
  linguisticTermsNormalized,
  selectedLinguisticTerms,
}) {
  const handleChange = (event) => {
    const newValue = event.target.value;
    handleUpdateExpertOpinions(label, newValue);
  };

  const handleUpdateExpertOpinions = (label, newValue) => {
    const updatedData = expertOpinions.map((item) => {
      if (item.label === label) {
        const selectedValues = newValue.filter(
          (value) =>
            value.type === "linguistic term" || value.type === "operator"
        );

        return {
          ...item,
          selectedValues: selectedValues,
          selectedLinguisticTerms: selectedValues.filter(
            (value) => value.type === "linguistic term"
          ),
          selectedOperators: selectedValues.filter(
            (value) => value.type === "operator"
          ),
        };
      }
      return item;
    });
    setExpertOpinions(updatedData);
  };

  const menuItems = [];

  if (
    selectedValues[0]?.type === "linguistic term" &&
    selectedValues[1]?.type === "operator" &&
    selectedValues[2]?.type === "linguistic term"
  ) {
    menuItems.push(
      <MenuItem
        key={selectedValues[2].shortLinguisticTerm}
        value={selectedValues[2]}
      >
        {selectedValues[2].shortLinguisticTerm}
      </MenuItem>
    );
  } else if (
    selectedValues[0]?.type === "linguistic term" &&
    selectedValues[1]?.type === "operator"
  ) {
    menuItems.push(
      <MenuItem key={selectedValues[1].operator} value={selectedValues[1]}>
        {selectedValues[1].operator}
      </MenuItem>
    );

    menuItems.push(
      ...linguisticTermsNormalized
        .filter((value) => value !== selectedValues[0])
        .map((value) => (
          <MenuItem key={value.shortLinguisticTerm} value={value}>
            {value.shortLinguisticTerm}
          </MenuItem>
        ))
    );
  } else if (selectedValues[0]?.type === "linguistic term") {
    menuItems.push(
      ...operators
        .filter((value) => value.symbol === "&")
        .map((value) => (
          <MenuItem key={value.operator} value={value}>
            {value.operator}
          </MenuItem>
        ))
    );
    menuItems.push(
      <MenuItem
        key={selectedValues[0].shortLinguisticTerm}
        value={selectedValues[0]}
      >
        {selectedValues[0].shortLinguisticTerm}
      </MenuItem>
    );
  } else if (selectedValues.length === 0) {
    menuItems.push(
      operators.map((value) =>
        value.symbol === ">" || value.symbol === "<" ? (
          <MenuItem key={value.operator} value={value}>
            {value.operator}
          </MenuItem>
        ) : null
      )
    );

    menuItems.push(
      linguisticTermsNormalized.map((value) => (
        <MenuItem key={value.shortLinguisticTerm} value={value}>
          {value.shortLinguisticTerm}
        </MenuItem>
      ))
    );
  }

  if (
    selectedValues[0]?.type === "operator" &&
    selectedValues[1]?.type === "linguistic term"
  ) {
    menuItems.push(
      <MenuItem
        key={selectedValues[1].shortLinguisticTerm}
        value={selectedValues[1]}
      >
        {selectedValues[1].shortLinguisticTerm}
      </MenuItem>
    );
  } else if (selectedValues[0]?.type === "operator") {
    menuItems.push(
      <MenuItem key={selectedValues[0].operator} value={selectedValues[0]}>
        {selectedValues[0].operator}
      </MenuItem>
    );
    menuItems.push(
      linguisticTermsNormalized.map((value) => (
        <MenuItem key={value.shortLinguisticTerm} value={value}>
          {value.shortLinguisticTerm}
        </MenuItem>
      ))
    );
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={`multiple-chip-label-${label}`}>{label}</InputLabel>
        <Select
          labelId={`multiple-chip-label-${label}`}
          id={`multiple-chip-${label}`}
          multiple
          value={selectedValues}
          onChange={handleChange}
          input={
            <OutlinedInput id={`select-multiple-chip-${label}`} label={label} />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value.shortLinguisticTerm || value.operator}
                  label={value.shortLinguisticTerm || value.operator}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {menuItems}

          {/* {selectedValues[0]?.type === "linguistic terms" &&
            console.log(selectedLinguisticTerms)} */}

          {/* {selectedValues.length >= 0 &&
            linguisticTermsNormalized.map((value) => (
              <MenuItem key={value.shortLinguisticTerm} value={value}>
                {value.shortLinguisticTerm}
              </MenuItem>
            ))} */}

          {/* {selectedValues.length === 0 &&
            operators.map((value) =>
              value.symbol === ">" || value.symbol === "<" ? (
                <MenuItem key={value.operator} value={value}>
                  {value.operator}
                </MenuItem>
              ) : null
            )} */}

          {/* {selectedValues.length >= 0 &&
            linguisticTermsNormalized.map((value) => (
              <MenuItem key={value.shortLinguisticTerm} value={value}>
                {value.shortLinguisticTerm}
              </MenuItem>
            ))} */}

          {/* {selectedValues[0]?.type === "linguistic term" &&
            operators.map((value) =>
              value.symbol === "&" ? (
                <MenuItem key={value.operator} value={value}>
                  {value.operator}
                </MenuItem>
              ) : null
            )}

          {selectedValues.length === 0 &&
            operators.map((value) =>
              value.symbol === ">" || value.symbol === "<" ? (
                <MenuItem key={value.operator} value={value}>
                  {value.operator}
                </MenuItem>
              ) : null
            )} */}

          {/* {selectedValues[0]?.type === "operator" && (
            <MenuItem
              key={selectedValues[0].operator}
              value={selectedValues[0]}
            >
              {selectedValues[0].operator}
            </MenuItem>
          )} */}

          {/* <MenuItem
            key={"linguistic terms"}
            disabled
            sx={{ backgroundColor: "#1f1f1f" }}
          >
            {"available linguistic terms:"}
          </MenuItem> */}

          {/* {selectedValues[1]?.type === "linguistic terms" && (
            <MenuItem
              key={selectedValues[1].shortLinguisticTerm}
              value={selectedValues[1]}
            >
              {selectedValues[1].shortLinguisticTerm}
            </MenuItem>
          )}

          {selectedValues[1]?.type === "linguistic terms" && (
            <MenuItem
              key={selectedValues[1].shortLinguisticTerm}
              value={selectedValues[1]}
            >
              {selectedValues[1].shortLinguisticTerm}
            </MenuItem>
          )}
          {selectedValues.length >= 0 &&
            linguisticTermsNormalized.map((value) => (
              <MenuItem key={value.shortLinguisticTerm} value={value}>
                {value.shortLinguisticTerm}
              </MenuItem>
            ))} */}

          {/* {linguisticTermsNormalized.map((value) => (
            <MenuItem key={value.shortLinguisticTerm} value={value}>
              {value.shortLinguisticTerm}
            </MenuItem>
          ))} */}
        </Select>
      </FormControl>
    </div>
  );
}
