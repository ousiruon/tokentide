import { useEffect, useState } from "react";
import {
  calculateAverage,
  formatCurrency,
  formatNumber,
  type Cryptocurrency,
} from "../../../utilities/data";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { FaSortUp, FaSortDown } from "react-icons/fa";

const MarketCapData = () => {
  const { data } = useSelector((state: RootState) => state.data);
  const { currency } = useSelector((state: RootState) => state.userSettings);
  const [marketCapValue, setMarketCapTotal] = useState<string | null>(null);
  const [median24HValue, setMedian24HValue] = useState<number | null>(null);
  useEffect(() => {
    let totalMarketCap: number = 0;
    const median24H: number[] = [];
    if (data.length > 0) {
      data.map((item: Cryptocurrency) => {
        totalMarketCap += item.quote[currency].market_cap;
        median24H.push(item.quote[currency].percent_change_24h);
      });
    }
    setMarketCapTotal(formatNumber(totalMarketCap));
    setMedian24HValue(calculateAverage(median24H));
  }, [data, currency]);
  return (
    <>
      <div className="font-semibold text-sm md:text-base">Market Cap</div>
      {marketCapValue && (
        <div className="font-bold flex flex-col gap-1 text-sm md:text-xs">
          <div className="flex gap-1">
            {formatCurrency(currency)}
            <div>{marketCapValue}</div>
          </div>
          {median24HValue && (
            <div
              className={`flex gap-1 md:text-[10px] justify-center ${
                median24HValue > 0
                  ? "text-up-color items-center"
                  : "text-down-color items-start"
              }`}
            >
              <div>{median24HValue > 0 ? <FaSortUp /> : <FaSortDown />}</div>
              <div>{median24HValue}%</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default MarketCapData;
