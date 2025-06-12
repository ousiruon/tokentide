import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { NavLink } from "react-router";
import type { Category } from "../../../store/Slices/categoriesData";

const CoinTags = ({ data }: { data: string[] }) => {
  const { allCategoriesWithData } = useSelector(
    (state: RootState) => state.categoriesData
  );
  const getTagId = (name: string) => {
    return allCategoriesWithData.find((item) => item.name === name);
  };
  return (
    <>
      {allCategoriesWithData.length > 0 && (
        <div className="w-full flex flex-row items-center justify-between text-sm font-semibold">
          <div className="">Tags</div>
          <div className="flex flex-row gap-2 flex-wrap">
            {data.map((tag, index) => (
              <NavLink
                key={index}
                className="flex items-center text-xs px-2 py-1 rounded-xl bg-secondary-light/60 dark:bg-tertiary-dark/60 hover:bg-secondary-light hover:dark:bg-tertiary-dark transition-all duration-300 ease-in"
                to={`../category/${(getTagId(tag) as Category).id}`}
              >
                {tag}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CoinTags;
