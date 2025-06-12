import { NavLink } from "react-router";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";

const CoinPlatforms = ({ data }: { data: string[] }) => {
  const { allExchangesExtended } = useSelector(
    (state: RootState) => state.exchangeData
  );
  const getExchangeid = (name: string) => {
    return allExchangesExtended.find((item) => item.name === name);
  };
  return (
    <>
      {allExchangesExtended.length > 0 && (
        <div className="w-full flex flex-row items-center justify-between text-sm font-semibold gap-4">
          <div className="">Platforms</div>
          <div className="flex flex-row gap-2 flex-wrap">
            {data.map((exchange, index) => (
              <NavLink
                key={index}
                className="flex items-center text-xs px-2 py-1 rounded-xl bg-secondary-light/60 dark:bg-tertiary-dark/60 hover:bg-secondary-light hover:dark:bg-tertiary-dark transition-all duration-300 ease-in"
                to={`../exchange/${getExchangeid(exchange)?.id}`}
              >
                {exchange}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default CoinPlatforms;
