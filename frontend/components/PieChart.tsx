import React from "react";
import { Pie } from "react-chartjs-2";
import { IChartData } from "@/types";
import type { ChartData, ChartOptions, Chart } from "chart.js";

var effectColors = {
  highlight: "rgba(255, 255, 255, 0.75)",
  shadow: "rgba(0, 0, 0, 0.5)",
  glow: "rgb(255, 255, 0)",
};

const shadowPlugin = {
  id: "shadowPlugin",
  beforeDraw: (chart: Chart) => {
    const { ctx } = chart;
    ctx.shadowColor = effectColors.shadow;
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
  },
};

function PieChart({
  data: statisticsData,
  text,
}: {
  data: IChartData;
  text: string;
}) {
  const { data, labels } = statisticsData;
  const dataset = {
    labels,
    datasets: [
      {
        label: "occurs times",
        data,
        borderWidth: 0,
      },
    ],
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text,
        color: "white",
        font: {
          size: 20,
        },
      },
      animation: {
        animateScale: true,
        animateRotate: true,
      },
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    layout: {
      padding: {
        bottom: 10,
      },
    },
  };
  return (
    <div
      className="chart-container"
      style={{ position: "relative", width: "440px", height: "440px" }}
    >
      <Pie data={dataset} options={options} plugins={[shadowPlugin]} />
    </div>
  );
}
export default PieChart;
