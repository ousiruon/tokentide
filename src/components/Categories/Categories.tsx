import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import MarketCapFearNGreed from "../DataTable/TopSide/MarketCapFearNGreed";
import Top5 from "../DataTable/TopSide/Top5";
import Top5Exchanges from "../DataTable/TopSide/Top5Exchanges";
import { type CategoryWithData } from "../../store/Slices/categoriesData";
import ExchangeNCategoryHeader from "../DataTable/ExchangeNCategoryHeader";
import ExchangeNCategoryBody from "../DataTable/ExchangeNCategoryBody";
import NewsWidget from "../News/NewsWidget";
const Categories = () => {
  const { allCategoriesWithData } = useSelector(
    (state: RootState) => state.categoriesData
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
                {(allCategoriesWithData as CategoryWithData[])?.map(
                  (singleCategory: CategoryWithData, index) => (
                    <ExchangeNCategoryBody key={index} data={singleCategory} />
                  )
                )}
              </tbody>
            </table>
          </div>
          <div className="w-full pt-10">
            <NewsWidget />
          </div>
        </div>
      </div>
    </>
  );
};
export default Categories;
