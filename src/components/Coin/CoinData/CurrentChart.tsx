import { useEffect, useRef, useState } from "react";
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
  type ChartTypeRegistry,
} from "chart.js";
import type { ChartData } from "../../../utilities/data";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
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
const CurrentChart = ({
  data,
  currency,
  name,
}: {
  data: ChartData;
  currency: string;
  name: string;
}) => {
  const { theme } = useSelector((state: RootState) => state.userSettings);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [chartType, setChartType] = useState<keyof ChartTypeRegistry>("line");
  const [isPositive, setIsPositive] = useState<boolean>(true);
  const [period, setPeriod] = useState<"daily" | "monthly" | "weekly">("daily");
  const [widthSize, setWidthSize] = useState(0);
  useEffect(() => {
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      setWidthSize(width);
    });
  }, []);
  useEffect(() => {
    const firstElement = data[currency][period][0].price;
    const lastElement =
      data[currency][period][data[currency][period].length - 1].price;
    if (firstElement > lastElement) {
      setIsPositive(false);
    } else {
      setIsPositive(true);
    }
  });
  useEffect(() => {
    if (!canvasRef.current) return;

    const chartInstance = new Chart(canvasRef.current, {
      type: chartType,
      data: {
        labels: data[currency][period].map((_, index) => index + 1),
        datasets: [
          {
            label: name,
            data: data[currency][period].map((data) => data.price),
            borderColor: isPositive
              ? "rgba(0, 133, 133, 1)"
              : "rgba(234, 57, 67, 1)",
            backgroundColor: isPositive
              ? "rgba(0, 133, 133, 0.3)"
              : "rgba(234, 57, 67, 0.3)",
            tension: 0.1,
            pointRadius: 1,
            pointHoverRadius: 0,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2, 
        onResize: (chart: Chart, size) => {
          if (size.width < 400) {
            chart.options.aspectRatio = 1.5;
          }
        },
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            align: "end",
            onClick: () => {},
            labels: {
              color: isPositive
                ? "rgba(0, 133, 133, 1)"
                : "rgba(234, 57, 67, 1)",
              font: {
                size: 12,
                weight: "bold",
                family: "Arial",
              },
              boxWidth: 12,
              boxHeight: 12,
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        hover: {
          mode: undefined,
        },
        scales: {
          x: {
            display: true,
            grid: {
              color:
                theme === "dark"
                  ? "rgba(224, 224, 224, 0.1)"
                  : "rgba(224, 224, 224, 1)",
            },
          },
          y: {
            display: true,
            grid: {
              color:
                theme === "dark"
                  ? "rgba(224, 224, 224, 0.1)"
                  : "rgba(224, 224, 224, 1)",
            },
          },
        },
      },
    });
    return () => {
      chartInstance.destroy();
    };
  }, [data, isPositive, theme, period, chartType, widthSize]);
  return (
    <>
      <div className="flex flex-col w-full h-full gap-4">
        <div className="w-full py-2 flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2 text-xs font-bold">
            <div
              className={`cursor-pointer hover:bg-secondary-light hover:dark:bg-tertiary-dark transition-all duration-300 ease-in px-2 py-1 rounded-lg ${
                chartType === "line"
                  ? "bg-secondary-light dark:bg-tertiary-dark"
                  : "bg-secondary-light/40 dark:bg-tertiary-dark/40"
              }`}
              onClick={() => setChartType("line")}
            >
              Line
            </div>
            <div
              className={`cursor-pointer hover:bg-secondary-light hover:dark:bg-tertiary-dark transition-all duration-300 ease-in px-2 py-1 rounded-lg ${
                chartType === "bar"
                  ? "bg-secondary-light dark:bg-tertiary-dark"
                  : "bg-secondary-light/40 dark:bg-tertiary-dark/40"
              }`}
              onClick={() => setChartType("bar")}
            >
              Bar
            </div>
            <div
              className={`cursor-pointer hover:bg-secondary-light hover:dark:bg-tertiary-dark transition-all duration-300 ease-in px-2 py-1 rounded-lg ${
                chartType === "bubble"
                  ? "bg-secondary-light dark:bg-tertiary-dark"
                  : "bg-secondary-light/40 dark:bg-tertiary-dark/40"
              }`}
              onClick={() => setChartType("bubble")}
            >
              Bubble
            </div>
          </div>
          <div className="flex flex-row gap-row sm:gap-2 text-xs font-bold">
            <div
              className={`cursor-pointer hover:bg-secondary-light hover:dark:bg-tertiary-dark transition-all duration-300 ease-in px-2 py-1 rounded-l-lg sm:rounded-lg ${
                period === "daily"
                  ? "bg-secondary-light dark:bg-tertiary-dark"
                  : "bg-secondary-light/40 dark:bg-tertiary-dark/40"
              }`}
              onClick={() => setPeriod("daily")}
            >
              <div className="block sm:hidden">D</div>
              <div className="hidden sm:block">Daily</div>
            </div>
            <div
              className={`cursor-pointer hover:bg-secondary-light hover:dark:bg-tertiary-dark transition-all duration-300 ease-in px-2 py-1 sm:rounded-lg ${
                period === "weekly"
                  ? "bg-secondary-light dark:bg-tertiary-dark"
                  : "bg-secondary-light/40 dark:bg-tertiary-dark/40"
              }`}
              onClick={() => setPeriod("weekly")}
            >
              <div className="block sm:hidden">W</div>
              <div className="hidden sm:block">Weekly</div>
            </div>
            <div
              className={`cursor-pointer hover:bg-secondary-light hover:dark:bg-tertiary-dark transition-all duration-300 ease-in px-2 py-1 rounded-r-lg sm:rounded-lg ${
                period === "monthly"
                  ? "bg-secondary-light dark:bg-tertiary-dark"
                  : "bg-secondary-light/40 dark:bg-tertiary-dark/40"
              }`}
              onClick={() => setPeriod("monthly")}
            >
              <div className="block sm:hidden">M</div>
              <div className="hidden sm:block">Monthly</div>
            </div>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          className="w-full h-full flex flex-col gap-4 aspect-square"
        />
      </div>
    </>
  );
};
export default CurrentChart;
