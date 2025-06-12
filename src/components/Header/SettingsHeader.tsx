import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { IoSettingsOutline } from "react-icons/io5";
import { setCurrency, setTheme } from "../../store/Slices/settingsSlice";
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import { motion } from "motion/react";

const SettingsHeader = () => {
  const { openedSettings, theme, currency } = useSelector(
    (state: RootState) => state.userSettings
  );
  const dispatch: AppDispatch = useDispatch();
  return (
    <>
      <div id="settingsBtn">
        <IoSettingsOutline />
      </div>
      <div
        id="settingsMenu"
        className={`absolute top-full right-0 border-t-1 border-text-light dark:border-text-dark bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark py-4 text-xs flex flex-col gap-4 z-10 w-[150px] ${
          openedSettings ? "block" : "hidden"
        }`}
      >
        <div
          onClick={() =>
            dispatch(setTheme(theme === "light" ? "dark" : "light"))
          }
          className="flex flex-row items-center justify-between px-4"
        >
          <div className="font-semibold">Dark Mode</div>
          <div
            className={`relative flex w-8 h-4 bg-tertiary-light dark:bg-tertiary-dark rounded`}
          >
            <motion.div
              initial={{ x: theme === "light" ? 0 : "100%" }}
              animate={{ x: theme === "light" ? 0 : "100%" }}
              className={`absolute w-4 h-4 top-0 bg-text-light dark:bg-text-dark rounded transition delay-150 duration-300 ease-in-out flex items-center justify-center text-tertiary-light dark:text-tertiary-dark`}
            >
              {theme === "light" ? <RxCross2 /> : <IoMdCheckmark />}
            </motion.div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between px-4">
          <div className="font-semibold">Currency</div>
          <select
            onChange={(e) => {
              dispatch(setCurrency(e.target.value));
              localStorage.setItem("currency", e.target.value);
            }}
            className="bg-tertiary-light dark:bg-tertiary-dark text-text-light dark:text-text-dark p-1 rounded"
            defaultValue={currency}
          >
            <option value="USD">USD</option>
            <option value="CAD">CAD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>
    </>
  );
};
export default SettingsHeader;
