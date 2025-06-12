import { useLocation, useNavigate } from "react-router";
import type { ExchangeWithData } from "../../store/Slices/exchangesData";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { CategoryWithData } from "../../store/Slices/categoriesData";
import Item1H from "./Item1H";
import Item24H from "./Item24H";
import Item7D from "./Item7D";
import MarketCap from "./MarketCap";
import Volume24 from "./Volume24";
const ExchangeBody = ({
  data,
}: {
  data: ExchangeWithData | CategoryWithData;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currency } = useSelector((state: RootState) => state.userSettings);
  return (
    <>
      <tr
        onClick={() =>
          location.pathname === "/exchanges"
            ? navigate(`/exchange/${data.id}`)
            : location.pathname === "/categories"
            ? navigate(`/category/${data.id}`)
            : ""
        }
        className="border-b border-text-light/30 dark:border-text-dark/30 cursor-pointer transition-all duration-500 ease-in dark:hover:bg-secondary-dark/40 hover:bg-secondary-light/10 text-sm md:text-base"
      >
        <td className="text-left px-4 py-2 md:p-8">
          <div className="flex flex-row items-center gap-2">
            {location.pathname === "/exchanges" && (
              <img
                src={(data as ExchangeWithData).image}
                className="w-[25px] md:w-[30px] aspect-square drop-shadow-md drop-shadow-tertiary-light/20 dark:drop-shadow-tertiary-dark/20 
"
                alt={(data as ExchangeWithData).image + " logo"}
                loading="lazy"
              />
            )}
            <div>{data.name}</div>
          </div>
        </td>
        <td className="text-left px-4 py-2 md:p-8">{data.totalCoins}</td>
        <Item1H percent1h={data.oneHourAverage} />
        <Item24H percent24h={data.twentyFourHourAverage} />
        <Item7D percent7d={data.sevenDaysAverage} />
        <MarketCap
          marketCap={data.marketCapTotal}
          selectedCurrency={currency}
        />
        <Volume24 volume24={data.volume24H} selectedCurrency={currency} />
      </tr>
    </>
  );
};
export default ExchangeBody;
