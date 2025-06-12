import { motion } from "motion/react";
import { NavLink, useLocation } from "react-router";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const Logo = () => {
  const logo: string[] = useSelector((state: RootState) => state.logo);
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" ? (
        <NavLink
          className="flex items-center justify-center font-logo text-4xl font-light dark:text-tertiary-dark text-tertiary-light "
          to="/"
        >
          <motion.div className="flex flex-row">
            {logo.map((item, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ scale: 1 }}
                  animate={
                    index === 0
                      ? { scale: [1, 0.9, 1], transition: { duration: 0.5 } }
                      : {
                          scale: [1, 0.9, 1],
                          transition: { delay: 0.5, duration: 0.5 },
                        }
                  }
                  className={`flex flex-row gap-2 items-center justify-center ${
                    index === 1 ? "text-text-light dark:text-text-dark" : ""
                  }`}
                >
                  {item}
                </motion.div>
              );
            })}
          </motion.div>
        </NavLink>
      ) : (
        <div
          className="flex items-center justify-center font-logo text-4xl font-light dark:text-tertiary-dark text-tertiary-light cursor-pointer"
        >
          <motion.div className="flex flex-row">
            {logo.map((item, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ scale: 1 }}
                  animate={
                    index === 0
                      ? { scale: [1, 0.9, 1], transition: { duration: 0.5 } }
                      : {
                          scale: [1, 0.9, 1],
                          transition: { delay: 0.5, duration: 0.5 },
                        }
                  }
                  className={`flex flex-row gap-2 items-center justify-center ${
                    index === 1 ? "text-text-light dark:text-text-dark" : ""
                  }`}
                >
                  {item}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      )}
    </>
  );
};
export default Logo;
