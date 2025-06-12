import { useSelector } from "react-redux";
import type { MenuProps } from "../../store/Slices/menuSlice";
import type { RootState } from "../../store/store";
import { NavLink, useLocation } from "react-router";
import { motion } from "motion/react";
import { useState } from "react";
const Menu = () => {
  const menu: MenuProps[] = useSelector((state: RootState) => state.menu);
  const [activeParent, setActiveParent] = useState<number | null>(null);
  const location = useLocation();
  return (
    <>
      <nav className="text-sm font-semibold hidden md:block">
        <ul className="flex flex-row gap-4 items-center justify-center">
          {menu.map((item, index) => (
            <motion.li
              onMouseEnter={() => setActiveParent(index)}
              onMouseLeave={() => setActiveParent(null)}
              className="hover:text-tertiary-light dark:hover:text-tertiary-dark transition delay-150 duration-300 ease-in-out relative py-5"
              key={index}
            >
              {item.link && location.pathname !== `${item.link}` && (
                <NavLink to={item.link}>{item.name}</NavLink>
              )}
              {item.link && location.pathname === `${item.link}` && (
                <div>{item.name}</div>
              )}
              {!item.link && <div className="cursor-pointer">{item.name}</div>}
              {item.children && item.children.length > 0 && (
                <ul
                  className={`absolute top-full left-0 shadow-lg text-xs ${
                    activeParent === index ? "block" : "hidden"
                  } overflow-hidden z-10 transition delay-150 duration-300 ease-in-out`}
                >
                  {item.children.map((child, index) => (
                    <li
                      className="py-5 px-2 border-t-1 border-text-light dark:border-text-dark bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark hover:bg-tertiary-light dark:hover:bg-tertiary-dark transition delay-150 duration-300 ease-in-out"
                      key={index}
                    >
                      {child.link && location.pathname !== `${child.link}` && (
                        <NavLink to={child.link}>{child.name}</NavLink>
                      )}
                      {child.link && location.pathname === `${child.link}` && (
                        <div>{child.name}</div>
                      )}
                      {!child.link && (
                        <div className="cursor-pointer">{child.name}</div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </motion.li>
          ))}
        </ul>
      </nav>
    </>
  );
};
export default Menu;
