import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { NavLink } from "react-router";
import { useState } from "react";
import { motion } from "motion/react";

const News = () => {
  const { newsData } = useSelector((state: RootState) => state.newsData);
  const [isHover, setIsHover] = useState<null | number>(null);

  return (
    <div className="flex w-full min-h-dvh items-start justify-center bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark py-20">
      <div className="w-[95%] max-w-[1400px]">
        <div className="flex flex-col gap-4 px-8 py-20">
          <div className="text-3xl font-semibold text-secondary-light dark:text-tertiary-dark">
            What’s New ?
          </div>
          <div className="">
            Stay in the loop with the latest updates, trends, and announcements
            in the world of CryptoPulse and the broader cryptocurrency
            ecosystem. From new feature rollouts and market insights to
            strategic partnerships and technology upgrades—discover everything
            you need to navigate the digital finance frontier.
          </div>
        </div>
        <div className="flex flex-col px-4 gap-6">
          {newsData.length > 0 && (
            <div className="flex flex-row flex-wrap items-start justify-center">
              {newsData.map((newItem, index) => (
                <motion.div
                  onHoverStart={() => setIsHover(index)}
                  onHoverEnd={() => setIsHover(null)}
                  key={index}
                  className="w-full sm:w-1/2 md:w-1/3 p-2 lg:p-4"
                >
                  <NavLink
                    to={`article/${newItem.id}`}
                    className="flex flex-col gap-4 group"
                  >
                    <div className="relative pt-[90%] md:pt-[150%] rounded overflow-hidden">
                      <motion.img
                        animate={
                          isHover === index
                            ? {
                                scale: 1.2,
                                transition: { duration: 0.2 },
                              }
                            : {
                                scale: 1,
                                transition: { duration: 0.1 },
                              }
                        }
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        src={newItem.image}
                        alt={`${newItem.title}'s image`}
                      />
                    </div>
                    <div className="font-semibold">
                      <div className="text-xs md:text-sm opacity-50">
                        {newItem.date}
                      </div>
                      <div className="text-sm md:text-base relative w-fit ">
                        {newItem.title}
                      </div>
                    </div>
                  </NavLink>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
