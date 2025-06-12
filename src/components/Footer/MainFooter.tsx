import { NavLink, useLocation } from "react-router";
import Logo from "../Header/Logo";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { ExchangeWithData } from "../../store/Slices/exchangesData";
import { useEffect, useState } from "react";
import type { CategoryWithData } from "../../store/Slices/categoriesData";

const MainFooter = () => {
  const { allExchangesExtended } = useSelector(
    (state: RootState) => state.exchangeData
  );
  const { allCategoriesWithData } = useSelector(
    (state: RootState) => state.categoriesData
  );
  const { footerIntro } = useSelector((state: RootState) => state.data);
  const [topExchanges, setTopExchanges] = useState<ExchangeWithData[] | []>([]);
  const [topCategories, setTopCategories] = useState<CategoryWithData[] | []>(
    []
  );
  const location = useLocation();
  useEffect(() => {
    if (allExchangesExtended.length > 0)
      setTopExchanges(allExchangesExtended.slice(0, 4));
  }, [allExchangesExtended]);
  useEffect(() => {
    if (allCategoriesWithData.length > 0)
      setTopCategories(allCategoriesWithData.slice(0, 4));
  }, [allCategoriesWithData]);
  return (
    <>
      <div className="bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark border-y-1 border-text-light dark:border-text-dark">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
          <footer className="flex flex-col md:flex-row gap-10 md:gap-40 justify-between items-start px-4 py-16">
            <div className="flex flex-col gap-4 items-start justify-start w-full max-w-full md:max-w-[400px]">
              <Logo />
              <div className="text-sm">{footerIntro}</div>
            </div>
            <div className="grow-1 flex flex-row w-full md:w-auto gap-8 items-start justify-end">
              <div className="flex flex-col gap-2 w-1/3">
                <div className="font-bold">Resources</div>
                <div className="flex flex-col gap-2 md:gap-1 font-semibold text-sm md:text-base">
                  {location.pathname === "/" ? (
                    <div>Home</div>
                  ) : (
                    <NavLink to="/">Home</NavLink>
                  )}
                  {location.pathname === "/trending" ? (
                    <div>Trending</div>
                  ) : (
                    <NavLink to="/trending">Trending</NavLink>
                  )}
                  {location.pathname === "/latest-listings" ? (
                    <div>Latest listings</div>
                  ) : (
                    <NavLink to="/latest-listings">Latest listings</NavLink>
                  )}
                  {location.pathname === "/gainers-and-losers" ? (
                    <div>Gainers and Losers</div>
                  ) : (
                    <NavLink to="/gainers-and-losers">
                      Gainers and Losers
                    </NavLink>
                  )}
                  {location.pathname === "/news" ? (
                    <div>News</div>
                  ) : (
                    <NavLink to="/news">News</NavLink>
                  )}
                </div>
              </div>
              {topExchanges.length > 0 && (
                <div className="flex flex-col gap-2 w-1/3">
                  <div className="font-bold">Exchanges</div>
                  <div className="flex flex-col gap-2 md:gap-1 font-semibold text-sm md:text-base">
                    {topExchanges.map((item) =>
                      location.pathname === `/exchange/${item.id}` ? (
                        <div key={item.id}>{item.name}</div>
                      ) : (
                        <NavLink key={item.id} to={`/exchange/${item.id}`}>
                          {item.name}
                        </NavLink>
                      )
                    )}
                    {location.pathname === "/exchanges" ? (
                      <div>All exchanges</div>
                    ) : (
                      <NavLink to="/exchanges">All exchanges</NavLink>
                    )}
                  </div>
                </div>
              )}
              {topCategories.length > 0 && (
                <div className="flex flex-col gap-2 w-1/3">
                  <div className="font-bold">Categories</div>
                  <div className="flex flex-col gap-2 md:gap-1 font-semibold text-sm md:text-base">
                    {topCategories.map((item) =>
                      location.pathname === `/category/${item.id}` ? (
                        <div key={item.id}>{item.name}</div>
                      ) : (
                        <NavLink key={item.id} to={`/category/${item.id}`}>
                          {item.name}
                        </NavLink>
                      )
                    )}
                    <NavLink to="/categories">All categories</NavLink>
                  </div>
                </div>
              )}
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};
export default MainFooter;
