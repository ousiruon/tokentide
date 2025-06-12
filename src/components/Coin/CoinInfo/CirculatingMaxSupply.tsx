import { FaSortDown, FaSortUp } from "react-icons/fa6";
import { useSelector } from "react-redux";
import {
  formatCurrency,
  formatNumber,
  type QuoteData,
} from "../../../utilities/data";
import type { RootState } from "../../../store/store";

const CirculatingMaxSupply = ({
  data,
  maxSupply,
  symbol,
}: {
  data: QuoteData;
  maxSupply: number | null;
  symbol: string;
}) => {
  const { currency } = useSelector((state: RootState) => state.userSettings);
  return (
    <>
      <div className="flex flex-row items-center justify-center gap-2">
        <div className="flex flex-col gap-2 items-center justify-center w-full py-4 rounded border-1 border-text-light dark:border-text-dark font-semibold text-sm">
          <div>Circulating supply</div>
          <div className="flex flex-row items-center gap-1 text-sm">
            <div className="text-sm">{formatCurrency(currency)}</div>
            <div>{formatNumber(data.volume_24h)}</div>
            <div
              className={`text-xs ${
                data.percent_change_24h > 0
                  ? "text-up-color"
                  : "text-down-color"
              }`}
            >
              <div
                className={`flex flex-row justify-center ${
                  data.percent_change_24h > 0 ? "items-center" : "items-start"
                }`}
              >
                <div>
                  {data.percent_change_24h > 0 ? <FaSortUp /> : <FaSortDown />}
                </div>
                <div>{data.percent_change_24h.toFixed(2)}%</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center w-full py-4 rounded border-1 border-text-light dark:border-text-dark font-semibold text-sm">
          <div>Max supply</div>
          <div className="flex flex-row items-center gap-1 text-sm">
            <div>{maxSupply ? formatNumber(maxSupply) : "--"}</div>
            <div>{maxSupply && symbol}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CirculatingMaxSupply;
