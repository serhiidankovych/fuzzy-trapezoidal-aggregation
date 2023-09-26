const linguisticTermsData = [
  {
    linguisticTerm: "low",
    shortLinguisticTerm: "L",
    confines: [0, 0, 25],
    normalizedConfines: [0, 0, 0.25],
    type: "linguistic term",
  },
  {
    linguisticTerm: "low middle",
    shortLinguisticTerm: "LM",
    confines: [0, 25, 50],
    normalizedConfines: [0, 0.25, 0.5],
    type: "linguistic term",
  },
  {
    linguisticTerm: "middle",
    shortLinguisticTerm: "M",
    confines: [25, 50, 75],
    normalizedConfines: [0.25, 0.5, 0.75],
    type: "linguistic term",
  },
  {
    linguisticTerm: "high middle",
    shortLinguisticTerm: "HM",
    confines: [50, 75, 100],
    normalizedConfines: [0.5, 0.75, 1],
    type: "linguistic term",
  },
  {
    linguisticTerm: "high",
    shortLinguisticTerm: "H",
    confines: [75, 100, 100],
    normalizedConfines: [0.75, 1, 1],
    type: "linguistic term",
  },
];
export default linguisticTermsData;
