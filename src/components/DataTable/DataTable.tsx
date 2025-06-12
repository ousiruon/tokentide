import { useSelector } from "react-redux";
import Top5 from "./TopSide/Top5";
import Top5Exchanges from "./TopSide/Top5Exchanges";
import MarketCapFearNGreed from "./TopSide/MarketCapFearNGreed";
import DataGenerate from "./DataGenerate";
import type { RootState } from "../../store/store";
import NewsWidget from "../News/NewsWidget";

const DataTable = () => {
  const { data } = useSelector((state: RootState) => state.data);
  return (
    <div className="flex flex-col gap-4 items-center justify-start w-full min-h-dvh bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
      <div className="flex flex-col w-full max-w-[1400px] px-4 gap-6">
        <div className="flex flex-col xl:flex-row w-full gap-4 lg:gap-6">
          <Top5 />
          <MarketCapFearNGreed />
          <Top5Exchanges />
        </div>
        <DataGenerate data={data} />
        <div className="w-full pt-8">
          <NewsWidget />
        </div>
      </div>
    </div>
  );
};
export default DataTable;
