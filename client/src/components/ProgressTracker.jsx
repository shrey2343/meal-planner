// src/components/ProgressTracker.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function ProgressTracker({ data }) {
  const labels = data.map(entry => entry.date); // e.g. '2025-09-01'
  const weights = data.map(entry => entry.weight);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Weight (kg)',
        data: weights,
        fill: false,
        borderColor: '#4caf50',
        tension: 0.2
      }
    ]
  };

  return (
    <div className="card progress-tracker">
      <h2>Your Weight Over Time</h2>
      <Line data={chartData} />
    </div>
  );
}
