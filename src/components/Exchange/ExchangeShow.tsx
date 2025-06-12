import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useParams } from "react-router";
import { setSingleExchange } from "../../store/Slices/exchangesData";
import { FaLink, FaXTwitter } from "react-icons/fa6";
import {
  formatCurrency,
  formatNumberWithCommas,
  type Cryptocurrency,
  type ExchangeShowProps,
} from "../../utilities/data";
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
import DataGenerate from "../DataTable/DataGenerate";
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
const ExchangeShow = () => {
  const { allExchangesExtended, singleExchange } = useSelector(
    (state: RootState) => state.exchangeData
  );
  const { data } = useSelector((state: RootState) => state.data);
  const { exchangeId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { currency } = useSelector((state: RootState) => state.userSettings);
  const [top3, setTop3] = useState<Cryptocurrency[]>([]);
  const [allocationData, setAllocationData] = useState<ExchangeShowProps[]>([]);
  const [finalData, setFinalData] = useState<Cryptocurrency[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [widthSize, setWidthSize] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      setWidthSize(width);
    });
  }, []);
  useEffect(() => {
    if (data.length > 0) {
      const exchange = allExchangesExtended.find(
        (exchangeExtended) => exchangeExtended.id === exchangeId
      );
      exchange ? dispatch(setSingleExchange(exchange)) : "";
    }
  }, [allExchangesExtended, data, exchangeId]);
  useEffect(() => {
    if (singleExchange && data.length > 0) {
      const filteredData = data.filter((item) => {
        return item.exchanges.find(
          (exchange) => exchange === singleExchange.name
        );
      });
      setFinalData(filteredData);
      filteredData.sort((a, b) => {
        return b.quote[currency].market_cap - a.quote[currency].market_cap;
      });
      setTop3(filteredData.slice(0, 3));
    }
  }, [singleExchange, data]);
  useEffect(() => {
    if (top3.length > 0 && singleExchange) {
      const allocation = top3.map((item) => {
        return {
          symbol: item.symbol,
          percentage: (
            (item.quote[currency].market_cap * 100) /
            singleExchange.marketCapTotal
          ).toFixed(2),
        };
      });
      let selectedPercentages: number = 0;
      allocation.map((item) => {
        selectedPercentages += Number(item.percentage);
      });
      allocation.push({
        symbol: "Others",
        percentage: (100 - selectedPercentages).toString(),
      });
      setAllocationData(allocation);
    }
  }, [top3, singleExchange]);
  useEffect(() => {
    if (allocationData) {
      if (!canvasRef.current) return;
      const chartInstance = new Chart(canvasRef.current, {
        type: "doughnut",
        data: {
          labels: allocationData.map(
            (singleAllocation) => singleAllocation.symbol
          ),
          datasets: [
            {
              data: allocationData.map(
                (singleAllocation) => singleAllocation.percentage
              ),
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              onClick: () => {},
              labels: {
                font: {
                  size: 10,
                  weight: "bold",
                  family: "Arial",
                },
                boxWidth: 10,
                boxHeight: 10,
              },
            },
            tooltip: {
              enabled: true,
            },
          },
          hover: {
            mode: undefined,
          },
        },
      });
      return () => {
        chartInstance.destroy();
      };
    }
  }, [allocationData, widthSize]);
  return (
    <>
      <div className="flex w-full min-h-dvh items-start justify-center bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark py-20">
        {singleExchange && (
          <>
            <div className="relative flex flex-col gap-2 mx-auto w-full max-w-[1400px]">
              <div className="relative flex flex-col lg:flex-row items-start gap-16 lg:gap-2">
                <div className="lg:sticky lg:top-2 lg:left-0 lg:w-4/12 w-full flex flex-col sm:flex-row lg:flex-col gap-12 justify-center lg:justify-start px-10">
                  <div className="flex flex-col gap-4 w-full sm:w-1/3 lg:w-auto items-start">
                    <div className="flex flex-row items-center gap-4 font-semibold text-lg">
                      <img
                        src={singleExchange.image}
                        className="w-[35px] aspect-square drop-shadow-md drop-shadow-tertiary-light/20 dark:drop-shadow-tertiary-dark/20"
                        alt={singleExchange.image + " logo"}
                        loading="lazy"
                      />
                      <div className="flex flex-row gap-1 items-center text-2xl">
                        {singleExchange.name}
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <FaLink />
                      <a href={singleExchange.website}>
                        {singleExchange.name}.com
                      </a>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <FaXTwitter />
                      <a href={singleExchange.twitter}>
                        @{singleExchange.name}
                      </a>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <div className="font-semibold">Fees:</div>
                      {singleExchange.fees}%
                    </div>
                    <a
                      href={singleExchange.register_link}
                      className="py-2 px-4 bg-tertiary-light/60 dark:bg-tertiary-dark/60 hover:bg-tertiary-light hover:dark:bg-tertiary-dark transition-all duration-300 ease-in rounded cursor-pointer font-semibold"
                    >
                      Register Now
                    </a>
                  </div>
                  {allocationData.length > 0 && (
                    <div className="flex flex-col w-full items-center sm:items-start sm:w-1/3 lg:w-auto gap-4">
                      <div className="flex flex-row gap-1 items-center font-bold text-2xl">
                        Allocation
                      </div>
                      <div>
                        <canvas
                          ref={canvasRef}
                          className="w-full aspect-square"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="lg:sticky lg:top-2 lg:left-0 lg:w-8/12 w-full flex flex-col gap-8 px-10">
                  <div className="flex flex-col sm:flex-row gap-8 sm:gap-0 justify-between">
                    <div className="flex flex-col gap-2 w-full sm:w-1/2">
                      <div className="font-bold text-xs sm:text-sm opacity-70">
                        Total market cap
                      </div>
                      <div className="flex flex-row gap-1 text-lg sm:text-2xl font-semibold">
                        <div>{formatCurrency(currency)}</div>
                        {formatNumberWithCommas(singleExchange.marketCapTotal)}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full sm:w-1/2">
                      <div className="font-bold text-xs sm:text-sm opacity-70">
                        Volume (24h)
                      </div>
                      <div className="flex flex-row gap-1 text-lg sm:text-2xl font-semibold">
                        <div>{formatCurrency(currency)}</div>
                        {formatNumberWithCommas(singleExchange.volume24H)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 items-start text-justify">
                    <div className="opacity-70 text-lg font-semibold">
                      About
                    </div>
                    <div className="text-lg">
                      {singleExchange.description.introduction}
                    </div>
                    {singleExchange.description.text.map((item, index) => (
                      <div className="flex flex-col gap-4" key={index}>
                        <div className="font-semibold text-lg opacity-80">
                          {item.question}
                        </div>
                        <div>{item.paragraph}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full p-8">
                <DataGenerate data={finalData} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default ExchangeShow;
