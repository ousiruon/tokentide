import { useDispatch, useSelector } from "react-redux";
import type { MenuProps } from "../../store/Slices/menuSlice";
import type { AppDispatch, RootState } from "../../store/store";
import { NavLink, useLocation } from "react-router";
import { FaPlus, FaStar } from "react-icons/fa6";
import { motion } from "motion/react";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { setLogout } from "../../store/Slices/loginSlice";
interface MobileMenuProps {
  isOpened: boolean;
  toggleMenu: (currentMode: boolean) => void;
}
const MobileMenu = ({ isOpened, toggleMenu }: MobileMenuProps) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.login);
  const menu: MenuProps[] = useSelector((state: RootState) => state.menu);
  const dispatch: AppDispatch = useDispatch();
  const [activeParent, setActiveParent] = useState<number | null>(null);
  const location = useLocation();
  useEffect(() => {
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      if (width > 768) {
        toggleMenu(false);
      }
    });
  }, []);
  useEffect(() => {
    if (!isOpened) {
      setActiveParent(null);
    }
  }, [isOpened]);
  return (
    <>
      <motion.div
        initial={{ right: "-100%" }}
        animate={
          isOpened
            ? {
                right: 0,
                transition: { duration: 0.5 },
              }
            : {
                right: "-100%",
                transition: { duration: 0.5 },
              }
        }
        className={`fixed top-0 bottom-0 h-full w-auto z-20 bg-bg-light dark:bg-bg-dark flex flex-col`}
      >
        <div className="flex py-4 px-2 text-2xl justify-end ">
          <motion.div
            onClick={() => toggleMenu(false)}
            whileHover={{ rotate: 90, transition: { duration: 0.3 } }}
            className="cursor-pointer"
          >
            <IoClose />
          </motion.div>
        </div>
        <div className="grow-1 flex flex-col justify-between">
          <ul className="flex flex-col items-center py-8">
            {menu.map((menuItem, index) =>
              menuItem.link ? (
                location.pathname !== `${menuItem.link}` ? (
                  <NavLink
                    key={index}
                    onClick={() => toggleMenu(false)}
                    className="list-none p-8 w-full hover:bg-tertiary-light/5 hover:dark:bg-tertiary-dark/5 flex justify-center items-center font-semibold border-b-1 last:border-0 transition-all duration-300 ease-in"
                    to={menuItem.link}
                  >
                    <li>{menuItem.name}</li>
                  </NavLink>
                ) : (
                  <div
                    key={index}
                    onClick={() => toggleMenu(false)}
                    className="list-none p-8 w-full hover:bg-tertiary-light/5 hover:dark:bg-tertiary-dark/5 flex justify-center items-center font-semibold border-b-1 last:border-0 transition-all duration-300 ease-in"
                  >
                    <li>{menuItem.name}</li>
                  </div>
                )
              ) : (
                <div key={index} className="border-b-1 ">
                  <li
                    onClick={() =>
                      activeParent === index
                        ? setActiveParent(null)
                        : setActiveParent(index)
                    }
                    className={`cursor-pointer flex flex-row gap-2 p-8 w-full hover:bg-tertiary-light/5 hover:dark:bg-tertiary-dark/5 justify-center items-center font-semibold transition-all duration-300 ease-in ${
                      activeParent === index
                        ? "bg-tertiary-light/5 dark:bg-tertiary-dark/"
                        : ""
                    }`}
                  >
                    <motion.div
                      animate={
                        activeParent === index
                          ? { rotate: 45, transition: { duration: 0.3 } }
                          : {}
                      }
                      className="cursor-pointer"
                    >
                      <FaPlus />
                    </motion.div>
                    <div>{menuItem.name}</div>
                  </li>
                  {menuItem.children && menuItem.children.length > 0 && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={
                        activeParent === index
                          ? { opacity: 1, height: "auto" }
                          : { opacity: 0, height: 0 }
                      }
                      transition={{ duration: 0.3 }}
                      className={`overflow-hidden text-xs`}
                    >
                      {menuItem.children.map((child, index) => (
                        <li
                          className={`${
                            location.pathname !== child.link && "cursor-pointer"
                          } flex flex-row gap-2 p-4 px-12 w-full dark:bg-tertiary-dark/5 bg-tertiary-light/5 hover:bg-tertiary-light/10 hover:dark:bg-tertiary-dark/10 justify-start font-semibold border-b-1 last:border-0 transition-all duration-300 ease-in`}
                          key={index}
                        >
                          {child.link ? (
                            location.pathname !== `${child.link}` ? (
                              <NavLink
                                onClick={() => toggleMenu(false)}
                                to={child.link}
                              >
                                {child.name}
                              </NavLink>
                            ) : (
                              <div onClick={() => toggleMenu(false)}>
                                {child.name}
                              </div>
                            )
                          ) : (
                            <div className="cursor-pointer">{child.name}</div>
                          )}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </div>
              )
            )}
          </ul>
          <div className="w-full flex flex-col gap-2">
            {isLoggedIn &&
              (location.pathname !== "/watchList" ? (
                <NavLink
                  onClick={() => toggleMenu(false)}
                  className="bg-tertiary-light dark:bg-tertiary-dark p-2 cursor-pointer text-sm font-semibold opacity-70 hover:opacity-100 transition delay-150 duration-300 ease-in-out flex gap-2 items-center justify-center"
                  to="/watchList"
                >
                  <div className="text-yellow-500">
                    <FaStar />
                  </div>
                  Watchlist
                </NavLink>
              ) : (
                <div
                  onClick={() => toggleMenu(false)}
                  className="sm:bg-tertiary-light sm:dark:bg-tertiary-dark p-2 text-sm font-semibold opacity-70 hover:opacity-100 transition delay-150 duration-300 ease-in-out flex gap-2 items-center justify-center"
                >
                  <div className="text-yellow-500">
                    <FaStar />
                  </div>
                  Watchlist
                </div>
              ))}

            {isLoggedIn && (
              <div
                onClick={() => {
                  dispatch(setLogout());
                  toggleMenu(false);
                }}
                className="bg-tertiary-light dark:bg-tertiary-dark p-2 flex items-center justify-center cursor-pointer text-sm font-semibold opacity-70 hover:opacity-100 transition delay-150 duration-300 ease-in-out"
              >
                Logout
              </div>
            )}
            {!isLoggedIn &&
              (location.pathname === "/login" ? (
                <div
                  onClick={() => toggleMenu(false)}
                  className="bg-tertiary-light dark:bg-tertiary-dark p-2 flex items-center justify-center cursor-pointer text-sm font-semibold opacity-70 hover:opacity-100 transition delay-150 duration-300 ease-in-out"
                >
                  Login
                </div>
              ) : (
                <NavLink
                  onClick={() => toggleMenu(false)}
                  className="bg-tertiary-light dark:bg-tertiary-dark p-2 flex items-center justify-center cursor-pointer text-sm font-semibold opacity-70 hover:opacity-100 transition delay-150 duration-300 ease-in-out"
                  to="/login"
                >
                  Login
                </NavLink>
              ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};
export default MobileMenu;
