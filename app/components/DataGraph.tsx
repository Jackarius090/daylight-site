import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js";

export default function DataGraph() {
  return <Bar options={options} data={data} />;
}
