import { FaRegStar, FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import {
  addCoinWatchList,
  removeCoinWatchList,
} from "../../../store/Slices/watchListData";

const CoinTitle = ({
  logo,
  name,
  symbol,
  coinId,
}: {
  logo: string;
  name: string;
  symbol: string;
  coinId: string;
}) => {
  const { watchList } = useSelector((state: RootState) => state.watchListData);
  const { isLoggedIn } = useSelector((state: RootState) => state.login);
  const dispatch: AppDispatch = useDispatch();
  const checking = watchList.some((item) => item === coinId);
  const [isWatched, setIsWatched] = useState<boolean>(checking);
  const checkWatchList = (coinId: string) => {
    const checking = watchList.find((item) => item === coinId);
    if (checking) {
      dispatch(removeCoinWatchList(coinId));
    } else {
      dispatch(addCoinWatchList(coinId));
    }
  };
  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);
  return (
    <>
      <div className="flex flex-row items-center gap-4 font-semibold text-lg">
        <img
          src={logo}
          className="w-[30px] aspect-square drop-shadow-md drop-shadow-tertiary-light/20 dark:drop-shadow-tertiary-dark/20"
          alt={logo + " logo"}
          loading="lazy"
        />
        <div className="flex flex-row gap-1 items-center">
          {name}
          <div className="font-normal text-xs">{symbol}</div>
          <div
            onClick={() => {
              setIsWatched((prev) => !prev);
              checkWatchList(coinId);
            }}
            className="text-yellow-500 cursor-pointer"
          >
            {isWatched && isLoggedIn && <FaStar />}
            {!isWatched && isLoggedIn && <FaRegStar />}
          </div>
        </div>
      </div>
    </>
  );
};
export default CoinTitle;
