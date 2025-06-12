import { useParams } from "react-router";
import { useEffect, useState } from "react";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import type { newsProps } from "../../store/Slices/newsSlice";
import NewsWidget from "./NewsWidget";

const SingleNews = () => {
  const { newsId } = useParams();
  const { newsData } = useSelector((state: RootState) => state.newsData);
  const [article, setArticle] = useState<newsProps | null>(null);
  useEffect(() => {
    if (newsData.length > 0 && newsId) {
      const filteredNews = newsData.find(
        (singleNew) => singleNew.id === newsId
      );
      if (filteredNews) {
        setArticle(filteredNews);
      }
    }
  }, [newsId, newsData]);
  return (
    <>
      <div className="flex w-full min-h-dvh items-start justify-center bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark pt-20 pb-40">
        <div className="w-[95%] max-w-[1400px] px-12">
          {article && (
            <div className="flex flex-col gap-20 items-center justify-center">
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/3 font-semibold gap-10 pr-20">
                  <div className="flex flex-row gap-2 text-xs">
                    <div>{article.date}</div>
                    <div className="opacity-60">{article.reading_duration}</div>
                  </div>
                  <div className="text-4xl">{article.title}</div>
                  <div className="font-normal text-sm opacity-70">
                    {article.subtitle}
                  </div>
                </div>
                <div className="flex relative w-2/3 pt-[45%] rounded-lg">
                  <img
                    className="absolute top-0 left-0 w-full h-full rounded-lg object-cover"
                    alt={`${article.title} image`}
                    src={article.image}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-0 w-full">
                <div className="flex flex-col w-4/6 gap-16">
                  {article.paragraphs.map((paragraph, index) => (
                    <div key={index} className="flex flex-col w-full gap-4">
                      {paragraph.title && (
                        <div className="text-2xl font-semibold">
                          {paragraph.title}
                        </div>
                      )}
                      {paragraph.description && (
                        <div className="text-justify">
                          {paragraph.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="relative flex flex-col w-2/6 pl-8">
                  <div className="sticky top-5 left-0 rounded-2xl flex flex-col gap-4 p-8 border-1">
                    <div className="font-semibold">Subscribe to newsletter</div>
                    <div className="text-sm text-justify">
                      Subscribe to receive the latest blog posts to your inbox
                      every week.
                    </div>
                    <form className="w-full flex flex-col gap-4">
                      <div className="w-full">
                        <input
                          className="w-full border-1 outline-0 px-2 py-2 rounded-sm text-xs md:text-sm"
                          placeholder="Enter your email"
                          type="email"
                          name="email"
                        />
                      </div>
                      <div className="w-full ">
                        <button className="rounded border-1 flex items-center justify-center gap-1 cursor-pointer relative text-sm overflow-hidden py-1 w-full">
                          <div className="absolute top-0 left-0 bg-tertiary-light dark:bg-tertiary-dark w-full h-full"></div>
                          <div className="flex items-center gap-1 z-2">
                            <div>Subscribe</div>
                          </div>
                        </button>
                      </div>
                    </form>
                    <div className="text-[9.5px]">
                      By subscribing you agree to with our Privacy Policy.
                    </div>
                  </div>
                </div>
              </div>
              <NewsWidget />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default SingleNews;
