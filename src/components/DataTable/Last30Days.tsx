import { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartDataPoint } from "../../utilities/data";
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

const Last30Days = ({
  chartData,
  last30Days,
  width,
  height,
}: {
  chartData: ChartDataPoint[];
  last30Days: number;
  width: number;
  height: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!canvasRef.current) return;

    const chartInstance = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: chartData.map((_, index) => index + 1),
        datasets: [
          {
            data: chartData.map((data) => data.price),
            borderColor: last30Days > 0 ? "#008585" : "#c7522a",
            tension: 0.3,
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        hover: {
          mode: undefined,
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [chartData]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="max-w-30 max-h-10"
    />
  );
};

export default Last30Days;
