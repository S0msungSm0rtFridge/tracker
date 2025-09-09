import React from "react";
import { Line } from "react-chartjs-2";
import { Outlet } from "react-router-dom"; // Import Outlet
import '../../styles/ProgressChart.css';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

function ProgressChart() {
  const labels = ["30/12/2023", "31/12/2023", "01/01/2024"];

  const data = {
    labels,
    datasets: [
      {
        label: "Bench Press",
        data: [80, 95, 105],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        fill: true,
        tension: 0.3,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: "Deadlift",
        data: [100, 120, 135],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.3)",
        fill: true,
        tension: 0.3,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
      },
      {
        label: "Squats",
        data: [90, 105, 120],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.3)",
        fill: true,
        tension: 0.3,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#fff", // white legend text
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: { color: "#aaa" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        ticks: {
          color: "#aaa",
          callback: (value) => value + "kg",
        },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  return (
    <div className="progress-chart-container">
      <Line data={data} options={options} />
      <Outlet /> {/* This will render any nested route content, like AddExercise or EditExercise */}
    </div>
  );
}

export { ProgressChart }
