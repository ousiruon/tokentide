import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { Cryptocurrency } from "../../utilities/data";
import DataGenerate from "../DataTable/DataGenerate";
import { MdEdit } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { setListName } from "../../store/Slices/watchListData";

const WatchList = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.login);
  const { watchList, listName } = useSelector(
    (state: RootState) => state.watchListData
  );
  const dispatch: AppDispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.data);
  const [finalData, setFinalData] = useState<Cryptocurrency[]>([]);
  const [currentlyEditing, setCurrentlyEditing] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);
  useEffect(() => {
    if (watchList.length > 0 && data.length > 0) {
      const watchListData = data.filter((firstItem) => {
        return watchList.find((secondItem) => {
          return secondItem === firstItem.id;
        });
      });
      setFinalData(watchListData);
    }
  }, [watchList, data]);
  const submitName = () => {
    const inputName = document.getElementById("listName") as HTMLInputElement;
    if (inputName.value) {
      setCurrentlyEditing(false);
      dispatch(setListName(inputName.value));
      localStorage.setItem("listName", JSON.stringify(inputName.value));
    }
  };

  return (
    <>
      <div className="flex w-full min-h-dvh items-start justify-center bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark py-20">
        {watchList.length > 0 && (
          <>
            <div className="relative flex flex-col gap-2 mx-auto w-full max-w-[1400px]">
              {!currentlyEditing && (
                <>
                  <div className="flex flex-row items-center gap-2 cursor-pointer px-8 text-2xl font-semibold">
                    <div>{listName}</div>
                    <div
                      className="cursor-pointer opacity-50"
                      onClick={() => {
                        setCurrentlyEditing(true);
                      }}
                    >
                      <MdEdit />
                    </div>
                  </div>
                </>
              )}
              {currentlyEditing && (
                <>
                  <div className="flex flex-row items-center gap-2 cursor-pointer w-[300px] px-8 text-2xl font-semibold">
                    <div className="relative w-full">
                      <input
                        type="text"
                        name="listName"
                        id="listName"
                        defaultValue={listName}
                        className="w-full outline-0 bg-secondary-light/50 dark:bg-tertiary-dark/50 rounded text-sm py-3 px-4"
                      />
                      <div
                        onClick={submitName}
                        className="absolute left-[90%] top-0 flex items-center justify-center h-full aspect-square px-1 rounded-r bg-secondary-light dark:bg-tertiary-dark text-tertiary-light"
                      >
                        <IoMdCheckmark />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {finalData.length > 0 && (
                <>
                  <div className="w-full p-8">
                    <DataGenerate data={finalData} />
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default WatchList;
