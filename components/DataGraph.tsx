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
  // sets max and min values of y axis scale to the max and min values in dataset.
  const dataArrived = days && days.length > 0;
  const minRaw = dataArrived
    ? Math.min(...days.map((d) => d.sunriseMinutes))
    : 0;
  const maxRaw = dataArrived
    ? Math.max(...days.map((d) => d.sunsetMinutes))
    : 1440;

  const min = Math.floor(minRaw / 60) * 60;
  const max = Math.ceil(maxRaw / 60) * 60;
  const options: ChartOptions<"bar"> = {
    responsive: true,
    scales: {
      y: {
        min: min,
        max: max,
        position: "left",
        ticks: {
          color: "#F8E0B4",
          stepSize: 60,
          callback: (value) => formatTime(value),
        },
        title: {
          color: "#F8E0B4",
          display: true,
          text: "daylight time",
        },
      },
      y1: {
        min: min,
        max: max,
        position: "right" as const,
        ticks: {
          color: "#F8E0B4",
          stepSize: 60,
          callback: (value) => {
            return formatTime(value);
          },
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        ticks: {
          color: "#F8E0B4",
        },
        title: {
          color: "#F8E0B4",
          display: true,
          text: "time (days/weeks/months)",
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
        color: "#F8E0B4",
      },
    },
  };

  const formatTime = (value: string | number) => {
    const minutes = Math.round(Number(value));
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  };

  const labels = days.map((day) => day.date.substring(5));

  const data = {
    labels,

    datasets: [
      {
        data: days.map((day) => [day.sunriseMinutes, day.sunsetMinutes]),
        backgroundColor: "#dc6c21",
        backgroundHoverColor: "#dc6c21",
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  };

  return <Bar width={50} height={20} data={data} options={options} />;
}
