import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { type ExchangeWithData } from "../../store/Slices/exchangesData";
import MarketCapFearNGreed from "../DataTable/TopSide/MarketCapFearNGreed";
import Top5 from "../DataTable/TopSide/Top5";
import Top5Exchanges from "../DataTable/TopSide/Top5Exchanges";
import ExchangeNCategoryHeader from "../DataTable/ExchangeNCategoryHeader";
import ExchangeNCategoryBody from "../DataTable/ExchangeNCategoryBody";
import NewsWidget from "../News/NewsWidget";

const Exchanges = () => {
  const { allExchangesExtended } = useSelector(
    (state: RootState) => state.exchangeData
  );
  return (
    <>
      <div className="flex w-full min-h-dvh items-start justify-center bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark py-20">
        <div className="flex flex-col w-full max-w-[1400px] px-4 gap-6">
          <div className="flex flex-col xl:flex-row w-full gap-4 lg:gap-6">
            <Top5 />
            <MarketCapFearNGreed />
            <Top5Exchanges />
          </div>
          <div className="overflow-x-auto no-scrollbar">
            <table className="table-auto w-full border-collapse border-spacing-0">
              <ExchangeNCategoryHeader />
              <tbody>
                {allExchangesExtended.map(
                  (singleExchange: ExchangeWithData, index) => (
                    <ExchangeNCategoryBody key={index} data={singleExchange} />
                  )
                )}
              </tbody>
            </table>
          </div>
          <NewsWidget />
        </div>
      </div>
    </>
  );
};
export default Exchanges;
