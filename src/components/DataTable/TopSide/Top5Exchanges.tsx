import { NavLink, useLocation, useNavigate } from "react-router";
import type { ExchangeWithData } from "../../../store/Slices/exchangesData";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

const Top5Exchanges = () => {
  const [topExchanges, setTopExchanges] = useState<ExchangeWithData[] | []>([]);
  const { allExchangesExtended } = useSelector(
    (state: RootState) => state.exchangeData
  );
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (allExchangesExtended.length > 0)
      setTopExchanges(allExchangesExtended.slice(0, 4));
  }, [allExchangesExtended]);
  return (
    <>
      <div className="p-6 rounded-lg bg-secondary-light dark:bg-secondary-dark min-w-[420px] hidden md:flex">
        <div className="flex flex-col gap-6 w-full">
          <div className="w-full flex justify-between">
            {location.pathname !== "/exchanges" && (
              <NavLink
                to={"/exchanges"}
                className="flex flex-row gap-1 items-center font-semibold"
              >
                Top exchanges
                <IoIosArrowForward size={12} />
              </NavLink>
            )}
            {location.pathname === "/exchanges" && (
              <div className="flex flex-row gap-1 items-center font-semibold">
                Top exchanges
                <IoIosArrowForward size={12} />
              </div>
            )}
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left px-4">#</th>
                <th className="text-left px-4">Name</th>
                <th className="text-right px-4">Total coins</th>
              </tr>
            </thead>
            <tbody>
              {topExchanges?.map((item: ExchangeWithData, index) => (
                <tr
                  onClick={() => navigate(`/exchange/${item.id}`)}
                  key={index}
                  className="cursor-pointer"
                >
                  <td className="px-4 py-6">{index + 1}</td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.image}
                        className="w-[25px] aspect-square drop-shadow"
                        alt={item.name + " logo"}
                        loading="lazy"
                      />
                      {item.name}
                    </div>
                  </td>

                  <td className="text-right text-xs font-semibold p-4">
                    {item.totalCoins}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Top5Exchanges;
