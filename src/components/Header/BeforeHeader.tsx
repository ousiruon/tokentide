import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { getData } from "../../store/Slices/dataSlice";
import {
  formatCurrency,
  formatNumber,
  type Cryptocurrency,
} from "../../utilities/data";
import BeforeHeaderPC from "./BeforeHeaderPC";
import BeforeHeaderMobile from "./BeforeHeaderMobile";
export interface PreHeader {
  title: string;
  value: string;
}
const SubHeader = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.data);
  const selectedCurrency = useSelector(
    (state: RootState) => state.userSettings.currency
  );
  const [totalExchanges, setTotalExchanges] = useState<null | number>(null);
  const [cryptoTotal, setCryptoTotal] = useState<null | number>(null);
  const [totalVolume, setTotalVolume] = useState<null | string>(null);
  const [marketCapTotal, setMarketCapTotal] = useState<null | string>(null);
  const [greed, setGreed] = useState<null | number>(null);
  const [content, setContent] = useState<PreHeader[]>([]);
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);
  useEffect(() => {
    if (data.length > 0) {
      const exchangesUnfiltered: string[] = [];
      let totalVolumeUnfiltered: number = 0;
      let totalMarketCap: number = 0;
      let positiveCoins: number = 0;
      data.map((item: Cryptocurrency) => {
        item.exchanges.map((exchange) => {
          exchangesUnfiltered.push(exchange);
        });
        totalVolumeUnfiltered += item.quote[selectedCurrency].volume_24h;
        totalMarketCap += item.quote[selectedCurrency].market_cap;
        item.quote[selectedCurrency].percent_change_24h > 0
          ? positiveCoins++
          : "";
      });
      setTotalExchanges([...new Set(exchangesUnfiltered)].length);
      setCryptoTotal(data.length);
      setTotalVolume(formatNumber(totalVolumeUnfiltered));
      setMarketCapTotal(formatNumber(totalMarketCap));
      setGreed((positiveCoins * 100) / data.length);
    }
  }, [data, selectedCurrency]);
  useEffect(() => {
    if (
      totalExchanges &&
      cryptoTotal &&
      totalVolume &&
      marketCapTotal &&
      greed
    ) {
      setContent([
        {
          title: "Exchanges",
          value: `${totalExchanges}`,
        },
        {
          title: "Market Cap",
          value: `${formatCurrency(selectedCurrency)} ${marketCapTotal}`,
        },
        {
          title: "Cryptocurrencies",
          value: `${cryptoTotal}`,
        },
        {
          title: "24h vol",
          value: `${formatCurrency(selectedCurrency)} ${totalVolume}`,
        },
        {
          title: "Fear & Greed",
          value: `${greed + "/100"}`,
        },
      ]);
    }
  }, [totalExchanges, cryptoTotal, totalVolume, marketCapTotal, greed]);
  return (
    <>
      <div className="p-3 bg-tertiary-light dark:bg-tertiary-dark text-xs text-text-light dark:text-text-dark flex items-center gap-3">
        {content.length > 0 && <BeforeHeaderPC content={content} />}
        {content.length > 0 && <BeforeHeaderMobile content={content} />}
      </div>
    </>
  );
};
export default SubHeader;
