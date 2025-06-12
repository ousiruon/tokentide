import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import {
  formatCurrency,
  formatNumber,
  type Cryptocurrency,
} from "../../utilities/data";
import { FaSortDown, FaSortUp } from "react-icons/fa6";
import { toggleSearch } from "../../store/Slices/settingsSlice";
import { useNavigate } from "react-router";

const SearchHeader = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [topData, setTopData] = useState<Cryptocurrency[] | null>(null);
  const [searchedData, setSearchedData] = useState<Cryptocurrency[] | null>(
    null
  );
  const { openedSearch, currency } = useSelector(
    (state: RootState) => state.userSettings
  );
  const { data } = useSelector((state: RootState) => state.data);
  useEffect(() => {
    if (data.length > 0) {
      const sorted = [...data]
        .sort((a, b) => b.quote[currency].price - a.quote[currency].price)
        .slice(0, 5);
      setTopData(sorted);
    }
  }, [data, currency]);
  useEffect(() => {
    if (!openedSearch) {
      const searchInput = document.getElementById(
        "searchInput"
      ) as HTMLInputElement;
      if (searchInput) {
        searchInput.value = "";
        setSearchedData(null);
      }
    }
  }, [openedSearch]);
  const searchFun = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const element = e.currentTarget.value.trim();
    if (element.length >= 3) {
      const searchedData = [...data]
        .filter((item) => {
          return item.description.introduction
            .toLowerCase()
            .includes(element.toLowerCase());
        })
        .slice(0, 5);
      setSearchedData(searchedData);
    } else if (element.length === 0) {
      setSearchedData(null);
    }
  };
  const navigateTo = (id: string) => {
    dispatch(toggleSearch(false));
    navigate(`/coin/${id}`);
  };
  return (
    <>
      <div id="searchBtn" className="cursor-pointer">
        <IoSearch />
      </div>
      {openedSearch && (
        <div className="fixed top-0 left-0 w-full h-full bg-tertiary-light dark:bg-tertiary-dark z-5 opacity-20"></div>
      )}
      <div
        id="searchResults"
        className={`fixed top-20 left-[50%] bottom-20 md:bottom-auto translate-x-[-50%] w-[90%] md:w-[70%] md:max-w-[800px] px-10 py-5 bg-secondary-light dark:bg-secondary-dark rounded border-1 border-tertiary-light/40 dark:border-tertiary-dark/40 shadow-xs/10 shadow-text-light dark:shadow-text-dark z-10 overflow-y-auto ${
          openedSearch ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col gap-10">
          <input
            onChange={searchFun}
            type="text"
            name="searchInput"
            id="searchInput"
            className="w-full outline-0 bg-tertiary-light/15 dark:bg-tertiary-dark/15 rounded text-sm py-3 px-4 text-text-light dark:text-text-dark font-semibold"
            placeholder="Search coin..."
          />
          {searchedData && (
            <div className="flex flex-col gap-2">
              <div className="text-base font-semibold">Search results</div>
              {searchedData.length === 0 && (
                <div className="text-sm">No results found...</div>
              )}
              {searchedData.map((element, index) => (
                <div
                  onClick={() => navigateTo(element.id)}
                  key={index}
                  className="flex flex-col gap-2"
                >
                  <div className="flex flex-row justify-between items-center text-sm bg-tertiary-light/15 dark:bg-tertiary-dark/15 hover:bg-tertiary-light/10 dark:hover:bg-tertiary-dark/10 p-4 rounded cursor-pointer transition-all ease-in duration-300">
                    <div className="flex flex-row gap-2 items-start w-1/2 md:w-1/3">
                      <div className="flex flex-row items-center gap-2">
                        <img
                          src={element.logo}
                          className="w-[30px] aspect-square drop-shadow-md drop-shadow-tertiary-light/15 dark:drop-shadow-tertiary-dark/15 
"
                          alt={element.name + " logo"}
                          loading="lazy"
                        />
                        <div className="flex flex-col">
                          {element.name}
                          <div className="text-xs opacity-70 font-semibold">
                            {element.symbol}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-col text-xs gap-1 hidden md:flex w-1/3 items-center">
                      <div className="flex flex-row gap-1">
                        <div className="opacity-70">MCap:</div>
                        <div className="font-semibold">
                          {formatCurrency(currency)}
                          {formatNumber(element.quote[currency].market_cap)}
                        </div>
                      </div>
                      <div className="flex flex-row gap-1">
                        <div className="opacity-70">Vol(24h):</div>
                        <div className="font-semibold">
                          {formatCurrency(currency)}
                          {formatNumber(element.quote[currency].volume_24h)}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col text-xs gap-1 w-1/2 md:w-1/3 items-end">
                      <div className="font-semibold">
                        {formatCurrency(currency)}
                        {formatNumber(element.quote[currency].price)}
                      </div>
                      <div
                        className={`font-semibold ${
                          element.quote[currency].percent_change_1h > 0
                            ? "text-up-color"
                            : "text-down-color"
                        }`}
                      >
                        <div
                          className={`flex flex-row gap-1 justify-center ${
                            element.quote[currency].percent_change_1h > 0
                              ? "items-center"
                              : "items-start"
                          }`}
                        >
                          <div>
                            {element.quote[currency].percent_change_1h > 0 ? (
                              <FaSortUp />
                            ) : (
                              <FaSortDown />
                            )}
                          </div>
                          <div>
                            {element.quote[currency].percent_change_1h.toFixed(
                              2
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <div className="text-base font-semibold">Trending</div>
            {topData &&
              topData.map((element, index) => (
                <div
                  onClick={() => navigateTo(element.id)}
                  key={index}
                  className="flex flex-col gap-2"
                >
                  <div className="flex flex-row justify-between items-center text-sm bg-tertiary-light/15 dark:bg-tertiary-dark/15 hover:bg-tertiary-light/10 dark:hover:bg-tertiary-dark/10 p-4 rounded cursor-pointer transition-all ease-in duration-300">
                    <div className="flex flex-row gap-2 items-start w-1/2 md:w-1/3">
                      <div className="flex flex-row items-center gap-2">
                        <img
                          src={element.logo}
                          className="w-[30px] aspect-square drop-shadow-md drop-shadow-tertiary-light/15 dark:drop-shadow-tertiary-dark/15 
"
                          alt={element.name + " logo"}
                          loading="lazy"
                        />
                        <div className="flex flex-col">
                          {element.name}
                          <div className="text-xs opacity-70 font-semibold">
                            {element.symbol}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-col text-xs gap-1 hidden md:flex w-1/3 items-center">
                      <div className="flex flex-row gap-1">
                        <div className="opacity-70">MCap:</div>
                        <div className="font-semibold">
                          {formatCurrency(currency)}
                          {formatNumber(element.quote[currency].market_cap)}
                        </div>
                      </div>
                      <div className="flex flex-row gap-1">
                        <div className="opacity-70">Vol(24h):</div>
                        <div className="font-semibold">
                          {formatCurrency(currency)}
                          {formatNumber(element.quote[currency].volume_24h)}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col text-xs gap-1 w-1/2 md:w-1/3 items-end">
                      <div className="font-semibold">
                        {formatCurrency(currency)}
                        {formatNumber(element.quote[currency].price)}
                      </div>
                      <div
                        className={`font-semibold ${
                          element.quote[currency].percent_change_1h > 0
                            ? "text-up-color"
                            : "text-down-color"
                        }`}
                      >
                        <div
                          className={`flex flex-row gap-1 justify-center ${
                            element.quote[currency].percent_change_1h > 0
                              ? "items-center"
                              : "items-start"
                          }`}
                        >
                          <div>
                            {element.quote[currency].percent_change_1h > 0 ? (
                              <FaSortUp />
                            ) : (
                              <FaSortDown />
                            )}
                          </div>
                          <div>
                            {element.quote[currency].percent_change_1h.toFixed(
                              2
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchHeader;
