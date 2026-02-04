import { DataTypeMonth } from "../page";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function DataGraph({ days }: { days: DataTypeMonth }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = [...Array(days.length).keys()].map((i) => i + 1);

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: days.map((day) => day.day_length),
        backgroundColor: "rgba(39, 138, 245, 0.8)",
      },
    ],
  };

  return <Bar width={50} height={20} data={data} options={options} />;
}
