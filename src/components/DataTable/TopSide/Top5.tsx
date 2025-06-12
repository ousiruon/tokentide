import { useEffect, useState } from "react";
import { formatCurrency, type Cryptocurrency } from "../../../utilities/data";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import Last30Days from "../Last30Days";
import { NavLink, useLocation, useNavigate } from "react-router";
import { IoIosArrowForward } from "react-icons/io";
import { FaFire } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";

const Top5 = () => {
  const selectedCurrency = useSelector(
    (state: RootState) => state.userSettings.currency
  );
  const [sortedData, setSortedData] = useState<Cryptocurrency[] | null>(null);
  const [selectedOption, setSelectedOption] = useState<"trending" | "recent">(
    "trending"
  );
  const { data } = useSelector((state: RootState) => state.data);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (data.length > 0) {
      const sorted = [...data].sort((a, b) => {
        return selectedOption === "trending"
          ? b.quote[selectedCurrency].percent_change_60d -
              a.quote[selectedCurrency].percent_change_60d
          : selectedOption === "recent"
          ? new Date(b.date_added).getTime() - new Date(a.date_added).getTime()
          : a.name.localeCompare(b.name);
      });
      setSortedData(sorted.slice(0, 5));
    }
  }, [data, selectedOption]);
  return (
    <>
      <div className="p-6 rounded-lg bg-secondary-light dark:bg-secondary-dark min-w-[420px] hidden md:flex">
        {sortedData && sortedData.length > 0 && (
          <div className="flex flex-col gap-6 w-full">
            <div className="w-full flex justify-between">
              {selectedOption === "trending" &&
                (location.pathname !== "/trending" ? (
                  <NavLink
                    to={"/trending"}
                    className="flex flex-row gap-1 items-center font-semibold"
                  >
                    Trending coins
                    <IoIosArrowForward size={12} />
                  </NavLink>
                ) : (
                  <div className="flex flex-row gap-1 items-center font-semibold">
                    Trending coins
                    <IoIosArrowForward size={12} />
                  </div>
                ))}
              {selectedOption === "recent" &&
                (location.pathname !== "/latest-listings" ? (
                  <NavLink
                    to={"/latest-listings"}
                    className="flex flex-row gap-1 items-center font-semibold"
                  >
                    Recent coins
                    <IoIosArrowForward size={12} />
                  </NavLink>
                ) : (
                  <div className="flex flex-row gap-1 items-center font-semibold">
                    Recent coins
                    <IoIosArrowForward size={12} />
                  </div>
                ))}
              <div className="flex flex-row items-center">
                <div
                  onClick={() => setSelectedOption("trending")}
                  className={`rounded-l-lg p-2 cursor-pointer ${
                    selectedOption === "trending"
                      ? "bg-tertiary-light/80 dark:bg-tertiary-dark/80"
                      : "bg-tertiary-light/20 dark:bg-tertiary-dark/20"
                  }`}
                >
                  <FaFire />
                </div>
                <div
                  onClick={() => setSelectedOption("recent")}
                  className={`rounded-r-lg p-2 cursor-pointer ${
                    selectedOption === "recent"
                      ? "bg-tertiary-light/80 dark:bg-tertiary-dark/80"
                      : "bg-tertiary-light/20 dark:bg-tertiary-dark/20"
                  }`}
                >
                  <FaRegClock />
                </div>
              </div>
            </div>
            {sortedData?.map((item, index) => (
              <div
                onClick={() => navigate(`/coin/${item.id}`)}
                key={index}
                className="flex justify-between items-center p-2 cursor-pointer"
              >
                <div className="w-[40px]">{index + 1}</div>

                {/* Name and Logo */}
                <div className="flex-1 flex items-center gap-2">
                  <img
                    src={item.logo}
                    className="w-[25px] aspect-square drop-shadow"
                    alt={item.name + " logo"}
                    loading="lazy"
                  />
                  {item.name}
                </div>
                <div className="w-[100px] text-right flex justify-end items-center gap-1 text-xs font-semibold">
                  {formatCurrency(selectedCurrency)}
                  {item.quote[selectedCurrency].price.toFixed(2)}
                </div>
                <div className="w-[80px] flex justify-end items-start">
                  <Last30Days
                    chartData={item.chart_data[selectedCurrency].monthly}
                    last30Days={item.quote[selectedCurrency].percent_change_30d}
                    width={60}
                    height={20}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default Top5;
