import React, { useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function TrapezoidalChart() {
  const initialData = {
    series: [
      { curve: "linear", data: [0, 5, 2, 6, 3, 9.3] },
      { curve: "linear", data: [6, 3, 7, 9.5, 4, 2] },
    ],
  };

  const [chartData, setChartData] = useState(initialData);

  const handleDataPointClick = (seriesIndex, dataIndex) => {
    // Clone the existing data to avoid mutating state directly
    const updatedData = { ...chartData };

    // Toggle the data point value (for simplicity, this just toggles between 0 and 10)
    updatedData.series[seriesIndex].data[dataIndex] =
      updatedData.series[seriesIndex].data[dataIndex] === 0 ? 10 : 0;

    // Update the state with the new data
    setChartData(updatedData);
  };

  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={chartData.series}
      width={500}
      height={300}
      onClick={(seriesIndex, dataIndex) =>
        handleDataPointClick(seriesIndex, dataIndex)
      }
    />
  );
}
