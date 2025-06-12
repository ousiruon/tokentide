import { useNavigate } from "react-router";
import type { Cryptocurrency } from "../../utilities/data";
import CirculatingSupply from "./CirculatingSupply";
import Item1H from "./Item1H";
import Item24H from "./Item24H";
import Item7D from "./Item7D";
import ItemName from "./ItemName";
import ItemPrice from "./ItemPrice";
import Last30Days from "./Last30Days";
import MarketCap from "./MarketCap";
import Volume24 from "./Volume24";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

interface DataBodyProps {
  data: Cryptocurrency[];
}
const DataBody = ({ data }: DataBodyProps) => {
  const navigate = useNavigate();
  const selectedCurrency = useSelector(
    (state: RootState) => state.userSettings.currency
  );
  return (
    <>
      <tbody>
        {data.map((item: Cryptocurrency) => (
          <tr
            onClick={() => navigate(`/coin/${item.id}`)}
            className="border-b border-text-light/30 dark:border-text-dark/30 cursor-pointer transition-all duration-500 ease-in dark:hover:bg-secondary-dark/40 hover:bg-secondary-light/10 h-auto text-sm md:text-base"
            key={item.id}
          >
            <ItemName name={item.name} symbol={item.symbol} img={item.logo} />
            <ItemPrice
              price={item.quote[selectedCurrency].price}
              selectedCurrency={selectedCurrency}
            />
            <Item1H
              percent1h={item.quote[selectedCurrency].percent_change_1h}
            />
            <Item24H
              percent24h={item.quote[selectedCurrency].percent_change_24h}
            />
            <Item7D
              percent7d={item.quote[selectedCurrency].percent_change_7d}
            />
            <MarketCap
              marketCap={item.quote[selectedCurrency].market_cap}
              selectedCurrency={selectedCurrency}
            />
            <Volume24
              volume24={item.quote[selectedCurrency].volume_24h}
              selectedCurrency={selectedCurrency}
            />
            <CirculatingSupply
              circulatingSupply={item.circulating_supply}
              symbol={item.symbol}
            />
            <td className="text-left py-8 px-2 md:p-8">
              <Last30Days
                chartData={item.chart_data[selectedCurrency].monthly}
                last30Days={item.quote[selectedCurrency].percent_change_30d}
                width={120}
                height={40}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};
export default DataBody;
