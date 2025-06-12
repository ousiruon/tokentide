import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router";
import type { RootState } from "../../store/store";
import type { newsProps } from "../../store/Slices/newsSlice";

const NewsWidget = () => {
  const location = useLocation();
  const { newsData } = useSelector((state: RootState) => state.newsData);
  const [news, setNews] = useState<newsProps[] | null>(null);
  useEffect(() => {
    if (newsData.length > 0) {
      let id: null | string = null;
      if (location.pathname.includes("/news/article/")) {
        id = location.pathname.replace("/news/article/", "");
      }
      if (id) {
        const filteredNews = [...newsData]
          .filter((itemNews) => itemNews.id !== id)
          .slice(0, 3);
        setNews(filteredNews);
      } else {
        const filteredNews = [...newsData].slice(0, 3);
        setNews(filteredNews);
      }
    }
  }, [location, newsData]);
  return (
    <>
      {news && news.length > 0 && (
        <div className="flex flex-col w-full bg-secondary-light dark:bg-secondary-dark p-8 rounded">
          <div className="pb-8 flex items-center justify-center font-semibold text-xl md:text-2xl">
            Recent News
          </div>
          <div className="flex md:flex-row flex-col sm:px-8 md:px-0 gap-10 w-full pb-8">
            {news.map((newItem, index) => (
              <NavLink
                key={index}
                to={`/news/article/${newItem.id}`}
                className="flex flex-col gap-4 w-full"
              >
                <div className="relative w-full pt-[70%] rounded overflow-hidden">
                  <img
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    alt={`${newItem.title}'s image`}
                    src={newItem.image}
                  />
                </div>
                <div className="font-semibold">
                  <div className="text-xs md:text-sm opacity-70">{newItem.date}</div>
                  <div className="text-sm md:text-base relative w-fit">{newItem.title}</div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default NewsWidget;
