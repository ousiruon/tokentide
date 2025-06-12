import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { FaGripfire } from "react-icons/fa";
import { GiCrystalCluster } from "react-icons/gi";

const GainersLosersTopBar = ({
  setDataDirection,
}: {
  setDataDirection: (type: string) => void;
}) => {
  const { selectedOptions } = useSelector((state: RootState) => state.data);

  return (
    <>
      <div className="flex w-full md:w-auto">
        <div
          onClick={() => {
            setDataDirection("desc");
          }}
          className={`w-1/2 md:w-auto flex items-center justify-center p-4 gap-4 text-text-light dark:text-text-dark font-semibold cursor-pointer text-sm transition-all duration-300 ease-in ${
            selectedOptions.sortBy === "gainers"
              ? "dark:bg-secondary-dark bg-secondary-light"
              : "dark:bg-secondary-dark/50 bg-secondary-light/50"
          }`}
        >
          Top Gainers
          <div className="text-[#aa4203] text-lg">
            <FaGripfire />
          </div>
        </div>
        <div
          onClick={() => {
            setDataDirection("asc");
          }}
          className={`w-1/2 md:w-auto flex items-center justify-center p-4 gap-4 text-text-light dark:text-text-dark font-semibold cursor-pointer text-sm transition-all duration-300 ease-in ${
            selectedOptions.sortBy === "losers"
              ? "dark:bg-secondary-dark bg-secondary-light"
              : "dark:bg-secondary-dark/50 bg-secondary-light/50"
          }`}
        >
          Top Losers
          <div className="text-[#99D9D9] text-lg">
            <GiCrystalCluster />
          </div>
        </div>
      </div>
    </>
  );
};
export default GainersLosersTopBar;
