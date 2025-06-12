import { useEffect, useRef, useState } from "react";
import type { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../store/Slices/categoriesData";
import { useParams } from "react-router";
import type { Cryptocurrency, ExchangeShowProps } from "../../utilities/data";
import DataGenerate from "../DataTable/DataGenerate";
import MarketCapFearNGreed from "../DataTable/TopSide/MarketCapFearNGreed";
import Top5 from "../DataTable/TopSide/Top5";
import Top5Exchanges from "../DataTable/TopSide/Top5Exchanges";
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
const CategoryShow = () => {
  const dispatch: AppDispatch = useDispatch();
  const { categoryId } = useParams();
  const { data } = useSelector((state: RootState) => state.data);
  const [finalData, setFinalData] = useState<Cryptocurrency[]>([]);
  const { currency } = useSelector((state: RootState) => state.userSettings);
  const { singleCategory, allCategoriesWithData } = useSelector(
    (state: RootState) => state.categoriesData
  );
  useEffect(() => {
    if (allCategoriesWithData.length > 0) {
      const category = allCategoriesWithData.find(
        (item) => item.id === categoryId
      );
      dispatch(setCategory(category));
    }
  }, [allCategoriesWithData, categoryId]);
  useEffect(() => {
    if (singleCategory && data.length > 0) {
      const filteredData = data.filter((item) => {
        return item.tags.find((tag) => tag === singleCategory.name);
      });
      setFinalData(filteredData);
      const allocation = filteredData
        .map((item) => {
          return {
            symbol: item.symbol,
            percentage: (
              (item.quote[currency].market_cap * 100) /
              singleCategory.marketCapTotal
            ).toFixed(2),
          };
        })
        .slice(0, 3);
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
  }, [singleCategory, data]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [allocationData, setAllocationData] = useState<ExchangeShowProps[]>([]);
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
  }, [allocationData]);
  return (
    <>
      <div className="flex w-full min-h-dvh items-start justify-center bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark py-20">
        {singleCategory && (
          <div className="relative flex flex-col gap-12 mx-auto w-full max-w-[1600px] px-4">
            <div className="text-2xl font-semibold">
              Top {singleCategory.name} cryptocoins
            </div>
            <div className="flex flex-row w-full gap-6 flex-wrap">
              <div className="hidden 2xl:block">
                <Top5 />
              </div>
              <MarketCapFearNGreed />
              <div className="hidden xl:block">
                <Top5Exchanges />
              </div>
              {allocationData.length > 0 && (
                <div className="flex flex-col p-6 rounded-lg bg-secondary-light dark:bg-secondary-dark gap-4 w-1/2 mx-auto md:mx-0 md:w-full md:max-w-[300px] md:min-w-[350px]">
                  <div className="flex flex-row gap-1 items-center font-bold">
                    Allocation
                  </div>
                  <div>
                    <canvas ref={canvasRef} className="w-full aspect-square" />
                  </div>
                </div>
              )}
            </div>
            {finalData.length > 0 && (
              <div className="w-full ">
                <DataGenerate data={finalData} />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default CategoryShow;
