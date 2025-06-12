import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { setSortBy } from "../../store/Slices/dataSlice";
import { FaSortDown, FaSortUp } from "react-icons/fa";

const DataHeader = () => {
  const dispatch: AppDispatch = useDispatch();
  const { selectedOptions } = useSelector((state: RootState) => state.data);
  return (
    <>
      <thead className="text-sm md:text-base">
        <tr className="border-b border-text-light/30 dark:border-text-dark/30">
          <th
            onClick={() =>
              selectedOptions.sortBy === "nameAsc"
                ? dispatch(setSortBy("nameDesc"))
                : selectedOptions.sortBy === "nameDesc"
                ? dispatch(setSortBy("nameAsc"))
                : dispatch(setSortBy("nameDesc"))
            }
            className="text-left py-8 px-2 md:p-8 cursor-pointer"
          >
            <div className="relative whitespace-nowrap">
              Name
              <div
                className={`absolute ${
                  selectedOptions.sortBy === "nameAsc" ? "bottom-0" : "top-0"
                } left-[-20px]`}
              >
                {selectedOptions.sortBy === "nameAsc" ? (
                  <FaSortUp />
                ) : selectedOptions.sortBy === "nameDesc" ? (
                  <FaSortDown />
                ) : (
                  ""
                )}
              </div>
            </div>
          </th>
          <th
            onClick={() =>
              selectedOptions.sortBy === "priceAsc"
                ? dispatch(setSortBy("priceDesc"))
                : selectedOptions.sortBy === "priceDesc"
                ? dispatch(setSortBy("priceAsc"))
                : dispatch(setSortBy("priceDesc"))
            }
            className="text-left py-8 px-2 md:p-8 cursor-pointer"
          >
            <div className="relative whitespace-nowrap">
              Price
              <div
                className={`absolute ${
                  selectedOptions.sortBy === "priceAsc" ? "bottom-0" : "top-0"
                } left-[-20px]`}
              >
                {selectedOptions.sortBy === "priceAsc" ? (
                  <FaSortUp />
                ) : selectedOptions.sortBy === "priceDesc" ? (
                  <FaSortDown />
                ) : (
                  ""
                )}
              </div>
            </div>
          </th>
          <th
            onClick={() =>
              selectedOptions.sortBy === "1hAsc"
                ? dispatch(setSortBy("1hDesc"))
                : selectedOptions.sortBy === "1hDesc"
                ? dispatch(setSortBy("1hAsc"))
                : dispatch(setSortBy("1hDesc"))
            }
            className="text-right py-8 px-2 md:p-8 cursor-pointer"
          >
            <div className="relative whitespace-nowrap">
              1h%
              <div
                className={`absolute ${
                  selectedOptions.sortBy === "1hAsc" ? "bottom-0" : "top-0"
                } right-[-16px]`}
              >
                {selectedOptions.sortBy === "1hAsc" ? (
                  <FaSortUp />
                ) : selectedOptions.sortBy === "1hDesc" ? (
                  <FaSortDown />
                ) : (
                  ""
                )}
              </div>
            </div>
          </th>
          <th
            onClick={() =>
              selectedOptions.sortBy === "24hAsc"
                ? dispatch(setSortBy("24hDesc"))
                : selectedOptions.sortBy === "24hDesc"
                ? dispatch(setSortBy("24hAsc"))
                : dispatch(setSortBy("24hDesc"))
            }
            className="text-right py-8 px-2 md:p-8 cursor-pointer"
          >
            <div className="relative whitespace-nowrap">
              24h%
              <div
                className={`absolute ${
                  selectedOptions.sortBy === "24hAsc" ? "bottom-0" : "top-0"
                } right-[-16px]`}
              >
                {selectedOptions.sortBy === "24hAsc" ? (
                  <FaSortUp />
                ) : selectedOptions.sortBy === "24hDesc" ? (
                  <FaSortDown />
                ) : (
                  ""
                )}
              </div>
            </div>
          </th>
          <th
            onClick={() =>
              selectedOptions.sortBy === "7DaysAsc"
                ? dispatch(setSortBy("7DaysDesc"))
                : selectedOptions.sortBy === "7DaysDesc"
                ? dispatch(setSortBy("7DaysAsc"))
                : dispatch(setSortBy("7DaysDesc"))
            }
            className="text-right py-8 px-2 md:p-8 cursor-pointer"
          >
            <div className="relative whitespace-nowrap">
              7d%
              <div
                className={`absolute ${
                  selectedOptions.sortBy === "7DaysAsc" ? "bottom-0" : "top-0"
                } right-[-16px]`}
              >
                {selectedOptions.sortBy === "7DaysAsc" ? (
                  <FaSortUp />
                ) : selectedOptions.sortBy === "7DaysDesc" ? (
                  <FaSortDown />
                ) : (
                  ""
                )}
              </div>
            </div>
          </th>
          <th
            onClick={() =>
              selectedOptions.sortBy === "marketCapAsc"
                ? dispatch(setSortBy("marketCapDesc"))
                : selectedOptions.sortBy === "marketCapDesc"
                ? dispatch(setSortBy("marketCapAsc"))
                : dispatch(setSortBy("marketCapDesc"))
            }
            className="text-right py-8 px-2 md:p-8 cursor-pointer"
          >
            <div className="relative whitespace-nowrap">
              Market Cap
              <div
                className={`absolute ${
                  selectedOptions.sortBy === "marketCapAsc"
                    ? "bottom-0"
                    : "top-0"
                } right-[-16px]`}
              >
                {selectedOptions.sortBy === "marketCapAsc" ? (
                  <FaSortUp />
                ) : selectedOptions.sortBy === "marketCapDesc" ? (
                  <FaSortDown />
                ) : (
                  ""
                )}
              </div>
            </div>
          </th>
          <th
            onClick={() =>
              selectedOptions.sortBy === "volume24Asc"
                ? dispatch(setSortBy("volume24Desc"))
                : selectedOptions.sortBy === "volume24Desc"
                ? dispatch(setSortBy("volume24Asc"))
                : dispatch(setSortBy("volume24Desc"))
            }
            className="text-right py-8 px-2 md:p-8 cursor-pointer"
          >
            <div className="relative whitespace-nowrap">
              Volume(24h)
              <div
                className={`absolute ${
                  selectedOptions.sortBy === "volume24Asc"
                    ? "bottom-0"
                    : "top-0"
                } right-[-16px]`}
              >
                {selectedOptions.sortBy === "volume24Asc" ? (
                  <FaSortUp />
                ) : selectedOptions.sortBy === "volume24Desc" ? (
                  <FaSortDown />
                ) : (
                  ""
                )}
              </div>
            </div>
          </th>
          <th
            onClick={() =>
              selectedOptions.sortBy === "circulatingAsc"
                ? dispatch(setSortBy("circulatingDesc"))
                : selectedOptions.sortBy === "circulatingDesc"
                ? dispatch(setSortBy("circulatingAsc"))
                : dispatch(setSortBy("circulatingDesc"))
            }
            className="text-right py-8 px-2 md:p-8 cursor-pointer"
          >
            <div className="relative whitespace-nowrap">
              Circulating Supply
              <div
                className={`absolute ${
                  selectedOptions.sortBy === "circulatingAsc"
                    ? "bottom-0"
                    : "top-0"
                } right-[-16px]`}
              >
                {selectedOptions.sortBy === "circulatingAsc" ? (
                  <FaSortUp />
                ) : selectedOptions.sortBy === "circulatingDesc" ? (
                  <FaSortDown />
                ) : (
                  ""
                )}
              </div>
            </div>
          </th>
          <th className="text-right py-8 px-2 md:p-8 cursor-pointer">
            Last 30 days
          </th>
        </tr>
      </thead>
    </>
  );
};
export default DataHeader;
