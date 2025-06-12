import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import type { Cryptocurrency } from "../../../utilities/data";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const getZoneColor = (value: number) => {
  if (value <= 25) return "#c7522a";
  if (value <= 45) return "#e5c185";
  if (value <= 55) return "#fbf2c4";
  return "#008585";
};

const getLabel = (value: number) => {
  if (value <= 25) return "Extreme Fear";
  if (value <= 45) return "Fear";
  if (value <= 55) return "Neutral";
  if (value <= 75) return "Greed";
  return "Extreme Greed";
};

const FearAndGreed = () => {
  const [value, setValue] = useState(0);
  const { data } = useSelector((state: RootState) => state.data);
  const { currency, theme } = useSelector(
    (state: RootState) => state.userSettings
  );
  const color = getZoneColor(value);
  const label = getLabel(value);
  const chartData = {
    labels: [label, ""],
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: [color, theme === "dark" ? "#778da9" : "#f6f4ea"],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
        cutout: "70%",
      },
    ],
  };
  const chartOptions = {
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
  };
  useEffect(() => {
    let positiveCoins: number = 0;
    if (data.length > 0) {
      data.map((item: Cryptocurrency) => {
        item.quote[currency].percent_change_24h > 0 ? positiveCoins++ : "";
      });
    }
    setValue(positiveCoins);
  }, [data, currency]);

  return (
    <>
      {value !== 0 && (
        <div className="w-full mx-auto text-center">
          <h2 className="font-semibold text-sm md:text-base">
            Fear & Greed Index
          </h2>
          <div className="md:w-[120px] md:h-[120px] w-[70px] h-[70px] mx-auto">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
          <p className="text-xs md:text-sm font-bold" style={{ color }}>
            {value} - {label}
          </p>
        </div>
      )}
    </>
  );
};
export default FearAndGreed;
