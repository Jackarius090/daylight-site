import { DataTypeDayArray } from "../components/ShowData";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  PointElement,
  LineElement,
  ChartData,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
);

export default function DataGraph({
  days,
  computedDateRange,
  showMoonData,
}: {
  days: DataTypeDayArray;
  computedDateRange: number[];
  showMoonData: boolean;
}) {
  // format data to correct date range.
  const filteredDays = days.slice(0, computedDateRange[0]);

  // sets max and min values of y axis scale to the max and min values in dataset.
  const dataArrived = days && days.length > 0;
  const minRaw = dataArrived
    ? Math.min(...filteredDays.map((d) => d.sunriseMinutes))
    : 0;
  const maxRaw = dataArrived
    ? Math.max(...filteredDays.map((d) => d.sunsetMinutes))
    : 1440;

  const min = (() => {
    if (showMoonData) return 0;
    return Math.floor(minRaw / 60) * 60;
  })();
  const max = (() => {
    if (showMoonData) return 1440;
    return Math.ceil(maxRaw / 60) * 60;
  })();

  const options: ChartOptions<"bar" | "line"> = {
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
          text: "time of sunrise and sunset",
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
          text: "date (YYYY-MM-DD format)",
          align: "center",
        },
        display: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            // formats label from number of minutes to clocktime for the hover tooltip on databars
            if (context.dataset.label === "moon data") {
              const label = formatTime(context.formattedValue);
              return `Moonrise time: ${label}`;
            }
            const labelArray = JSON.parse(context.formattedValue);
            const sunriseText = formatTime(labelArray[0]);
            const sunsetText = formatTime(labelArray[1]);
            return `Sunrise and Sunset: ${sunriseText} to ${sunsetText}`;
          },
        },
        enabled: true,
        displayColors: false,
      },
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
    const cleaned = typeof value === "string" ? value.replace(/,/g, "") : value;
    const num = Number(cleaned);
    const minutes = Math.round(num);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const label = `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
    return label;
  };

  const labels = filteredDays.map((day) => day.date);

  const data: ChartData<"bar" | "line", any, string> = {
    labels,

    datasets: [
      {
        label: "daylength data",
        data: filteredDays.map((day) => ({
          x: day.date,
          y: [day.sunriseMinutes, day.sunsetMinutes],
        })),
        backgroundColor: "#dc6c21",
        borderRadius: 5,
        borderSkipped: false,
        barPercentage: 0.95,
        order: 1,
      },
      {
        label: "moon data",
        hidden: !showMoonData,
        tension: 0.4,
        data: filteredDays.map((day) => ({
          x: day.date,
          y: day.moonRiseTime,
        })),
        borderColor: "#000000",
        backgroundColor: "#000000",
        pointBackgroundColor: "#000000",
        type: "line",
        order: 0,
      },
    ],
  };

  return (
    <Chart type="bar" width={50} height={20} data={data} options={options} />
  );
}
