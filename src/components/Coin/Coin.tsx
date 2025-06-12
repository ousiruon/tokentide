import { useEffect } from "react";
import { useParams } from "react-router";
import { setSingleData } from "../../store/Slices/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import CurrentChart from "./CoinData/CurrentChart";
import CirculatingMaxSupply from "./CoinInfo/CirculatingMaxSupply";
import CoinCMC from "./CoinInfo/CoinCMC";
import CoinDescription from "./CoinData/CoinDescription";
import CoinMarketCap from "./CoinInfo/CoinMarketCap";
import CoinPrice from "./CoinInfo/CoinPrice";
import CoinTitle from "./CoinInfo/CoinTitle";
import CoinVolumeTotalSupply from "./CoinInfo/CoinVolumeTotalSupply";
import CoinWebsite from "./CoinInfo/CoinWebsite";
import CoinAdded from "./CoinInfo/CoinAdded";
import CoinExplorer from "./CoinInfo/CoinExplorer";
import CoinPaper from "./CoinInfo/CoinPaper";
import CoinSocials from "./CoinInfo/CoinSocials";
import CoinLastUpdate from "./CoinInfo/CoinLastUpdate";
import CoinDominance from "./CoinInfo/CoinDominance";
import CoinTags from "./CoinInfo/CoinTags";
import CoinPlatforms from "./CoinInfo/CoinPlatforms";
import CoinUCID from "./CoinInfo/CoinUCID";

const Coin = () => {
  const { coinId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { currency } = useSelector((state: RootState) => state.userSettings);
  const { data, singleData } = useSelector((state: RootState) => state.data);
  useEffect(() => {
    if (data.length > 0 && coinId) {
      dispatch(setSingleData(coinId));
    }
  }, [coinId, data]);
  return (
    <>
      <div className="flex w-full min-h-dvh items-start justify-center bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark py-20">
        {singleData && (
          <div className="relative flex flex-col-reverse xl:flex-row items-center xl:items-start xl:gap-2 w-full max-w-[1400px]">
            <div className="xl:sticky xl:top-2 xl:left-0 w-[90%] xl:w-4/12 bg-tertiary-light dark:bg-secondary-dark xl:ml-2 rounded-b xl:rounded ">
              <div className="p-8 flex flex-col gap-4">
                <div className="hidden xl:flex flex-col gap-4">
                  <CoinTitle
                    logo={singleData.logo}
                    name={singleData.name}
                    symbol={singleData.symbol}
                    coinId={coinId as string}
                  />
                  <CoinPrice data={singleData.quote[currency]} />
                </div>
                <div className="flex flex-col gap-4">
                  <CoinMarketCap data={singleData.quote[currency]} />
                  <CoinVolumeTotalSupply
                    symbol={singleData.symbol}
                    data={singleData.quote[currency]}
                    totalSupply={singleData.total_supply}
                  />
                  <CirculatingMaxSupply
                    data={singleData.quote[currency]}
                    maxSupply={singleData.max_supply}
                    symbol={singleData.symbol}
                  />
                  <CoinCMC data={singleData.cmc_rank} />
                </div>
                <div className="flex flex-col gap-4">
                  <CoinWebsite data={singleData.website} />
                  <CoinAdded data={singleData.date_added} />
                  <CoinUCID data={singleData.id} />
                  <CoinExplorer data={singleData.explorer} />
                  <CoinPaper
                    data={singleData.technical_doc}
                    name={singleData.name}
                  />
                  <CoinSocials
                    twitter={singleData.twitter}
                    reddit={singleData.reddit}
                  />
                  <CoinLastUpdate data={singleData.last_updated} />
                  <CoinDominance data={singleData.quote[currency]} />
                  <CoinTags data={singleData.tags} />
                  <CoinPlatforms data={singleData.exchanges} />
                </div>
              </div>
            </div>
            <div className="w-[90%] xl:w-8/12 bg-tertiary-light dark:bg-secondary-dark xl:mr-2 rounded-t xl:rounded">
              <div className="p-8 flex flex-col gap-4">
                <div className="flex xl:hidden flex-col gap-4">
                  <CoinTitle
                    logo={singleData.logo}
                    name={singleData.name}
                    symbol={singleData.symbol}
                    coinId={coinId as string}
                  />
                  <CoinPrice data={singleData.quote[currency]} />
                </div>
                <CurrentChart
                  data={singleData.chart_data}
                  currency={currency}
                  name={singleData.name}
                />
                <CoinDescription description={singleData.description} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Coin;
