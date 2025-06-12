import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { setSortBy, setShowBy } from "../../store/Slices/dataSlice";
import type { Cryptocurrency } from "../../utilities/data";
import DataBody from "./DataBody";
import DataHeader from "./DataHeader";
import GainersLosersTopBar from "./GainersLosersTopBar";
import OptionsTopBar from "./OptionsTopBar";
import type { AppDispatch, RootState } from "../../store/store";

const DataGenerate = ({ data }: { data: Cryptocurrency[] }) => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const { selectedOptions } = useSelector((state: RootState) => state.data);
  const [dataDirection, setDataDirection] = useState<"asc" | "desc" | null>(
    null
  );
  const selectedCurrency = useSelector(
    (state: RootState) => state.userSettings.currency
  );
  const [sortedData, setSortedData] = useState<Cryptocurrency[] | []>([]);
  const [finalData, setFinalData] = useState<Cryptocurrency[] | []>([]);
  const [pages, setPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const updateDirectionGNL = (type: string) => {
    if (type === "desc") {
      dispatch(setSortBy("gainers"));
      setDataDirection("desc");
    } else if (type === "asc") {
      dispatch(setSortBy("losers"));
      setDataDirection("asc");
    }
  };
  useEffect(() => {
    setDataDirection(null);
    dispatch(setShowBy(20));
    if (location.pathname === "/") {
      setDataDirection(null);
      dispatch(setSortBy(null));
    } else if (location.pathname === "/latest-listings") {
      dispatch(setSortBy("latestDesc"));
    } else if (location.pathname === "/gainers-and-losers") {
      dispatch(setSortBy("gainers"));
    } else if (location.pathname === "/trending") {
      dispatch(setSortBy("trending"));
    }
  }, [location]);
  useEffect(() => {
    if (selectedOptions.sortBy) {
      if (
        selectedOptions.sortBy.endsWith("Asc") ||
        selectedOptions.sortBy === "losers"
      ) {
        setDataDirection("asc");
      } else if (
        selectedOptions.sortBy.endsWith("Desc") ||
        selectedOptions.sortBy === "gainers" ||
        selectedOptions.sortBy === "trending"
      ) {
        setDataDirection("desc");
      }
    }
  }, [selectedOptions.sortBy]);
  useEffect(() => {
    if (data.length > 0) {
      if (dataDirection === null) {
        setSortedData(data);
      } else {
        const selectedSortBy =
          selectedOptions.sortBy === "nameAsc" ||
          selectedOptions.sortBy === "nameDesc"
            ? "name"
            : selectedOptions.sortBy === "priceAsc" ||
              selectedOptions.sortBy === "priceDesc"
            ? "price"
            : selectedOptions.sortBy === "1hAsc" ||
              selectedOptions.sortBy === "1hDesc"
            ? "1h"
            : selectedOptions.sortBy === "24hAsc" ||
              selectedOptions.sortBy === "24hDesc"
            ? "24h"
            : selectedOptions.sortBy === "7DaysAsc" ||
              selectedOptions.sortBy === "7DaysDesc"
            ? "7d"
            : selectedOptions.sortBy === "marketCapAsc" ||
              selectedOptions.sortBy === "marketCapDesc"
            ? "marketCap"
            : selectedOptions.sortBy === "volume24Asc" ||
              selectedOptions.sortBy === "volume24Desc"
            ? "volume24"
            : selectedOptions.sortBy === "circulatingAsc" ||
              selectedOptions.sortBy === "circulatingDesc"
            ? "circulating"
            : selectedOptions.sortBy === "latestAsc" ||
              selectedOptions.sortBy === "latestDesc"
            ? "latest"
            : selectedOptions.sortBy === "gainers"
            ? "gainers"
            : selectedOptions.sortBy === "losers"
            ? "losers"
            : selectedOptions.sortBy === "trending"
            ? "trending"
            : "";

        const sorted = [...data].sort((a, b) => {
          if (selectedSortBy === "name") {
            return dataDirection === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          } else if (selectedSortBy === "price") {
            return dataDirection === "asc"
              ? a.quote[selectedCurrency].price -
                  b.quote[selectedCurrency].price
              : b.quote[selectedCurrency].price -
                  a.quote[selectedCurrency].price;
          } else if (selectedSortBy === "1h") {
            return dataDirection === "asc"
              ? a.quote[selectedCurrency].percent_change_1h -
                  b.quote[selectedCurrency].percent_change_1h
              : b.quote[selectedCurrency].percent_change_1h -
                  a.quote[selectedCurrency].percent_change_1h;
          } else if (selectedSortBy === "24h") {
            return dataDirection === "asc"
              ? a.quote[selectedCurrency].percent_change_24h -
                  b.quote[selectedCurrency].percent_change_24h
              : b.quote[selectedCurrency].percent_change_24h -
                  a.quote[selectedCurrency].percent_change_24h;
          } else if (selectedSortBy === "7d") {
            return dataDirection === "asc"
              ? a.quote[selectedCurrency].percent_change_7d -
                  b.quote[selectedCurrency].percent_change_7d
              : b.quote[selectedCurrency].percent_change_7d -
                  a.quote[selectedCurrency].percent_change_7d;
          } else if (selectedSortBy === "marketCap") {
            return dataDirection === "asc"
              ? a.quote[selectedCurrency].market_cap -
                  b.quote[selectedCurrency].market_cap
              : b.quote[selectedCurrency].market_cap -
                  a.quote[selectedCurrency].market_cap;
          } else if (selectedSortBy === "volume24") {
            return dataDirection === "asc"
              ? a.quote[selectedCurrency].volume_24h -
                  b.quote[selectedCurrency].volume_24h
              : b.quote[selectedCurrency].volume_24h -
                  a.quote[selectedCurrency].volume_24h;
          } else if (selectedSortBy === "circulating") {
            return dataDirection === "asc"
              ? a.circulating_supply - b.circulating_supply
              : b.circulating_supply - a.circulating_supply;
          } else if (selectedSortBy === "latest") {
            return dataDirection === "asc"
              ? new Date(a.date_added).getTime() -
                  new Date(b.date_added).getTime()
              : new Date(b.date_added).getTime() -
                  new Date(a.date_added).getTime();
          } else if (selectedSortBy === "gainers") {
            return (
              b.quote[selectedCurrency].percent_change_30d -
              a.quote[selectedCurrency].percent_change_30d
            );
          } else if (selectedSortBy === "losers") {
            return (
              a.quote[selectedCurrency].percent_change_30d -
              b.quote[selectedCurrency].percent_change_30d
            );
          } else if (selectedSortBy === "trending") {
            return (
              b.quote[selectedCurrency].percent_change_60d -
              a.quote[selectedCurrency].percent_change_60d
            );
          }
          return a.name.localeCompare(b.name);
        });
        setSortedData(sorted);
      }
    }
  }, [data, selectedOptions.sortBy, dataDirection, selectedCurrency]);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedOptions.showBy]);
  useEffect(() => {
    if (sortedData.length > 0) {
      const showBy = selectedOptions.showBy || 20;
      const totalPages = Math.ceil(sortedData.length / showBy);
      setPages(totalPages || 1);
    }
  }, [sortedData, selectedOptions.showBy]);
  useEffect(() => {
    const showBy = selectedOptions.showBy || 20;
    const start = (currentPage - 1) * showBy;
    const end = Math.min(start + showBy, sortedData.length);
    setFinalData(sortedData.slice(start, end));
    scrollTo({ top: 0, behavior: "smooth" });
  }, [sortedData, currentPage, selectedOptions.showBy]);
  return (
    <>
      <div>
        {sortedData.length > 0 && finalData.length > 0 && (
          <>
            <div className="flex flex-col md:flex-row gap-6 md:gap-0 w-full justify-between items-end md:items-center">
              {location.pathname === "/gainers-and-losers" && (
                <GainersLosersTopBar setDataDirection={updateDirectionGNL} />
              )}
              <OptionsTopBar data={sortedData} />
            </div>
            <div className="overflow-x-auto no-scrollbar relative">
              <table className="table-auto w-full border-collapse border-spacing-0 h-full">
                <DataHeader />
                <DataBody data={finalData} />
              </table>
            </div>
          </>
        )}
      </div>
      {sortedData.length > 0 && finalData.length > 0 && pages !== 1 && (
        <div className="flex flex-row gap-2 mt-4 w-full items-center justify-center text-xs md:text-sm">
          {pages !== null && pages <= 5 ? (
            Array.from({ length: pages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-2 py-1 mx-1 rounded cursor-pointer transition-all duration-300 ease-in  ${
                  currentPage === i + 1
                    ? "dark:bg-tertiary-dark dark:text-text-dark bg-tertiary-light text-text-light"
                    : "dark:bg-tertiary-dark/30 bg-tertiary-light/30 dark:hover:bg-tertiary-dark hover:bg-tertiary-light"
                }`}
              >
                {i + 1}
              </button>
            ))
          ) : (
            <>
              {currentPage > 2 && (
                <button
                  onClick={() => setCurrentPage(1)}
                  className="px-2 py-1 mx-1 rounded cursor-pointer dark:bg-secondary-dark dark:text-text-dark"
                >
                  First
                </button>
              )}
              {currentPage > 1 && (
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-2 py-1 mx-1 rounded cursor-pointer dark:bg-secondary-dark dark:text-text-dark"
                >
                  {currentPage - 1}
                </button>
              )}
              <button className="px-2 py-1 mx-1 rounded cursor-pointer dark:bg-tertiary-dark dark:text-text-dark">
                {currentPage}
              </button>
              {currentPage < pages && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-2 py-1 mx-1 rounded cursor-pointer dark:bg-secondary-dark dark:text-text-dark"
                >
                  {currentPage + 1}
                </button>
              )}
              {currentPage < pages - 1 && (
                <button
                  onClick={() => setCurrentPage(pages)}
                  className="px-2 py-1 mx-1 rounded cursor-pointer dark:bg-secondary-dark dark:text-text-dark"
                >
                  Last
                </button>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};
export default DataGenerate;
