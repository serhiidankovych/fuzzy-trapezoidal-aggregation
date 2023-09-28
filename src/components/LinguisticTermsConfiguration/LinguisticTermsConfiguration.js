import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LinguisticTermsConfiguration({
  names,
  shortNames,
  linguisticTerms,
  handleLinguisticTermsChange,
  handleConfigurationMenuStepBack,
  handleConfigurationMenuStepNext,
  generateDataFromConfigurationMenu,
  generateExpertOpinions,
  isDataTemplateSet,
  setLinguisticTerms,
  setLinguisticTermsNormalized,
}) {
  const [linguisticTermsInTriangleForm, setLinguisticTermsInTriangleForm] =
    useState([]);

  const [
    linguisticTermsInTriangleFormNormalized,
    setLinguisticTermsInTriangleFormNormalized,
  ] = useState([]);
  // fix uploading
  useEffect(() => {
    transformToTriangleForm();
  }, [linguisticTerms]);
  const normalizeValue = (value, minTriangularNumber, maxTriangularNumber) => {
    return (
      (value - minTriangularNumber) /
      (maxTriangularNumber - minTriangularNumber)
    );
  };
  //refactor code
  const transformToTriangleForm = () => {
    let minTriangularNumber = Infinity; // Initialize with a high value
    let maxTriangularNumber = -Infinity; // Initialize with a low value

    const triangularNumbers = linguisticTerms?.map((linguisticTerm) => {
      const { confines } = linguisticTerm;
      return {
        ...linguisticTerm,
        triangularChart: [
          { x: confines[0], y: 0 },
          { x: confines[1], y: 1 },
          { x: confines[2], y: 0 },
        ],
      };
    });

    triangularNumbers?.forEach((triangularNumber) => {
      const { triangularChart } = triangularNumber;
      triangularChart.forEach((point) => {
        minTriangularNumber = Math.min(minTriangularNumber, point.x);
        maxTriangularNumber = Math.max(maxTriangularNumber, point.x);
      });
    });

    const triangularNumbersNormalized = triangularNumbers?.map(
      (linguisticTerm) => {
        const { confines } = linguisticTerm;
        return {
          ...linguisticTerm,
          normalizedConfines: [
            normalizeValue(
              confines[0],
              minTriangularNumber,
              maxTriangularNumber
            ),
            normalizeValue(
              confines[1],
              minTriangularNumber,
              maxTriangularNumber
            ),
            normalizeValue(
              confines[2],
              minTriangularNumber,
              maxTriangularNumber
            ),
          ],
          normalizedTriangularChart: [
            {
              x: normalizeValue(
                confines[0],
                minTriangularNumber,
                maxTriangularNumber
              ),
              y: 0,
            },
            {
              x: normalizeValue(
                confines[1],
                minTriangularNumber,
                maxTriangularNumber
              ),
              y: 1,
            },
            {
              x: normalizeValue(
                confines[2],
                minTriangularNumber,
                maxTriangularNumber
              ),
              y: 0,
            },
          ],
        };
      }
    );

    // console.log(triangularNumbers);

    // console.log(triangularNumbersNormalized);
    setLinguisticTermsInTriangleForm(triangularNumbers);
    setLinguisticTermsInTriangleFormNormalized(triangularNumbersNormalized);
    setLinguisticTermsNormalized(triangularNumbersNormalized);
  };

  function generateContrastColor(index, total) {
    // Calculate hue to evenly distribute colors in the color spectrum
    const hue = (360 / total) * index;

    // Convert HSL to RGB color
    const h = hue / 360;
    const r = Math.round(255 * hue2rgb(h + 1 / 3));
    const g = Math.round(255 * hue2rgb(h));
    const b = Math.round(255 * hue2rgb(h - 1 / 3));

    return `rgb(${r}, ${g}, ${b})`;
  }

  function hue2rgb(p) {
    if (p < 0) p += 1;
    if (p > 1) p -= 1;
    if (p < 1 / 6) return 6 * p;
    if (p < 0.5) return 1;
    if (p < 2 / 3) return (2 / 3 - p) * 6;
    return 0;
  }

  const numberOfSets = linguisticTermsInTriangleForm?.length;
  const contrastColors = Array.from({ length: numberOfSets }, (_, index) =>
    generateContrastColor(index, numberOfSets)
  );

  const renderInputs = (nameArray, nameType, shortName) => {
    return nameArray?.map((name, index) => (
      <TextField
        id={`${nameType}${index + 1}`}
        label={`${name.linguisticTerm}`}
        key={`${nameType}-${index}`}
        variant="outlined"
        type="text"
        value={name.confines}
        onChange={(e) =>
          handleLinguisticTermsChange(nameType, index, e.target.value)
        }
      />
    ));
  };

  return (
    <>
      <Box
        component="span"
        sx={{
          p: 2,
          border: "1px dashed grey",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "3px",
        }}
      >
        {renderInputs(linguisticTerms, "linguisticTerms", "lt")}
        <Box
          component="span"
          sx={{
            p: 2,
            border: "1px dashed grey",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "3px",
          }}
        >
          <ResponsiveContainer width="80%" height={150}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" />
              <YAxis type="number" dataKey="y" />
              <ZAxis type="number" range={[100]} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />

              {linguisticTermsInTriangleForm.map((linguisticTerm, index) => (
                <Scatter
                  key={index}
                  fill={contrastColors[index]}
                  data={linguisticTerm.triangularChart}
                  line
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="80%" height={150}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" />
              <YAxis type="number" dataKey="y" />
              <ZAxis type="number" range={[100]} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />

              {linguisticTermsInTriangleFormNormalized.map(
                (linguisticTerm, index) => (
                  <Scatter
                    key={index}
                    fill={contrastColors[index]}
                    data={linguisticTerm.normalizedTriangularChart}
                    line
                  />
                )
              )}
            </ScatterChart>
          </ResponsiveContainer>
        </Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Button
            variant="contained"
            sx={{
              marginTop: "20px",
            }}
            onClick={handleConfigurationMenuStepBack}
          >
            Back
          </Button>

          <Button
            variant="contained"
            sx={{
              marginTop: "20px",
            }}
            onClick={
              isDataTemplateSet
                ? handleConfigurationMenuStepNext
                : generateExpertOpinions
            }
          >
            Finish
          </Button>
        </Stack>
      </Box>
    </>
  );
}
