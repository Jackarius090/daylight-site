import { DataTypeMonth } from "../components/ShowData";

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

export default function DataGraph({ days }: { days: DataTypeMonth }) {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 1440, // 24h in minutes
        ticks: {
          stepSize: 60, // 1 hour spacing
          callback: function (value) {
            const minutes = Number(value);
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
          },
        },
        title: {
          display: true,
          text: "daylight time",
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
        data: days.map((day) => [day.sunriseMinutes, day.sunsetMinutes]),
        backgroundColor: "rgba(39, 138, 245, 0.8)",
      },
    ],
  };

  return <Bar width={50} height={20} data={data} options={options} />;
}
