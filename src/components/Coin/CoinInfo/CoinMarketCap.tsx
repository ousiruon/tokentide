import { useSelector } from "react-redux";
import { formatCurrency, formatNumber, type QuoteData } from "../../../utilities/data";
import type { RootState } from "../../../store/store";
import { FaSortDown, FaSortUp } from "react-icons/fa6";

const CoinMarketCap = ({ data }: { data: QuoteData }) => {
  const { currency } = useSelector((state: RootState) => state.userSettings);
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 py-4 rounded border-1 border-text-light dark:border-text-dark">
        <div className="font-semibold text-sm">Market cap</div>
        <div className="font-semibold flex flex-row items-center gap-1">
          <div className="text-sm">
            {formatCurrency(currency)}
          </div>
          <div>{formatNumber(data.market_cap)}</div>
          <div
            className={`text-xs ${
              data.percent_change_7d > 0
                ? "text-up-color"
                : "text-down-color"
            }`}
          >
            <div
              className={`flex flex-row justify-center ${
                data.percent_change_7d > 0
                  ? "items-center"
                  : "items-start"
              }`}
            >
              <div>
                {data.percent_change_7d > 0 ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                )}
              </div>
              <div>{data.percent_change_7d.toFixed(2)}%</div>
              <div>(7d)</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CoinMarketCap;
