import { DataTypeMonth } from "./ShowData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
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

export default function DataGraph2({ days }: { days: DataTypeMonth }) {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: "minutes of daylight",
          align: "center",
        },
        display: true,
      },
      x: {
        title: {
          display: true,
          text: "time (days/weeks)",
          align: "center",
        },
        display: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Daylength over time",
      },
    },
  };

  const labels = [...Array(days.length).keys()].map((i) => i + 1);

  const data = {
    labels,
    datasets: [
      {
        data: days.map((day) => day.day_length),
        backgroundColor: "rgba(39, 138, 245, 0.8)",
      },
    ],
  };

  return <Bar width={50} height={20} data={data} options={options} />;
}
