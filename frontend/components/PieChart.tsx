import React from "react";
import { Pie } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

var effectColors = {
  highlight: "rgba(255, 255, 255, 0.75)",
  shadow: "rgba(0, 0, 0, 0.5)",
  glow: "rgb(255, 255, 0)",
};

const ShadowPlugin = {
  beforeDraw: (chart, args, options) => {
    const { ctx } = chart;
    ctx.shadowColor = effectColors.shadow;
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.bevelWidth = 2;
    ctx.bevelHighlightColor = effectColors.highlight;
    ctx.bevelShadowColor = effectColors.shadow;
    ctx.hoverInnerGlowWidth = 20;
    ctx.hoverInnerGlowColor = effectColors.glow;
    ctx.hoverOuterGlowWidth = 20;
    ctx.hoverOuterGlowColor = effectColors.glow;
  },
};

function PieChart({ data, text }: { data: ChartData; text: "string" }) {
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
  };
  return (
    <div
      className="chart-container"
      style={{ position: "relative", width: "440px", height: "440px" }}
    >
      <Pie data={data} options={options} plugins={[ShadowPlugin]} />
    </div>
  );
}
export default PieChart;
