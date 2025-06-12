import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { FaSortDown, FaSortUp } from "react-icons/fa6";
import { formatCurrency, type QuoteData } from "../../../utilities/data";

const CoinPrice = ({ data }: { data: QuoteData }) => {
  const { currency } = useSelector((state: RootState) => state.userSettings);
  return (
    <>
      {data && (
        <div className="flex flex-row items-center gap-2 font-semibold text-lg">
          <div className="flex items-center gap-1">
            <div className="text-sm">{formatCurrency(currency)}</div>
            {data.price.toFixed(2)}
          </div>
          <div
            className={`text-sm ${
              data.percent_change_30d > 0 ? "text-up-color" : "text-down-color"
            }`}
          >
            <div
              className={`flex flex-row justify-center ${
                data.percent_change_30d > 0 ? "items-center" : "items-start"
              }`}
            >
              <div>
                {data.percent_change_30d > 0 ? <FaSortUp /> : <FaSortDown />}
              </div>
              <div>{data.percent_change_30d.toFixed(2)}%</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default CoinPrice;
