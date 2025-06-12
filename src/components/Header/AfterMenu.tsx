import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router";
import type { AppDispatch, RootState } from "../../store/store";
import { setLogout } from "../../store/Slices/loginSlice";
import { FaStar } from "react-icons/fa";
import SettingsHeader from "./SettingsHeader";
import SearchHeader from "./SearchHeader";
import { IoMenu } from "react-icons/io5";

interface AfterMenuProps {
  toggleMenu: (currentMode: boolean) => void;
}
const AfterMenu = ({ toggleMenu }: AfterMenuProps) => {
  const { theme } = useSelector((state: RootState) => state.userSettings);
  const { isLoggedIn } = useSelector((state: RootState) => state.login);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    localStorage.theme = theme;
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, [theme]);
  const location = useLocation();
  return (
    <>
      <div className="w-2/12 flex flex-row gap-2 lg:gap-4 items-center justify-end">
        <div className="hidden md:block">
          {isLoggedIn &&
            (location.pathname !== "/watchList" ? (
              <NavLink
                className="bg-tertiary-light dark:bg-tertiary-dark p-2 rounded cursor-pointer text-sm font-semibold opacity-70 hover:opacity-100 transition delay-150 duration-300 ease-in-out flex gap-2 items-center justify-center"
                to="/watchList"
              >
                <div className="text-yellow-500">
                  <FaStar />
                </div>
                Watchlist
              </NavLink>
            ) : (
              <div className="sm:bg-tertiary-light sm:dark:bg-tertiary-dark p-2 rounded text-sm font-semibold opacity-70 hover:opacity-100 transition delay-150 duration-300 ease-in-out flex gap-2 items-center justify-center">
                <div className="text-yellow-500">
                  <FaStar />
                </div>
                Watchlist
              </div>
            ))}
        </div>
        <div
          onClick={() => toggleMenu(true)}
          className="cursor-pointer text-xl md:hidden"
        >
          <IoMenu />
        </div>
        <div className="relative text-xl cursor-pointer py-5">
          <SettingsHeader />
        </div>
        <div className="text-xl">
          <SearchHeader />
        </div>
        <div>
          {isLoggedIn && (
            <div
              onClick={() => dispatch(setLogout())}
              className="bg-tertiary-light dark:bg-tertiary-dark p-2 rounded cursor-pointer text-sm font-semibold opacity-70 hover:opacity-100 transition delay-150 duration-300 ease-in-out hidden md:block"
            >
              Logout
            </div>
          )}
          {!isLoggedIn &&
            (location.pathname === "/login" ? (
              <div className="bg-tertiary-light dark:bg-tertiary-dark p-2 rounded cursor-pointer text-sm font-semibold opacity-70 hover:opacity-100 transition delay-150 duration-300 ease-in-out hidden md:block">
                Login
              </div>
            ) : (
              <NavLink
                className="bg-tertiary-light dark:bg-tertiary-dark p-2 rounded cursor-pointer text-sm font-semibold opacity-70 hover:opacity-100 transition delay-150 duration-300 ease-in-out hidden md:block"
                to="/login"
              >
                Login
              </NavLink>
            ))}
        </div>
      </div>
    </>
  );
};
export default AfterMenu;
